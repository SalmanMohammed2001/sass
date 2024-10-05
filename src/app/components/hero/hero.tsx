"use client"





import Image from "next/image";



const Hero =  () => {
  return (
    <div>


 <div className={`  `}>

<div className="   flex flex-col md:flex-row gap-[25px]">

<div className=" flex-1 mt-5">
  <h1 className=" text-[28px] md:text-[45px] font-[700] -tracking-tight">The Power Of Subscription Economy</h1>
  <p className=" text-[18px] md:text-[28px]" >
  Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime The standard chunk of those interested.
  </p>



</div>

<div className=" flex-1 relative">
<Image src={"/hero.jpg"} alt="" fill />
</div>
</div>





</div>



</div>
    
  )

}

export default Hero



