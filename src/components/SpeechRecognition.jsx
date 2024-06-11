import "regenerator-runtime";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { useEffect } from "react";
import { FaMicrophone } from "react-icons/fa";
import { GrPowerReset } from "react-icons/gr";

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
  }, [transcript, listening]);

  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="flex items-center gap-4">
      <p>Mic: {listening ? "on" : "off"}</p>
      <button
        className="bg-white rounded-full p-2"
        onClick={SpeechRecognition.startListening}
      >
        <FaMicrophone className="text-green-600 text-xl"/>
      </button>
      <button
        className="bg-white rounded-full p-2"
        onClick={SpeechRecognition.stopListening}
      >
       <FaMicrophone className="text-red-600 text-xl"/>
      </button>
      {/* <button className="bg-white rounded-full p-2" onClick={resetTranscript}>
      <GrPowerReset className="text-black text-xl"/>
      </button> */}
    </div>
  );
};
//   const {
//     transcript,
//     listening,
//     resetTranscript,
//     browserSupportsSpeechRecognition,
//   } = useSpeechRecognition();

//   const startListening = () => {
//     resetTranscript()
//     SpeechRecognition.startListening({continuous: false})
//   }

//   if (!browserSupportsSpeechRecognition) {
//     return <span>Browser does not support speech recognition.</span>;
//   }

//   if (transcript && !listening) {
//     onTranscriptReceived(transcript);
//   }
//   return (
//     <div>
//       <button onClick={startListening}>{listening ? "Listening..." : "Start Voice Search"}</button>
//     </div>
//   );
// };

export default Speech;
