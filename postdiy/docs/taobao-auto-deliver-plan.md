# 淘宝自动发货系统规划方案

## 状态
- **状态**：暂停（等待淘宝开放平台权限确认）
- **暂停原因**：淘宝个人开发者不支持调用旺旺消息发送 API
- **创建日期**：2026-07-18

## 一、现有系统可复用部分

| 现有资产 | 作用 | 复用方式 |
|---------|------|---------|
| `vip_vouchers` 集合 | 卡密库存 | 直接作为发货源，按 `duration` 匹配 |
| `admin-generate-vouchers` 云函数 | 批量生成卡密 | 管理员提前备货 |
| `user-verify-voucher` 云函数 | 用户验证卡密升级 VIP | 用户拿到卡密后自行兑换，无需改动 |
| `vip_packages` 的 `duration` 字段 | 套餐时长标识 | 作为淘宝 SKU ↔ 卡密的映射桥梁 |

**关键发现**：卡密本来就是"预生成 + 用户自行兑换"模式，自动发货系统只负责把卡密发出去，不涉及 VIP 升级逻辑。

## 二、整体架构

```
淘宝买家付款
    ↓
[定时云函数] taobao-auto-deliver (每1分钟触发)
    ↓
① 调用 TOP API 拉取增量已付款订单
    ↓
② 过滤：虚拟商品 + 未发货 + 未处理过
    ↓
③ 根据 SKU/价格匹配 → 得到 duration（月数）
    ↓
④ 事务锁定一条 unused 卡密（WHERE duration=X AND used=false LIMIT 1）
    ↓
⑤ 调用旺旺消息 API 发送卡密给买家
    ↓
⑥ 发送成功 → 卡密标记 used + 写入 taobao_orders 留存
   发送失败 → 卡密解锁 + 记录失败日志 + 下轮重试
```

## 三、新增数据结构

### 1. 新增集合 `taobao_orders`（订单留存表）

```javascript
{
  _id: "自动生成",
  tid: "淘宝订单号",           // 主键去重用
  buyerNick: "买家旺旺昵称",
  buyerOpenId: "买家openId",   // 发消息需要
  totalFee: "6.00",            // 实付金额
  duration: 1,                 // 对应VIP月数
  skuId: "淘宝SKU ID",
  voucherCode: "VIPXXXXXXXX",  // 发出的卡密
  status: "delivered",         // pending/delivered/failed/retry
  deliveredAt: new Date(),
  createdAt: new Date(),
  retryCount: 0,
  errorMsg: ""                 // 失败原因
}
```

### 2. `vip_vouchers` 集合补充字段（可选）

```javascript
{
  // 现有字段保持不变...
  lockAt: null,        // 卡密锁定时间戳（防并发）
  lockExpire: null,    // 锁定过期时间（超时自动解锁）
  source: "taobao"     // 来源标记（区分淘宝发货 vs 用户兑换）
}
```

### 3. 新增集合 `taobao_sku_mapping`（SKU 映射表）

```javascript
{
  skuId: "淘宝商品SKU ID",
  duration: 1,           // 对应VIP月数
  durationName: "1个月VIP",
  taobaoPrice: 6.00,
  packageId: "对应的vip_packages._id"
}
```

## 四、新增云函数

### 1. `taobao-auto-deliver`（核心，定时触发）

```
触发器：CloudBase 定时触发器，1 分钟间隔
职责：拉单 → 匹配 → 锁卡密 → 发消息 → 留存
```

### 2. `taobao-config`（配置管理）

```
职责：存储 AppKey/AppSecret/session_key（加密）
     提供 SKU 映射的增删改查
     供管理后台调用
```

### 3. `taobao-deliver-logs`（日志查询）

```
职责：查询发货记录、失败重试、库存预警
     供 sam/ 管理页面调用
```

## 五、关键风险

### ⚠️ 风险1：淘宝个人开发者权限限制

| 能力 | 个人开发者 | 企业开发者 |
|------|-----------|-----------|
| `taobao.trades.sold.increment.get` 拉订单 | 需确认 | ✅ |
| 旺旺消息发送 API | ❌ 不支持 | ✅ |

**备选方案**：
- 备选A：淘宝商品设置为"自动发货"虚拟商品 + 卡密直接填在"发货卡密"字段（淘宝原生自动发货）
- 备选B：买家付款后，在订单备注/卖家备注写入卡密（买家需主动查看）
- 备选C：引导买家联系客服，手动发送

### 风险2：并发与重复发货

通过 `tid`（淘宝订单号）做幂等去重：
- 拉到订单后先查 `taobao_orders` 是否已存在该 `tid`
- 已存在且 `status=delivered` 直接跳过
- 卡密锁定用 `update WHERE used=false AND lockAt=null` 的乐观锁

## 六、开发步骤建议

| 步骤 | 内容 | 前置条件 |
|------|------|---------|
| **0** | 去 TOP 控制台确认个人开发者可用的 API（尤其旺旺消息发送） | 无 |
| 1 | TOP 个人认证 + 创建应用 + 店铺授权，拿到 AppKey/AppSecret/session | 步骤0通过 |
| 2 | 淘宝商品配置：为每个 duration 创建对应 SKU | 步骤1完成 |
| 3 | 新建 `taobao_sku_mapping` 集合，录入 SKU 映射 | 步骤2完成 |
| 4 | 管理员提前用 `admin-generate-vouchers` 备货各 duration 卡密 | 现有功能即可 |
| 5 | 开发 `taobao-config` 云函数（存配置） | 步骤1完成 |
| 6 | 开发 `taobao-auto-deliver` 云函数 + 定时触发器 | 步骤3、5完成 |
| 7 | 开发 `sam/taobao-deliver-admin.html` 管理页面 | 步骤6完成 |
| 8 | 联调测试（用测试订单跑通全流程） | 步骤7完成 |

## 七、待确认事项

1. **TOP 个人开发者权限**：个人开发者能否调用"旺旺消息发送"API？
2. **淘宝商品形态**：1 个商品多 SKU 还是每个时长单独商品链接？
3. **卡密备货策略**：手动批量生成还是自动检测库存生成？
4. **失败兜底**：消息发送失败时是否接受降级为订单备注写入？
5. **session 续期**：session_key 到期时是否接受手动重新授权？

## 八、恢复开发条件

当以下条件满足时，可恢复开发：
- [ ] 淘宝开放平台个人开发者权限确认可用，或转为企业认证
- [ ] 确认旺旺消息发送 API 可用，或选定备选方案
- [ ] 淘宝商品已上架并配置好 SKU