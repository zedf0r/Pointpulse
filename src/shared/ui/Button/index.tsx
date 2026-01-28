import type { MouseEvent, ReactNode } from "react";
import style from "./style.module.scss";

type TypeButtonProps = {
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
};

export const Button = ({
  type = "button",
  children,
  onClick,
}: TypeButtonProps) => {
  return (
    <button className={style.button} type={type} onClick={onClick}>
      {children}
    </button>
  );
};
