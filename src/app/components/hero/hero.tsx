"use client"

import Image from "next/image";
import Price from "../subscription/subscription";

import { createClient } from "@/app/lib/supabase/client";
import { useEffect, useState } from "react";
import { loadAllBlog } from "@/app/lib/supabase/blog";
import LoadingCom from "../loadingcom/loading";

import styles from './hero.module.css';

import { useRouter } from "next/navigation";


interface BlogData{
  created_at: string;
  createdBy: string | null;
  description: string | null;
  id: number;
  image_url: string | null;
  title: string | null;
}


interface Subscription {
  created_at: string;
  customer_id: string | null;
  email: string;
  end_date: string | null;
  subscription_id: string | null;
}


interface Post {
  id: number;
  title: string | null; 
  description: string; 
  image_url: string; 
}



const supabase = createClient();

const Hero =  () => {

  const router = useRouter();


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

     




 const handleAction = async(postId:number)=>{



  const user =  (await supabase.auth.getUser()).data.user;


  

  if (!user) {
    router.push('/login');
  }else{

    router.push(`/blog/${postId}`)
  }

    


 }






  return (
    <div className="p-5">


 <div className={`  `}>

<div className="   flex flex-col md:flex-row gap-[25px]">
<div className=" flex-1 mt-5  w-[100%]">
  <h1 className=" text-[17px]  sm:text-[45px] font-[700] -tracking-tight  text-[#0AA195] ">The Power Of Subscription Economy</h1>
  <p className=" text-[12px] sm:text-[28px] " >
Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias inventore sunt ab enim! Expedita recusandae est reiciendis, at sequi eius dignissimos odio commodi, quam, possimus aliquid quisquam reprehenderit saepe sapiente.
  
  </p>



</div>

<div className=" flex-1 relative">
<Image src={"/hero.jpg"} alt="" fill />
</div>
</div>



<div className="mt-5">
  <h1 className="text-2xl font-bold  text-[#0AA195] "> Latest Blogs</h1>
<div className='grid grid-cols-1 py-2 md:grid-cols-2 lg:grid-cols-3 gap-5'>
  
  {
     // Expecting a possible null value from findSubscription
           // @ts-expect-error: findSubscription may return null, which we handle in the subsequent logic
    data.slice(-3).map((post: Post, index: number)=>{
      return(
        <div key={index}  className={`  ${styles.containe} shadow-xl p-5 rounded-md`}>


        <div className={styles.top}>
              <div className={styles.imgContainer}>
              <Image alt='' src={post.image_url} className={styles.img} fill/>
              </div>
            <span className={styles.dates}>01.01.2024</span>
        </div>
        
        <div className={styles.bottom}>
        <h1 className={styles.title}>{post.title}</h1>
           <p className={styles.desc} dangerouslySetInnerHTML={{__html: post.description}}></p>

           <button className="py-[10px] border-2 px-[18px] text-white text-sm rounded-md cursor-pointer bg-[#0AA195]" onClick={() => handleAction(post.id)}>Read More</button>
        
        {/* <Link className={styles.link} href={`/blog/${post.id}`}>READ MORE</Link> */}
        </div>
        </div>
      )
    })
  }

  

</div>

</div>





</div>

<Price />


</div>
    
  )

}

export default Hero



