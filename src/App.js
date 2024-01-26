import { useEffect, useState } from "react";
import "./App.css";
import { HiVolumeUp } from "react-icons/hi";
import AWS from "./aws";

function App() {
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [audio, setAudio] = useState(null);

  useEffect(() => {
    return () => {
      if (audio) {
        audio.pause();
        audio.removeEventListener("canplaythrough", handleAudio);
      }
    };
  }, [audio]);

  const handleAudio = async () => {
    try {
      if (isLoading || text.trim().length == 0) return;

      setIsLoading(true);

      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }

      const polly = new AWS.Polly();

      const params = {
        Text: text,
        OutputFormat: "mp3",
        VoiceId: "Joanna",
      };

      const data = await polly.synthesizeSpeech(params).promise();
      const audioBlob = new Blob([data.AudioStream], { type: "audio/mpeg" });
      const url = URL.createObjectURL(audioBlob);

      const newAudio = new Audio(url);

      setAudio(newAudio);

      newAudio.addEventListener("canplaythrough", () => {
        setIsLoading(false);
        newAudio.play();
      });
    } catch (error) {
      console.error("Error converting text to speech:", error);
    }
  };

  return (
    <div className="flex items-center justify-center flex-col w-full h-screen">
      <div className="flex justify-between items-center relative rounded-md border border-gray-200 pb-3 pt-1 px-4 w-full md:w-75% lg:w-50%">
        <textarea
          type="text"
          placeholder="Start typing..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={2}
          className="resize-none flex-1 outline-none pt-5"
        />

        <button
          className="bg-black h-10 w-10 rounded-full flex items-center justify-center m-1"
          onClick={handleAudio}
        >
          <HiVolumeUp color="#efefef" size={20} />
        </button>
      </div>
    </div>
  );
}

export default App;
