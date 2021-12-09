import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";
import "@ionic/react/css/display.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/float-elements.css";
/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/typography.css";
import { Provider } from "react-redux";
import { Route } from "react-router-dom";
import Layout from "./layout/Layout";
import SessionsPage from "./pages/SessionsPage";
import { store } from "./store";
/* Theme variables */
import "./theme/variables.css";

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <IonApp>
        <IonReactRouter>
          {/* <IonSplitPane contentId="main"> */}
          {/* <Menu /> */}
          <IonRouterOutlet id="main">
            <Route path="/" exact={true}>
              <SessionsPage />
            </Route>
            <Route path="/page/:name" exact={true}>
              <Layout>
                <SessionsPage />
              </Layout>
            </Route>
          </IonRouterOutlet>
          {/* </IonSplitPane> */}
        </IonReactRouter>
      </IonApp>
    </Provider>
  );
};

export default App;
