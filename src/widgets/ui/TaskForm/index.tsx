import style from "./style.module.scss";

export const TaskForm = ({
  title,
  description,
  index,
  onIndexChange,
  onTitleChange,
  onDescriptionChange,
}: {
  title: string;
  description: string;
  index: number;
  onIndexChange: (value: string) => void;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}) => {
  return (
    <form className={style.form}>
      <div className={style.form__input_box}>
        <label className={style.label} htmlFor="index_num">
          Номер позиции
        </label>
        <input
          className={style.input}
          type="number"
          name="index_num"
          id="index_num"
          min={1}
          value={index}
          onChange={(event) => {
            onIndexChange(event.target.value);
          }}
        />
      </div>

      <div className={style.form__input_box}>
        <label className={style.label} htmlFor="title">
          Заголовок
        </label>
        <input
          className={style.input}
          type="text"
          name="title"
          id="title"
          value={title}
          onChange={(event) => onTitleChange(event.target.value)}
        />
      </div>
      <div className={style.form__input_box}>
        <label className={style.label} htmlFor="description">
          Описание
        </label>
        <textarea
          className={style.textarea}
          name="description"
          id="description"
          value={description}
          onChange={(event) => onDescriptionChange(event.target.value)}
        ></textarea>
      </div>
    </form>
  );
};
