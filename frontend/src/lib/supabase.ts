import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

const isSupabaseConfigured = supabaseUrl && supabaseAnonKey

// 如果沒有設定環境變數，回傳一個 Mock Client 避免網頁崩潰
// 這樣 Home.vue 會讀取不到資料，進而使用 Fallback 的預設資料
export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : {
      from: () => ({
        select: () => ({
          order: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
          single: () => Promise.resolve({ data: null, error: new Error('Supabase not configured') }),
        }),
        insert: () => Promise.resolve({ data: null, error: null }),
        update: () => Promise.resolve({ data: null, error: null }),
        delete: () => Promise.resolve({ data: null, error: null }),
        upsert: () => Promise.resolve({ data: null, error: null }),
      }),
      auth: {
        signOut: () => {
             localStorage.removeItem('mock-auth-token')
             return Promise.resolve({ error: null })
        },
        getUser: () => {
             const token = localStorage.getItem('mock-auth-token')
             if (token) return Promise.resolve({ data: { user: { id: 'mock-user', email: 'admin@example.com' } }, error: null })
             return Promise.resolve({ data: { user: null }, error: null })
        },
        signInWithPassword: () => {
             localStorage.setItem('mock-auth-token', 'valid')
             return Promise.resolve({ data: { user: { id: 'mock-user' } }, error: null })
        },
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
      }
    } as any
