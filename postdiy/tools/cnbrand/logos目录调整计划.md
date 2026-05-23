# Logos目录结构调整计划

## 当前目录结构
当前logos文件夹下存在以下子目录和文件：
- `/logos/bath/` - 包含沐浴露品牌logo
- `/logos/cosmetics/` - 包含化妆品品牌logo
- `/logos/shampoo/` - 包含洗发水品牌logo
- `/logos/skincare/` - 包含护肤品品牌logo
- 以及其他子目录（如milk、foodstuff等）
- mayinglongbabao.jpg（直接位于logos根目录）

## 目标目录结构
调整后，所有logo图片将直接存放在logos根目录下，不再使用子目录进行分类：
- `/logos/` - 包含所有品牌logo图片

## 已完成的修改
1. **文件引用更新**：已修改`brandData.js`中的所有logo路径，将所有`logos/子目录/图片名.png`格式的路径修改为`logos/图片名.png`格式。
2. **JSON格式验证**：已验证修改后的`brandData.js`文件JSON格式正确无误。

## 需要执行的文件移动操作

### 1. 准备工作
- 在执行文件移动前，建议先备份logos目录，以防数据丢失。
- 检查是否有重名文件，确保移动过程中不会发生文件覆盖。

### 2. 文件移动命令（Windows PowerShell）
以下是将各个子目录中的图片文件移动到logos根目录的PowerShell命令：

```powershell
# 进入cnbrand目录
cd C:\Users\ThinkPad\Documents\GitHub\minigames\cnbrand

# 移动bath子目录中的图片
Move-Item -Path .\logos\bath\*.png -Destination .\logos\

# 移动cosmetics子目录中的图片
Move-Item -Path .\logos\cosmetics\*.png -Destination .\logos\

# 移动shampoo子目录中的图片
Move-Item -Path .\logos\shampoo\*.png -Destination .\logos\

# 移动skincare子目录中的图片
Move-Item -Path .\logos\skincare\*.png -Destination .\logos\

# 移动其他子目录中的图片（根据实际情况添加）
# Move-Item -Path .\logos\子目录名\*.png -Destination .\logos\
```

### 3. 清理空目录
移动完成后，可以删除空的子目录：

```powershell
# 删除空目录
Remove-Item -Path .\logos\bath, .\logos\cosmetics, .\logos\shampoo, .\logos\skincare -Recurse -Force -ErrorAction SilentlyContinue
```

## 验证步骤
完成文件移动后，请执行以下验证：

1. 访问网站，检查所有品牌logo是否正常显示。
2. 确认没有引用错误或404错误。
3. 运行JSON验证命令，确保`brandData.js`格式正确：
   ```
   node -e "try { require('./js/brandData.js'); console.log('JSON格式正确'); } catch (e) { console.error('JSON格式错误:', e.message); }"
   ```

## 注意事项
1. **文件命名冲突**：如果不同子目录中存在同名文件，请在移动前重命名，避免文件覆盖。
2. **备份**：执行操作前务必备份原始文件。
3. **权限**：确保当前用户有足够权限进行文件移动操作。
4. **验证**：移动完成后，一定要进行全面的功能测试，确保所有logo能正确显示。