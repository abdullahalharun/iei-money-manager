"use client";

import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../src/lib/redux/store";
import { apiFetch } from "../../../src/lib/api";

export default function DashboardHome() {
  const token = useSelector((s: RootState) => s.auth.token);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [accounts, setAccounts] = useState<any[]>([]);
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    let cancelled = false;
    async function run() {
      try {
        setLoading(true);
        setError(null);
        const [accRes, txRes] = await Promise.all([
          apiFetch<{ data: any[] }>("/api/accounts", { token: token || undefined }),
          apiFetch<{ data: any[] }>("/api/transactions", { token: token || undefined })
        ]);
        if (!cancelled) {
          setAccounts(accRes.data);
          setTransactions(txRes.data);
        }
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Failed to load data");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    if (token) run();
    return () => {
      cancelled = true;
    };
  }, [token]);

  const totalBalance = useMemo(
    () => accounts.reduce((sum, a) => sum + (Number(a.balance) || 0), 0),
    [accounts]
  );

  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p style={{ color: "#c00" }}>{error}</p>;

  return (
    <div style={{ display: "grid", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
        <Card title="Total Balance" value={`$${totalBalance.toFixed(2)}`} />
        <Card title="Accounts" value={String(accounts.length)} />
        <Card title="Recent Transactions" value={String(transactions.length)} />
      </div>

      <section>
        <h3>Recent Transactions</h3>
        <ul>
          {transactions.slice(0, 5).map(t => (
            <li key={t.id}>
              {new Date(t.occurredAt).toLocaleDateString()} — ${t.amount} {t.note ? `- ${t.note}` : ""}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div style={{ border: "1px solid #eee", borderRadius: 8, padding: 16 }}>
      <div style={{ color: "#666", fontSize: 14 }}>{title}</div>
      <div style={{ fontSize: 24, fontWeight: 700 }}>{value}</div>
    </div>
  );
}
