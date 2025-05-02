import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Navigation from "./components/Navigation";
import Hero from "./hero";
import Page from "./page";
import "./App.css";

// Placeholder components for new routes
const Documentation = () => (
  <div className="px-6 min-h-screen bg-[#fdfbf6]">
    <h1 className="text-3xl font-bold text-[#2d2d2d]">Documentation</h1>
    <p className="mt-4 text-gray-600">Coming soon...</p>
  </div>
);

const FAQ = () => (
  <div className="px-6 min-h-screen bg-[#fdfbf6]">
    <h1 className="text-3xl font-bold text-[#2d2d2d]">Frequently Asked Questions</h1>
    <p className="mt-4 text-gray-600">Coming soon...</p>
  </div>
);

const Contact = () => (
  <div className="px-6 min-h-screen bg-[#fdfbf6]">
    <h1 className="text-3xl font-bold text-[#2d2d2d]">Contact Us</h1>
    <p className="mt-4 text-gray-600">Coming soon...</p>
  </div>
);

const Support = () => (
  <div className="px-6 min-h-screen bg-[#fdfbf6]">
    <h1 className="text-3xl font-bold text-[#2d2d2d]">Support</h1>
    <p className="mt-4 text-gray-600">Coming soon...</p>
  </div>
);

const Privacy = () => (
  <div className="px-6 min-h-screen bg-[#fdfbf6]">
    <h1 className="text-3xl font-bold text-[#2d2d2d]">Privacy Policy</h1>
    <p className="mt-4 text-gray-600">Coming soon...</p>
  </div>
);

function App() {
  return (
    <Router>
      <div className="flex min-h-screen bg-[#fdfbf6]">
        <Navigation />
        <main className="flex-1 ml-64">
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Hero />} />
              <Route path="/chatbot" element={<Page />} />
              <Route path="/docs" element={<Documentation />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/support" element={<Support />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </main>
      </div>
    </Router>
  );
}

export default App;
