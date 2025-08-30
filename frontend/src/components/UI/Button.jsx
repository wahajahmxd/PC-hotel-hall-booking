import React from "react";
import { cn } from "../../lib/utils";  // Assuming you have a utility function for combining class names

// Main Button Component
export function Button({
  children,
  className,
  onClick,
  variant = "primary",  // Default to primary, you can change styles based on this
  size = "medium",      // Default to medium size
  disabled = false,
  ...props
}) {
  // Define button styles for different variants and sizes
  const baseStyles = "rounded font-semibold focus:outline-none transition-transform duration-150";
  const variants = {
    black: "bg-black text-white border-2 border-black",
    white: "bg-white text-black border-2 border-black",
  };

  const sizes = {
    small: "px-3 py-2 text-sm",
    medium: "px-5 py-3 text-base",
    large: "px-6 py-4 text-lg",
  };

  // Combine classes dynamically
  const buttonClasses = cn(
    baseStyles,
    variants[variant] || variants.black,  // Fallback to black if variant is not defined
    sizes[size] || sizes.medium,          // Fallback to medium size if size is not defined
    { "opacity-50 cursor-not-allowed": disabled },
    "hover:scale-105",
    className
  );

  return (
    <button
      className={buttonClasses}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
}
