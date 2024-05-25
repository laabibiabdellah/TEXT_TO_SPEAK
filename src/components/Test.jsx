import React, { useState } from "react";

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en-US");

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleLanguageChange = (event) => {
    setLanguage(event.target.value);
  };

  const textToSpeech = () => {
    if ("speechSynthesis" in window) {
      let utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      window.speechSynthesis.speak(utterance);
    } else {
      alert("Sorry, your browser does not support the Web Speech API.");
    }
  };

  return (
    <div>
      <h1>Text to Speech Converter</h1>
      <textarea
        rows="10"
        cols="30"
        placeholder="Type your text here..."
        value={text}
        onChange={handleTextChange}
      />
      <br />
      <select value={language} onChange={handleLanguageChange}>
        <option value="en-US">English (US)</option>
        <option value="en-GB">English (UK)</option>
        <option value="es-ES">Spanish (Spain)</option>
        <option value="fr-FR">French</option>
        <option value="de-DE">German</option>
        <option value="it-IT">Italian</option>
        <option value="zh-CN">Chinese (Simplified)</option>
        {/* Add more languages as needed */}
      </select>
      <br />
      <button onClick={textToSpeech}>Speak</button>
    </div>
  );
};

export default TextToSpeech;
