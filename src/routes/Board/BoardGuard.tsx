import {useEffect} from "react";
import store, {useAppSelector} from "store";
import {Actions} from "store/action";
import {LoadingIndicator} from "components/LoadingIndicator";
import "./BoardGuard.scss";
import {PassphraseDialog} from "components/PassphraseDialog";
import {useParams} from "react-router";
import {useTranslation} from "react-i18next";
import {Button} from "components/Button";
import {Board} from "./Board";

export const BoardGuard = () => {
  const {boardId} = useParams<"boardId">();
  const {t} = useTranslation();

  const boardStatus = useAppSelector((state) => state.board.status);

  useEffect(() => {
    store.dispatch(Actions.joinBoard(boardId!));

    return () => {
      store.dispatch(Actions.leaveBoard());
    };
  }, [boardId]);

  if (boardStatus === "accepted" || boardStatus === "ready") {
    return <Board />;
  }

  if (boardStatus === "passphrase_required") {
    return (
      <PassphraseDialog
        onSubmit={(passphrase: string) => {
          store.dispatch(Actions.joinBoard(boardId!, passphrase));
        }}
      />
    );
  }

  if (boardStatus === "incorrect_passphrase") {
    return (
      <div className="board-guard">
        <p className="board-guard__info">{t("BoardGuard.incorrectPassphrase")}</p>
        <Button href="/">{t("BoardGuard.returnToHomepage")}</Button>
      </div>
    );
  }

  if (boardStatus === "rejected") {
    return (
      <div className="board-guard">
        <p className="board-guard__info">{t("BoardGuard.reject")}</p>
        <a href="/" className="board-guard__denied-link">
          {t("BoardGuard.returnToHomepage")}
        </a>
      </div>
    );
  }

  return (
    <div className="board-guard">
      <LoadingIndicator />
      <p className="board-guard__info">{t("BoardGuard.waitingForApproval")}</p>
    </div>
  );
};
