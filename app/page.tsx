"use client";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import Login from "./login/page";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.push("/login");
  }, []);

  return <Login />;
}
