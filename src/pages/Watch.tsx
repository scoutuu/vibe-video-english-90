
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import VideoPlayer from "@/components/VideoPlayer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import VideoCard from "@/components/VideoCard";
import { useVideos } from "@/hooks/useVideos";

interface VideoDetails {
  id?: string;
  title: string;
  category?: string;
  duration?: string;
  thumbnail?: string;
  views?: string;
  embed?: string;
  autoplay?: boolean;
}

const fetchVideoEmbed = async (id: string): Promise<string> => {
  try {
    console.log("Fetching video embed for ID:", id);
    const url = `https://www.eporner.com/api/v2/video/id/?format=json&id=${id}&thumbsize=medium&data=mp4`;
    console.log("API URL:", url);
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error("Failed to fetch video details");
    }
    const data = await res.json();
    console.log("Video API response:", data);
    if (data?.video?.embed) {
      return data.video.embed;
    } else if (data?.embed) {
      return data.embed;
    }
    throw new Error("No embed URL found in response");
  } catch (error) {
    console.error("Error fetching video embed:", error);
    throw error;
  }
};

const Watch = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const [videoDetails, setVideoDetails] = useState<VideoDetails | null>(null);

  useEffect(() => {
    if (location.state) {
      setVideoDetails(location.state as VideoDetails);
    } else if (id) {
      setVideoDetails({
        title: "Loading video...",
        id: id,
        autoplay: true,
      });
    }
  }, [location.state, id]);

  const { data: embedUrl, isLoading, error } = useQuery({
    queryKey: ["videoEmbed", id],
    queryFn: () => id ? fetchVideoEmbed(id) : Promise.reject("No video ID provided"),
    enabled: !!id,
    retry: 2,
    refetchOnWindowFocus: false,
  });

  useEffect(() => {
    if (embedUrl && videoDetails) {
      console.log("Setting embed URL:", embedUrl);
      setVideoDetails(prev => prev ? { ...prev, embed: embedUrl } : null);
      toast.success("Video loaded successfully");
    }
    if (error) {
      console.error("Error loading video:", error);
      toast.error("Failed to load video");
    }
  }, [embedUrl, error]);

  const handleBackClick = () => {
    navigate(-1);
  };

  // Suggested videos logic
  const { data: suggestedVideos, isLoading: isLoadingSuggestions } = useVideos("All");
  // Exclude the current video from suggestions, shuffle, and pick 4
  const suggested = useMemo(() => {
    if (!suggestedVideos || !id) return [];
    // Filter out current and shuffle
    const filtered = suggestedVideos.filter(v => v.id !== id);
    // Shuffle array
    for (let i = filtered.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [filtered[i], filtered[j]] = [filtered[j], filtered[i]];
    }
    return filtered.slice(0, 4);
  }, [suggestedVideos, id]);

  if (!videoDetails && isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="max-w-6xl mx-auto pt-6 px-6 pb-16 flex justify-center items-center">
          <div className="animate-pulse text-xl text-accent">Loading video...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="max-w-6xl mx-auto pt-6 px-6 pb-16">
        <Button
          variant="ghost"
          onClick={handleBackClick}
          className="mb-4 text-gray-400 hover:text-white flex items-center gap-1"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to videos
        </Button>
        <VideoPlayer
          src={videoDetails?.embed}
          title={videoDetails?.title || "Video"}
          poster={videoDetails?.thumbnail}
          autoplay={videoDetails?.autoplay !== false}
        />
        <div className="mt-6">
          <h1 className="text-2xl font-bold text-white mb-2">
            {videoDetails?.title}
          </h1>
          <div className="flex flex-wrap gap-4 text-sm text-gray-400">
            {videoDetails?.category && (
              <div>
                Category:{" "}
                <span className="text-accent">{videoDetails.category}</span>
              </div>
            )}
            {videoDetails?.duration && (
              <div>
                Duration: <span className="text-white">{videoDetails.duration}</span>
              </div>
            )}
            {videoDetails?.views && videoDetails.views !== "N/A" && (
              <div>
                Views: <span className="text-white">{videoDetails.views}</span>
              </div>
            )}
          </div>
        </div>
        {/* Suggested Videos Section */}
        <div className="mt-12">
          <h2 className="text-lg font-semibold text-white mb-4">Suggested Videos</h2>
          <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-4 gap-4">
            {isLoadingSuggestions
              ? Array.from({ length: 4 }).map((_, idx) => (
                  <div key={idx} className="rounded-lg overflow-hidden">
                    <div className="relative pt-[56.25%] bg-zinc-800/50 animate-pulse"></div>
                    <div className="p-3 space-y-2">
                      <div className="h-4 w-full bg-zinc-800/50 rounded" />
                      <div className="h-3 w-1/2 bg-zinc-800/50 rounded" />
                    </div>
                  </div>
                ))
              : suggested.map(video => (
                  <VideoCard key={video.id} {...video} />
                ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;

