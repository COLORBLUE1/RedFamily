import { createRoot } from "react-dom/client";
import { App } from "./router/App";
import { Provider } from "react-redux";
import { store } from "./redux/store/store.js";


const rootElement = document.getElementById("root");
if (rootElement) {
  createRoot(rootElement).render(
   <Provider store={store}>
    <App />
  </Provider>
  );
} else {
  console.error('Root element not found');
}