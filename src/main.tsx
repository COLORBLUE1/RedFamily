import { createRoot } from "react-dom/client";
import "./normalize.css";
import { App } from "./router/App";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    {/* <Appl /> */}
  </Provider>
);
