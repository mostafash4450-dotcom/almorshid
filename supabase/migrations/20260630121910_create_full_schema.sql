
-- Categories
CREATE TABLE IF NOT EXISTS categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  color TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Articles
CREATE TABLE IF NOT EXISTS articles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL DEFAULT '',
  excerpt TEXT,
  featured_image TEXT,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published')),
  meta_title TEXT,
  meta_description TEXT,
  tags TEXT[],
  views INTEGER DEFAULT 0,
  author_name TEXT DEFAULT 'فريق التحرير',
  published_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Warned companies
CREATE TABLE IF NOT EXISTS warned_companies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  country TEXT,
  warning_level TEXT DEFAULT 'high' CHECK (warning_level IN ('low', 'medium', 'high', 'critical')),
  description TEXT,
  evidence TEXT,
  logo_url TEXT,
  website TEXT,
  scam_type TEXT,
  victims_count INTEGER,
  estimated_losses TEXT,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Law offices
CREATE TABLE IF NOT EXISTS law_offices (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  long_description TEXT,
  logo_url TEXT,
  website TEXT,
  email TEXT,
  phone TEXT,
  country TEXT,
  services TEXT[],
  advantages TEXT[],
  rating DECIMAL(3,1) DEFAULT 4.5,
  reviews_count INTEGER DEFAULT 0,
  badge TEXT,
  faq_items JSONB DEFAULT '[]',
  meta_title TEXT,
  meta_description TEXT,
  is_recommended BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Contact submissions
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company_name TEXT,
  amount TEXT,
  problem_description TEXT,
  status TEXT DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved', 'closed')),
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Site settings
CREATE TABLE IF NOT EXISTS site_settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- RLS
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE warned_companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE law_offices ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- Drop old policies if exist
DO $$ BEGIN
  DROP POLICY IF EXISTS "select_categories" ON categories;
  DROP POLICY IF EXISTS "insert_categories" ON categories;
  DROP POLICY IF EXISTS "update_categories" ON categories;
  DROP POLICY IF EXISTS "delete_categories" ON categories;
  DROP POLICY IF EXISTS "cat_sel" ON categories;
  DROP POLICY IF EXISTS "cat_ins" ON categories;
  DROP POLICY IF EXISTS "cat_upd" ON categories;
  DROP POLICY IF EXISTS "cat_del" ON categories;

  DROP POLICY IF EXISTS "select_articles" ON articles;
  DROP POLICY IF EXISTS "insert_articles" ON articles;
  DROP POLICY IF EXISTS "update_articles" ON articles;
  DROP POLICY IF EXISTS "delete_articles" ON articles;
  DROP POLICY IF EXISTS "art_sel" ON articles;
  DROP POLICY IF EXISTS "art_ins" ON articles;
  DROP POLICY IF EXISTS "art_upd" ON articles;
  DROP POLICY IF EXISTS "art_del" ON articles;

  DROP POLICY IF EXISTS "select_warned_companies" ON warned_companies;
  DROP POLICY IF EXISTS "insert_warned_companies" ON warned_companies;
  DROP POLICY IF EXISTS "update_warned_companies" ON warned_companies;
  DROP POLICY IF EXISTS "delete_warned_companies" ON warned_companies;
  DROP POLICY IF EXISTS "wc_sel" ON warned_companies;
  DROP POLICY IF EXISTS "wc_ins" ON warned_companies;
  DROP POLICY IF EXISTS "wc_upd" ON warned_companies;
  DROP POLICY IF EXISTS "wc_del" ON warned_companies;

  DROP POLICY IF EXISTS "select_law_offices" ON law_offices;
  DROP POLICY IF EXISTS "insert_law_offices" ON law_offices;
  DROP POLICY IF EXISTS "update_law_offices" ON law_offices;
  DROP POLICY IF EXISTS "delete_law_offices" ON law_offices;
  DROP POLICY IF EXISTS "lo_sel" ON law_offices;
  DROP POLICY IF EXISTS "lo_ins" ON law_offices;
  DROP POLICY IF EXISTS "lo_upd" ON law_offices;
  DROP POLICY IF EXISTS "lo_del" ON law_offices;

  DROP POLICY IF EXISTS "select_contact_submissions" ON contact_submissions;
  DROP POLICY IF EXISTS "insert_contact_submissions" ON contact_submissions;
  DROP POLICY IF EXISTS "update_contact_submissions" ON contact_submissions;
  DROP POLICY IF EXISTS "delete_contact_submissions" ON contact_submissions;
  DROP POLICY IF EXISTS "cs_sel" ON contact_submissions;
  DROP POLICY IF EXISTS "cs_ins" ON contact_submissions;
  DROP POLICY IF EXISTS "cs_upd" ON contact_submissions;
  DROP POLICY IF EXISTS "cs_del" ON contact_submissions;

  DROP POLICY IF EXISTS "select_site_settings" ON site_settings;
  DROP POLICY IF EXISTS "insert_site_settings" ON site_settings;
  DROP POLICY IF EXISTS "update_site_settings" ON site_settings;
  DROP POLICY IF EXISTS "delete_site_settings" ON site_settings;
  DROP POLICY IF EXISTS "ss_sel" ON site_settings;
  DROP POLICY IF EXISTS "ss_ins" ON site_settings;
  DROP POLICY IF EXISTS "ss_upd" ON site_settings;
  DROP POLICY IF EXISTS "ss_del" ON site_settings;
EXCEPTION WHEN OTHERS THEN NULL;
END $$;

-- Categories policies
CREATE POLICY "cat_sel" ON categories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "cat_ins" ON categories FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "cat_upd" ON categories FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "cat_del" ON categories FOR DELETE TO anon, authenticated USING (true);

-- Articles policies
CREATE POLICY "art_sel" ON articles FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "art_ins" ON articles FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "art_upd" ON articles FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "art_del" ON articles FOR DELETE TO anon, authenticated USING (true);

-- Warned companies policies
CREATE POLICY "wc_sel" ON warned_companies FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "wc_ins" ON warned_companies FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "wc_upd" ON warned_companies FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "wc_del" ON warned_companies FOR DELETE TO anon, authenticated USING (true);

-- Law offices policies
CREATE POLICY "lo_sel" ON law_offices FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "lo_ins" ON law_offices FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "lo_upd" ON law_offices FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "lo_del" ON law_offices FOR DELETE TO anon, authenticated USING (true);

-- Contact submissions policies
CREATE POLICY "cs_sel" ON contact_submissions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "cs_ins" ON contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "cs_upd" ON contact_submissions FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "cs_del" ON contact_submissions FOR DELETE TO anon, authenticated USING (true);

-- Site settings policies
CREATE POLICY "ss_sel" ON site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "ss_ins" ON site_settings FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "ss_upd" ON site_settings FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "ss_del" ON site_settings FOR DELETE TO anon, authenticated USING (true);
