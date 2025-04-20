
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/Navbar";
import VideoPlayer from "@/components/VideoPlayer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock, Eye, Tag } from "lucide-react";
import { toast } from "sonner";

interface VideoDetails {
  id?: string;
  title: string;
  category?: string;
  duration?: string;
  thumbnail?: string;
  views?: string;
  embed?: string;
}

const fetchVideoEmbed = async (id: string): Promise<string> => {
  try {
    console.log("Fetching video embed for ID:", id);
    const url = `https://www.eporner.com/api/v2/video/id/?format=json&id=${id}&thumbsize=medium&data=mp4`;
    console.log("API URL:", url);
    
    const res = await fetch(url);
    
    if (!res.ok) {
      throw new Error(`Failed to fetch video details: ${res.status}`);
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
  
  // Get video details from location state or set defaults
  useEffect(() => {
    if (location.state) {
      setVideoDetails(location.state as VideoDetails);
    } else if (id) {
      // No state passed, only have the ID
      setVideoDetails({
        title: "Loading video...",
        id: id
      });
    }
  }, [location.state, id]);
  
  // Fetch video embed if we have an ID
  const { data: embedUrl, isLoading, error } = useQuery({
    queryKey: ["videoEmbed", id],
    queryFn: () => id ? fetchVideoEmbed(id) : Promise.reject("No video ID provided"),
    enabled: !!id && (!videoDetails?.embed || videoDetails?.embed === ""),
    retry: 2,
    refetchOnWindowFocus: false,
  });
  
  // Update video details with embed URL when available
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
        />
        
        <div className="mt-6">
          <h1 className="text-2xl font-bold text-white mb-4">{videoDetails?.title}</h1>
          
          <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-4">
            {videoDetails?.category && (
              <div className="flex items-center gap-1.5">
                <Tag className="w-4 h-4 text-accent" />
                <span className="text-white">{videoDetails.category}</span>
              </div>
            )}
            {videoDetails?.duration && (
              <div className="flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-accent" />
                <span className="text-white">{videoDetails.duration}</span>
              </div>
            )}
            {videoDetails?.views && videoDetails.views !== "N/A" && (
              <div className="flex items-center gap-1.5">
                <Eye className="w-4 h-4 text-accent" />
                <span className="text-white">{videoDetails.views}</span>
              </div>
            )}
          </div>
          
          {/* Suggested tags/keywords section */}
          <div className="flex flex-wrap gap-2 mt-6">
            {videoDetails?.category?.split(",").map((tag, index) => (
              <span 
                key={index} 
                className="px-3 py-1 bg-zinc-800 hover:bg-accent/20 transition-colors rounded-full text-xs text-white cursor-pointer"
              >
                {tag.trim()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Watch;
