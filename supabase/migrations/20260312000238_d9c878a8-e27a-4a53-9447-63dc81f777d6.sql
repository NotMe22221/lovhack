-- Enable leaked password protection via auth config
ALTER TABLE IF EXISTS auth.config SET (security.leaked_password_protection = 'true');