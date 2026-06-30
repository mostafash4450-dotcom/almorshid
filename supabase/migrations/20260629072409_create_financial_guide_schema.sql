
-- Categories table
CREATE TABLE categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT,
  color TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_categories" ON categories FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "insert_categories" ON categories FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_categories" ON categories FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_categories" ON categories FOR DELETE TO authenticated USING (true);

-- Articles table
CREATE TABLE articles (
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

ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_articles" ON articles FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "insert_articles" ON articles FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_articles" ON articles FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_articles" ON articles FOR DELETE TO authenticated USING (true);

-- Warned companies table
CREATE TABLE warned_companies (
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

ALTER TABLE warned_companies ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_warned_companies" ON warned_companies FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "insert_warned_companies" ON warned_companies FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_warned_companies" ON warned_companies FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_warned_companies" ON warned_companies FOR DELETE TO authenticated USING (true);

-- Law offices table
CREATE TABLE law_offices (
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

ALTER TABLE law_offices ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_law_offices" ON law_offices FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "insert_law_offices" ON law_offices FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_law_offices" ON law_offices FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_law_offices" ON law_offices FOR DELETE TO authenticated USING (true);

-- Contact submissions table
CREATE TABLE contact_submissions (
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

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_contact_submissions" ON contact_submissions FOR SELECT TO authenticated USING (true);
CREATE POLICY "insert_contact_submissions" ON contact_submissions FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "update_contact_submissions" ON contact_submissions FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_contact_submissions" ON contact_submissions FOR DELETE TO authenticated USING (true);

-- Site settings table
CREATE TABLE site_settings (
  key TEXT PRIMARY KEY,
  value TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "select_site_settings" ON site_settings FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "insert_site_settings" ON site_settings FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "update_site_settings" ON site_settings FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "delete_site_settings" ON site_settings FOR DELETE TO authenticated USING (true);

-- Insert default categories
INSERT INTO categories (name, slug, description, icon) VALUES
('تحذيرات الفوركس', 'forex-warnings', 'تحذيرات من شركات التداول المشبوهة والنصابة', 'alert-triangle'),
('كيفية التداول', 'trading-guide', 'مقالات تعليمية للمبتدئين والمحترفين في التداول', 'trending-up'),
('مكاتب المحاماة', 'law-offices', 'مراجعة مكاتب المحاماة الموثوقة لاسترداد الأموال', 'scale'),
('استرداد الأموال', 'fund-recovery', 'دليل استرداد الأموال من شركات الفوركس المحتالة', 'shield'),
('المؤشرات المالية', 'indicators', 'شرح المؤشرات الفنية وأدوات التحليل', 'bar-chart-2');

-- Insert law offices
INSERT INTO law_offices (name, slug, description, long_description, website, badge, rating, reviews_count, is_recommended, services, advantages, faq_items, meta_title, meta_description) VALUES
(
  'Trust Law',
  'trust-law',
  'مكتب محاماة متخصص في قضايا الفوركس واسترداد الأموال من شركات التداول المحتالة',
  'مكتب Trust Law هو أحد المكاتب القانونية الرائدة المتخصصة في استرداد الأموال من شركات التداول غير الشرعية وعمليات الاحتيال المالي عبر الإنترنت. يضم المكتب فريقاً من المحامين المتخصصين ذوي الخبرة العميقة في القانون المالي الدولي وقضايا الاحتيال الإلكتروني.',
  'https://trusttlaw.com',
  'موصى به',
  4.8,
  127,
  true,
  ARRAY['استرداد أموال الفوركس', 'قضايا الاحتيال الإلكتروني', 'التحكيم الدولي', 'الاستشارات القانونية المالية', 'ملاحقة شركات التداول غير المرخصة'],
  ARRAY['خبرة أكثر من 10 سنوات في قضايا الفوركس', 'نسبة نجاح تجاوزت 85%', 'استشارة أولية مجانية', 'فريق متعدد اللغات يشمل العربية', 'متابعة مستمرة لكل قضية'],
  '[{"question": "هل يمكن استرداد أموالي من شركة فوركس محتالة؟", "answer": "نعم، في كثير من الحالات يمكن استرداد الأموال بالطرق القانونية المناسبة. تواصل معنا لتقييم قضيتك."}, {"question": "كم تستغرق قضية استرداد الأموال؟", "answer": "تتراوح مدة القضايا بين 3 أشهر وسنتين حسب تعقيد القضية والجهة المعنية."}, {"question": "هل الاستشارة الأولى مجانية؟", "answer": "نعم، نقدم استشارة أولية مجانية لتقييم قضيتك وتحديد فرص النجاح."}]',
  'Trust Law - مكتب محاماة متخصص في استرداد أموال الفوركس | المرشد المالي',
  'مراجعة شاملة لمكتب Trust Law المتخصص في استرداد الأموال من شركات الفوركس المحتالة. تعرف على خدماتهم ومزاياهم وكيفية التواصل معهم.'
),
(
  'D D LAW',
  'dd-law',
  'مكتب قانوني متخصص في قضايا التداول الإلكتروني وحماية حقوق المتضررين من شركات الفوركس',
  'مكتب D D LAW مكتب قانوني متخصص يقدم خدماته لضحايا الاحتيال المالي والتداول غير المشروع. يتميز المكتب بنهجه الاحترافي في التعامل مع قضايا استرداد الأموال وملاحقة شركات الفوركس غير الشرعية قضائياً على المستوى الدولي.',
  'https://d-d-law.com',
  'موثوق',
  4.6,
  89,
  true,
  ARRAY['استرداد الأموال المحتجزة', 'الدعاوى القضائية الدولية', 'التحقيق في شركات التداول', 'استرداد الخسائر من الاحتيال', 'الاستشارات القانونية التجارية'],
  ARRAY['تخصص حصري في قضايا الفوركس', 'شبكة علاقات قانونية دولية واسعة', 'تقارير تحقيق شاملة', 'سرية تامة للمعلومات', 'رسوم مرنة حسب طبيعة القضية'],
  '[{"question": "ما هي أنواع القضايا التي تتخصصون فيها؟", "answer": "نتخصص في قضايا الاحتيال المالي الإلكتروني واسترداد الأموال من شركات التداول غير المرخصة."}, {"question": "كيف يمكنني معرفة فرص نجاح قضيتي؟", "answer": "تواصل معنا لتقديم تقييم مجاني لقضيتك وتحديد احتمالية النجاح."}, {"question": "هل تعملون مع العملاء العرب؟", "answer": "نعم، لدينا فريق ناطق بالعربية ونقدم خدماتنا لعملاء من جميع الدول العربية."}]',
  'D D LAW - مكتب محاماة لاسترداد الأموال من الفوركس | المرشد المالي',
  'مراجعة كاملة لمكتب D D LAW المتخصص في قضايا الفوركس واسترداد الأموال. اطلع على خدماتهم وكيفية التواصل معهم.'
);

-- Insert sample warned companies
INSERT INTO warned_companies (name, slug, country, warning_level, description, scam_type, status) VALUES
('XTrade Global', 'xtrade-global', 'قبرص', 'critical', 'شركة تداول غير مرخصة تقوم بالاحتيال على العملاء واستنزاف أموالهم', 'وسيط احتيالي', 'active'),
('FX Masters Pro', 'fx-masters-pro', 'جزر العذراء', 'high', 'شركة تدعي عوائد غير واقعية وتمارس ضغطاً مستمراً على العملاء للإيداع', 'مخطط بونزي', 'active'),
('CryptoForex Ltd', 'cryptoforex-ltd', 'سيشيل', 'critical', 'شركة تجمع الأموال بذريعة التداول ثم تختفي مع أموال العملاء', 'احتيال واختفاء', 'active'),
('BinaryWin Markets', 'binarywin-markets', 'مجهول', 'high', 'شركة خيارات ثنائية غير مرخصة تلاعبت بنتائج التداول', 'خيارات ثنائية مزيفة', 'active');

-- Insert sample articles
INSERT INTO articles (title, slug, content, excerpt, category_id, status, author_name, meta_title, meta_description, published_at) VALUES
(
  'كيف تكشف شركات الفوركس النصابة: 10 علامات تحذيرية',
  'how-to-detect-forex-scams',
  '<h2>مقدمة</h2><p>انتشرت في السنوات الأخيرة شركات التداول المزيفة التي تستهدف المستثمرين العرب بوعود ربح مغرية. في هذا المقال نكشف أهم العلامات التحذيرية التي تساعدك على التمييز بين الشركات الموثوقة والمحتالة.</p><h2>1. عدم وجود ترخيص رسمي</h2><p>الشركات الموثوقة تحمل تراخيص من هيئات تنظيمية معترف بها مثل FCA البريطانية أو ASIC الأسترالية أو CySEC القبرصية. إذا لم تجد ترخيصاً قابلاً للتحقق، فهذه علامة تحذير خطيرة.</p><h2>2. وعود بأرباح مضمونة</h2><p>لا يوجد في التداول ما يسمى بالربح المضمون. أي شركة تضمن لك عوائد ثابتة وعالية هي شركة محتالة على الأرجح.</p><h2>3. صعوبة سحب الأموال</h2><p>إذا واجهت صعوبات في سحب أموالك أو وضعوا شروطاً تعجيزية للسحب، فهذه علامة واضحة على الاحتيال.</p><h2>4. ضغط مستمر للإيداع</h2><p>الوسطاء المحتالون يضغطون على العملاء باستمرار لزيادة الودائع بحجج مختلفة.</p><h2>الخلاصة</h2><p>تحقق دائماً من ترخيص الشركة قبل الإيداع، واطلع على المراجعات والتقييمات من مصادر موثوقة مثل موقع المرشد المالي.</p>',
  'تعرف على أهم العلامات التحذيرية التي تكشف شركات الفوركس المحتالة وكيف تحمي أموالك من النصب والاحتيال',
  (SELECT id FROM categories WHERE slug = 'forex-warnings'),
  'published',
  'فريق التحرير',
  'كيف تكشف شركات الفوركس النصابة: 10 علامات تحذيرية | المرشد المالي',
  'تعرف على أهم العلامات التحذيرية التي تكشف شركات الفوركس المحتالة وكيف تحمي أموالك من النصب والاحتيال.',
  NOW()
),
(
  'دليل استرداد الأموال من شركات الفوركس المحتالة خطوة بخطوة',
  'forex-fund-recovery-guide',
  '<h2>هل يمكن استرداد أموالي؟</h2><p>نعم، في كثير من الحالات يمكن استرداد الأموال المسروقة من شركات الفوركس المحتالة، خاصة إذا تصرفت بسرعة واتبعت الخطوات الصحيحة.</p><h2>الخطوة الأولى: جمع الأدلة</h2><p>اجمع كل وثائقك: إيصالات الإيداع، لقطات الشاشة، المحادثات، العقود، وأي تواصل مع الشركة. هذه الأدلة ضرورية لقضيتك القانونية.</p><h2>الخطوة الثانية: الإبلاغ لبنكك</h2><p>إذا أودعت بالبطاقة الائتمانية، تواصل مع بنكك فوراً لطلب استرداد الدفع (Chargeback). لديك نافذة زمنية محدودة.</p><h2>الخطوة الثالثة: الإبلاغ للجهات التنظيمية</h2><p>أبلغ هيئة تنظيم الأوراق المالية في بلدك، والهيئة التي تدعي الشركة الخاضعة لرقابتها.</p><h2>الخطوة الرابعة: استشارة محامٍ متخصص</h2><p>تواصل مع مكتب محاماة متخصص في قضايا الفوركس مثل Trust Law أو D D LAW للحصول على تقييم قانوني لقضيتك.</p>',
  'دليل شامل لخطوات استرداد أموالك من شركات الفوركس المحتالة مع نصائح قانونية من متخصصين',
  (SELECT id FROM categories WHERE slug = 'fund-recovery'),
  'published',
  'فريق التحرير',
  'دليل استرداد الأموال من شركات الفوركس المحتالة | المرشد المالي',
  'دليل شامل لخطوات استرداد أموالك من شركات الفوركس المحتالة مع نصائح قانونية من متخصصين.',
  NOW()
),
(
  'كيف تبدأ التداول في الفوركس للمبتدئين: الدليل الشامل 2024',
  'forex-trading-beginners-guide',
  '<h2>ما هو الفوركس؟</h2><p>الفوركس أو سوق العملات الأجنبية هو أكبر سوق مالي في العالم بحجم تداول يومي يتجاوز 6 تريليون دولار. يتيح للمتداولين شراء وبيع العملات الأجنبية للاستفادة من تقلبات الأسعار.</p><h2>المفاهيم الأساسية</h2><p><strong>زوج العملات:</strong> في الفوركس، دائماً تتداول عملتين معاً مثل EUR/USD (اليورو مقابل الدولار).</p><p><strong>السبريد:</strong> الفرق بين سعر الشراء وسعر البيع، وهو رسوم الوسيط.</p><p><strong>الرافعة المالية:</strong> أداة تتيح لك التداول بمبلغ أكبر من رأس مالك، لكنها تزيد المخاطر أيضاً.</p><h2>اختيار الوسيط المناسب</h2><p>ابحث عن وسيط مرخص، ذو سمعة جيدة، برسوم معقولة، ومنصة تداول سهلة الاستخدام. تجنب الوسطاء غير المرخصين مهما كانت عروضهم مغرية.</p>',
  'دليل شامل للمبتدئين لتعلم أساسيات التداول في سوق الفوركس مع نصائح عملية لتجنب الأخطاء الشائعة',
  (SELECT id FROM categories WHERE slug = 'trading-guide'),
  'published',
  'فريق التحرير',
  'كيف تبدأ التداول في الفوركس للمبتدئين: الدليل الشامل | المرشد المالي',
  'دليل شامل للمبتدئين لتعلم أساسيات التداول في سوق الفوركس مع نصائح عملية لتجنب الأخطاء الشائعة.',
  NOW()
);
