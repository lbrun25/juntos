import AsyncStorage from '@react-native-async-storage/async-storage'
import { createClient } from '@supabase/supabase-js'

// TODO: Put those values in .env
const supabaseUrl = "https://eoywphdqucpuznjsansm.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVveXdwaGRxdWNwdXpuanNhbnNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjE4NjY2MzYsImV4cCI6MjAzNzQ0MjYzNn0.ujggSmE66Db0H5mj5NNPdVpRHjJKBJjq1x6PQtAhMNI"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})
