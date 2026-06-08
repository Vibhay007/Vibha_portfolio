import React, { useEffect, useState, useRef } from "react";
import "./Cursor.css";

const Cursor = () => {
  // Keep states only for class changes (pointer, clicking) since they don't fire 200 times a second
  const [isPointer, setIsPointer] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  // Use refs to directly update position via DOM—bypassing heavy React re-renders
  const dotRef = useRef(null);
  const outlineRef = useRef(null);

  useEffect(() => {
    // Hidden state flag to completely disable custom cursor on touch devices safely
    if (window.innerWidth <= 768) return;

    const handleMouseMove = (e) => {
      const { clientX: x, clientY: y } = e;

      // Directly update inline styles bypassing React's virtual DOM diffing engine
      if (dotRef.current) {
        dotRef.current.style.left = `${x}px`;
        dotRef.current.style.top = `${y}px`;
      }
      
      if (outlineRef.current) {
        outlineRef.current.style.left = `${x}px`;
        outlineRef.current.style.top = `${y}px`;
      }

      // Check if the current element under the mouse is interactive
      const target = e.target;
      if (target) {
        const isHoverable = window.getComputedStyle(target).cursor === "pointer";
        setIsPointer(isHoverable);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    // Track mouse entering/leaving the window to hide/show the custom elements smoothly
    const handleMouseLeave = () => {
      if (dotRef.current) dotRef.current.style.opacity = "0";
      if (outlineRef.current) outlineRef.current.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      if (dotRef.current) dotRef.current.style.opacity = "1";
      if (outlineRef.current) outlineRef.current.style.opacity = "1";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, []);

  return (
    <>
      <div 
        ref={dotRef}
        className={`cursor-dot ${isPointer ? "pointer" : ""} ${isClicking ? "clicking" : ""}`}
      />
      <div 
        ref={outlineRef}
        className={`cursor-outline ${isPointer ? "pointer" : ""} ${isClicking ? "clicking" : ""}`}
      />
    </>
  );
};

export default Cursor;