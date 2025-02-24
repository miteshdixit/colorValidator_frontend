import React, { useState } from "react";
import axios from "axios";

const ChatBot = () => {
  const [userInput, setUserInput] = useState("");
  const [messages, setMessages] = useState([]);

  const apiKey = "AIzaSyCfNRKzLJa4HOsIWWcX9SDV07SeblugRo0";
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const handleSend = async () => {
    if (!userInput.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: userInput }]);

    const requestBody = {
      contents: [{ parts: [{ text: userInput }] }],
    };

    try {
      const response = await axios.post(apiUrl, requestBody);
      const botReply =
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        "Sorry, I didn't get that.";

      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (error) {
      console.error("API Error:", error);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: "An error occurred. Please try again later." },
      ]);
    }

    setUserInput("");
  };

  return (
    <div className="flex flex-col h-[400px] p-4 bg-gray-100 rounded-xl shadow-lg">
      {/* Chat Area */}
      <h1 className="text-center font-bold p-1">I'm Here To Help You!</h1>
      <div className="flex-1 overflow-y-auto  rounded-xl  p-4 space-y-2 relative bg-grey-300">
        <img
          className="h-60 w-50 absolute top-10 left-10 opacity-10 "
          src="/robot.jpg"
          alt="chat-bot"
        />
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-lg max-w-xs ${
              msg.sender === "user"
                ? "ml-5 bg-blue-700 text-white"
                : "mr-5 bg-green-400 text-black"
            }`}
          >
            {msg.text}
          </div>
        ))}
      </div>

      {/* Input Box */}
      <div className="mt-4 flex">
        <input
          type="text"
          className="flex-1 p-2 rounded-l-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type your message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button
          onClick={handleSend}
          className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600 ml-1"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
