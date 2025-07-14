"use client";

import { useState } from "react";
import { login } from "../../lib/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import RedirectIfAuth from "@/components/RedirectIfAuth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();
  const { setUser } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await login(username, password);
      if (res.success) {
        setUser(res.user);
        toast.success("User login successful!");
        router.push("/dashboard");
      }
    } catch (err) {
      toast.error("Invalid credentials");
    }
  };

  return (
    <RedirectIfAuth>
      <form onSubmit={handleLogin} className="p-4 max-w-md mx-auto">
        <h1 className="text-2xl mb-4">Login</h1>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Login
        </button>
      </form>
    </RedirectIfAuth>
  );
}
