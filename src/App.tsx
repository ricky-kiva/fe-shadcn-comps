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

          <main className="flex-1 mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 pb-28">
            <div className="mb-6 flex flex-col gap-1">
              <h1 className="font-sans text-2xl font-semibold tracking-tight text-foreground">
                Components
              </h1>
              <p className="font-sans text-xs text-neutral-400">
                Explore, browse, and preview official shadcn/ui components in a responsive grid.
              </p>
            </div>

            <ComponentGrid />
          </main>

          <Footer />
        </div>
      </GalleryProvider>
    </ThemeProvider>
  );
}
