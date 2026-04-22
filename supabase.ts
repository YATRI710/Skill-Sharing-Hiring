import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  user_type: 'freelancer' | 'client' | 'both';
  created_at: string;
  updated_at: string;
}

export interface UserPreferences {
  id: string;
  user_id: string;
  role_type: 'freelancer' | 'client' | 'both';
  skills: string[];
  categories: string[];
  experience_level: 'beginner' | 'intermediate' | 'expert';
  hourly_rate_min?: number;
  hourly_rate_max?: number;
  availability: string;
  bio?: string;
  portfolio_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Job {
  id: string;
  client_id: string;
  client_name: string;
  title: string;
  description: string;
  category: string;
  skills_required: string[];
  budget_min?: number;
  budget_max?: number;
  budget_type: 'hourly' | 'fixed' | 'negotiable';
  experience_level: string;
  duration?: string;
  status: 'open' | 'in_progress' | 'closed' | 'cancelled';
  proposals_count: number;
  created_at: string;
  updated_at: string;
}

export interface JobProposal {
  id: string;
  job_id: string;
  freelancer_id: string;
  cover_letter: string;
  proposed_rate: number;
  estimated_duration?: string;
  status: 'pending' | 'accepted' | 'rejected' | 'withdrawn';
  created_at: string;
  updated_at: string;
}
