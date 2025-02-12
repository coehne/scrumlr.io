import classNames from "classnames";
import {Portal} from "components/Portal";
import {Color, getColorClassName} from "constants/colors";
import {Note as NoteModel} from "types/note";
import "./NoteDialog.scss";
import {NoteDialogComponents} from "./NoteDialogComponents";
import {Participant} from "../../types/participant";

interface NoteDialogProps {
  noteId?: string;
  text: string;
  authorId: string;
  columnName: string;
  columnColor: string;
  columnVisible: boolean;
  authorName: string;
  showAuthors: boolean;
  onClose: () => void;
  onDeleteOfParent: () => void;
  childrenNotes: Array<NoteModel & {authorName: string}>;
  viewer: Participant;
  moderating: boolean;
}

export const NoteDialog = (props: NoteDialogProps) => (
  <Portal
    onClose={props.onClose}
    className={classNames("note-dialog__portal", {
      "note-dialog__portal-moderation-visible": (props.viewer.role === "OWNER" || props.viewer.role === "MODERATOR") && props.moderating && props.columnVisible,
    })}
    hiddenOverflow
    centered
    disabledPadding
  >
    <div
      className={classNames(
        "note-dialog",
        getColorClassName(props.columnColor as Color),
        {"note-dialog__pointer-moderator": props.viewer.role === "OWNER" || props.viewer.role === "MODERATOR"},
        {"note-dialog__disabled-pointer": props.viewer.role === "PARTICIPANT"}
      )}
    >
      <NoteDialogComponents.Header columnName={props.columnName} />
      <NoteDialogComponents.Wrapper>
        <NoteDialogComponents.Note {...props} showUnstackButton={false} />
        {props.childrenNotes.map((note) => (
          <NoteDialogComponents.Note {...props} {...note} parentId={props.noteId} key={note.id} showUnstackButton noteId={note.id} authorId={note.author} />
        ))}
      </NoteDialogComponents.Wrapper>
    </div>
  </Portal>
);
