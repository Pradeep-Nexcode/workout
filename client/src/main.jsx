import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import routes from "./routes/index.jsx";
import { store } from "./services/store.js";
import { ApolloProvider } from "@apollo/client";
 
import client from './services/apolloClient.js'
 
import { ToastProvider } from './components/elements/Toast';

// Ensure you have a root element in your index.html with the id "root"
const rootElement = document.getElementById("root");

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(
    <StrictMode>
      <ApolloProvider client={client}>
        <Provider store={store}>
          <ToastProvider>
            <RouterProvider router={routes} />
          </ToastProvider>
        </Provider>
      </ApolloProvider>
    </StrictMode>
  );
} else {
  console.error("Root element not found");
}
