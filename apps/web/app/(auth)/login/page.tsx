"use client";

import { useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { setAuth } from "../../../src/lib/redux/slices/authSlice";
import { apiFetch } from "../../../src/lib/api";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await apiFetch<{ data: { token: string; user: any } }>(
        "/api/auth/login",
        {
          method: "POST",
          body: JSON.stringify({ email, password })
        }
      );
      dispatch(setAuth({ user: res.data.user, token: res.data.token }));
      router.replace("/dashboard");
    } catch (err: any) {
      setError(err?.message || "Login failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ padding: 24, maxWidth: 420, margin: "80px auto", fontFamily: "system-ui, sans-serif" }}>
      <h1 style={{ fontSize: 28, marginBottom: 16 }}>Sign in</h1>
      <form onSubmit={onSubmit} style={{ display: "grid", gap: 12 }}>
        <label style={{ display: "grid", gap: 6 }}>
          <span>Email</span>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            style={{ padding: 10, border: "1px solid #ddd", borderRadius: 6 }}
          />
        </label>
        <label style={{ display: "grid", gap: 6 }}>
          <span>Password</span>
          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            style={{ padding: 10, border: "1px solid #ddd", borderRadius: 6 }}
          />
        </label>
        {error && <p style={{ color: "#c00", fontSize: 14 }}>{error}</p>}
        <button
          type="submit"
          disabled={loading}
          style={{
            padding: "10px 14px",
            borderRadius: 6,
            border: "1px solid transparent",
            background: "#111827",
            color: "white"
          }}
        >
          {loading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </main>
  );
}
