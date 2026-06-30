import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Category = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  icon: string | null;
  color: string | null;
  created_at: string;
};

export type Article = {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  featured_image: string | null;
  category_id: string | null;
  status: 'draft' | 'published';
  meta_title: string | null;
  meta_description: string | null;
  tags: string[] | null;
  views: number;
  author_name: string;
  published_at: string | null;
  created_at: string;
  updated_at: string;
  categories?: Category;
};

export type WarnedCompany = {
  id: string;
  name: string;
  slug: string;
  country: string | null;
  warning_level: 'low' | 'medium' | 'high' | 'critical';
  description: string | null;
  evidence: string | null;
  logo_url: string | null;
  website: string | null;
  scam_type: string | null;
  victims_count: number | null;
  estimated_losses: string | null;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
};

export type LawOffice = {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  long_description: string | null;
  logo_url: string | null;
  website: string | null;
  email: string | null;
  phone: string | null;
  country: string | null;
  services: string[] | null;
  advantages: string[] | null;
  rating: number;
  reviews_count: number;
  badge: string | null;
  faq_items: Array<{ question: string; answer: string }>;
  meta_title: string | null;
  meta_description: string | null;
  is_recommended: boolean;
  created_at: string;
  updated_at: string;
};

export type ContactSubmission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  company_name: string | null;
  amount: string | null;
  problem_description: string | null;
  status: 'new' | 'in_progress' | 'resolved' | 'closed';
  notes: string | null;
  created_at: string;
  updated_at: string;
};

export type ArticleComment = {
  id: string;
  article_id: string;
  name: string;
  email: string;
  comment: string;
  status: 'pending' | 'approved' | 'rejected';
  reviewed_at: string | null;
  created_at: string;
  updated_at: string;
};

export type PublicArticleComment = Pick<ArticleComment, 'id' | 'article_id' | 'name' | 'comment' | 'created_at'>;
