# VIP激活码数据库表结构

## 表名：vip_vouchers

### 字段定义

| 字段名 | 类型 | 说明 | 约束 |
|--------|------|------|------|
| _id | String | 主键，自动生成 | 必填 |
| code | String | 升级码（VIP+8位随机码） | 必填，唯一索引 |
| duration | Number | 时长（月） | 必填 |
| durationName | String | 时长名称（如"1个月"） | 必填 |
| validUntil | Date | 有效期截止时间 | 必填 |
| used | Boolean | 是否已使用 | 必填，默认false |
| usedBy | String | 激活用户ID | 可选 |
| usedAt | Date | 激活时间 | 可选 |
| createdAt | Date | 创建时间 | 必填，默认当前时间 |
| updatedAt | Date | 更新时间 | 必填，默认当前时间 |

### 索引设置

```javascript
// 1. 升级码唯一索引
db.vip_vouchers.createIndex({ "code": 1 }, { unique: true })

// 2. 用户ID索引
db.vip_vouchers.createIndex({ "usedBy": 1 })

// 3. 是否使用索引
db.vip_vouchers.createIndex({ "used": 1 })

// 4. 有效期索引
db.vip_vouchers.createIndex({ "validUntil": 1 })

// 5. 创建时间索引
db.vip_vouchers.createIndex({ "createdAt": -1 })
```

### 数据关系说明

- **vip_vouchers** 表存储所有激活码信息
- 一个激活码只能被一个用户使用（1:1关系）
- 一个用户可以使用多个激活码（1:N关系）
- 通过 `usedBy` 字段关联用户ID

## 初始化脚本

```javascript
// 初始化数据库
db.collection('vip_vouchers').create({
  data: {
    // 集合初始化
  }
})

// 创建索引
db.collection('vip_vouchers').index.create({
  key: { code: 1 },
  name: 'code_1',
  unique: true
})

db.collection('vip_vouchers').index.create({
  key: { usedBy: 1 },
  name: 'usedBy_1'
})

db.collection('vip_vouchers').index.create({
  key: { used: 1 },
  name: 'used_1'
})

db.collection('vip_vouchers').index.create({
  key: { validUntil: 1 },
  name: 'validUntil_1'
})

db.collection('vip_vouchers').index.create({
  key: { createdAt: -1 },
  name: 'createdAt_-1'
})
```

## 数据示例

```json
{
  "_id": "60d5f3a8e4b0a8b9c0d1e2f3",
  "code": "VIP68A8B6C8",
  "duration": 12,
  "durationName": "1年",
  "validUntil": "2027-03-20T24:00:00.000Z",
  "used": false,
  "usedBy": null,
  "usedAt": null,
  "createdAt": "2026-03-20T10:00:00.000Z",
  "updatedAt": "2026-03-20T10:00:00.000Z"
}
```

## 云函数调用说明

### 生成升级码

**云函数**: `user-generate-voucher`

**请求参数**:
```json
{
  "userId": "用户ID",
  "duration": 12,
  "durationName": "1年"
}
```

**返回结果**:
```json
{
  "success": true,
  "code": "VIP68A8B6C8",
  "duration": 12,
  "durationName": "1年",
  "validUntil": "2027-03-20T24:00:00.000Z"
}
```

### 验证升级码

**云函数**: `user-verify-voucher`

**请求参数**:
```json
{
  "userId": "用户ID",
  "code": "VIP68A8B6C8"
}
```

**返回结果**:
```json
{
  "success": true,
  "message": "恭喜，升级成功...",
  "validUntil": "2027-03-20T24:00:00.000Z",
  "duration": 12
}
```

## 管理页面API接口

### 查询升级码列表

**接口**: `/api/voucher/list`

**请求参数**:
```
page: 1
limit: 20
status: all  // all, unused, used
duration: all  // all, 1, 3, 6, 12, 24
```

**返回结果**:
```json
{
  "total": 100,
  "list": [
    {
      "code": "VIP68A8B6C8",
      "status": "未使用",
      "createdAt": "2026-03-20 10:00:00",
      "duration": "1年",
      "usedAt": null,
      "usedBy": null,
      "validFrom": "2026-03-20",
      "validUntil": "2027-03-20"
    }
  ]
}
```

### 激活码管理页面

**页面路径**: `/admin/voucher-manager.html`

**功能**:
- 显示所有激活码列表
- 过滤功能（按状态、时长）
- 分页显示
- 激活码详情查看
- 批量生成激活码
