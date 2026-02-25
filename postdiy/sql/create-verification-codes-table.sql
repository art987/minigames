-- 创建验证码存储表
CREATE TABLE IF NOT EXISTS verification_codes (
  id SERIAL PRIMARY KEY,
  identifier VARCHAR(255) NOT NULL, -- 手机号或邮箱
  code VARCHAR(10) NOT NULL, -- 验证码
  expires_at TIMESTAMP NOT NULL, -- 过期时间
  created_at TIMESTAMP DEFAULT now(),
  used BOOLEAN DEFAULT false -- 是否已使用
);

-- 创建索引优化查询性能
CREATE INDEX IF NOT EXISTS idx_verification_codes_identifier 
ON verification_codes (identifier);

CREATE INDEX IF NOT EXISTS idx_verification_codes_expires 
ON verification_codes (expires_at);

-- 创建唯一索引，确保同一标识符只有一个有效验证码
CREATE UNIQUE INDEX IF NOT EXISTS idx_verification_codes_unique 
ON verification_codes (identifier) 
WHERE expires_at > now() AND used = false;

-- 启用行级安全
ALTER TABLE verification_codes ENABLE ROW LEVEL SECURITY;

-- 创建策略：允许所有用户插入（用于存储验证码）
CREATE POLICY "允许插入验证码" ON verification_codes
  FOR INSERT WITH CHECK (true);

-- 创建策略：允许服务端读取和更新验证码
CREATE POLICY "允许服务端管理验证码" ON verification_codes
  FOR ALL USING (auth.role() = 'service_role');

-- 创建定时清理过期验证码的函数（可选）
CREATE OR REPLACE FUNCTION cleanup_expired_codes()
RETURNS void AS $$
BEGIN
  DELETE FROM verification_codes WHERE expires_at < now();
END;
$$ LANGUAGE plpgsql;