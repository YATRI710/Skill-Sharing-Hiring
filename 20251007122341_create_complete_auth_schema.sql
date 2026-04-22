/*
  # Complete SkillBridge Authentication Schema

  ## Overview
  Complete database schema for SkillBridge with authentication, user preferences, and job listings.

  ## New Tables

  ### 1. profiles
  - `id` (uuid, primary key) - User identifier
  - `email` (text, unique) - User email
  - `full_name` (text) - User's full name
  - `avatar_url` (text, nullable) - Profile picture URL
  - `user_type` (text) - User type: 'freelancer', 'client', 'both'
  - `created_at` (timestamptz) - Account creation timestamp
  - `updated_at` (timestamptz) - Last update timestamp

  ### 2. user_preferences
  - `id` (uuid, primary key) - Unique preference record identifier
  - `user_id` (uuid, foreign key) - References profiles table
  - `role_type` (text) - User's primary role
  - `skills` (text[]) - Array of user's skills
  - `categories` (text[]) - Array of preferred categories
  - `experience_level` (text) - Experience level
  - `hourly_rate_min` (decimal) - Minimum hourly rate
  - `hourly_rate_max` (decimal) - Maximum hourly rate
  - `availability` (text) - Availability status
  - `bio` (text) - User biography
  - `portfolio_url` (text) - Portfolio URL
  - `created_at` (timestamptz) - Creation timestamp
  - `updated_at` (timestamptz) - Update timestamp

  ### 3. jobs
  - `id` (uuid, primary key) - Unique job identifier
  - `client_id` (uuid) - Job poster ID
  - `title` (text) - Job title
  - `description` (text) - Job description
  - `category` (text) - Job category
  - `skills_required` (text[]) - Required skills
  - `budget_min` (decimal) - Minimum budget
  - `budget_max` (decimal) - Maximum budget
  - `budget_type` (text) - Budget type
  - `experience_level` (text) - Required experience
  - `duration` (text) - Project duration
  - `status` (text) - Job status
  - `proposals_count` (integer) - Proposal count
  - `created_at` (timestamptz) - Posting timestamp
  - `updated_at` (timestamptz) - Update timestamp

  ### 4. job_proposals
  - `id` (uuid, primary key) - Proposal identifier
  - `job_id` (uuid) - References jobs
  - `freelancer_id` (uuid) - References profiles
  - `cover_letter` (text) - Proposal text
  - `proposed_rate` (decimal) - Proposed rate
  - `estimated_duration` (text) - Duration estimate
  - `status` (text) - Proposal status
  - `created_at` (timestamptz) - Submission timestamp
  - `updated_at` (timestamptz) - Update timestamp

  ## Security
  - All tables have RLS enabled
  - Users can only access their own data or public data
  - Proper authentication checks on all operations
*/

-- Create profiles table
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  avatar_url text,
  user_type text DEFAULT 'freelancer',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view profiles"
  ON profiles FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create user_preferences table
CREATE TABLE IF NOT EXISTS user_preferences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  role_type text NOT NULL DEFAULT 'freelancer',
  skills text[] DEFAULT '{}',
  categories text[] DEFAULT '{}',
  experience_level text DEFAULT 'intermediate',
  hourly_rate_min decimal(10, 2),
  hourly_rate_max decimal(10, 2),
  availability text DEFAULT 'full-time',
  bio text,
  portfolio_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE user_preferences ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own preferences"
  ON user_preferences FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences"
  ON user_preferences FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences"
  ON user_preferences FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- Create jobs table
CREATE TABLE IF NOT EXISTS jobs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id uuid NOT NULL,
  client_name text NOT NULL,
  title text NOT NULL,
  description text NOT NULL,
  category text NOT NULL,
  skills_required text[] DEFAULT '{}',
  budget_min decimal(10, 2),
  budget_max decimal(10, 2),
  budget_type text DEFAULT 'hourly',
  experience_level text DEFAULT 'intermediate',
  duration text,
  status text DEFAULT 'open',
  proposals_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view open jobs"
  ON jobs FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Authenticated users can create jobs"
  ON jobs FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = client_id);

CREATE POLICY "Job creators can update their jobs"
  ON jobs FOR UPDATE
  TO authenticated
  USING (auth.uid() = client_id)
  WITH CHECK (auth.uid() = client_id);

-- Create job_proposals table
CREATE TABLE IF NOT EXISTS job_proposals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  job_id uuid NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
  freelancer_id uuid NOT NULL,
  cover_letter text NOT NULL,
  proposed_rate decimal(10, 2) NOT NULL,
  estimated_duration text,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE job_proposals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Freelancers can view own proposals"
  ON job_proposals FOR SELECT
  TO authenticated
  USING (auth.uid() = freelancer_id);

CREATE POLICY "Clients can view proposals for their jobs"
  ON job_proposals FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM jobs
      WHERE jobs.id = job_proposals.job_id
      AND jobs.client_id = auth.uid()
    )
  );

CREATE POLICY "Freelancers can create proposals"
  ON job_proposals FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = freelancer_id);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_user_preferences_user_id ON user_preferences(user_id);
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_category ON jobs(category);
CREATE INDEX IF NOT EXISTS idx_job_proposals_job_id ON job_proposals(job_id);
CREATE INDEX IF NOT EXISTS idx_job_proposals_freelancer_id ON job_proposals(freelancer_id);

-- Insert sample jobs
INSERT INTO jobs (client_id, client_name, title, description, category, skills_required, budget_min, budget_max, budget_type, experience_level, duration, status, proposals_count) 
VALUES 
  (
    '00000000-0000-0000-0000-000000000001',
    'Tech Startup Inc',
    'Full-Stack React Developer for SaaS Platform',
    'We are looking for an experienced React developer to help build our SaaS platform. You will work with React, TypeScript, Node.js, and PostgreSQL. The project involves building user authentication, dashboard interfaces, and API integrations.',
    'Web Development',
    ARRAY['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'REST API'],
    50,
    85,
    'hourly',
    'expert',
    '3-6 months',
    'open',
    12
  ),
  (
    '00000000-0000-0000-0000-000000000002',
    'Design Agency Co',
    'UI/UX Designer for Mobile App',
    'Need a talented UI/UX designer to create a modern, intuitive mobile app design. Experience with Figma is required. You will be responsible for user research, wireframing, prototyping, and final design delivery.',
    'Design',
    ARRAY['Figma', 'UI Design', 'UX Design', 'Mobile Design', 'Prototyping'],
    40,
    65,
    'hourly',
    'intermediate',
    '2-3 months',
    'open',
    8
  ),
  (
    '00000000-0000-0000-0000-000000000003',
    'Tech Startup Inc',
    'Senior Frontend Developer (Vue.js)',
    'Looking for a senior frontend developer with strong Vue.js experience. You will work on modernizing our legacy application and implementing new features. Experience with Vuex and Vue Router is essential.',
    'Web Development',
    ARRAY['Vue.js', 'JavaScript', 'CSS', 'Vuex', 'Vue Router'],
    60,
    90,
    'hourly',
    'expert',
    '4-6 months',
    'open',
    15
  ),
  (
    '00000000-0000-0000-0000-000000000004',
    'Marketing Firm LLC',
    'SEO & Content Marketing Specialist',
    'Seeking an experienced SEO specialist to improve our organic search rankings. Responsibilities include keyword research, on-page optimization, content strategy, and link building. Must have proven track record.',
    'Marketing',
    ARRAY['SEO', 'Content Marketing', 'Google Analytics', 'Keyword Research', 'Link Building'],
    35,
    55,
    'hourly',
    'expert',
    '3-6 months',
    'open',
    22
  ),
  (
    '00000000-0000-0000-0000-000000000005',
    'Design Agency Co',
    'Graphic Designer for Brand Identity',
    'Need a creative graphic designer to develop a complete brand identity including logo, color palette, typography, and brand guidelines. Portfolio with branding work required.',
    'Design',
    ARRAY['Adobe Illustrator', 'Adobe Photoshop', 'Brand Design', 'Logo Design', 'Typography'],
    2500,
    5000,
    'fixed',
    'intermediate',
    '1-2 months',
    'open',
    18
  ),
  (
    '00000000-0000-0000-0000-000000000006',
    'Tech Startup Inc',
    'Backend Developer - Python & Django',
    'Looking for a Python/Django developer to build RESTful APIs for our mobile application. Experience with Django REST Framework, PostgreSQL, and deployment on AWS is preferred.',
    'Web Development',
    ARRAY['Python', 'Django', 'PostgreSQL', 'REST API', 'AWS'],
    55,
    80,
    'hourly',
    'expert',
    '2-4 months',
    'open',
    9
  ),
  (
    '00000000-0000-0000-0000-000000000007',
    'Marketing Firm LLC',
    'Social Media Manager',
    'Seeking a social media manager to handle our LinkedIn, Twitter, and Instagram accounts. Responsibilities include content creation, scheduling, engagement, and analytics reporting.',
    'Marketing',
    ARRAY['Social Media', 'Content Creation', 'Copywriting', 'Analytics', 'Community Management'],
    30,
    45,
    'hourly',
    'intermediate',
    '3+ months',
    'open',
    25
  ),
  (
    '00000000-0000-0000-0000-000000000008',
    'E-commerce Solutions',
    'WordPress Developer for E-commerce Site',
    'Need an experienced WordPress developer to build a custom e-commerce site using WooCommerce. Must have experience with payment gateway integration and responsive design.',
    'Web Development',
    ARRAY['WordPress', 'WooCommerce', 'PHP', 'MySQL', 'CSS'],
    3000,
    6000,
    'fixed',
    'intermediate',
    '1-2 months',
    'open',
    14
  ),
  (
    '00000000-0000-0000-0000-000000000009',
    'Digital Marketing Pro',
    'Google Ads Specialist',
    'Looking for a Google Ads expert to manage and optimize our PPC campaigns. Must have experience with Google Analytics, conversion tracking, and budget management.',
    'Marketing',
    ARRAY['Google Ads', 'PPC', 'Google Analytics', 'Conversion Optimization', 'Budget Management'],
    40,
    60,
    'hourly',
    'expert',
    '3+ months',
    'open',
    17
  ),
  (
    '00000000-0000-0000-0000-00000000000a',
    'Mobile First Studios',
    'React Native Developer for iOS/Android App',
    'Seeking a React Native developer to build a cross-platform mobile application. Experience with Redux, native modules, and app store deployment required.',
    'Web Development',
    ARRAY['React Native', 'JavaScript', 'Redux', 'iOS', 'Android'],
    55,
    75,
    'hourly',
    'expert',
    '4-5 months',
    'open',
    11
  )
ON CONFLICT DO NOTHING;