import Allblogs from "@/app/components/allblogs/allblogs";
import { redirect } from "next/navigation";
import Price from "@/app/components/subscription/subscription";
import { createClient } from "@/app/lib/supabase/client";

export const metadata = {
  title: "Blog details",
  description: "All blog details",
};

interface Subscription {
  created_at: string;
  customer_id: string | null;
  email: string;
  end_date: string | null;
  subscription_id: string | null;
}

const Blogs = async () => {

  const supabase = createClient();
  const user =  (await supabase.auth.getUser()).data.user;

  console.log(user);

  if (!user) {
    redirect('/login');
  }

  // Ensure user.email is a string, throw an error if it's undefined
  if (!user.email) {
    throw new Error("User email is undefined.");
  }

  console.log("sub data1");

  const data: Subscription[] = (await findSubscription(user.email)) || [];

   async function findSubscription(email:string){

    const { data, error } = await supabase
    .from("subscriptionData")
    .select('*')
    .eq('email', email);
   
    if(data){
        return data;
    }
    console.log(error);
    

}

  let isActivate: boolean = false;

  const isActiveCheck = () => {
    data.forEach((value: Subscription) => {
      isActivate = !value.end_date ? false : new Date(value.end_date) > new Date();
    });
  };

  isActiveCheck();

  return (
    <div className="">
      {isActivate ? (
        <Allblogs />
      ) : (
        <div>
          <h1 className="text-[24px] font-bold mt-[100px] p-5 text-center">
            Please Get Subscription
          </h1>
          <div className="container p-5">
            <Price />
          </div>
        </div>
      )}
    </div>
  );
};

export default Blogs;
