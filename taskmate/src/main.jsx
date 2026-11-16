import { createRoot } from "react-dom/client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { store } from "./components/Exercise/redux/store.js";
import { AuthProvider } from './context/authContext.jsx';
const queryClient = new QueryClient();
{/* <CartProvider>
  <App />
</CartProvider> */}
createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <AuthProvider>

        <App />
        </AuthProvider>
      </Provider>

      <Toaster position="top-right" />
    </QueryClientProvider>
  </BrowserRouter>,
);
