import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

function getSupabaseUrl(): string {
  return `${(window as any).MEOO_CONFIG?.meoo_app_access_url || location.origin}/sb-api`;
}

export const supabaseUrl = getSupabaseUrl();
export const supabaseAnonKey = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJvbGUiOiJhbm9uIiwiaWF0IjoxNzc2OTk1NDUzLCJleHAiOjEzMjg3NjM1NDUzfQ.VrFmCvQRqVrQsAq9J5D_VeKGo86iQAlEhVgCIgUITt0';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});