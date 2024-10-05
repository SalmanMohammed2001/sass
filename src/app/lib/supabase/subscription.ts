"use server"

import { createClient } from "./server"



const supabase = createClient()


export async function findSubscription(email:string){

    const { data, error } = await supabase
    .from("subscriptionData")
    .select('*')
    .eq('email', email);
   
    if(data){
        return data;
    }
    console.log(error);
    

}