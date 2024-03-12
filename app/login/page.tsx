"use client";

import React, { useEffect, useState } from "react";
import Head from "next/head";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import InstagramSVG from "@/components/svgComps/InstagramSVG";
import axios from "axios";
import { useRouter } from "next/navigation";
import { LoadingButton } from "@mui/lab";

export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [isLogin, setIsLogin] = useState<boolean | null>(null);

  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const onsubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);
    axios
      .post("https://insta-post-api.onrender.com/login", {
        email: data?.email,
        password: data?.password,
      })
      .then((res) => {
        setLoading(false);

        if (res && res.status === 200) {
          console.log(res);
          setIsLogin(true);
          localStorage.setItem("accessToken", res?.data?.token);
        } else {
          setIsLogin(false);
        }
      })
      .catch((error) => {
        console.log({ error });
        setIsLogin(false);
        setLoading(false);
      });
  };

  useEffect(() => {
    isLogin && router.push("/Home");
  }, [isLogin]);

  return (
    <div>
      <Head>
        <title>Login • Instagram</title>
        <meta name="description" content="Instagram Clone" />
        <link rel="icon" href="/instagram.png" />
      </Head>
      <div className="flex min-h-[100vh] w-full items-center justify-center bg-[#fafafa]">
        <div>
          <div className="flex w-[350px] flex-col items-center justify-center border border-stone-300 bg-white">
            <div className="h-auto w-[175px] py-10">
              <InstagramSVG disableDarkMode white={false} />
            </div>
            <div className="w-full px-5 sm:px-10">
              <form
                action=""
                className="signInPageFormContainer"
                onSubmit={handleSubmit(onsubmit)}
              >
                <label htmlFor="signInPageEmail">
                  {" "}
                  <input
                    className=" w-full border border-stone-300 bg-[#fafafa] px-2 py-[7px] text-sm focus:outline-none"
                    type="email"
                    id="signInPageEmail"
                    placeholder="Email address"
                    {...register("email", {
                      required: true,
                    })}
                  />
                </label>
                <p className="h-[20px] max-w-[220px] pb-2 text-[10px] text-red-600"></p>
                <label htmlFor="signInPagePassword">
                  {" "}
                  <input
                    className="w-full border border-stone-300 bg-[#fafafa] px-2 py-[7px] text-sm focus:outline-none"
                    type="password"
                    id="signInPagePassword"
                    placeholder="Password"
                    {...register("password", {
                      required: true,
                    })}
                  />
                </label>
                <p className="h-[20px] max-w-[220px] text-[10px] text-red-600">
                  {isLogin === false && "Incorrect Email or Password"}
                </p>
                <LoadingButton
                  className={
                    "mb-5 w-full rounded-[4px] bg-[#0064e0] px-2 py-1 text-sm font-semibold text-white"
                  }
                  loading={loading}
                  sx={{ width: "100%" }}
                  type="submit"
                  variant="contained"
                >
                  Log In
                </LoadingButton>
              </form>
            </div>
          </div>
          <div className="mt-2 flex max-w-[350px] justify-center border border-stone-300 bg-white py-5 text-[14px]">
            <p>Do not have an account?</p>
            <button className="ml-1 font-semibold text-[#0095f6]" type="button">
              Sign up
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
