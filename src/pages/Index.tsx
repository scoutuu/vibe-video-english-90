
import { useState } from "react";
import Navbar from "@/components/Navbar";
import VideoGrid from "@/components/VideoGrid";

const Index = () => {
  const [category, setCategory] = useState<string>("All");

  return (
    <div className="min-h-screen bg-background">
      <Navbar onCategoryChange={setCategory} />
      
      {/* Hero section */}
      <section className="hero-gradient px-6 py-12 md:py-16 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-3 text-white text-left tracking-tight">
          Watch, Stream, <span className="text-gradient">Enjoy.</span>
        </h1>
        <p className="text-xl max-w-2xl text-gray-300 mb-8 text-left opacity-90">
          Discover trending, new, and recommended videos, all in English. Your vibe, your videos.
        </p>
      </section>
      
      {/* Video Grid */}
      <section className="px-6 max-w-6xl mx-auto pb-20">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-white flex items-center gap-2">
            <span className="inline-block w-1.5 h-6 bg-accent rounded-sm"></span>
            {category === "All" ? "Latest Videos" : category}
          </h2>
        </div>
        <VideoGrid category={category} />
      </section>
    </div>
  );
};

export default Index;
