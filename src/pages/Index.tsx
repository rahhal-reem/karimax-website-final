import { Navbar } from "@/components/Navbar";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Placeholder content area */}
      <main className="p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Welcome to Karimax
          </h1>
          <p className="text-muted-foreground">
            Your one-stop shop for everything you need.
          </p>
        </div>
      </main>
    </div>
  );
};

export default Index;
