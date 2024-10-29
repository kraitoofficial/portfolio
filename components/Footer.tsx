export default function Footer() {
  return (
    <footer className="bg-primary/5 border-t">
      <div className="flex flex-col items-center justify-center gap-4 py-10 md:h-20 md:flex-row md:py-0">
        <p className="text-center text-sm md:text-left">
          © {new Date().getFullYear()} Kraito. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
