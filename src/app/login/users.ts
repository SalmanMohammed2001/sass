'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { createClient } from '@/app/lib/supabase/server'
import { Provider } from '@supabase/supabase-js';
import { useRouter } from 'next/router';


// Define a type for the form data
interface FormData {
  email: string;
  password: string;
}

export async function login(formData: FormData) {

  const supabase = createClient();

  const data: FormData = {
    email: formData.email,
    password: formData.password,
  };
  
  console.log(data);

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(formData: FormData) {
  const data: FormData = {
    email: formData.email,
    password: formData.password,
  };
  
  console.log(data);

  const { auth } = createClient();

  const { error } = await auth.signUp(data);

  console.log(error);

  if (error) {
    redirect('/error');
  }
  

  redirect('/subscription');
}

export async function logOut() {
  const { auth } = createClient();

  const { error } = await auth.signOut();

  console.log(error);

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

// Specify a type for the user ID
export const getUserById = async (userId: string) => {
  const supabase = createClient();
  
  const { data, error } = await supabase.auth.getUser(userId);
    
  if (error) {
    console.error('Error fetching user:', error);
    return null;
  }

  return data;
};

export async function getUser() {
  const { auth } = createClient();
  const user = (await auth.getUser()).data.user;
  return user;
}

// Refactor loginWithProvider to use Provider type
export const loginWithProvider = async (provider: Provider) => {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: window.location.origin + `/auth/callback`,
    },
  });

  if (error) {
    console.error('Error during login with provider:', error);
    return null; // Handle the error as needed
  }

  return data; // Return data if needed
};
