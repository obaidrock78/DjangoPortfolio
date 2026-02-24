import React from "react";

function useEventListener(eventName, handler, element = document) {
  const savedHandler = React.useRef();

  React.useEffect(() => {
    savedHandler.current = handler;
  }, [handler]);

  React.useEffect(() => {
    const isSupported = element && element.addEventListener;
    if (!isSupported) return;
    const eventListener = (event) => savedHandler.current(event);
    element.addEventListener(eventName, eventListener);
    return () => element.removeEventListener(eventName, eventListener);
  }, [eventName, element]);
}

/**
 * Custom cursor: one dot + one ring with smooth follow.
 * Theme-colored (amber), scales on clickables/hover.
 */
export function AnimatedCursor({
  color = "245, 158, 11",
  innerSize = 8,
  outerSize = 48,
  outerBorderWidth = 1.5,
  followSpeed = 10,
}) {
  const innerRef = React.useRef(null);
  const outerRef = React.useRef(null);
  // const requestRef = React.useRef(null);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const [smoothPos, setSmoothPos] = React.useState({ x: 0, y: 0 });
  const [visible, setVisible] = React.useState(true);
  const [hovering, setHovering] = React.useState(false);
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
      setSmoothPos((prev) => ({
        x: prev.x + (targetRef.current.x - prev.x) / followSpeed,
        y: prev.y + (targetRef.current.y - prev.y) / followSpeed,
      }));
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [followSpeed]);

  React.useEffect(() => {
    if (!outerRef.current) return;
    outerRef.current.style.left = smoothPos.x + "px";
    outerRef.current.style.top = smoothPos.y + "px";
  }, [smoothPos]);

  const onMouseEnter = React.useCallback(() => setVisible(true), []);
  const onMouseLeave = React.useCallback(() => setVisible(false), []);

  useEventListener("mousemove", onMouseMove, document);
  useEventListener("mouseenter", onMouseEnter, document);
  useEventListener("mouseleave", onMouseLeave, document);

  React.useEffect(() => {
    document.body.style.cursor = visible ? "none" : "";
    return () => {
      document.body.style.cursor = "";
    };
  }, [visible]);

  React.useEffect(() => {
    const clickables = document.querySelectorAll(
      'a, button, input[type="submit"], input[type="button"], input[type="image"], label[for], select, [role="button"], .link'
    );
    const onOver = () => setHovering(true);
    const onOut = () => setHovering(false);
    clickables.forEach((el) => {
      el.style.cursor = "none";
      el.addEventListener("mouseover", onOver);
      el.addEventListener("mouseout", onOut);
    });
    return () => {
      clickables.forEach((el) => {
        el.style.cursor = "";
        el.removeEventListener("mouseover", onOver);
        el.removeEventListener("mouseout", onOut);
      });
    };
  }, []);

  const opacity = visible ? 1 : 0;
  const scale = hovering ? 1.4 : 1;

  const innerStyle = {
    position: "fixed",
    left: pos.x,
    top: pos.y,
    width: innerSize,
    height: innerSize,
    marginLeft: -innerSize / 2,
    marginTop: -innerSize / 2,
    borderRadius: "50%",
    background: `rgb(${color})`,
    pointerEvents: "none",
    zIndex: 99999,
    opacity,
    transition: "opacity 0.2s ease, transform 0.2s ease",
    boxShadow: `0 0 12px rgba(${color}, 0.5)`,
  };

  const outerStyle = {
    position: "fixed",
    width: outerSize,
    height: outerSize,
    marginLeft: -outerSize / 2,
    marginTop: -outerSize / 2,
    borderRadius: "50%",
    border: `${outerBorderWidth}px solid rgba(${color}, 0.45)`,
    background: "transparent",
    pointerEvents: "none",
    zIndex: 99998,
    opacity,
    transform: `scale(${scale})`,
    transition: "opacity 0.2s ease, transform 0.25s ease",
  };

  return (
    <>
      <div ref={innerRef} style={innerStyle} aria-hidden="true" />
      <div ref={outerRef} style={outerStyle} aria-hidden="true" />
    </>
  );
}
