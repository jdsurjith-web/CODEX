const API_URL = "http://localhost:8000";

export async function analyzeWaste(data) {
  const response = await fetch(`${API_URL}/api/analyze`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to analyze waste");
  }

  return await response.json();
}

export async function checkBackend() {
  const response = await fetch(`${API_URL}/api/health`);

  if (!response.ok) {
    throw new Error("Backend unavailable");
  }

  return await response.json();
}