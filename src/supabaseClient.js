import { createClient } from '@supabase/supabase-js';

// IMPORTANT: Replace with your actual Supabase URL and Anon Key
const supabaseUrl = 'https://tetrczfzijwathyknwyk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRldHJjemZ6aWp3YXRoeWtud3lrIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc1MzM1OTUxOSwiZXhwIjoyMDY4OTM1NTE5fQ.dWUmnJ1dLuZS5vOsNL4WDI_e_f4fzqVVfon9-3-wZjU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);