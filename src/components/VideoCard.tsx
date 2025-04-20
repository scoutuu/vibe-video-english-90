
import { PlayIcon } from "lucide-react";

type VideoCardProps = {
  title: string;
  category: string;
  duration: string;
  thumbnail: string;
};

const VideoCard = ({ title, category, duration, thumbnail }: VideoCardProps) => {
  return (
    <div className="rounded-lg bg-zinc-800 hover:scale-[1.04] transition-transform p-2 shadow-md cursor-pointer group">
      <div className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-40 object-cover rounded-md"
        />
        <div className="absolute bottom-2 left-2 bg-black bg-opacity-60 px-2 py-1 rounded text-xs text-white">
          {duration}
        </div>
        <button className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-accent/60 p-2 rounded-full">
          <PlayIcon className="text-white w-5 h-5" />
        </button>
      </div>
      <div className="pt-3 px-1">
        <div className="font-medium text-white truncate">{title}</div>
        <div className="text-xs mt-0.5 text-gray-400">{category}</div>
      </div>
    </div>
  );
};

export default VideoCard;
