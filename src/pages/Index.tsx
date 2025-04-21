
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import VideoGrid from "@/components/VideoGrid";

const Index = () => {
  const [category, setCategory] = useState<string>("All");
  
  // Reset scroll position when changing category
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [category]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar onCategoryChange={setCategory} />
      
      {/* Hero section */}
      <section className="hero-gradient px-6 py-8 md:py-12 max-w-6xl mx-auto">
        <h1 className="text-3xl md:text-5xl font-extrabold mb-2 md:mb-3 text-white text-left tracking-tight">
          Watch, Stream, <span className="text-gradient">Enjoy.</span>
        </h1>
        <p className="text-lg md:text-xl max-w-2xl text-gray-300 mb-6 md:mb-8 text-left opacity-90">
          Discover trending, new, and recommended videos, all in English. Your vibe, your videos.
        </p>
      </section>
      
      {/* Video Grid */}
      <section className="px-4 sm:px-6 max-w-6xl mx-auto pb-16 md:pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-white flex items-center gap-2">
            <span className="inline-block w-1.5 h-6 bg-accent rounded-sm"></span>
            {category === "All" ? "Latest Videos" : category}
          </h2>
        </div>
        <VideoGrid category={category} key={category} />
      </section>
    </div>
  );
};

export default Index;
