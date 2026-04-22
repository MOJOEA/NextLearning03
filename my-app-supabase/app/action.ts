'use server'

import { createClient } from "@/lib/supabase/server"; 
import { v4 as uuidv4 } from "uuid";


export async function register(formData: FormData) { 
    const fullname = formData.get('fullname') as string;
    const email = formData.get('email') as string;
    const tel = formData.get('tal') as string; 
    const attachment = formData.get('attachment') as File
    const fileName = uuidv4();
    
    const supabase = await createClient();
    const { error: storageError } = await supabase.storage
      .from('attachments')
      .upload(fileName, attachment, {
        contentType: attachment.type,
        upsert: true
      });

    if (storageError) {
        console.log('found some error', storageError);
        return false;
    }

    const publicAttachmentURL = supabase.storage.from('attachments').getPublicUrl(fileName)


    const { data, error } = await supabase
    .from('users') 
    .insert([{ fullname: fullname, email: email, tel: tel, attachments: publicAttachmentURL.data.publicUrl}])

    if(error){
        console.log('found some error', error);
        return false
    }
    console.log('Register successful!')
    console.log(data)
}
