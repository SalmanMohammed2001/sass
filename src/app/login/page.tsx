"use client";

import { getUser, login, signup } from './users';
import { useState, useTransition } from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import { createClient } from '@/app/lib/supabase/client';

export default function LoginPage() {
  const [currState, setCurrState] = useState("Login");
  const [, startTransition] = useTransition();
  
  const [data, setData] = useState({
    displayName: '',
    email: '',
    password: '',
  });

  const [errors, setErrors] = useState({
    email: '',
    password: '',
  });

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePassword = (password: string) => {
    return password.length >= 6;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

   
    if (name === "email") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: validateEmail(value) ? "" : "Invalid email format",
      }));
    }

    if (name === "password") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: validatePassword(value) ? "" : "Password must be at least 6 characters",
      }));
    }
  };

  const handlerClickAction = (e: React.FormEvent) => {
    e.preventDefault();

    
    if (!validateEmail(data.email)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        email: "Invalid email format",
      }));
      return;
    }

    if (!validatePassword(data.password)) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password must be at least 6 characters",
      }));
      return;
    }

    if (currState === "Login") {
      startTransition(async () => {
        await login(data);
      });
    } else {
      startTransition(async () => {
        await signup(data);
      });
    }
  };

  const loginWithProvider = async (provider: "github" | "google") => {
    const supabase = createClient();
    const { error, data } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: window.location.origin + `/auth/callback`,
      },
    });

    if (error) {
      console.error('Error during login with provider:', error); 
      return; 
    }

    if (data) {
      const user = await getUser();
      console.log(user);
    }
  };

  return (
    <div className={"login-popup z-20 grid my-[100px]"}>
      <form onSubmit={handlerClickAction} className={"login-popup-container shadow-md"}>
        <div className={"login-popup-title flex justify-between items-center text-black"}>
          <h2 className={"text-[32px] font-bold"}>{currState}</h2>
        </div>

        <div className={"login-popup-input flex flex-col gap-[15px]"}>
          <input
            id="email"
            name="email"
            className={"outline-none p-[10px] border-[#c9c9c9] border-2 border-solid rounded-md"}
            type="email"
            placeholder={"Your Email"}
            value={data.email}
            onChange={handleChange}
            required
          />
          {errors.email && <p className="text-red-600">{errors.email}</p>} 

          <input
            id="password"
            name="password"
            className={"outline-none p-[10px] border-[#c9c9c9] border-2 border-solid rounded-md"}
            type="password"
            placeholder={"Your Password"}
            value={data.password}
            onChange={handleChange}
            required
          />
          {errors.password && <p className="text-red-600">{errors.password}</p>} 
        </div>

        <button
          type={"submit"}
          className={"border-none p-[10px] text-white bg-orange-600 text-[14px] cursor-pointer rounded-md"}
        >
          {currState === "Sign Up" ? "Create Account" : "Login"}
        </button>

        <button
          type={"button"}
          onClick={() => loginWithProvider("google")}
          className={"border-none m p-[10px] text-white bg-[#0AA195] text-[14px] cursor-pointer rounded-md flex items-center justify-center gap-[10px]"}
        >
          <FaGoogle /> Google
        </button>

        <button
          type={"button"}
          onClick={() => loginWithProvider("github")}
          className={"border-none p-[10px] text-white bg-[#0AA195] text-[14px] cursor-pointer rounded-md flex items-center justify-center gap-[10px]"}
        >
          <FaGithub /> GitHub
        </button>

        <div className="login-popup-condation flex items-start gap-[8px] mt-[-15px]">
          <input type="checkbox" className={"mt-[5px]"} required />
          <p className={"text-[11px]"}>By Continuing I agree to the terms of use & privacy policy</p>
        </div>

        {currState === "Login" ? (
          <p className={"text-[13px]"}>
            Create a new Account?{" "}
            <span className={"text-orange-600 font-[500] cursor-pointer"} onClick={() => setCurrState("Sign Up")}>
              Click Here
            </span>
          </p>
        ) : (
          <p className={"text-[13px]"}>
            Already have an account?{" "}
            <span className={"text-orange-600 font-[500] cursor-pointer"} onClick={() => setCurrState("Login")}>
              Login here
            </span>
          </p>
        )}
      </form>
    </div>
  );
}
