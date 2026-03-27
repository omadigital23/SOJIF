const { Client } = require('pg');

const run = async () => {
    // encode the password correctly
    const client = new Client({
        connectionString: 'postgresql://postgres:SOJIFOUNTE23%3F@db.mhwjvyswjsaiidctihwx.supabase.co:5432/postgres'
    });

    try {
        await client.connect();
        
        console.log('Connected to Supabase PostgreSQL!');

        // Run the schema exactly as provided
        const schema = `
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE IF NOT EXISTS public.appointments (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid,
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  department text,
  service_type text,
  preferred_date timestamp with time zone,
  alternate_date timestamp with time zone,
  duration_minutes integer DEFAULT 60,
  notes text,
  status text DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'confirmed'::text, 'completed'::text, 'cancelled'::text, 'no_show'::text])),
  meeting_link text,
  reminder_sent boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT appointments_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.audit_logs (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid,
  action text NOT NULL,
  entity_type text NOT NULL,
  entity_id uuid,
  old_values jsonb,
  new_values jsonb,
  ip_address inet,
  user_agent text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT audit_logs_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.blog_categories (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  description text,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT blog_categories_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.blog_posts (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  category_id uuid,
  author_id uuid,
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  excerpt text,
  content text NOT NULL,
  cover_image_url text,
  status text DEFAULT 'draft'::text CHECK (status = ANY (ARRAY['draft'::text, 'published'::text, 'archived'::text])),
  is_featured boolean DEFAULT false,
  tags text[],
  read_time_minutes integer,
  views_count integer DEFAULT 0,
  published_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT blog_posts_pkey PRIMARY KEY (id),
  CONSTRAINT blog_posts_category_id_fkey FOREIGN KEY (category_id) REFERENCES public.blog_categories(id)
);

CREATE TABLE IF NOT EXISTS public.candidates (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid,
  status text DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'validated'::text, 'rejected'::text, 'placed'::text, 'inactive'::text])),
  validated_at timestamp with time zone,
  rejection_reason text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT candidates_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.candidate_documents (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  candidate_id uuid NOT NULL,
  type text DEFAULT 'cv'::text CHECK (type = ANY (ARRAY['cv'::text, 'cover_letter'::text, 'certificate'::text, 'diploma'::text, 'reference'::text, 'other'::text])),
  file_url text NOT NULL,
  file_name text NOT NULL,
  file_size integer,
  mime_type text DEFAULT 'application/pdf'::text,
  uploaded_at timestamp with time zone DEFAULT now(),
  CONSTRAINT candidate_documents_pkey PRIMARY KEY (id),
  CONSTRAINT candidate_documents_candidate_id_fkey FOREIGN KEY (candidate_id) REFERENCES public.candidates(id)
);

CREATE TABLE IF NOT EXISTS public.candidate_profiles (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  candidate_id uuid NOT NULL,
  skills text[],
  experience_years integer,
  education text,
  education_level text CHECK (education_level = ANY (ARRAY['bac'::text, 'bac+2'::text, 'bac+3'::text, 'bac+4'::text, 'bac+5'::text, 'doctorat'::text, 'other'::text])),
  current_position text,
  desired_position text,
  desired_salary text,
  current_salary text,
  location text,
  availability text CHECK (availability = ANY (ARRAY['immediate'::text, '1_month'::text, '2_months'::text, '3_months'::text, 'negotiable'::text])),
  contract_type text CHECK (contract_type = ANY (ARRAY['cdi'::text, 'cdd'::text, 'interim'::text, 'freelance'::text, 'stage'::text, 'any'::text])),
  bio text,
  linkedin_url text,
  portfolio_url text,
  languages text[],
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT candidate_profiles_pkey PRIMARY KEY (id),
  CONSTRAINT candidate_profiles_candidate_id_fkey FOREIGN KEY (candidate_id) REFERENCES public.candidates(id)
);

CREATE TABLE IF NOT EXISTS public.comparison_features (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  feature text NOT NULL,
  essentiel text,
  croissance text,
  prestige text,
  sort_order integer DEFAULT 0,
  CONSTRAINT comparison_features_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.contact_messages (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  phone text,
  company text,
  subject text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new'::text CHECK (status = ANY (ARRAY['new'::text, 'read'::text, 'replied'::text, 'archived'::text, 'spam'::text])),
  assigned_to uuid,
  reply_message text,
  replied_at timestamp with time zone,
  ip_address inet,
  user_agent text,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT contact_messages_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.departments (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  slug text NOT NULL UNIQUE CHECK (slug = ANY (ARRAY['droit'::text, 'fiscalite'::text, 'rh'::text, 'conseil'::text, 'digitalisation'::text, 'recrutement'::text])),
  icon text NOT NULL,
  title text NOT NULL,
  subtitle text NOT NULL,
  description text NOT NULL,
  mission text NOT NULL,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT departments_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.department_cases (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  department_id uuid NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT department_cases_pkey PRIMARY KEY (id),
  CONSTRAINT department_cases_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.departments(id)
);

CREATE TABLE IF NOT EXISTS public.department_pricing (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  department_id uuid NOT NULL,
  label text NOT NULL,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT department_pricing_pkey PRIMARY KEY (id),
  CONSTRAINT department_pricing_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.departments(id)
);

CREATE TABLE IF NOT EXISTS public.department_services (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  department_id uuid NOT NULL,
  label text NOT NULL,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT department_services_pkey PRIMARY KEY (id),
  CONSTRAINT department_services_department_id_fkey FOREIGN KEY (department_id) REFERENCES public.departments(id)
);

CREATE TABLE IF NOT EXISTS public.digital_services (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  icon text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT digital_services_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.digital_service_features (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  service_id uuid NOT NULL,
  label text NOT NULL,
  sort_order integer DEFAULT 0,
  CONSTRAINT digital_service_features_pkey PRIMARY KEY (id),
  CONSTRAINT digital_service_features_service_id_fkey FOREIGN KEY (service_id) REFERENCES public.digital_services(id)
);

CREATE TABLE IF NOT EXISTS public.documents (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  type text NOT NULL CHECK (type = ANY (ARRAY['invoice'::text, 'contract'::text, 'report'::text, 'cv'::text, 'cover_letter'::text, 'certificate'::text, 'other'::text])),
  name text NOT NULL,
  file_url text NOT NULL,
  file_size integer,
  mime_type text,
  description text,
  is_public boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT documents_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.faq (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  question text NOT NULL,
  answer text NOT NULL,
  category text,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT faq_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.newsletter_subscribers (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  email text NOT NULL UNIQUE,
  first_name text,
  last_name text,
  source text DEFAULT 'website'::text CHECK (source = ANY (ARRAY['website'::text, 'footer'::text, 'resources'::text, 'popup'::text, 'import'::text])),
  is_active boolean DEFAULT true,
  subscribed_at timestamp with time zone DEFAULT now(),
  unsubscribed_at timestamp with time zone,
  ip_address inet,
  CONSTRAINT newsletter_subscribers_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  type text NOT NULL CHECK (type = ANY (ARRAY['info'::text, 'success'::text, 'warning'::text, 'error'::text, 'payment'::text, 'appointment'::text, 'recruitment'::text, 'project'::text])),
  title text NOT NULL,
  message text NOT NULL,
  link text,
  is_read boolean DEFAULT false,
  read_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT notifications_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.pricing_packs (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE CHECK (slug = ANY (ARRAY['essentiel'::text, 'croissance'::text, 'prestige'::text])),
  price integer NOT NULL,
  currency text DEFAULT 'XOF'::text,
  period text DEFAULT '/an'::text,
  description text,
  highlighted boolean DEFAULT false,
  cta_label text,
  sort_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT pricing_packs_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.subscriptions (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  pack_id uuid,
  pack_name text NOT NULL CHECK (pack_name = ANY (ARRAY['essentiel'::text, 'croissance'::text, 'prestige'::text])),
  status text DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'active'::text, 'expired'::text, 'cancelled'::text, 'suspended'::text])),
  amount integer NOT NULL,
  currency text DEFAULT 'XOF'::text,
  start_date timestamp with time zone,
  end_date timestamp with time zone,
  auto_renew boolean DEFAULT true,
  cancelled_at timestamp with time zone,
  cancellation_reason text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT subscriptions_pkey PRIMARY KEY (id),
  CONSTRAINT subscriptions_pack_id_fkey FOREIGN KEY (pack_id) REFERENCES public.pricing_packs(id)
);

CREATE TABLE IF NOT EXISTS public.payments (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  subscription_id uuid,
  amount integer NOT NULL,
  currency text DEFAULT 'XOF'::text,
  status text DEFAULT 'pending'::text CHECK (status = ANY (ARRAY['pending'::text, 'success'::text, 'failed'::text, 'refunded'::text, 'cancelled'::text])),
  provider text DEFAULT 'flutterwave'::text CHECK (provider = ANY (ARRAY['flutterwave'::text, 'orange_money'::text, 'wave'::text, 'free_money'::text, 'manual'::text])),
  provider_ref text,
  provider_response jsonb,
  customer_email text,
  customer_name text,
  customer_phone text,
  description text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT payments_pkey PRIMARY KEY (id),
  CONSTRAINT payments_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES public.subscriptions(id)
);

CREATE TABLE IF NOT EXISTS public.invoices (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL,
  payment_id uuid,
  subscription_id uuid,
  invoice_number text NOT NULL UNIQUE,
  amount integer NOT NULL,
  tax_amount integer DEFAULT 0,
  total_amount integer NOT NULL,
  currency text DEFAULT 'XOF'::text,
  status text DEFAULT 'draft'::text CHECK (status = ANY (ARRAY['draft'::text, 'sent'::text, 'paid'::text, 'overdue'::text, 'cancelled'::text])),
  pdf_url text,
  notes text,
  issued_at timestamp with time zone DEFAULT now(),
  due_at timestamp with time zone,
  paid_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT invoices_pkey PRIMARY KEY (id),
  CONSTRAINT invoices_payment_id_fkey FOREIGN KEY (payment_id) REFERENCES public.payments(id),
  CONSTRAINT invoices_subscription_id_fkey FOREIGN KEY (subscription_id) REFERENCES public.subscriptions(id)
);

CREATE TABLE IF NOT EXISTS public.recruitment_requests (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  company_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text,
  position_title text NOT NULL,
  department text,
  description text NOT NULL,
  requirements text,
  salary text,
  salary_min integer,
  salary_max integer,
  location text,
  contract_type text CHECK (contract_type = ANY (ARRAY['cdi'::text, 'cdd'::text, 'interim'::text, 'freelance'::text, 'stage'::text])),
  experience_required text,
  positions_count integer DEFAULT 1,
  urgency text DEFAULT 'medium'::text CHECK (urgency = ANY (ARRAY['low'::text, 'medium'::text, 'high'::text, 'critical'::text])),
  status text DEFAULT 'new'::text CHECK (status = ANY (ARRAY['new'::text, 'reviewing'::text, 'sourcing'::text, 'shortlisted'::text, 'placed'::text, 'closed'::text, 'cancelled'::text])),
  assigned_to uuid,
  deadline timestamp with time zone,
  ip_address inet,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT recruitment_requests_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.placements (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  candidate_id uuid NOT NULL,
  recruitment_request_id uuid NOT NULL,
  status text DEFAULT 'placed'::text CHECK (status = ANY (ARRAY['placed'::text, 'probation'::text, 'confirmed'::text, 'ended'::text, 'cancelled'::text])),
  start_date timestamp with time zone,
  end_date timestamp with time zone,
  salary integer,
  commission_amount integer,
  notes text,
  feedback_candidate text,
  feedback_company text,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT placements_pkey PRIMARY KEY (id),
  CONSTRAINT placements_candidate_id_fkey FOREIGN KEY (candidate_id) REFERENCES public.candidates(id),
  CONSTRAINT placements_recruitment_request_id_fkey FOREIGN KEY (recruitment_request_id) REFERENCES public.recruitment_requests(id)
);

CREATE TABLE IF NOT EXISTS public.pricing_features (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  pack_id uuid NOT NULL,
  label text NOT NULL,
  sort_order integer DEFAULT 0,
  CONSTRAINT pricing_features_pkey PRIMARY KEY (id),
  CONSTRAINT pricing_features_pack_id_fkey FOREIGN KEY (pack_id) REFERENCES public.pricing_packs(id)
);

CREATE TABLE IF NOT EXISTS public.projects (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  user_id uuid,
  title text NOT NULL,
  description text,
  type text CHECK (type = ANY (ARRAY['website'::text, 'ecommerce'::text, 'webapp'::text, 'mobile'::text, 'crm'::text, 'branding'::text])),
  status text DEFAULT 'draft'::text CHECK (status = ANY (ARRAY['draft'::text, 'in_progress'::text, 'review'::text, 'completed'::text, 'cancelled'::text, 'on_hold'::text])),
  budget integer,
  currency text DEFAULT 'XOF'::text,
  progress_percent integer DEFAULT 0 CHECK (progress_percent >= 0 AND progress_percent <= 100),
  start_date timestamp with time zone,
  end_date timestamp with time zone,
  delivered_at timestamp with time zone,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT projects_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.project_milestones (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  project_id uuid NOT NULL,
  title text NOT NULL,
  description text,
  due_date timestamp with time zone,
  completed_at timestamp with time zone,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT project_milestones_pkey PRIMARY KEY (id),
  CONSTRAINT project_milestones_project_id_fkey FOREIGN KEY (project_id) REFERENCES public.projects(id)
);

CREATE TABLE IF NOT EXISTS public.project_requests (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  company_name text NOT NULL,
  contact_name text NOT NULL,
  email text NOT NULL,
  phone text,
  project_type text NOT NULL CHECK (project_type = ANY (ARRAY['website'::text, 'ecommerce'::text, 'webapp'::text, 'mobile'::text, 'crm'::text, 'branding'::text])),
  description text NOT NULL,
  budget text,
  timeline text,
  status text DEFAULT 'new'::text CHECK (status = ANY (ARRAY['new'::text, 'reviewing'::text, 'quoted'::text, 'accepted'::text, 'rejected'::text])),
  assigned_to uuid,
  quoted_amount integer,
  ip_address inet,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT project_requests_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.sent_emails (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  recipient_email text NOT NULL,
  recipient_name text,
  subject text NOT NULL,
  template text,
  status text DEFAULT 'sent'::text CHECK (status = ANY (ARRAY['pending'::text, 'sent'::text, 'delivered'::text, 'bounced'::text, 'failed'::text])),
  provider text DEFAULT 'resend'::text,
  provider_id text,
  metadata jsonb,
  sent_at timestamp with time zone DEFAULT now(),
  CONSTRAINT sent_emails_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.settings (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  key text NOT NULL UNIQUE,
  value jsonb NOT NULL,
  description text,
  updated_by uuid,
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  CONSTRAINT settings_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.testimonials (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  role text NOT NULL,
  company text NOT NULL,
  content text NOT NULL,
  rating integer NOT NULL CHECK (rating >= 1 AND rating <= 5),
  avatar_url text,
  is_featured boolean DEFAULT false,
  is_active boolean DEFAULT true,
  sort_order integer DEFAULT 0,
  created_at timestamp with time zone DEFAULT now(),
  CONSTRAINT testimonials_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.users (
  id uuid NOT NULL DEFAULT uuid_generate_v4(),
  email text NOT NULL UNIQUE,
  first_name text NOT NULL,
  last_name text NOT NULL,
  phone text,
  company text,
  role text DEFAULT 'client'::text CHECK (role = ANY (ARRAY['client'::text, 'candidate'::text, 'admin'::text, 'super_admin'::text])),
  avatar_url text,
  is_active boolean DEFAULT true,
  email_verified boolean DEFAULT false,
  last_login_at timestamp with time zone,
  login_count integer DEFAULT 0,
  preferred_locale text DEFAULT 'fr'::text CHECK (preferred_locale = ANY (ARRAY['fr'::text, 'en'::text])),
  created_at timestamp with time zone DEFAULT now(),
  updated_at timestamp with time zone DEFAULT now(),
  deleted_at timestamp with time zone,
  CONSTRAINT users_pkey PRIMARY KEY (id)
);
`;

        const res = await client.query(schema);
        console.log('Successfully created all tables!');
        
    } catch (err) {
        console.error('Error executing query', err.stack);
    } finally {
        await client.end();
    }
};

run();
