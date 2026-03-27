-- ==========================================
-- SOJIF Consulting - RLS (Row Level Security) Policies
-- ==========================================
-- These are the recommended RLS policies to add to your Supabase schema.sql
-- Make sure to enable RLS on all tables and apply these policies.

-- ========== USERS TABLE ==========
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Users can only read their own profile
CREATE POLICY "Users can read own profile"
  ON users
  FOR SELECT
  USING (auth.uid() = id);

-- Users can update their own profile
CREATE POLICY "Users can update own profile"
  ON users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Service role can read all users (for admin operations)
CREATE POLICY "Service role can read all users"
  ON users
  FOR SELECT
  USING (current_setting('role') = 'postgres');

-- ========== PAYMENTS TABLE ==========
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;

-- Users can read their own payments
CREATE POLICY "Users can read own payments"
  ON payments
  FOR SELECT
  USING (
    auth.uid() = user_id OR
    current_setting('role') = 'postgres'
  );

-- Service role can manage all payments (for webhook processing)
CREATE POLICY "Service role can manage payments"
  ON payments
  FOR ALL
  USING (current_setting('role') = 'postgres')
  WITH CHECK (current_setting('role') = 'postgres');

-- ========== CONTACT_MESSAGES TABLE ==========
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Service role can read and manage contact messages
CREATE POLICY "Service role can manage contact messages"
  ON contact_messages
  FOR ALL
  USING (current_setting('role') = 'postgres')
  WITH CHECK (current_setting('role') = 'postgres');

-- Anyone can insert (for contact form)
CREATE POLICY "Anyone can insert contact messages"
  ON contact_messages
  FOR INSERT
  WITH CHECK (true);

-- ========== CANDIDATES TABLE (if exists) ==========
-- ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;

-- Candidates can read their own profile
-- CREATE POLICY "Candidates can read own profile"
--   ON candidates
--   FOR SELECT
--   USING (auth.uid() = user_id);

-- Candidates can update their own profile
-- CREATE POLICY "Candidates can update own profile"
--   ON candidates
--   FOR UPDATE
--   USING (auth.uid() = user_id)
--   WITH CHECK (auth.uid() = user_id);

-- Service role can manage all candidates
-- CREATE POLICY "Service role can manage candidates"
--   ON candidates
--   FOR ALL
--   USING (current_setting('role') = 'postgres')
--   WITH CHECK (current_setting('role') = 'postgres');

-- ========== NEWSLETTER_SUBSCRIBERS TABLE (if exists) ==========
-- ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Anyone can subscribe
-- CREATE POLICY "Anyone can subscribe to newsletter"
--   ON newsletter_subscribers
--   FOR INSERT
--   WITH CHECK (true);

-- Subscribers can read their own subscription
-- CREATE POLICY "Subscribers can read own subscription"
--   ON newsletter_subscribers
--   FOR SELECT
--   USING (email = current_user_email);

-- Service role can manage all subscriptions
-- CREATE POLICY "Service role can manage subscriptions"
--   ON newsletter_subscribers
--   FOR ALL
--   USING (current_setting('role') = 'postgres')
--   WITH CHECK (current_setting('role') = 'postgres');

-- ==========================================
-- IMPORTANT SECURITY NOTES
-- ==========================================
-- 1. Ensure all tables have RLS enabled
-- 2. Use service role keys only in backend APIs
-- 3. Use anonymous keys in frontend (with RLS restrictions)
-- 4. Test all policies before deploying
-- 5. Monitor Supabase logs for any denied access attempts
-- 6. Never use SERVICE_ROLE_KEY on the client side
-- 7. Rotate API keys regularly
