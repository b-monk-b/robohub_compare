import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://hvlqffwdqtdigstoghep.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh2bHFmZndkcXRkaWdzdG9naGVwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDkyMTc4NzksImV4cCI6MjA2NDc5Mzg3OX0.9SHMXZTT-JONuAgYeerOMs2x19vRA8G1KOk2c5gIaCI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
