import React from "react";

export function Select({
  value,
  onChange,
  options,
  label,
  placeholder = "Select an option",
  className = "",
  ...props
}) {
  return (
    <div className={`relative ${className}`}>
      {label && <label className="block text-sm font-medium text-gray-700 mb-2">{label}</label>}

      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="rounded-md border px-4 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        {...props}
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
