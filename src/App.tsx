import { ThemeProvider } from "@/context/ThemeContext";
import { GalleryProvider } from "@/context/GalleryContext";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ComponentGrid } from "@/components/gallery/ComponentGrid";

export function App() {
  return (
    <ThemeProvider>
      <GalleryProvider>
        <div className="flex min-h-screen flex-col bg-background text-foreground antialiased selection:bg-neutral-800 selection:text-white">
          <Header />

          <main className="flex-1 w-full pb-14">
            <ComponentGrid />
          </main>

          <Footer />
        </div>
      </GalleryProvider>
    </ThemeProvider>
  );
}
