import { Button } from "../Button";
import style from "./style.module.scss";
import {
  useRef,
  type Dispatch,
  type MouseEvent,
  type ReactNode,
  type SetStateAction,
} from "react";

export const Modal = ({
  isOpen,
  onClose,
  children,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  onSubmit: () => void;
}) => {
  const ref = useRef(null);

  const handleClick = (event: MouseEvent) => {
    if (event.target === ref.current) {
      onClose(false);
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={style.overlay} ref={ref} onClick={handleClick}>
      <div className={style.modal}>
        <div className={style.button__close} onClick={() => onClose(false)}>
          <div></div>
          <div></div>
        </div>
        {children}
        <div className={style.modal__action}>
          <Button onClick={() => onClose(false)} variant="secondary">
            Отменить
          </Button>
          <Button onClick={onSubmit}>Подтвердить</Button>
        </div>
      </div>
    </div>
  );
};
