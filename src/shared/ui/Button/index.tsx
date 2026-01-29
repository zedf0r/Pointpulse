import type { MouseEvent, ReactNode } from "react";
import style from "./style.module.scss";

type TypeButtonProps = {
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  variant?: "primary" | "secondary";
};

export const Button = ({
  type = "button",
  children,
  onClick,
  variant = "primary",
}: TypeButtonProps) => {
  return (
    <button
      className={`${style.button} ${variant === "primary" ? style.primary : style.secondary}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
