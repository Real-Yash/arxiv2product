export interface AppSession {
  userId: string;
  name: string;
  role: string;
  source: "demo" | "supabase";
}

export async function getAppSession(): Promise<AppSession> {
  return {
    userId: process.env.NEXT_PUBLIC_DEMO_USER_ID || "demo-reviewer",
    name: "Maya Reviewer",
    role: "Reader / Reviewer",
    source: process.env.NEXT_PUBLIC_SUPABASE_URL ? "supabase" : "demo"
  };
}
