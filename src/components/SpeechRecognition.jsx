import "regenerator-runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect } from "react";
import { FaMicrophone } from "react-icons/fa";

const Speech = ({ handleTranscript }) => {
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (transcript && !listening) {
      handleTranscript(transcript);
    }
  }, [transcript, listening, handleTranscript]);

  //this will make it so we only stop listening when stop button is clicked
//   const startListening = () => SpeechRecognition.startListening({ continuous: true });
  //use the code bellow to make it stop listening when we stop talking
//   SpeechRecognition.startListening

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn`&lsquo;`t support speech recognition.</span>;
  }

  return (
    <div className="flex items-center gap-4">
      <p>Mic is {listening ? "on" : "off"}</p>
      <button
        className="bg-white rounded-full p-2"
        onMouseDown={SpeechRecognition.startListening}
        onMouseUp={SpeechRecognition.stopListening}
      >
        <FaMicrophone className={listening ? "text-green-600 text-xl" : "text-red-600 text-xl"}/>
      </button>
    </div>
  );
};

export default Speech;
