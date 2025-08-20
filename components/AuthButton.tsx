"use client";

import { useUser } from "@auth0/nextjs-auth0";
import axios from "axios";
import { LogIn, LogOut } from "lucide-react";
import React, { useEffect } from "react";

const AuthButton = () => {
  const { user } = useUser();
  console.log(user);
  useEffect(() => {
    if (user) {
      console.log(user);
      const saveUser = async () => {
        try {
          await axios.post("/api/user", user);
        } catch (error) {
          console.log("Auth_Button", error);
        }
      };
      saveUser();
    }
  }, [user]);

  return (
    <div>
      {!user ? (
        <a
          href="/auth/login"
          className=" bg-blue-900 px-4 py-2 rounded-xl text-sm mr-4 font-semibold hover:bg-blue-950 flex justify-center items-center gap-1"
        >
          <LogIn className="w-4 h-4" />
          Login
        </a>
      ) : (
        <a
          href="/auth/logout"
          className=" bg-blue-900 px-4 py-2 rounded-xl text-sm mr-4 font-semibold hover:bg-blue-950 flex justify-center items-center gap-1"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </a>
      )}
    </div>
  );
};

export default AuthButton;
