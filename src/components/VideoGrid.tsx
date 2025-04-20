
import VideoCard from "./VideoCard";
import { useVideos } from "@/hooks/useVideos";
import { Skeleton } from "@/components/ui/skeleton";

const VideoGrid = ({ category }: { category?: string }) => {
  const { data: videos, isLoading, error } = useVideos(category ?? "All");

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="rounded-lg overflow-hidden">
            <Skeleton className="h-44 w-full bg-zinc-800/50" />
            <div className="p-3 space-y-2">
              <Skeleton className="h-4 w-full bg-zinc-800/50" />
              <Skeleton className="h-3 w-1/2 bg-zinc-800/50" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 bg-zinc-900/50 rounded-lg p-6 text-center border border-red-900/30">
        <p className="text-lg font-medium mb-2">Unable to load videos</p>
        <p className="text-sm opacity-90">Please try again later or check your connection</p>
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="text-gray-400 flex flex-col justify-center items-center min-h-[180px] bg-zinc-900/50 rounded-lg p-8">
        <p className="text-lg font-medium mb-2">No videos found</p>
        <p className="text-sm opacity-90">Try searching for something else</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {videos.map((video, idx) => (
        <VideoCard 
          key={video.id || idx} 
          id={video.id || `video-${idx}`}
          {...video} 
        />
      ))}
    </div>
  );
};

export default VideoGrid;
