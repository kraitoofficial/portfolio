import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold">404</h1>
          <p className="mt-4">Page not found</p>
          <Link href="/">
            <Button
              variant="default"
              size="sm"
              className="mt-4 transition-all duration-300 bg-primary hover:bg-primary/90 text-primary-foreground hover:scale-[1.02] active:scale-[0.98] shadow-md hover:shadow-lg text-sm"
            >
              Go to Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  );
}
