import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";

import { QueryClient, QueryClientProvider } from "react-query";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthUserProvider } from "./contexts/authProvider";

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <AuthUserProvider>
      <QueryClientProvider client={queryClient}>
        <Router>
          <App />
        </Router>
      </QueryClientProvider>
    </AuthUserProvider>
  </React.StrictMode>
);
