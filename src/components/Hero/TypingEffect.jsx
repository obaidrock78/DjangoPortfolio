import { useState, useEffect } from "react";

/**
 * Types out text character by character with a blinking cursor (terminal style).
 */
export default function TypingEffect({ text = "", speed = 80, delay = 0, className = "" }) {
  const [display, setDisplay] = useState("");
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!text) return;
    const startTimer = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(startTimer);
  }, [text, delay]);

  useEffect(() => {
    if (!started || !text) return;
    if (display.length >= text.length) return;
    const timer = setTimeout(() => {
      setDisplay(text.slice(0, display.length + 1));
    }, speed);
    return () => clearTimeout(timer);
  }, [started, text, display, speed]);

  return (
    <span className={className}>
      {display}
      <span className="typing-cursor" aria-hidden="true">|</span>
    </span>
  );
}
