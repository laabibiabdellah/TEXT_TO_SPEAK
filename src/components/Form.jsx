import { useEffect, useState } from "react";

export default function Form() {
  const [text, setText] = useState();
  const [language, setLanguage] = useState();
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    const fetchVoices = () => {
      const synth = window.speechSynthesis;
      const voices = synth.getVoices();
      setVoices(voices);
    };

    fetchVoices();

    window.speechSynthesis.addEventListener("voiceschanged", fetchVoices);

    return () => {
      window.speechSynthesis.removeEventListener("voiceschanged", fetchVoices);
    };
  }, []);

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
    <>
      <div className="form-content container">
        <form>
          <div className="mb-3">
            <div className="form-floating">
              <textarea
                className="form-control"
                placeholder="Leave a comment here"
                id="textInput"
                value={text}
                onChange={handleTextChange}
              ></textarea>
              <label htmlFor="textInput">Comments</label>
            </div>
          </div>
          <div className="mb-3">
            <select
              className="form-select"
              aria-label="Default select example"
              onChange={handleLanguageChange}
            >
              <option selected disabled>
                Select language
              </option>
              {voices?.map((lang, index) => (
                <option key={index} value={lang.lang}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>
          <button
            type="button"
            className="btn btn-info text-white"
            onClick={textToSpeech}
          >
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
