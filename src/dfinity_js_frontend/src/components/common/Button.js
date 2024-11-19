import React from "react";

const Button = ({ text, onClick, ariaLabel }) => (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-400 active:bg-blue-700"
      aria-label={ariaLabel}
    >
      {text}
    </button>
  );
  
  export default Button;
  