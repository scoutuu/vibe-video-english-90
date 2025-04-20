
import { useState } from "react";
import Navbar from "@/components/Navbar";
import VideoGrid from "@/components/VideoGrid";

const Index = () => {
  const [category, setCategory] = useState<string>("All");

  return (
    <div className="min-h-screen bg-zinc-950 pb-10">
      <Navbar onCategoryChange={setCategory} />
      {/* Hero section */}
      <section className="px-6 py-12 max-w-6xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-2 text-white text-left tracking-tight">
          Watch, Stream, <span className="text-accent">Enjoy.</span>
        </h1>
        <p className="text-xl max-w-2xl text-gray-300 mb-7 text-left">
          Discover trending, new, and recommended videos, all in English. Your vibe, your videos.
        </p>
      </section>
      {/* Video Grid */}
      <section className="px-6 max-w-6xl mx-auto">
        <VideoGrid category={category} />
      </section>
    </div>
  );
};

export default Index;
