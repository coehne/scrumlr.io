import React, {Suspense} from "react";
import ReactDOM from "react-dom";
import {Provider} from "react-redux";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";
import "index.scss";
import {CookieNotice} from "components/CookieNotice";
import store from "store";
import Router from "routes/Router";
import {I18nextProvider} from "react-i18next";
import {ToastContainer} from "react-toastify";
import i18n from "./i18n";
import {LoadingScreen} from "./components/LoadingScreen";
import {Actions} from "./store/action";
import {API} from "./api";

if (localStorage.getItem("theme")) {
  document.documentElement.setAttribute("theme", localStorage.getItem("theme")!);
} else if (!window.matchMedia || window.matchMedia("(prefers-color-scheme: dark)").matches) {
  document.documentElement.setAttribute("theme", "dark");
} else {
  document.documentElement.setAttribute("theme", "light");
}

// init auth session
(async () => {
  const user = await API.getCurrentUser();
  if (user) {
    store.dispatch(Actions.signIn(user.id, user.name));
  } else {
    store.dispatch(Actions.userCheckCompleted());
  }
})();

ReactDOM.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Provider store={store}>
        <DndProvider backend={HTML5Backend}>
          <Suspense fallback={<LoadingScreen />}>
            <ToastContainer className="toast-container__container" toastClassName="toast-container__toast" bodyClassName="toast-container__body" limit={2} />
            <Router />
            <CookieNotice />
          </Suspense>
        </DndProvider>
      </Provider>
    </I18nextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
