import classes from "@/styles/studentData.module.css";
import { Clear, RecordVoiceOver } from "@mui/icons-material";
import SuccessRate from "./SuccessRate";
import { useRef, useState } from "react";
import PdfBtn from "./PdfBtn";

function StudentData({ studentList, setIsOpened }) {
  const utteranceRef = useRef(null);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [displayedText, setDisplayedText] = useState("");

  const handleVoice = () => {
    if ("speechSynthesis" in window) {
      const text = `Hello! My name is ${studentList.studentName}. Roll: ${studentList.roll}, ID: ${studentList.studentID}. I am a trainee of Matlab South Upazila, Her Power Project, Web Development batch. Thank you very much for visiting my profile.`;
      const msg = new SpeechSynthesisUtterance();
      msg.text = text;

      msg.voice = speechSynthesis
        .getVoices()
        .find((voice) => voice.name === "Google UK English Female");
      window.speechSynthesis.speak(msg);
      utteranceRef.current = msg;
      setIsSpeaking(true);
      msg.onstart = () => {
        setIsSpeaking(true);
        startTypingAnimation(text);
      };
      msg.onend = () => {
        setIsSpeaking(false);
      };
    } else {
      console.log("Text-to-speech not supported by your browser.");
    }
  };

  const startTypingAnimation = (text) => {
    let index = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.substring(0, index));
      index++;
      if (index > text.length) {
        clearInterval(interval);
      }
    }, 70); // Adjust the typing speed as needed
  };

  return (
    <section className={classes.student__data}>
      <div className={classes.data__container}>
        <span
          className={classes.close}
          onClick={() => {
            window.speechSynthesis.cancel();
            setIsOpened(false);
          }}
        >
          {" "}
          <Clear />
        </span>
        <h3>Traine Information</h3>
        <div className={classes.basic_data}>
          <p>
            <span>Name : </span> <span>{studentList.studentName}</span>
          </p>
          <p>
            <span>Batch No. : </span> <span>{studentList.batchID}</span>
          </p>
          <p>
            <span>Roll : </span> <span>{studentList.roll}</span>
          </p>
          <p>
            <span>Student ID : </span> <span>{studentList.studentID}</span>
          </p>
          <p>
            <span>Class Activity : </span>{" "}
            <span>{studentList.classActivity} out of 10</span>
          </p>
          <p>
            <span className={classes.speak}>Vocalize : </span>{" "}
            <span onClick={handleVoice} className={classes.speak_btn}>
              <RecordVoiceOver />
            </span>
          </p>
        </div>
        <div>
          {isSpeaking && (
            <div className={classes.speak__popup}>
              <p>{displayedText}</p>
            </div>
          )}
        </div>
        <SuccessRate studentData={studentList} />
      </div>
    </section>
  );
}

export default StudentData;
