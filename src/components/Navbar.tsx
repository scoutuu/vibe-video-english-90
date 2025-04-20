
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const categories = ["All", "Popular", "Trending", "New", "Recommended"];

const Navbar = ({
  onCategoryChange,
}: {
  onCategoryChange?: (category: string) => void;
}) => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-zinc-900 shadow-lg">
      <div className="flex items-center gap-3">
        <img src="https://img.icons8.com/ios-filled/50/ffffff/camcorder-pro.png" alt="logo" className="w-8 h-8" />
        <span className="text-2xl font-bold text-white tracking-wide">Vibe Video</span>
      </div>
      <div className="flex-1 flex justify-center max-w-lg mx-8">
        <Input
          placeholder="Search for videos, categories, or creators..."
          className="w-full bg-zinc-800 text-white placeholder-gray-400 border-none focus:ring-2 focus:ring-accent"
          type="search"
        />
      </div>
      <div className="flex items-center space-x-4">
        <Select onValueChange={onCategoryChange}>
          <SelectTrigger className="w-40 bg-zinc-800 border-none text-white">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900">
            <SelectGroup>
              {categories.map((c) => (
                <SelectItem className="text-white" value={c} key={c}>
                  {c}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        {/* Profile/avatar spot, future sign-in */}
        <div className="w-9 h-9 bg-zinc-800 rounded-full flex items-center justify-center">
          <span className="text-gray-300 font-semibold">U</span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
