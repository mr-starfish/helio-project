// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://qioyxrjqukmatgqfapat.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFpb3l4cmpxdWttYXRncWZhcGF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU3MTg0MDYsImV4cCI6MjA2MTI5NDQwNn0.qHpQ4WeTBMSrf2F8Ttr0I0EqyWDIH5fW4MOSC_jD_-k";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);