-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. Profiles Table
create table public.profiles (
  id uuid default uuid_generate_v4() primary key,
  full_name text not null,
  title text,
  tagline text,
  quote text,
  location text,
  about_me text,
  total_experience text,
  github_url text,
  website_url text,
  avatar_url text,
  connect_with_me jsonb,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. Work Experiences Table
create table public.work_experiences (
  id uuid default uuid_generate_v4() primary key,
  company_name text not null,
  job_title text not null,
  industry text,
  location text,
  start_date text,
  end_date text,
  is_current boolean default false,
  description text,
  technologies text[],
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. Skills Table
create table public.skills (
  id uuid default uuid_generate_v4() primary key,
  category text not null,
  description text,
  tags text[],
  proficiency integer default 0,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 4. Projects Table
create table public.projects (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  demo_url text,
  github_url text,
  technologies text[],
  is_featured boolean default false,
  status text,
  difficulty integer,
  role text,
  solution text,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. Education Table
create table public.education (
  id uuid default uuid_generate_v4() primary key,
  school_name text not null,
  department text,
  degree text,
  period text,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. Certifications Table
create table public.certifications (
  id uuid default uuid_generate_v4() primary key,
  name text not null,
  category text,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 7. Bio Sections Table
create table public.bio_sections (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  text text,
  display_order integer default 0,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.work_experiences enable row level security;
alter table public.skills enable row level security;
alter table public.projects enable row level security;
alter table public.education enable row level security;
alter table public.certifications enable row level security;
alter table public.bio_sections enable row level security;

-- Policies: Allow public read access
create policy "Allow public read access" on public.profiles for select using (true);
create policy "Allow public read access" on public.work_experiences for select using (true);
create policy "Allow public read access" on public.skills for select using (true);
create policy "Allow public read access" on public.projects for select using (true);
create policy "Allow public read access" on public.education for select using (true);
create policy "Allow public read access" on public.certifications for select using (true);
create policy "Allow public read access" on public.bio_sections for select using (true);

-- Policies: Allow authenticated users full access (Admin)
create policy "Allow authenticated users all" on public.profiles for all using (auth.role() = 'authenticated');
create policy "Allow authenticated users all" on public.work_experiences for all using (auth.role() = 'authenticated');
create policy "Allow authenticated users all" on public.skills for all using (auth.role() = 'authenticated');
create policy "Allow authenticated users all" on public.projects for all using (auth.role() = 'authenticated');
create policy "Allow authenticated users all" on public.education for all using (auth.role() = 'authenticated');
create policy "Allow authenticated users all" on public.certifications for all using (auth.role() = 'authenticated');
create policy "Allow authenticated users all" on public.bio_sections for all using (auth.role() = 'authenticated');
