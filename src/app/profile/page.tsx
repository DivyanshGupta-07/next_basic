"use client";
import React, { useState } from "react";
import axios from "axios";
import Link from "next/link";
import toast, { Toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("nothing");
  const getUserDetails = async () => {
    try {
      const res = await axios.post("/api/users/me");
      setData(res.data.data._id);
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  const logout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success("logout sucess");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
      toast.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>
      <hr />
      <h2>
        {data === "nothing" ? (
          "NO data to display"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={logout}
        className="bg-blue-500 mt-4 hover:bg-blue-700 
    text-white font-bold py-2 px-2 rounded"
      >
        Logout
      </button>
      <button
        onClick={getUserDetails}
        className="bg-green-500 mt-4 hover:bg-green-700 
    text-white font-bold py-2 px-2 rounded"
      >
        Get User Details
      </button>
    </div>
  );
}

export default ProfilePage;
