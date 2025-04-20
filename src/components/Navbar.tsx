
import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const categories = ["All", "Popular", "Trending", "New", "Recommended"];

const Navbar = ({
  onCategoryChange,
}: {
  onCategoryChange?: (category: string) => void;
}) => {
  const formRef = useRef<HTMLFormElement>(null);

  // No-op for future search logic, but focus is on UI/UX now:
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // You can plug search logic here
  };

  return (
    <nav className="flex items-center justify-between px-8 py-5 bg-zinc-900 shadow-lg gap-8">
      <div className="flex items-center gap-3 select-none">
        <img src="https://img.icons8.com/ios-filled/50/ffffff/camcorder-pro.png" alt="logo" className="w-9 h-9 drop-shadow-xl" />
        <span className="text-2xl font-extrabold text-white tracking-wide font-sans bg-gradient-to-br from-purple-400 via-fuchsia-500 to-pink-500 bg-clip-text text-transparent">
          Vibe Video
        </span>
      </div>

      <form
        ref={formRef}
        onSubmit={handleSubmit}
        className="flex-1 flex justify-center max-w-2xl mx-8"
        autoComplete="off"
      >
        <div className="flex w-full items-center shadow-md bg-gradient-to-r from-zinc-800/90 to-zinc-900/80 border border-zinc-700 rounded-full px-3 py-2 gap-2 ring-1 ring-zinc-800 focus-within:ring-2 focus-within:ring-accent/80 transition-shadow duration-150">
          <Input
            placeholder="Search for videos, categories, or creators..."
            className="flex-1 bg-transparent border-none text-white placeholder-gray-400 focus:ring-0 focus-visible:ring-0 text-base"
            type="search"
            aria-label="Search videos"
          />
          <Button type="submit" variant="secondary" size="icon" className="rounded-full shadow hover:scale-105 transition-transform duration-200">
            <Search className="w-5 h-5 text-accent" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </form>

      <div className="flex items-center gap-3 min-w-[180px]">
        <Select onValueChange={onCategoryChange}>
          <SelectTrigger className="w-44 bg-zinc-800 border-none text-white shadow focus:ring-accent/60">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 border-zinc-800 shadow-lg z-50">
            <SelectGroup>
              {categories.map((c) => (
                <SelectItem className="text-white" value={c} key={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <div className="w-10 h-10 bg-gradient-to-br from-zinc-800 via-zinc-700 to-zinc-900 rounded-full flex items-center justify-center ring-1 ring-zinc-600 shadow">
          <span className="text-gray-300 font-semibold">U</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
