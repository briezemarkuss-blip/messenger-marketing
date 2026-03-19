
const Header = () => {
  return (
    <div className="fixed inset-x-0 top-0 z-50">
      {/* Primary header — always visible */}
      <header className="border-b border-border/60 bg-background/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <a href="/" className="text-[17px] font-bold tracking-tight text-foreground">
            scandiweb AI
          </a>
        </div>
      </header>
    </div>
  );
};

export default Header;
