import { useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { Header, Footer, MobileCallBar, Loader } from "./components";
import Home from "./pages/Home";

export default function App() {
  const [loading, setLoading] = useState(true);
  return (
    <BrowserRouter>
      {loading && <Loader onDone={() => setLoading(false)} />}
      <div className="min-h-screen bg-cream pb-20 text-ink antialiased md:pb-0">
        <Header />
        <main>
          <Home />
        </main>
        <Footer />
        <MobileCallBar />
      </div>
    </BrowserRouter>
  );
}
