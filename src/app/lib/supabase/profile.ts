import { createClient } from "./server";

const supabase = createClient();


interface Profile {
    email: string;
 
}



export async function saveProfile({ email }: { email: string }) {
    const { data, error } = await supabase
        .from('profiles')
        .insert([{ email }]) 
        .select();

    if (error) {
        console.error('Error saving profile:', error);
        return error;
    }

    return data;
}

export const profileUserSearch = async ({ email }: { email: string }): Promise<Profile | null> => {
    const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('email', email)
        .single();

    if (error) {
        console.error('Error fetching profile:', error);
        return null;
    }

    return data; 
};
