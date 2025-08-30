import React from "react";
import { cn } from "../../lib/utils.js";

export function Card({ className, children, ...props }) {
  return (
    <div
      className={cn("rounded-2xl border bg-white shadow p-6", className)}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ className, children, ...props }) {
  return (
    <div className={cn("text-base text-gray-700", className)} {...props}>
      {children}
    </div>
  );
}

export function CardImage({ src, alt, className, ...props }) {
  return (
    <div className={cn("relative w-full h-56 overflow-hidden rounded-t-2xl", className)}>
      <img
        className="object-cover w-full h-full"
        src={src}
        alt={alt}
        {...props}
      />
    </div>
  );
}

export function CardTitle({ className, children }) {
  return (
    <h2 className={cn("text-xl font-semibold text-gray-900", className)}>
      {children}
    </h2>
  );
}

export function CardActions({ className, children }) {
  return (
    <div className={cn("mt-4 flex justify-end space-x-2", className)}>
      {children}
    </div>
  );
}
