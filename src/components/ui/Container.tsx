import type { ReactNode } from "react";

interface ContainerProps {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "main";
}

/**
 * Standard editorial layout container capped at 1320px with responsive horizontal gutters.
 */
export function Container({
  children,
  className = "",
  as: Component = "div",
}: ContainerProps) {
  return (
    <Component
      className={`mx-auto w-full max-w-[1320px] px-4 sm:px-6 lg:px-8 ${className}`}
    >
      {children}
    </Component>
  );
}
