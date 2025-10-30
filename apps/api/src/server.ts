import express from "express";
import { z } from "zod";

const app = express();
app.use(express.json());

// Simple health route following modules pattern
app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "api", timestamp: new Date().toISOString() });
});

// Example typed route using Zod
const EchoSchema = z.object({ message: z.string().min(1) });
app.post("/echo", (req, res) => {
  const parsed = EchoSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: parsed.error.flatten() });
  }
  return res.json({ echo: parsed.data.message });
});

const port = Number(process.env.PORT ?? 4000);
app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`API listening on http://localhost:${port}`);
});

