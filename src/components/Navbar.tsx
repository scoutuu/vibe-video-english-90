
import { useState, useRef, FormEvent } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import { toast } from "sonner";

const categories = ["All", "Popular", "Trending", "New", "Recommended"];

const Navbar = ({
  onCategoryChange,
}: {
  onCategoryChange?: (category: string) => void;
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim() && onCategoryChange) {
      onCategoryChange(searchQuery);
      toast.success(`Searching for "${searchQuery}"`);
    } else if (!searchQuery.trim()) {
      toast.error("Please enter a search term");
    }
  };

  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 py-4 bg-zinc-900/95 backdrop-blur-sm shadow-lg border-b border-zinc-800">
      <div className="flex items-center gap-3">
        <div className="relative w-10 h-10 flex items-center justify-center bg-accent rounded-lg shadow-lg">
          <img src="https://img.icons8.com/ios-filled/50/ffffff/camcorder-pro.png" alt="logo" className="w-6 h-6" />
          <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-zinc-900 rounded-full border-2 border-accent"></div>
        </div>
        <span className="text-2xl font-bold text-white tracking-wide">Vibe<span className="text-accent">Video</span></span>
      </div>
      
      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex-1 flex justify-center max-w-lg mx-8"
        autoComplete="off"
      >
        <div className="flex w-full group">
          <Input
            placeholder="Search for videos..."
            className="w-full bg-zinc-800 text-white placeholder-gray-400 border-zinc-700 focus-visible:ring-accent focus-visible:border-accent rounded-r-none rounded-l-md shadow-inner group-hover:border-accent/70 transition-colors"
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            aria-label="Search videos"
          />
          <Button 
            type="submit" 
            variant="default" 
            className="bg-accent hover:bg-accent/90 rounded-l-none rounded-r-md"
          >
            <Search className="w-5 h-5" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </form>
      
      <div className="flex items-center space-x-4">
        <Select onValueChange={onCategoryChange}>
          <SelectTrigger className="w-40 bg-zinc-800 border-zinc-700 text-white focus:ring-accent hover:border-accent/70 transition-colors">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-700">
            <SelectGroup>
              {categories.map((c) => (
                <SelectItem className="text-white hover:bg-zinc-800 focus:bg-zinc-800" value={c} key={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="w-9 h-9 bg-zinc-800 rounded-full flex items-center justify-center border border-zinc-700 hover:border-accent transition-colors cursor-pointer">
          <span className="text-gray-300 font-semibold">U</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
