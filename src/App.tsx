import { Header, Footer, MobileCallBar } from "./components";
import Home from "./pages/Home";

export default function App() {
  return (
    <div className="min-h-screen bg-cream pb-20 text-ink antialiased md:pb-0">
      <Header />
      <main>
        <Home />
      </main>
      <Footer />
      <MobileCallBar />
    </div>
  );
}
