import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [showHistory, setShowHistory] = useState(false);

  // बैकएंड का लाइव यूआरएल (पक्का करें कि यही है)
  const BACKEND_URL = "https://ai-saas-backend-e9u4.onrender.com";

  // AI कंटेंट जनरेट करने का फंक्शन
  const generateAIContent = async () => {
    if (!prompt) return alert("Please type something!");
    setLoading(true);
    setResponse("");

    try {
      // ध्यान दें: अंत में /generate लगाया गया है
      const res = await axios.post(`${BACKEND_URL}/generate`, { prompt });
      setResponse(res.data.result);
      // जनरेट होने के बाद ऑटोमेटिक हिस्ट्री रिफ्रेश करें
      fetchHistory();
    } catch (error) {
      console.error("Error:", error);
      setResponse("AI failed to respond. Please check if backend is live.");
    } finally {
      setLoading(false);
    }
  };

  // हिस्ट्री लोड करने का फंक्शन
  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${BACKEND_URL}/history`);
      setHistory(res.data);
      setShowHistory(true);
    } catch (error) {
      console.error("History Error:", error);
    }
  };

  return (
    <div style={{ padding: "40px 20px", fontFamily: "'Inter', sans-serif", backgroundColor: "#0f172a", minHeight: "100vh", color: "white", textAlign: "center" }}>

      {/* Header */}
      <div style={{ marginBottom: "40px" }}>
        <h1 style={{ color: "#38bdf8", fontSize: "3rem", fontWeight: "800", marginBottom: "10px" }}>AI SaaS Hub 🚀</h1>
        <p style={{ color: "#94a3b8", fontSize: "1.1rem" }}>Powered by Gemini 1.5 Flash • 2026 Edition</p>
      </div>

      {/* Input Section */}
      <div style={{ marginBottom: "30px" }}>
        <textarea
          rows="5"
          style={{
            width: "100%",
            maxWidth: "700px",
            padding: "20px",
            borderRadius: "16px",
            border: "1px solid #334155",
            backgroundColor: "#1e293b",
            color: "white",
            fontSize: "1rem",
            outline: "none",
            boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
          }}
          placeholder="e.g. Write a LinkedIn post about AI trends in 2026..."
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
        />
        <br />
        <button
          onClick={generateAIContent}
          disabled={loading}
          style={{
            marginTop: "20px",
            padding: "15px 40px",
            backgroundColor: loading ? "#475569" : "#0284c7",
            color: "white",
            border: "none",
            borderRadius: "12px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "1rem",
            transition: "all 0.3s ease"
          }}
        >
          {loading ? "AI is Thinking... 🧠" : "Generate Content ✨"}
        </button>
      </div>

      {/* Main Result Display */}
      {response && (
        <div style={{
          marginTop: "40px",
          textAlign: "left",
          backgroundColor: "#1e293b",
          padding: "30px",
          borderRadius: "20px",
          display: "inline-block",
          width: "100%",
          maxWidth: "700px",
          borderLeft: "6px solid #38bdf8",
          boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2)"
        }}>
          <h3 style={{ color: "#38bdf8", marginTop: "0", display: "flex", justifyContent: "space-between" }}>
            Result
            <button onClick={() => navigator.clipboard.writeText(response)} style={{ fontSize: "0.8rem", color: "#94a3b8", cursor: "pointer", background: "none", border: "1px solid #334155", padding: "4px 10px", borderRadius: "6px" }}>Copy 📋</button>
          </h3>
          <p style={{ whiteSpace: "pre-line", lineHeight: "1.7", color: "#e2e8f0" }}>{response}</p>
        </div>
      )}

      <div style={{ margin: "60px auto", width: "100%", maxWidth: "700px" }}>
        <button
          onClick={fetchHistory}
          style={{ background: "none", border: "1px solid #334155", color: "#94a3b8", cursor: "pointer", padding: "10px 20px", borderRadius: "10px", transition: "0.3s" }}
          onMouseOver={(e) => e.target.style.color = "#38bdf8"}
          onMouseOut={(e) => e.target.style.color = "#94a3b8"}
        >
          {showHistory ? "Refresh History 🔄" : "View Recent History 📜"}
        </button>

        {/* History List */}
        {showHistory && (
          <div style={{ marginTop: "30px", display: "flex", flexDirection: "column", gap: "15px" }}>
            {history.map((item, index) => (
              <div key={index} style={{
                backgroundColor: "#1e293b",
                padding: "20px",
                borderRadius: "16px",
                textAlign: "left",
                border: "1px solid #334155",
                opacity: "0.9"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                  <span style={{ fontSize: "0.75rem", color: "#64748b" }}>{new Date(item.date).toLocaleString()}</span>
                </div>
                <p style={{ fontWeight: "bold", color: "#38bdf8", margin: "0" }}>Q: {item.prompt}</p>
                <p style={{ fontSize: "0.9rem", color: "#94a3b8", marginTop: "10px", fontStyle: "italic", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: "2", WebkitBoxOrient: "vertical" }}>
                  A: {item.response}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>

      <footer style={{ marginTop: "50px", color: "#475569", fontSize: "0.8rem" }}>
        © 2026 Sumit Singh | AI SaaS Project
      </footer>
    </div>
  );
}

export default App;
