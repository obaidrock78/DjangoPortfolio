import React from "react";

function useEventListener(eventName, handler, element = document) {
  const savedHandler = React.useRef();
  React.useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);
  React.useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;
    const eventListener = (e) => savedHandler.current(e);
    element.addEventListener(eventName, eventListener);
    return () => element.removeEventListener(eventName, eventListener);
  }, [eventName, element]);
}

/**
 * V3 Matrix cursor: small square + crosshair-style trail.
 */
export function AnimatedCursor({
  color = "0, 255, 65",
  size = 6,
  trailSize = 40,
}) {
  const innerRef = React.useRef(null);
  const trailRef = React.useRef(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [trailPos, setTrailPos] = React.useState({ x: 0, y: 0 });
  const [visible, setVisible] = React.useState(true);
  const targetRef = React.useRef({ x: 0, y: 0 });

  const onMouseMove = React.useCallback((e) => {
    const { clientX, clientY } = e;
    setPos({ x: clientX, y: clientY });
    targetRef.current = { x: clientX, y: clientY };
    if (innerRef.current) {
      innerRef.current.style.left = clientX + "px";
      innerRef.current.style.top = clientY + "px";
    }
  }, []);

  React.useEffect(() => {
    let raf;
    const animate = () => {
      setTrailPos((prev) => ({
        x: prev.x + (targetRef.current.x - prev.x) * 0.15,
        y: prev.y + (targetRef.current.y - prev.y) * 0.15,
      }));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, []);

  React.useEffect(() => {
    if (!trailRef.current) return;
    trailRef.current.style.left = trailPos.x + "px";
    trailRef.current.style.top = trailPos.y + "px";
  }, [trailPos]);

  useEventListener("mousemove", onMouseMove, document);
  useEventListener("mouseenter", () => setVisible(true), document);
  useEventListener("mouseleave", () => setVisible(false), document);

  React.useEffect(() => {
    document.body.style.cursor = visible ? "none" : "";
    return () => { document.body.style.cursor = ""; };
  }, [visible]);

  const opacity = visible ? 1 : 0;

  return (
    <>
      <div
        ref={trailRef}
        style={{
          position: "fixed",
          width: trailSize,
          height: trailSize,
          marginLeft: -trailSize / 2,
          marginTop: -trailSize / 2,
          border: `1px solid rgba(${color}, 0.35)`,
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 99998,
          opacity,
          transition: "opacity 0.2s ease",
        }}
        aria-hidden="true"
      />
      <div
        ref={innerRef}
        style={{
          position: "fixed",
          width: size,
          height: size,
          marginLeft: -size / 2,
          marginTop: -size / 2,
          background: `rgb(${color})`,
          pointerEvents: "none",
          zIndex: 99999,
          opacity,
          boxShadow: `0 0 10px rgba(${color}, 0.6)`,
          transition: "opacity 0.2s ease",
        }}
        aria-hidden="true"
      />
    </>
  );
}
