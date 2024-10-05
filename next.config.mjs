/** @type {import('next').NextConfig} */
const nextConfig = {

    images:{
        remotePatterns:[
            {
                protocol:'https', 
                hostname:'xfqedcxawymirmxohpox.supabase.co' //add host name
            }
        ]
    }
};

export default nextConfig;
