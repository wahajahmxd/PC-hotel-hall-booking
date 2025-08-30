import React from "react";

export function Label({ htmlFor, children, className = "" }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium text-gray-700 mb-1 block ${className}`}
    >
      {children}
    </label>
  );
}
