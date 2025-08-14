import React from "react";

export function Container({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`mx-auto max-w-5xl px-4 w-full ${className}`}>
      {children}
    </div>
  );
}
