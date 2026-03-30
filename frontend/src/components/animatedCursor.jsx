import React, { useRef, useEffect, useState, useCallback } from 'react';

export function AnimatedCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const mouse = useRef({ x: -100, y: -100 });
  const ring = useRef({ x: -100, y: -100 });
  const [isHover, setIsHover] = useState(false);

  const onMouseMove = useCallback((e) => {
    mouse.current = { x: e.clientX, y: e.clientY };
    if (dotRef.current) {
      dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousemove', onMouseMove);
    return () => document.removeEventListener('mousemove', onMouseMove);
  }, [onMouseMove]);

  // Ring follows with elastic easing
  useEffect(() => {
    let animId;
    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.1;
      ring.current.y += (mouse.current.y - ring.current.y) * 0.1;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }
      animId = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animId);
  }, []);

  // Detect hoverable elements
  useEffect(() => {
    const onOver = () => setIsHover(true);
    const onOut = () => setIsHover(false);

    const attachListeners = () => {
      const clickables = document.querySelectorAll(
        'a, button, input[type="submit"], label[for], select, .link, [role="button"]'
      );
      clickables.forEach((el) => {
        el.style.cursor = 'none';
        el.addEventListener('mouseenter', onOver);
        el.addEventListener('mouseleave', onOut);
      });
    };

    // Initial + observe DOM changes
    attachListeners();
    const observer = new MutationObserver(attachListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, []);

  const dotSize = isHover ? 18 : 9;
  const ringSize = isHover ? 66 : 42;

  return (
    <>
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: dotSize,
          height: dotSize,
          background: 'var(--gold-warm)',
          borderRadius: '50%',
          mixBlendMode: 'screen',
          pointerEvents: 'none',
          zIndex: 10000,
          transition: 'width 0.25s, height 0.25s',
        }}
      />
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: ringSize,
          height: ringSize,
          border: `1px solid rgba(201,166,85, ${isHover ? 0.4 : 0.35})`,
          borderRadius: '50%',
          pointerEvents: 'none',
          zIndex: 10000,
          transition: 'width 0.25s, height 0.25s, border-color 0.25s',
        }}
      />
    </>
  );
}
