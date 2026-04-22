'use server'

import { createClient } from "@/lib/supabase/server"; 

export async function register(formData: FormData) { 
    const fullname = formData.get('fullname') as string;
    const email = formData.get('email') as string;
    const tel = formData.get('tal') as string; 
    
    const supabase = await createClient();

    const { data, error } = await supabase
    .from('users') 
    .insert([{ fullname: fullname, email: email, tel: tel},])

    if(error){
        console.log('found some error', error);
        return false
    }
    console.log('Register successful!')
    console.log(data)
}
