import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@rico-ui/react";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Components from "./pages/Components";
import ButtonPage from "./pages/components/ButtonPage";
import CardPage from "./pages/components/CardPage";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/components" element={<Components />} />
            <Route path="/components/button" element={<ButtonPage />} />
            <Route path="/components/card" element={<CardPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;
