
import VideoCard from "./VideoCard";
import { useVideos } from "@/hooks/useVideos";
import { Skeleton } from "@/components/ui/skeleton";

const VideoGrid = ({ category }: { category?: string }) => {
  const { data: videos, isLoading, error } = useVideos(category ?? "All");

  if (isLoading) {
    // Show a grid of Skeletons matching the cards
    return (
      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Skeleton key={i} className="h-64 rounded-lg bg-zinc-800" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-red-400 bg-zinc-900 rounded p-4 text-center">
        Failed to load videos. Please try again later.
      </div>
    );
  }

  if (!videos || videos.length === 0) {
    return (
      <div className="text-gray-400 flex justify-center items-center min-h-[180px]">
        No videos found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {videos.map((v, idx) => (
        <VideoCard key={idx} {...v} />
      ))}
    </div>
  );
};

export default VideoGrid;
