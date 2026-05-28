 "use client";

import { useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function login(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <form onSubmit={login} className="w-full max-w-md rounded-3xl bg-white p-6 shadow-xl">
      <h1 className="text-2xl font-black">Admin Login</h1>

      <input
        className="mt-5 w-full rounded-xl border px-4 py-3"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        className="mt-3 w-full rounded-xl border px-4 py-3"
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button className="mt-5 w-full rounded-xl bg-cyan-600 px-4 py-3 font-bold text-white">
        Login
      </button>
    </form>
  );
}