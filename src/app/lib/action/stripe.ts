"use server";


import Stripe from "stripe";

const stripe=new Stripe("sk_test_51PQTK101P3LearWwaoznX75Dd2MhxQASadDvjbrrTpVbASwwex071C7zZl0P4WPHf2XRnACJNANrRt7wwdMaWtmz00AmF4T0Mr")



export  const ckeckout=async(email:string,priceId:string,redirectTo:string)=>{

    console.log(email,priceId,redirectTo);
  
    
    

 return JSON.stringify( await stripe.checkout.sessions.create({
        success_url:redirectTo || process.env.SITE_URL,
        cancel_url:process.env.SITE_URL,
        customer_email:email,
        line_items:[{price:priceId,quantity:1}],
        mode:"subscription"
    }))


}

export async function manageBilling(customer_id:string){
 return   JSON.stringify(await stripe.billingPortal.sessions.create({
        customer:customer_id,
        return_url:process.env.SITE_URL
    }))
}
