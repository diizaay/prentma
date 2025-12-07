import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { ScrollToTop } from "./components/ScrollToTop";
import { AuthProvider } from "./context/AuthContext";

// Pages
import { Home } from "./pages/Home";
import { About } from "./pages/About";
import { Categories } from "./pages/Categories";
import { Events } from "./pages/Events";
import { News } from "./pages/News";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Application } from "./pages/Application";
import { ApplicationSuccess } from "./pages/ApplicationSuccess";
import { HowToApply } from "./pages/HowToApply";
import { Criteria } from "./pages/Criteria";
import { Rules } from "./pages/Rules";
import { FAQ } from "./pages/FAQ";
import { Support } from "./pages/Support";
import { Terms } from "./pages/Terms";
import { Privacy } from "./pages/Privacy";

import { Toaster } from "./components/ui/sonner";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <ScrollToTop />
          <Header />
          <main className="min-h-screen">
            <Routes>
              {/* Main Pages */}
              <Route path="/" element={<Home />} />
              <Route path="/sobre" element={<About />} />
              <Route path="/categorias" element={<Categories />} />
              <Route path="/eventos" element={<Events />} />
              <Route path="/noticias" element={<News />} />
              
              {/* Authentication */}
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Register />} />
              
              {/* Application Process */}
              <Route path="/inscricao" element={<Application />} />
              <Route path="/candidatura-sucesso" element={<ApplicationSuccess />} />
              
              {/* Footer Pages */}
              <Route path="/como-candidatar-se" element={<HowToApply />} />
              <Route path="/criterios" element={<Criteria />} />
              <Route path="/regulamento" element={<Rules />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/suporte" element={<Support />} />
              <Route path="/termos" element={<Terms />} />
              <Route path="/privacidade" element={<Privacy />} />
              
              {/* Alias routes for better UX */}
              <Route path="/criterios-avaliacao" element={<Criteria />} />
              <Route path="/perguntas-frequentes" element={<FAQ />} />
              
              {/* Fallback route */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>
          <Footer />
          <Toaster 
            position="top-right"
            expand={true}
            richColors={true}
            closeButton={true}
          />
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;



