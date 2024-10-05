"use client"





import Image from "next/image";
import Price from "../subscription/subscription";



const Hero =  () => {
  return (
    <div>


 <div className={`  `}>

<div className="   flex flex-col md:flex-row gap-[25px]">
<div className=" flex-1 mt-5  w-[100%]">
  <h1 className=" text-[17px]  sm:text-[45px] font-[700] -tracking-tight">The Power Of Subscription Economy</h1>
  <p className=" text-[12px] sm:text-[28px]" >
Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias inventore sunt ab enim! Expedita recusandae est reiciendis, at sequi eius dignissimos odio commodi, quam, possimus aliquid quisquam reprehenderit saepe sapiente.
  
  </p>



</div>

<div className=" flex-1 relative">
<Image src={"/hero.jpg"} alt="" fill />
</div>
</div>





</div>

<Price />

</div>
    
  )

}

export default Hero



