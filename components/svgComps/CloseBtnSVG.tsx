import React from "react";

function CloseBtnSVG() {
  return (
    <svg
      id="close"
      aria-label="Close"
      color={"#f1f5f9"}
      height={20}
      role="img"
      viewBox="0 0 24 24"
      width={20}
    >
      <polyline
        id="close"
        fill="none"
        points="20.643 3.357 12 12 3.353 20.647"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
      />
      <line
        id="close"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        x1="20.649"
        x2="3.354"
        y1="20.649"
        y2="3.354"
      />
    </svg>
  );
}

export default CloseBtnSVG;
