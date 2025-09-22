const API_URL = "https://ai-mentor-b7hg.onrender.com";

export async function signup(email, password) {
  const res = await fetch(`${API_URL}/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });

  const data = await res.json();
  
  // Check if request was successful
  if (!res.ok) {
    throw new Error(data.error || 'Signup failed');
  }

  // saving the token to local storage
  if (data.token) {
    localStorage.setItem("token", data.token);
  }
  
  return data;
}

export async function login(email, password) {
  const res = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  
  const data = await res.json();
  
  // Check if request was successful
  if (!res.ok) {
    throw new Error(data.error || 'Login failed');
  }
  
  if (data.token) {
    localStorage.setItem("token", data.token);
  }
  
  return data;
}

export async function getMe() {
  const token = localStorage.getItem("token");
  const res = await fetch(`${API_URL}/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
}