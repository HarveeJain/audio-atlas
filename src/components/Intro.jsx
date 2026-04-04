import { useEffect, useState } from "react";
import "./Intro.css";

export default function Intro({ onFinish }) {
  const messages = [
    "Close your eyes.",
    "The world is already speaking.",
    "Welcome to Audio Atlas."
  ];

  const [text, setText] = useState("");
  const [index, setIndex] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (index >= messages.length) {
      setTimeout(() => {
        setVisible(false);
        setTimeout(onFinish, 1000);
      }, 1500);
      return;
    }

    let charIndex = 0;
    const currentMessage = messages[index];

    const typing = setInterval(() => {
      setText(currentMessage.slice(0, charIndex + 1));
      charIndex++;

      if (charIndex === currentMessage.length) {
        clearInterval(typing);
        setTimeout(() => {
          setText("");
          setIndex(prev => prev + 1);
        }, 1200);
      }
    }, 50);

    return () => clearInterval(typing);
  }, [index]);

  return (
    <div className={`intro ${!visible ? "fade-out" : ""}`}>
      <h1 className="intro-text">{text}</h1>
    </div>
  );
}
