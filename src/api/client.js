import axios from "axios";

// API base URL from environment or fallback
const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:8000";

// Token helpers
const getAccessToken = () => localStorage.getItem("access_token");
const getRefreshToken = () => localStorage.getItem("refresh_token");
const setTokens = (access, refresh) => {
  if (access) localStorage.setItem("access_token", access);
  if (refresh) localStorage.setItem("refresh_token", refresh);
};
const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};

// Axios client instance
const client = axios.create({
  baseURL: API_BASE,
  headers: { "Content-Type": "application/json" },
});

// Attach access token to requests
client.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle token refresh and errors
let refreshing = null;
client.interceptors.response.use(
  (res) => res,
  async (err) => {
    const original = err.config;
    if (err.response?.status === 401 && !original._retry) {
      original._retry = true;
      const refresh = getRefreshToken();
      if (!refresh) {
        clearTokens();
        window.location.href = "/login";
        return Promise.reject(err);
      }
      try {
        if (!refreshing) {
          refreshing = axios.post(
            `${API_BASE}/auth/refresh-token`,
            null,
            { params: { refresh_token: refresh } }
          ).then((r) => {
            const { access_token, refresh_token } = r.data;
            setTokens(access_token, refresh_token);
            return access_token;
          });
        }
        const newToken = await refreshing;
        refreshing = null;
        original.headers.Authorization = `Bearer ${newToken}`;
        return client(original);
      } catch (e) {
        refreshing = null;
        clearTokens();
        window.location.href = "/login";
        return Promise.reject(e);
      }
    }
    // Improved error logging for debugging
    if (err.response) {
      // Log API errors for development
      // eslint-disable-next-line no-console
      console.error("API Error:", err.response.status, err.response.data);
    } else if (err.request) {
      // eslint-disable-next-line no-console
      console.error("Network Error:", err.message);
    }
    return Promise.reject(err);
  }
);

// Map backend job to frontend card shape
export function mapJobToCard(job, companyName = "Company") {
  // Defensive mapping for job card
  const salaryMin = job.salary_min != null ? job.salary_min : 0;
  const salaryMax = job.salary_max != null ? job.salary_max : 0;
  const salaryStr =
    salaryMin || salaryMax
      ? `$${salaryMin.toLocaleString()} - $${salaryMax.toLocaleString()}`
      : "Not specified";
  const created = job.created_at ? new Date(job.created_at) : new Date();
  const posted =
    Math.floor((Date.now() - created) / 86400000) === 0
      ? "Today"
      : `${Math.floor((Date.now() - created) / 86400000)} days ago`;
  return {
    id: job.id,
    title: job.title,
    company: companyName,
    location: job.location || "N/A",
    type: job.employment_type?.replace("-", " ") || "Full-time",
    salary: salaryStr,
    posted,
    category: "Job",
    description: job.description || "",
    workMode: job.employment_type === "remote" ? "Remote" : job.employment_type === "contract" ? "Contract" : "Hybrid",
    experience: job.experience_required || "N/A",
    skills: job.skills_required || [],
    company_id: job.company_id,
  };
}

// Auth
export async function login(email, password) {
  const { data } = await client.post("/auth/login", { email, password });
  return data;
}

export async function register(body) {
  const { data } = await client.post("/auth/register", body);
  return data;
}

export async function refreshToken() {
  const refresh = getRefreshToken();
  if (!refresh) throw new Error("No refresh token");
  const { data } = await client.post("/auth/refresh-token", null, {
    params: { refresh_token: refresh },
  });
  return data;
}

// Jobs
export async function getJobs(skip = 0, limit = 50) {
  const { data } = await client.get("/jobs", { params: { skip, limit } });
  return data;
}

export async function getJob(jobId) {
  const { data } = await client.get(`/jobs/${jobId}`);
  return data;
}

export async function applyToJob(jobId, coverLetter = "") {
  const params = coverLetter ? { cover_letter: coverLetter } : {};
  const { data } = await client.post(`/jobs/${jobId}/apply`, null, { params });
  return data;
}

// Search
export async function searchJobs(params = {}) {
  const { data } = await client.get("/search/jobs", { params });
  return data;
}

// User & applications
export async function getProfile(userId) {
  const { data } = await client.get(`/users/${userId}`);
  return data;
}

export async function getApplications(userId) {
  const { data } = await client.get(`/users/${userId}/applications`);
  return data;
}

// Company (for job detail)
export async function getCompany(companyId) {
  try {
    const { data } = await client.get(`/companies/${companyId}`);
    return data;
  } catch {
    return null;
  }
}

export { getAccessToken, setTokens, clearTokens, API_BASE };
