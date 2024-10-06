"use client"


import React, { useEffect, useState } from 'react'

import PostCard from '../postCard/postcart'
import { loadAllBlog } from '@/app/lib/supabase/blog'
import style from './allblog.module.css'
import LoadingCom from '../loadingcom/loading'


interface BlogData{
  created_at: string;
  createdBy: string | null;
  description: string | null;
  id: number;
  image_url: string | null;
  title: string | null;
}

const Allblogs = () => {


    const [data, setData] = useState<BlogData[]>([]); 
    const [loading, setLoading] = useState(true);
  
    useEffect(() => {
      const fetchBlogs = async () => {
        try {
          const blogData = await loadAllBlog();
  
      // Expecting a possible null value from findSubscription
             // @ts-expect-error: findSubscription may return null, which we handle in the subsequent logic
          setData(blogData);
        } catch (error) {
          console.error('Error loading blogs:', error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchBlogs();
    }, []);
  
    if (loading) {
      return (
        <div>
        <LoadingCom/>
      </div>
      )
    }






  return (
    <div>
       <div className='flex items-center mt-[100px] '>
    
    
       </div>
  <div className={style.container}>

       {data?.map((value) => (
         <div key={value.id} className={style.post}>
          {
            
            // Expecting a possible null value from findSubscription
             // @ts-expect-error: findSubscription may return null, which we handle in the subsequent logic
             <PostCard post={value} />
        }
          
        
         </div>
       ))}
     </div>
      </div>
  )
}

export default Allblogs