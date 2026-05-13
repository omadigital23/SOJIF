-- =============================================
-- SOJIF Consulting - Base de Données Complète
-- PostgreSQL / Supabase
-- =============================================

-- Extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- =============================================
-- 1. UTILISATEURS
-- =============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  role TEXT DEFAULT 'client' CHECK (role IN ('client', 'candidate', 'admin', 'super_admin')),
  avatar_url TEXT,
  is_active BOOLEAN DEFAULT true,
  email_verified BOOLEAN DEFAULT false,
  last_login_at TIMESTAMPTZ,
  login_count INTEGER DEFAULT 0,
  preferred_locale TEXT DEFAULT 'fr' CHECK (preferred_locale IN ('fr', 'en')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  deleted_at TIMESTAMPTZ
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
CREATE INDEX idx_users_active ON users(is_active);

-- =============================================
-- 2. DÉPARTEMENTS
-- =============================================
CREATE TABLE IF NOT EXISTS departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT UNIQUE NOT NULL CHECK (slug IN ('droit', 'fiscalite', 'rh', 'conseil', 'digitalisation', 'recrutement')),
  icon TEXT NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  mission TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS department_services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_dept_services_dept ON department_services(department_id);

CREATE TABLE IF NOT EXISTS department_pricing (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS department_cases (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 3. ABONNEMENTS (Packs)
-- =============================================
CREATE TABLE IF NOT EXISTS pricing_packs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL CHECK (slug IN ('essentiel', 'croissance', 'prestige')),
  price INTEGER NOT NULL,
  currency TEXT DEFAULT 'XOF',
  period TEXT DEFAULT '/an',
  description TEXT,
  highlighted BOOLEAN DEFAULT false,
  cta_label TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS pricing_features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  pack_id UUID NOT NULL REFERENCES pricing_packs(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS comparison_features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  feature TEXT NOT NULL,
  essentiel TEXT,
  croissance TEXT,
  prestige TEXT,
  sort_order INTEGER DEFAULT 0
);

CREATE TABLE IF NOT EXISTS subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  pack_id UUID REFERENCES pricing_packs(id),
  pack_name TEXT NOT NULL CHECK (pack_name IN ('essentiel', 'croissance', 'prestige')),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'expired', 'cancelled', 'suspended')),
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'XOF',
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  auto_renew BOOLEAN DEFAULT true,
  cancelled_at TIMESTAMPTZ,
  cancellation_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_subscriptions_user ON subscriptions(user_id);
CREATE INDEX idx_subscriptions_status ON subscriptions(status);
CREATE INDEX idx_subscriptions_pack ON subscriptions(pack_id);

-- =============================================
-- 4. PAIEMENTS
-- =============================================
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  subscription_id UUID REFERENCES subscriptions(id),
  amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'XOF',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed', 'refunded', 'cancelled')),
  provider TEXT DEFAULT 'flutterwave' CHECK (provider IN ('flutterwave', 'orange_money', 'wave', 'free_money', 'manual')),
  provider_ref TEXT,
  provider_response JSONB,
  customer_email TEXT,
  customer_name TEXT,
  customer_phone TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_payments_user ON payments(user_id);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_provider_ref ON payments(provider_ref);

-- =============================================
-- 5. FACTURES
-- =============================================
CREATE TABLE IF NOT EXISTS invoices (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  payment_id UUID REFERENCES payments(id),
  subscription_id UUID REFERENCES subscriptions(id),
  invoice_number TEXT UNIQUE NOT NULL,
  amount INTEGER NOT NULL,
  tax_amount INTEGER DEFAULT 0,
  total_amount INTEGER NOT NULL,
  currency TEXT DEFAULT 'XOF',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')),
  pdf_url TEXT,
  notes TEXT,
  issued_at TIMESTAMPTZ DEFAULT NOW(),
  due_at TIMESTAMPTZ,
  paid_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_invoices_user ON invoices(user_id);
CREATE INDEX idx_invoices_number ON invoices(invoice_number);
CREATE INDEX idx_invoices_status ON invoices(status);

-- =============================================
-- 6. MESSAGES DE CONTACT
-- =============================================
CREATE TABLE IF NOT EXISTS contact_messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  subject TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'read', 'replied', 'archived', 'spam')),
  assigned_to UUID REFERENCES users(id),
  reply_message TEXT,
  replied_at TIMESTAMPTZ,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_contact_status ON contact_messages(status);
CREATE INDEX idx_contact_email ON contact_messages(email);

-- =============================================
-- 7. NEWSLETTER
-- =============================================
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT UNIQUE NOT NULL,
  first_name TEXT,
  last_name TEXT,
  source TEXT DEFAULT 'website' CHECK (source IN ('website', 'footer', 'resources', 'popup', 'import')),
  is_active BOOLEAN DEFAULT true,
  subscribed_at TIMESTAMPTZ DEFAULT NOW(),
  unsubscribed_at TIMESTAMPTZ,
  ip_address INET
);

CREATE INDEX idx_newsletter_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_active ON newsletter_subscribers(is_active);

-- =============================================
-- 8. DOCUMENTS
-- =============================================
CREATE TABLE IF NOT EXISTS documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('invoice', 'contract', 'report', 'cv', 'cover_letter', 'certificate', 'other')),
  name TEXT NOT NULL,
  file_url TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  description TEXT,
  is_public BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_documents_user ON documents(user_id);
CREATE INDEX idx_documents_type ON documents(type);

-- =============================================
-- 9. RENDEZ-VOUS
-- =============================================
CREATE TABLE IF NOT EXISTS appointments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  department TEXT,
  service_type TEXT,
  preferred_date TIMESTAMPTZ,
  alternate_date TIMESTAMPTZ,
  duration_minutes INTEGER DEFAULT 60,
  notes TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'no_show')),
  meeting_link TEXT,
  reminder_sent BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_appointments_status ON appointments(status);
CREATE INDEX idx_appointments_date ON appointments(preferred_date);

-- =============================================
-- 10. PROJETS (Digitalisation)
-- =============================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT CHECK (type IN ('website', 'ecommerce', 'webapp', 'mobile', 'crm', 'branding')),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'in_progress', 'review', 'completed', 'cancelled', 'on_hold')),
  budget INTEGER,
  currency TEXT DEFAULT 'XOF',
  progress_percent INTEGER DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_projects_user ON projects(user_id);
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_type ON projects(type);

CREATE TABLE IF NOT EXISTS project_milestones (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS project_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  project_type TEXT NOT NULL CHECK (project_type IN ('website', 'ecommerce', 'webapp', 'mobile', 'crm', 'branding')),
  description TEXT NOT NULL,
  budget TEXT,
  timeline TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'quoted', 'accepted', 'rejected')),
  assigned_to UUID REFERENCES users(id),
  quoted_amount INTEGER,
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_project_requests_status ON project_requests(status);

-- =============================================
-- 11. SERVICES DIGITAUX
-- =============================================
CREATE TABLE IF NOT EXISTS digital_services (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  icon TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS digital_service_features (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  service_id UUID NOT NULL REFERENCES digital_services(id) ON DELETE CASCADE,
  label TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0
);

-- =============================================
-- 12. CANDIDATS & RECRUTEMENT
-- =============================================
CREATE TABLE IF NOT EXISTS candidates (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'validated', 'rejected', 'placed', 'inactive')),
  validated_at TIMESTAMPTZ,
  rejection_reason TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_candidates_user ON candidates(user_id);
CREATE INDEX idx_candidates_status ON candidates(status);

CREATE TABLE IF NOT EXISTS candidate_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
  skills TEXT[],
  experience_years INTEGER,
  education TEXT,
  education_level TEXT CHECK (education_level IN ('bac', 'bac+2', 'bac+3', 'bac+4', 'bac+5', 'doctorat', 'other')),
  current_position TEXT,
  desired_position TEXT,
  desired_salary TEXT,
  current_salary TEXT,
  location TEXT,
  availability TEXT CHECK (availability IN ('immediate', '1_month', '2_months', '3_months', 'negotiable')),
  contract_type TEXT CHECK (contract_type IN ('cdi', 'cdd', 'interim', 'freelance', 'stage', 'any')),
  bio TEXT,
  linkedin_url TEXT,
  portfolio_url TEXT,
  languages TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_candidate_profiles_candidate ON candidate_profiles(candidate_id);

CREATE TABLE IF NOT EXISTS candidate_documents (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
  type TEXT DEFAULT 'cv' CHECK (type IN ('cv', 'cover_letter', 'certificate', 'diploma', 'reference', 'other')),
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT DEFAULT 'application/pdf',
  uploaded_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_candidate_docs_candidate ON candidate_documents(candidate_id);

CREATE TABLE IF NOT EXISTS recruitment_requests (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name TEXT NOT NULL,
  contact_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  position_title TEXT NOT NULL,
  department TEXT,
  description TEXT NOT NULL,
  requirements TEXT,
  salary TEXT,
  salary_min INTEGER,
  salary_max INTEGER,
  location TEXT,
  contract_type TEXT CHECK (contract_type IN ('cdi', 'cdd', 'interim', 'freelance', 'stage')),
  experience_required TEXT,
  positions_count INTEGER DEFAULT 1,
  urgency TEXT DEFAULT 'medium' CHECK (urgency IN ('low', 'medium', 'high', 'critical')),
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'reviewing', 'sourcing', 'shortlisted', 'placed', 'closed', 'cancelled')),
  assigned_to UUID REFERENCES users(id),
  deadline TIMESTAMPTZ,
  ip_address INET,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_recruitment_status ON recruitment_requests(status);
CREATE INDEX idx_recruitment_urgency ON recruitment_requests(urgency);

CREATE TABLE IF NOT EXISTS placements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  candidate_id UUID NOT NULL REFERENCES candidates(id),
  recruitment_request_id UUID NOT NULL REFERENCES recruitment_requests(id),
  status TEXT DEFAULT 'placed' CHECK (status IN ('placed', 'probation', 'confirmed', 'ended', 'cancelled')),
  start_date TIMESTAMPTZ,
  end_date TIMESTAMPTZ,
  salary INTEGER,
  commission_amount INTEGER,
  notes TEXT,
  feedback_candidate TEXT,
  feedback_company TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_placements_candidate ON placements(candidate_id);
CREATE INDEX idx_placements_request ON placements(recruitment_request_id);

-- =============================================
-- 13. TÉMOIGNAGES
-- =============================================
CREATE TABLE IF NOT EXISTS testimonials (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  role TEXT NOT NULL,
  company TEXT NOT NULL,
  content TEXT NOT NULL,
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  avatar_url TEXT,
  is_featured BOOLEAN DEFAULT false,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 14. BLOG / RESSOURCES
-- =============================================
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  category_id UUID REFERENCES blog_categories(id) ON DELETE SET NULL,
  author_id UUID REFERENCES users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  excerpt TEXT,
  content TEXT NOT NULL,
  cover_image_url TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'archived')),
  is_featured BOOLEAN DEFAULT false,
  tags TEXT[],
  read_time_minutes INTEGER,
  views_count INTEGER DEFAULT 0,
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_category ON blog_posts(category_id);
CREATE INDEX idx_blog_posts_published ON blog_posts(published_at);

-- =============================================
-- 15. NOTIFICATIONS
-- =============================================
CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  type TEXT NOT NULL CHECK (type IN ('info', 'success', 'warning', 'error', 'payment', 'appointment', 'recruitment', 'project')),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  link TEXT,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(is_read);

-- =============================================
-- 16. JOURNAL D'AUDIT
-- =============================================
CREATE TABLE IF NOT EXISTS audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  old_values JSONB,
  new_values JSONB,
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_audit_user ON audit_logs(user_id);
CREATE INDEX idx_audit_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_action ON audit_logs(action);
CREATE INDEX idx_audit_created ON audit_logs(created_at);

-- =============================================
-- 17. PARAMÈTRES SYSTÈME
-- =============================================
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  key TEXT UNIQUE NOT NULL,
  value JSONB NOT NULL,
  description TEXT,
  updated_by UUID REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 18. EMAILS ENVOYÉS (Historique)
-- =============================================
CREATE TABLE IF NOT EXISTS sent_emails (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  recipient_email TEXT NOT NULL,
  recipient_name TEXT,
  subject TEXT NOT NULL,
  template TEXT,
  status TEXT DEFAULT 'sent' CHECK (status IN ('pending', 'sent', 'delivered', 'bounced', 'failed')),
  provider TEXT DEFAULT 'resend',
  provider_id TEXT,
  metadata JSONB,
  sent_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_emails_recipient ON sent_emails(recipient_email);

-- =============================================
-- 19. FAQ
-- =============================================
CREATE TABLE IF NOT EXISTS faq (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  category TEXT,
  sort_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidates ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE candidate_documents ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Users own data
CREATE POLICY "Users can read own data" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own data" ON users FOR UPDATE USING (auth.uid() = id);

-- Admins full access on users
CREATE POLICY "Admins full access on users" ON users FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

-- Subscriptions
CREATE POLICY "Users can read own subscriptions" ON subscriptions FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins manage subscriptions" ON subscriptions FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'super_admin'))
);

-- Payments
CREATE POLICY "Users can read own payments" ON payments FOR SELECT USING (auth.uid() = user_id);

-- Invoices
CREATE POLICY "Users can read own invoices" ON invoices FOR SELECT USING (auth.uid() = user_id);

-- Documents
CREATE POLICY "Users can read own documents" ON documents FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own documents" ON documents FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Candidates
CREATE POLICY "Candidates can read own data" ON candidates FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Candidates can read own profile" ON candidate_profiles FOR SELECT USING (
  candidate_id IN (SELECT id FROM candidates WHERE user_id = auth.uid())
);
CREATE POLICY "Candidates can update own profile" ON candidate_profiles FOR UPDATE USING (
  candidate_id IN (SELECT id FROM candidates WHERE user_id = auth.uid())
);
CREATE POLICY "Candidates can read own docs" ON candidate_documents FOR SELECT USING (
  candidate_id IN (SELECT id FROM candidates WHERE user_id = auth.uid())
);
CREATE POLICY "Candidates can insert own docs" ON candidate_documents FOR INSERT WITH CHECK (
  candidate_id IN (SELECT id FROM candidates WHERE user_id = auth.uid())
);

-- Notifications
CREATE POLICY "Users can read own notifications" ON notifications FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (auth.uid() = user_id);

-- Projects
CREATE POLICY "Users can read own projects" ON projects FOR SELECT USING (auth.uid() = user_id);

-- Public read for content tables
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read departments" ON departments FOR SELECT USING (true);
ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read testimonials" ON testimonials FOR SELECT USING (is_active = true);
ALTER TABLE pricing_packs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read pricing" ON pricing_packs FOR SELECT USING (is_active = true);
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read published posts" ON blog_posts FOR SELECT USING (status = 'published');
ALTER TABLE faq ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public read faq" ON faq FOR SELECT USING (is_active = true);

-- =============================================
-- TRIGGER : updated_at automatique
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Appliquer le trigger à toutes les tables avec updated_at
CREATE TRIGGER set_updated_at_users BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_departments BEFORE UPDATE ON departments FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_subscriptions BEFORE UPDATE ON subscriptions FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_payments BEFORE UPDATE ON payments FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_appointments BEFORE UPDATE ON appointments FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_projects BEFORE UPDATE ON projects FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_project_requests BEFORE UPDATE ON project_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_candidates BEFORE UPDATE ON candidates FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_candidate_profiles BEFORE UPDATE ON candidate_profiles FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_recruitment_requests BEFORE UPDATE ON recruitment_requests FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_placements BEFORE UPDATE ON placements FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_pricing_packs BEFORE UPDATE ON pricing_packs FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_digital_services BEFORE UPDATE ON digital_services FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_blog_posts BEFORE UPDATE ON blog_posts FOR EACH ROW EXECUTE FUNCTION update_updated_at();
CREATE TRIGGER set_updated_at_settings BEFORE UPDATE ON settings FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- =============================================
-- TRIGGER : Numéro de facture auto
-- =============================================
CREATE OR REPLACE FUNCTION generate_invoice_number()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.invoice_number IS NULL OR NEW.invoice_number = '' THEN
    NEW.invoice_number = 'SOJIF-' || TO_CHAR(NOW(), 'YYYYMM') || '-' || LPAD(NEXTVAL('invoice_seq')::TEXT, 5, '0');
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE SEQUENCE IF NOT EXISTS invoice_seq START 1;
CREATE TRIGGER auto_invoice_number BEFORE INSERT ON invoices FOR EACH ROW EXECUTE FUNCTION generate_invoice_number();

-- =============================================
-- DONNÉES DE SEED : Départements
-- =============================================
INSERT INTO departments (slug, icon, title, subtitle, description, mission, sort_order) VALUES
('droit', 'Scale', 'Droit des Affaires', 'Sécurisez vos opérations juridiques', 'Notre département juridique accompagne les entreprises dans toutes leurs problématiques de droit des affaires.', 'Fournir un cadre juridique solide pour sécuriser chaque étape de la vie de votre entreprise.', 1),
('fiscalite', 'Calculator', 'Fiscalité & Comptabilité', 'Optimisez votre performance financière', 'Notre expertise fiscale et comptable vous permet de maîtriser vos obligations et optimiser votre charge fiscale.', 'Garantir la conformité fiscale tout en identifiant les leviers d''optimisation financière.', 2),
('rh', 'Users', 'Ressources Humaines', 'Valorisez votre capital humain', 'Nous accompagnons les entreprises dans la gestion stratégique de leurs ressources humaines.', 'Transformer la gestion RH en levier de performance.', 3),
('conseil', 'TrendingUp', 'Conseil Stratégique & Performance', 'Accélérez votre croissance', 'Nous accompagnons les dirigeants dans leurs décisions stratégiques et la transformation de leur entreprise.', 'Être le partenaire stratégique qui éclaire les décisions et structure la croissance.', 4),
('digitalisation', 'Monitor', 'Digitalisation & Solutions Tech', 'Transformez votre activité par le digital', 'Nous concevons et déployons des solutions digitales sur mesure pour moderniser votre activité.', 'Accompagner la transformation digitale des entreprises africaines.', 5),
('recrutement', 'UserPlus', 'Recrutement & Placement', 'Trouvez les talents qu''il vous faut', 'Notre service de recrutement vous connecte avec les meilleurs talents du marché.', 'Identifier, évaluer et placer les talents les plus adaptés.', 6)
ON CONFLICT (slug) DO NOTHING;

-- =============================================
-- DONNEES DE SEED : Temoignages
-- =============================================
INSERT INTO testimonials (name, role, company, content, rating, is_featured) VALUES
('Amadou Diallo', 'Directeur Général', 'Diallo Industries SA', 'SOJIF Consulting a transformé notre approche de la gestion d''entreprise. Un partenaire de confiance, indispensable.', 5, true),
('Mariama Sow', 'Fondatrice & CEO', 'TechSen Solutions', 'L''accompagnement de SOJIF dans notre levée de fonds a été décisif. Nous avons levé 500M FCFA en un temps record.', 5, true),
('Ibrahima Ndiaye', 'Directeur Financier', 'Ndiaye & Fils SARL', 'Grâce à l''optimisation fiscale menée par SOJIF, nous avons réduit notre charge de 30%.', 5, false),
('Aïssatou Ba', 'DRH', 'Banque de l''Afrique de l''Ouest', 'Le département RH de SOJIF a repensé toute notre politique de rémunération et gestion des talents.', 4, false),
('Moussa Camara', 'Fondateur', 'AgriTech Sahel', 'De la digitalisation de nos processus à la création de notre plateforme e-commerce, SOJIF a été exceptionnel.', 5, true);

-- =============================================
-- DONNÉES DE SEED : Services Digitaux
-- =============================================
INSERT INTO digital_services (icon, title, description, sort_order) VALUES
('Globe', 'Sites Vitrines & Institutionnels', 'Des sites web modernes et performants qui reflètent l''excellence de votre entreprise.', 1),
('ShoppingCart', 'E-commerce', 'Des plateformes de vente en ligne complètes, intégrant les solutions de paiement africaines.', 2),
('Layout', 'Applications Web', 'Des applications métier sur mesure pour digitaliser et automatiser vos processus.', 3),
('Smartphone', 'Applications Mobiles', 'Des applications iOS et Android natives ou cross-platform.', 4),
('Settings', 'CRM & Automatisation', 'Des outils de gestion de la relation client et d''automatisation.', 5),
('Palette', 'Branding & Identité Digitale', 'Une identité visuelle forte et cohérente sur tous vos supports digitaux.', 6);

-- =============================================
-- DONNÉES DE SEED : Comparaison des packs
-- =============================================
INSERT INTO comparison_features (feature, essentiel, croissance, prestige, sort_order) VALUES
('Gestion comptable', 'CA < 50M', 'CA < 150M', 'Illimité', 1),
('Juridique', '1 modif/an', '2 modifs + 2 contrats', 'Secrétariat complet', 2),
('Fiscalité', 'Conseil email', 'Audit préventif', 'Optimisation & Défense', 3),
('Ressources Humaines', 'Contrats types (5 emp.)', 'Paie (15 emp.)', 'Paie illimitée + Recrutement', 4),
('Assistance', 'Tel (3 appels/mois)', 'Réunion trimestrielle', 'Consultant dédié 24/7', 5),
('Propriété Intellectuelle', NULL, NULL, 'Inclus', 6),
('Audit Social', NULL, NULL, 'Inclus', 7);

-- =============================================
-- DONNÉES DE SEED : Paramètres système
-- =============================================
INSERT INTO settings (key, value, description) VALUES
('company_info', '{"name": "SOJIF Consulting", "signature": "Droit • Finance • Développement", "tagline": "Cabinet de Structuration & Performance des Entreprises", "email": "contact@sojifconsulting.com", "phone": "+221711615476", "whatsapp": "221711615476", "address": "Dakar, Sénégal", "website": "www.sojifconsulting.com", "director": "Fatou Guewel MBAYE", "directorTitle": "Directrice Générale"}', 'Informations générales de l''entreprise'),
('payment_config', '{"provider": "flutterwave", "currency": "XOF", "test_mode": true}', 'Configuration du paiement'),
('email_config', '{"provider": "resend", "from_name": "SOJIF Consulting", "from_email": "noreply@sojifconsulting.com"}', 'Configuration des emails')
ON CONFLICT (key) DO NOTHING;

-- =============================================
-- DONNÉES DE SEED : Catégories blog
-- =============================================
INSERT INTO blog_categories (name, slug, description, sort_order) VALUES
('Droit des Affaires', 'droit-affaires', 'Articles sur le droit des affaires OHADA et UEMOA', 1),
('Fiscalité', 'fiscalite', 'Conseils et actualités fiscales au Sénégal', 2),
('Ressources Humaines', 'rh', 'Bonnes pratiques RH et gestion des talents', 3),
('Digitalisation', 'digitalisation', 'Transformation digitale des entreprises africaines', 4),
('Recrutement', 'recrutement', 'Conseils recrutement et marché de l''emploi', 5),
('Actualités SOJIF', 'actualites', 'Nouvelles et événements de SOJIF Consulting', 6)
ON CONFLICT (slug) DO NOTHING;

-- =============================================
-- DONNÉES DE SEED : FAQ
-- =============================================
INSERT INTO faq (question, answer, category, sort_order) VALUES
('Quels sont les délais pour créer une entreprise au Sénégal ?', 'La création d''une entreprise au Sénégal peut être finalisée en 5 à 10 jours ouvrés avec SOJIF Consulting, incluant toutes les formalités administratives et juridiques.', 'general', 1),
('Comment fonctionne le système d''abonnement ?', 'Nous proposons 3 packs (Essentiel, Croissance, Prestige) adaptés à la taille de votre entreprise. Chaque pack inclut un ensemble de services juridiques, fiscaux et RH. Le paiement se fait annuellement en FCFA.', 'pricing', 2),
('Comment postuler en tant que candidat ?', 'Rendez-vous sur notre page Recrutement, remplissez le formulaire candidat et téléchargez votre CV au format PDF. Notre équipe vous contactera dans les 48h ouvrées.', 'recruitment', 3),
('Quels modes de paiement acceptez-vous ?', 'Nous acceptons les paiements via Flutterwave (cartes bancaires), Orange Money, Wave et Free Money. Tous les montants sont en FCFA (XOF).', 'pricing', 4),
('Puis-je changer de pack en cours d''année ?', 'Oui, vous pouvez upgrader votre pack à tout moment. La différence sera calculée au prorata des mois restants. Le downgrade est possible à la fin de la période en cours.', 'pricing', 5);

-- =============================================
-- FIN DU SCHÉMA COMPLET
-- =============================================
