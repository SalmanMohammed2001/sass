"use server"
import { createClient } from '@supabase/supabase-js'


export async function supabaseAdmin(){

    

const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.ADMIN_KEY!, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

    return supabase;


}