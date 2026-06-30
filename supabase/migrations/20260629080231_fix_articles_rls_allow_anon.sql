
-- Drop existing restrictive policies
DROP POLICY IF EXISTS "insert_articles" ON articles;
DROP POLICY IF EXISTS "update_articles" ON articles;
DROP POLICY IF EXISTS "delete_articles" ON articles;

DROP POLICY IF EXISTS "insert_categories" ON categories;
DROP POLICY IF EXISTS "update_categories" ON categories;
DROP POLICY IF EXISTS "delete_categories" ON categories;

DROP POLICY IF EXISTS "insert_warned_companies" ON warned_companies;
DROP POLICY IF EXISTS "update_warned_companies" ON warned_companies;
DROP POLICY IF EXISTS "delete_warned_companies" ON warned_companies;

DROP POLICY IF EXISTS "insert_law_offices" ON law_offices;
DROP POLICY IF EXISTS "update_law_offices" ON law_offices;
DROP POLICY IF EXISTS "delete_law_offices" ON law_offices;

DROP POLICY IF EXISTS "update_contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "delete_contact_submissions" ON contact_submissions;
DROP POLICY IF EXISTS "select_contact_submissions" ON contact_submissions;

-- Allow anon + authenticated for articles
CREATE POLICY "insert_articles" ON articles FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "update_articles" ON articles FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_articles" ON articles FOR DELETE TO anon, authenticated USING (true);

-- Allow anon + authenticated for categories
CREATE POLICY "insert_categories" ON categories FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "update_categories" ON categories FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_categories" ON categories FOR DELETE TO anon, authenticated USING (true);

-- Allow anon + authenticated for warned_companies
CREATE POLICY "insert_warned_companies" ON warned_companies FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "update_warned_companies" ON warned_companies FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_warned_companies" ON warned_companies FOR DELETE TO anon, authenticated USING (true);

-- Allow anon + authenticated for law_offices
CREATE POLICY "insert_law_offices" ON law_offices FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "update_law_offices" ON law_offices FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_law_offices" ON law_offices FOR DELETE TO anon, authenticated USING (true);

-- Allow anon + authenticated for contact_submissions management
CREATE POLICY "select_contact_submissions" ON contact_submissions FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "update_contact_submissions" ON contact_submissions FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_contact_submissions" ON contact_submissions FOR DELETE TO anon, authenticated USING (true);
