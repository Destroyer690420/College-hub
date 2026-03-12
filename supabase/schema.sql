-- ============================================
-- Academic Resource Hub - Database Schema
-- Run this in your Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- 1. PROFILES (extends auth.users)
-- ============================================
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  avatar_url TEXT,
  department_id UUID,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 2. DEPARTMENTS
-- ============================================
CREATE TABLE departments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT DEFAULT 'BookOpen',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 3. SUBJECTS
-- ============================================
CREATE TABLE subjects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  code TEXT NOT NULL,
  department_id UUID NOT NULL REFERENCES departments(id) ON DELETE CASCADE,
  year INT NOT NULL CHECK (year BETWEEN 1 AND 5),
  semester INT NOT NULL CHECK (semester BETWEEN 1 AND 10),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(code, department_id)
);

-- ============================================
-- 4. RESOURCES (files)
-- ============================================
CREATE TYPE resource_category AS ENUM ('notes', 'pyqs', 'assignments', 'lab_manuals');

CREATE TABLE resources (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  file_url TEXT NOT NULL,
  file_name TEXT NOT NULL,
  file_size BIGINT NOT NULL DEFAULT 0,
  file_type TEXT NOT NULL,
  category resource_category NOT NULL DEFAULT 'notes',
  subject_id UUID NOT NULL REFERENCES subjects(id) ON DELETE CASCADE,
  uploaded_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  contributor_name TEXT DEFAULT 'Anonymous',
  avg_rating NUMERIC(2,1) DEFAULT 0,
  rating_count INT DEFAULT 0,
  download_count INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- 5. RATINGS
-- ============================================
CREATE TABLE ratings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resource_id UUID NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  score INT NOT NULL CHECK (score BETWEEN 1 AND 5),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(resource_id, user_id)
);

-- ============================================
-- 6. REPORTS
-- ============================================
CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  resource_id UUID NOT NULL REFERENCES resources(id) ON DELETE CASCADE,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  reason TEXT NOT NULL,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'reviewed', 'resolved')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(resource_id, user_id)
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX idx_subjects_department ON subjects(department_id);
CREATE INDEX idx_subjects_semester ON subjects(semester);
CREATE INDEX idx_resources_subject ON resources(subject_id);
CREATE INDEX idx_resources_category ON resources(category);
CREATE INDEX idx_resources_search ON resources USING gin(to_tsvector('english', title || ' ' || COALESCE(description, '')));
CREATE INDEX idx_ratings_resource ON ratings(resource_id);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE departments ENABLE ROW LEVEL SECURITY;
ALTER TABLE subjects ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources ENABLE ROW LEVEL SECURITY;
ALTER TABLE ratings ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;

-- Public read access for most tables
CREATE POLICY "Public read access" ON departments FOR SELECT USING (true);
CREATE POLICY "Public read access" ON subjects FOR SELECT USING (true);
CREATE POLICY "Public read access" ON resources FOR SELECT USING (true);
CREATE POLICY "Public read ratings" ON ratings FOR SELECT USING (true);

-- Profiles: users can read all, update own
CREATE POLICY "Public read profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Users update own profile" ON profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- Resources: authenticated users can insert
CREATE POLICY "Auth users can upload" ON resources FOR INSERT WITH CHECK (auth.uid() = uploaded_by);
CREATE POLICY "Uploaders can update own" ON resources FOR UPDATE USING (auth.uid() = uploaded_by);

-- Ratings: authenticated users can insert/update own
CREATE POLICY "Auth users can rate" ON ratings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own rating" ON ratings FOR UPDATE USING (auth.uid() = user_id);

-- Reports: authenticated users can insert own
CREATE POLICY "Auth users can report" ON reports FOR INSERT WITH CHECK (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS: Update average rating
-- ============================================
CREATE OR REPLACE FUNCTION update_resource_rating()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE resources
  SET
    avg_rating = (SELECT ROUND(AVG(score)::numeric, 1) FROM ratings WHERE resource_id = NEW.resource_id),
    rating_count = (SELECT COUNT(*) FROM ratings WHERE resource_id = NEW.resource_id)
  WHERE id = NEW.resource_id;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_rating
AFTER INSERT OR UPDATE ON ratings
FOR EACH ROW
EXECUTE FUNCTION update_resource_rating();

-- ============================================
-- FUNCTION: Auto-create profile on signup
-- ============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, full_name, avatar_url)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW
EXECUTE FUNCTION handle_new_user();

-- ============================================
-- SEED DATA: Sample Departments
-- ============================================
INSERT INTO departments (name, code, description, icon) VALUES
  ('Computer Science & Engineering', 'CSE', 'Department of Computer Science and Engineering', 'Monitor'),
  ('Electronics & Communication', 'ECE', 'Department of Electronics and Communication Engineering', 'Cpu'),
  ('Mechanical Engineering', 'ME', 'Department of Mechanical Engineering', 'Cog'),
  ('Civil Engineering', 'CE', 'Department of Civil Engineering', 'Building2'),
  ('Electrical Engineering', 'EE', 'Department of Electrical Engineering', 'Zap'),
  ('Information Technology', 'IT', 'Department of Information Technology', 'Globe');

-- Sample Subjects for CSE
INSERT INTO subjects (name, code, department_id, year, semester) VALUES
  ('Data Structures & Algorithms', 'CS201', (SELECT id FROM departments WHERE code = 'CSE'), 2, 3),
  ('Database Management Systems', 'CS301', (SELECT id FROM departments WHERE code = 'CSE'), 2, 4),
  ('Operating Systems', 'CS302', (SELECT id FROM departments WHERE code = 'CSE'), 3, 5),
  ('Computer Networks', 'CS401', (SELECT id FROM departments WHERE code = 'CSE'), 3, 6),
  ('Machine Learning', 'CS501', (SELECT id FROM departments WHERE code = 'CSE'), 4, 7),
  ('Web Development', 'CS502', (SELECT id FROM departments WHERE code = 'CSE'), 4, 8),
  ('Engineering Mathematics I', 'MA101', (SELECT id FROM departments WHERE code = 'CSE'), 1, 1),
  ('Engineering Physics', 'PH101', (SELECT id FROM departments WHERE code = 'CSE'), 1, 1),
  ('Programming in C', 'CS101', (SELECT id FROM departments WHERE code = 'CSE'), 1, 1),
  ('Engineering Mathematics II', 'MA102', (SELECT id FROM departments WHERE code = 'CSE'), 1, 2),
  ('Object Oriented Programming', 'CS102', (SELECT id FROM departments WHERE code = 'CSE'), 1, 2),
  ('Digital Logic Design', 'CS103', (SELECT id FROM departments WHERE code = 'CSE'), 1, 2);

-- Sample Subjects for ECE
INSERT INTO subjects (name, code, department_id, year, semester) VALUES
  ('Circuit Theory', 'EC201', (SELECT id FROM departments WHERE code = 'ECE'), 2, 3),
  ('Signals & Systems', 'EC301', (SELECT id FROM departments WHERE code = 'ECE'), 2, 4),
  ('VLSI Design', 'EC401', (SELECT id FROM departments WHERE code = 'ECE'), 3, 5),
  ('Embedded Systems', 'EC501', (SELECT id FROM departments WHERE code = 'ECE'), 4, 7);
