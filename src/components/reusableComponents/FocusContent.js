// components/FocusContent.js
"use client";

import { useEffect, useRef } from "react";

const FocusContent = ({ children }) => {
  const contentRef = useRef(null);

  useEffect(() => {
    console.log(contentRef);
    console.log(contentRef.current);
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  });

  return <div ref={contentRef}>{children}</div>;
};

export default FocusContent;
