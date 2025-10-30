import type { Metadata } from "next";
import { ReduxProvider } from "../src/lib/redux/provider";

export const metadata: Metadata = {
  title: "IEI Money Manager",
  description: "Manage your income, expenses, and investments"
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReduxProvider>{children}</ReduxProvider>
      </body>
    </html>
  );
}

