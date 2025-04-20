
import { PlayIcon } from "lucide-react";
import { useNavigate } from "react-router-dom";

type VideoCardProps = {
  id?: string;
  title: string;
  category: string;
  duration: string;
  thumbnail: string;
  views?: string;
  embed?: string;
};

const VideoCard = ({ id, title, category, duration, thumbnail, views = "N/A" }: VideoCardProps) => {
  const navigate = useNavigate();
  const videoId = id || Math.random().toString(36).substring(7);
  
  const handleClick = () => {
    navigate(`/watch/${videoId}`, { 
      state: { 
        title, 
        category, 
        duration, 
        thumbnail,
        views
      } 
    });
  };

  return (
    <div 
      onClick={handleClick}
      className="rounded-lg overflow-hidden bg-zinc-800 video-card-hover p-0 shadow-md cursor-pointer group"
    >
      <div className="relative">
        <img
          src={thumbnail}
          alt={title}
          className="w-full h-44 object-cover"
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "https://via.placeholder.com/320x180/1a1a1a/cccccc?text=Video+Thumbnail";
          }}
        />
        <div className="absolute bottom-2 left-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
          {duration}
        </div>
        {views !== "N/A" && (
          <div className="absolute top-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
            {views} views
          </div>
        )}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40">
          <div className="bg-accent/90 p-3 rounded-full">
            <PlayIcon className="text-white w-6 h-6" />
          </div>
        </div>
      </div>
      <div className="p-3">
        <h3 className="font-medium text-white text-sm line-clamp-2 mb-1">{title}</h3>
        <div className="text-xs text-gray-400">{category}</div>
      </div>
    </div>
  );
};

export default VideoCard;
