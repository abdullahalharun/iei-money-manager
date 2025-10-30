"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../src/lib/redux/store";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const { isAuthenticated } = useSelector((s: RootState) => s.auth);

    useEffect(() => {
        if (!isAuthenticated) {
            router.replace("/login");
        }
    }, [isAuthenticated, router]);

    if (!isAuthenticated) return null;

    return (
        <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", minHeight: "100vh" }}>
            <aside style={{ borderRight: "1px solid #eee", padding: 16 }}>
                <h2 style={{ fontWeight: 700, marginBottom: 16 }}>IEI</h2>
                <nav style={{ display: "grid", gap: 8 }}>
                    <Link href="/dashboard">Dashboard</Link>
                    <Link href="/dashboard/accounts">Accounts</Link>
                    <Link href="/dashboard/transactions">Transactions</Link>
                    <Link href="/dashboard/categories">Categories</Link>
                    <Link href="/dashboard/budgets">Budgets</Link>
                    <Link href="/dashboard/investments">Investments</Link>
                </nav>
            </aside>
            <div>
                <header style={{ padding: 16, borderBottom: "1px solid #eee" }}>
                    <span>Dashboard</span>
                </header>
                <main style={{ padding: 16 }}>{children}</main>
            </div>
        </div>
    );
}
