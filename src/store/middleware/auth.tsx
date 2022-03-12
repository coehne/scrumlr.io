import {Dispatch, MiddlewareAPI} from "redux";
import {ApplicationState} from "types";
import {Actions, ReduxAction} from "store/action";
import {AuthAction} from "store/action/auth";
import {API} from "api";
import {ViewAction} from "store/action/view";
import {Toast} from "utils/Toast";
import i18n from "i18next";
import {Button} from "../../components/Button";
import store from "../index";

export const passAuthMiddleware = (stateAPI: MiddlewareAPI<Dispatch, ApplicationState>, dispatch: Dispatch, action: ReduxAction) => {
  if (action.type === ViewAction.InitApplication) {
    API.getCurrentUser()
      .then((user) => {
        if (user) {
          dispatch(Actions.signIn(user.id, user.name));
        }
        dispatch(Actions.userCheckCompleted(true));
      })
      .catch(() => {
        Toast.error(
          <div>
            <div>{i18n.t("Homepage.errorServerConnection")}</div>
            <Button onClick={() => store.dispatch(Actions.initApplication())}>{i18n.t("Homepage.retry")}</Button>
          </div>,
          false
        );
        dispatch(Actions.userCheckCompleted(false));
      });
  }

  if (action.type === AuthAction.SignOut) {
    API.signOut()
      .then(() => {
        // eslint-disable-next-line no-restricted-globals
        location.reload();
      })
      .catch(() => {
        // FIXME show error
      });
  }
};