import { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  // बैकएंड का लाइव यूआरएल (बिना स्लैश के)
  const BACKEND_URL = "https://ai-saas-backend-e9u4.onrender.com";

  const generateAIContent = async () => {
    if (!prompt) return alert("Please type something!");
    setLoading(true);
    setResponse("");

    try {
      // /generate रूट पर POST रिक्वेस्ट
      const res = await axios.post(`${BACKEND_URL}/generate`, { prompt });
      setResponse(res.data.result);
    } catch (error) {
      console.error("Error:", error);
      setResponse("AI Response Failed. Please check if the server is awake.");
    } finally {
      setLoading(false);
    }
  };

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/history`);
      setHistory(res.data);
    } catch (error) {
      console.error("हिस्ट्री लोड नहीं हुई", error);
      alert("Could not load history. Is the backend live?");
    }
  };

  return (
    <div style={{ padding: "40px", fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", backgroundColor: "#0f172a", minHeight: "100-vh", color: "white" }}>
      <h1 style={{ color: "#38bdf8", fontSize: "2.5rem" }}>AI SaaS App 🚀</h1>
      <p style={{ color: "#94a3b8" }}>Generate professional AI content in seconds</p>

      <div style={{ marginTop: "30px" }}>
        <textarea
          rows="5"
          style={{
            width: "80%",
            maxWidth: "600px",
            padding: "15px",
            borderRadius: "12px",
            border: "1px solid #334155",
            backgroundColor: "#1e293b",
            color: "white",
            fontSize: "1rem"
          }}
          placeholder="e.g. Write a professional email for a job application"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <br />
        <button
          onClick={generateAIContent}
          disabled={loading}
          style={{
            marginTop: "15px",
            padding: "12px 30px",
            backgroundColor: loading ? "#64748b" : "#0284c7",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "0.3s"
          }}
        >
          {loading ? "AI is Thinking..." : "Generate AI Content ✨"}
        </button>
      </div>

      {response && (
        <div style={{
          marginTop: "40px",
          textAlign: "left",
          backgroundColor: "#1e293b",
          padding: "25px",
          borderRadius: "15px",
          display: "inline-block",
          maxWidth: "700px",
          borderLeft: "5px solid #38bdf8",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
        }}>
          <h3 style={{ color: "#38bdf8", marginTop: "0" }}>Result:</h3>
          <p style={{ whiteSpace: "pre-line", lineHeight: "1.6" }}>{response}</p>
        </div>
      )}

      <hr style={{ margin: "50px 0", borderColor: "#334155" }} />

      <button
        onClick={fetchHistory}
        style={{ background: "none", border: "none", color: "#38bdf8", cursor: "pointer", textDecoration: "underline", fontSize: "1.1rem" }}
      >
        View Previous Generations 📜
      </button>

      <div style={{ marginTop: "30px", display: "flex", flexDirection: "column", alignItems: "center", gap: "15px" }}>
        {history.map((item, index) => (
          <div key={index} style={{
            backgroundColor: "#1e293b",
            padding: "20px",
            borderRadius: "12px",
            width: "80%",
            maxWidth: "600px",
            textAlign: "left",
            border: "1px solid #334155"
          }}>
            <p style={{ fontSize: "0.75rem", color: "#64748b", marginBottom: "8px" }}>
              {new Date(item.date).toLocaleString()}
            </p>
            <p style={{ fontWeight: "bold", color: "#38bdf8" }}>Q: {item.prompt}</p>
            <p style={{ fontSize: "0.9rem", color: "#cbd5e1", marginTop: "10px", fontStyle: "italic" }}>
              A: {item.response.substring(0, 150)}...
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
