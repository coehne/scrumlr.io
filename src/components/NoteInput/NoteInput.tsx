import React from "react";
import "./NoteInput.scss";
import {ReactComponent as PlusIcon} from "assets/icon-add.svg";
import {Actions} from "store/action";
import {useTranslation} from "react-i18next";
import {TabIndex} from "constants/tabIndex";
import {useDispatch} from "react-redux";

export interface NoteInputProps {
  columnId: string;
  tabIndex?: number;
  maxNoteLength: number;
}

export const NoteInput = ({columnId, tabIndex, maxNoteLength}: NoteInputProps) => {
  const {t} = useTranslation();
  const dispatch = useDispatch();
  const [value, setValue] = React.useState("");

  const handleChangeNotetext = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Avoid long messages
    if (e.target.value.length <= maxNoteLength) {
      setValue(e.target.value);
    }
  };
  const onAddNote = () => {
    if (value) {
      dispatch(Actions.addNote(columnId!, value));
      setValue("");
    }
  };
  return (
    <div className="note-input">
      <input
        className="note-input__input"
        placeholder={t("NoteInput.placeholder")}
        type="text"
        value={value}
        onChange={handleChangeNotetext}
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            onAddNote();
          }
        }}
        tabIndex={tabIndex ?? TabIndex.default}
      />
      <PlusIcon onClick={onAddNote} className="note-input__icon" />
    </div>
  );
};
