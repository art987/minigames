-- 创建短信使用量统计表
CREATE TABLE IF NOT EXISTS sms_usage (
  id SERIAL PRIMARY KEY,
  provider VARCHAR(50) NOT NULL,
  month VARCHAR(7) NOT NULL, -- YYYY-MM格式
  used_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- 创建唯一索引，确保每月每个服务商只有一条记录
CREATE UNIQUE INDEX IF NOT EXISTS idx_sms_usage_provider_month 
ON sms_usage (provider, month);

-- 创建索引优化查询性能
CREATE INDEX IF NOT EXISTS idx_sms_usage_month 
ON sms_usage (month);

-- 启用行级安全
ALTER TABLE sms_usage ENABLE ROW LEVEL SECURITY;

-- 创建策略：允许所有用户读取（用于统计）
CREATE POLICY "允许读取短信使用统计" ON sms_usage
  FOR SELECT USING (true);

-- 创建策略：只允许服务端插入和更新
CREATE POLICY "允许服务端管理短信使用量" ON sms_usage
  FOR ALL USING (auth.role() = 'service_role');