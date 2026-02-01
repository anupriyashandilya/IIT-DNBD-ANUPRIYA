import React, { useState } from "react";
import "./VoiceBot.css";

const VoiceBot = () => {
  const [listening, setListening] = useState(false);
  const [response, setResponse] = useState("");
  const [speaking, setSpeaking] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState([]);
  const [question, setQuestion] = useState("");

  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = new SpeechRecognition();
  recognition.lang = "en-US";

  const startListening = () => {
    setError("");
    setListening(true);
    setQuestion("");
    recognition.start();

    recognition.onresult = async (event) => {
      const userQuestion = event.results[0][0].transcript;
      setQuestion(userQuestion);
      setListening(false);
      getAIResponse(userQuestion);
    };

    recognition.onerror = (event) => {
      setError("Error: " + event.error);
      setListening(false);
    };
  };

  const getAIResponse = async (userQuestion) => {
    try {
      const res = await fetch("/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userQuestion }),
      });

      const data = await res.json();
      setResponse(data.reply);
      setHistory([...history, { question: userQuestion, answer: data.reply }]);
      speak(data.reply);
    } catch (err) {
      setError("Connection error. Please try again.");
      console.error("Frontend error:", err);
    }
  };

  const speak = (text) => {
    setSpeaking(true);
    const utter = new SpeechSynthesisUtterance(text);
    utter.onend = () => setSpeaking(false);
    speechSynthesis.speak(utter);
  };

  const stopSpeaking = () => {
    speechSynthesis.cancel();
    setSpeaking(false);
  };

  return (
    <div className="voicebot-container">
      <div className="voicebot-card">
        <div className="voicebot-header">
          <h1>🎙️ AI Voice Bot</h1>
          <p className="subtitle">Speak your question and get instant answers</p>
        </div>

        <div className="voicebot-content">
          {error && <div className="error-message">{error}</div>}

          <div className="interaction-section">
            <button
              onClick={startListening}
              className={`mic-button ${listening ? "listening" : ""} ${speaking ? "speaking" : ""}`}
              disabled={listening || speaking}
            >
              <span className="mic-icon">🎤</span>
              <span className="button-text">
                {listening ? "Listening..." : speaking ? "Speaking..." : "Start Listening"}
              </span>
            </button>
            {speaking && (
              <button onClick={stopSpeaking} className="stop-button">
                <span className="stop-icon">⏹️</span>
                <span className="button-text">Stop</span>
              </button>
            )}
          </div>

          {question && (
            <div className="message-section user-message">
              <strong>You:</strong>
              <p>{question}</p>
            </div>
          )}

          {response && (
            <div className="message-section bot-message">
              <strong>Bot:</strong>
              <p>{response}</p>
            </div>
          )}

          {history.length > 0 && (
            <div className="history-section">
              <h3>Previous Conversations</h3>
              <div className="history-list">
                {history.map((item, index) => (
                  <div key={index} className="history-item">
                    <p><strong>Q:</strong> {item.question}</p>
                    <p><strong>A:</strong> {item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoiceBot;
