create table if not exists profiles (
  id uuid primary key,
  display_name text not null,
  role text not null default 'reviewer',
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists report_jobs (
  id uuid primary key,
  user_id uuid not null references profiles (id),
  paper_ref text not null,
  model text,
  status text not null,
  credits_spent integer not null default 0,
  error_message text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create table if not exists reports (
  id uuid primary key,
  job_id uuid not null unique references report_jobs (id),
  paper_id text not null,
  title text not null,
  summary text not null,
  markdown text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists credit_ledger (
  id uuid primary key,
  user_id uuid not null references profiles (id),
  report_job_id uuid references report_jobs (id),
  delta integer not null,
  reason text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists feedback_submissions (
  id uuid primary key,
  user_id uuid not null references profiles (id),
  report_id uuid not null references reports (id),
  honesty_rating integer not null,
  usefulness_rating integer not null,
  detailed_feedback text not null,
  created_at timestamptz not null default timezone('utc', now())
);

create table if not exists feedback_scores (
  id uuid primary key,
  feedback_submission_id uuid not null unique references feedback_submissions (id),
  honesty_score integer not null,
  usefulness_score integer not null,
  specificity_score integer not null,
  overall_score integer not null,
  credits_awarded integer not null default 0,
  rationale text not null,
  created_at timestamptz not null default timezone('utc', now())
);
