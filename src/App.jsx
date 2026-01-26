import { useState } from "react";
import axios from "axios";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState([]);

  const generateAIContent = async () => {
    if (!prompt) return alert("Please type something!");

    setLoading(true);
    setResponse("");

    try {
      // आपके बैकएंड सर्वर को रिक्वेस्ट भेज रहा है
      const res = await axios.post("https://ai-saas-backend-e9u4.onrender.com", { prompt });
      setResponse(res.data.result);
    } catch (error) {
      console.error("Error:", error);
      setResponse("AI Response Failed. Please check server.");
    } finally {
      setLoading(false);
    }
  };

  // इतिहास लोड करने के लिए फंक्शन
  const fetchHistory = async () => {
    try {
      const res = await axios.get("https://ai-saas-backend-e9u4.onrender.com/history");
      setHistory(res.data);
    } catch (error) {
      console.error("हिस्ट्री लोड नहीं हुई", error);
    }
  };

  return (
    <div style={{ padding: "50px", fontFamily: "Arial", textAlign: "center" }}>
      <h1>AI SaaS App 🚀</h1>
      <p>Enter a topic to generate content</p>

      <div style={{ marginTop: "20px" }}>
        <textarea
          rows="5"
          cols="50"
          placeholder="e.g. Write a tagline for a coffee shop"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          style={{ padding: "10px", borderRadius: "10px", border: "1px solid #ccc" }}
        />
        <br />
        <button
          onClick={generateAIContent}
          disabled={loading}
          style={{
            marginTop: "10px",
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer"
          }}
        >
          {loading ? "Generating..." : "Generate AI Content"}
        </button>
        <button onClick={fetchHistory} className="text-cyan-400 mt-4 underline">
          View Previous Generations 📜
        </button>

        <div className="mt-8 w-full max-w-2xl">
          {history.map((item, index) => (
            <div key={index} className="bg-[#1e293b] p-4 mb-3 rounded-lg border border-gray-700">
              <p className="text-xs text-gray-500">{new Date(item.date).toLocaleString()}</p>
              <p className="text-cyan-300 font-bold">Q: {item.prompt}</p>
              <p className="text-gray-300 text-sm mt-2 line-clamp-2 italic">A: {item.response}</p>
            </div>
          ))}
        </div>

      </div>

      {response && (
        <div style={{
          marginTop: "30px",
          textAlign: "left",
          backgroundColor: "#f4f4f4",
          padding: "20px",
          borderRadius: "10px",
          display: "inline-block",
          maxWidth: "600px"
        }}>
          <h3>Result:</h3>
          <p style={{ whiteSpace: "pre-line" }}>{response}</p>
        </div>
      )}
    </div>
  );
}

export default App;
