"use client";

import { useState } from "react";
import { login, register } from "../../lib/auth";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { toast } from "react-toastify";
import RedirectIfAuth from "@/components/RedirectIfAuth";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const router = useRouter();

  const isValidEmail = (value) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(value);
  };

  const validate = () => {
    if (
      !username ||
      !email ||
      !firstname ||
      !lastname ||
      !password ||
      !confirmPassword
    ) {
      toast.error("Please enter all the required fields");
      return false;
    } else if (isValidEmail()) {
      toast.error("Please enter valid email");
      return false;
    } else if (password.length < 6) {
      toast.error("Password too short");
      return false;
    } else if (password !== confirmPassword) {
      toast.error("Passwords don't match");
      return false;
    }
    return true;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (validate()) {
        const res = await register(
          username,
          email,
          password,
          firstname,
          lastname
        );
        if (res.success) {
          toast.success("User registration successful!");
          router.push("/login");
        } else {
            toast.error(res.message || "Error registering user")
        }
      }
    } catch (err) {
      toast.error("Couldn't register user!");
    }
  };

  return (
    <RedirectIfAuth>
      <form onSubmit={handleRegister} className="p-4 max-w-md mx-auto">
        <h1 className="text-2xl mb-4">Register</h1>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          placeholder="Email"
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          placeholder="First Name"
          value={firstname}
          onChange={(e) => setFirstname(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          placeholder="Last Name"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          className="border p-2 mb-2 w-full"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          className="border p-2 mb-4 w-full"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Register
        </button>
      </form>
    </RedirectIfAuth>
  );
}
