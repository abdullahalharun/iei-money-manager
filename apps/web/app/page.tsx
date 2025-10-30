export default function HomePage() {
  return (
    <main
      style={{
        padding: "48px 24px",
        maxWidth: 800,
        margin: "0 auto",
        fontFamily: "system-ui, sans-serif"
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
        IEI Money Manager
      </h1>
      <p style={{ fontSize: "1.2rem", marginBottom: "2rem", color: "#666" }}>
        Manage your income, expenses, and investments
      </p>

      <div style={{ marginTop: "2rem" }}>
        <h2 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>
          Getting Started
        </h2>
        <p style={{ marginBottom: "1rem" }}>
          Welcome! This is the IEI Money Manager application.
        </p>
        <p style={{ marginBottom: "1rem" }}>
          The backend API is running at{" "}
          <a
            href="http://localhost:4000"
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: "#0070f3" }}
          >
            http://localhost:4000
          </a>
        </p>

        <h3 style={{ fontSize: "1.2rem", marginTop: "2rem" }}>Test the API</h3>
        <ul style={{ marginTop: "0.5rem", paddingLeft: "1.5rem" }}>
          <li>
            <a
              href="http://localhost:4000/health"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0070f3" }}
            >
              Health Check
            </a>
          </li>
          <li>
            <a
              href="http://localhost:4000/api/accounts"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0070f3" }}
            >
              Accounts
            </a>
          </li>
          <li>
            <a
              href="http://localhost:4000/api/categories"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#0070f3" }}
            >
              Categories
            </a>
          </li>
        </ul>

        <p style={{ marginTop: "2rem", fontSize: "0.9rem", color: "#999" }}>
          Built with Next.js, Redux Toolkit, Express, Prisma, and PostgreSQL
        </p>
      </div>
    </main>
  );
}

