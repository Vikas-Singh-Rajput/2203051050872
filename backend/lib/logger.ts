
export async function Log(
  stack: "frontend" | "backend",
  level: "debug" | "info" | "warn" | "error",
  pkg: string,
  message: string
): Promise<void> {
  try {
    const res = await fetch("http://20.244.56.144/evaluation-service/logs", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        stack,
        level,
        package: pkg.toLowerCase(),
        message,
      }),
    });
    if (!res.ok) console.error("Failed to log:", res.statusText);
  } catch (err) {
    console.error("Logging Error:", err);
  }
}
