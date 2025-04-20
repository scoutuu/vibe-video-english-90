
import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

export type Video = {
  id?: string;
  title: string;
  category: string;
  duration: string;
  thumbnail: string;
  embed?: string;
  views?: string;
};

const EPORNER_API_BASE = "https://www.eporner.com/api/v2/video/search/?format=json&lq=1&per_page=24";

/**
 * Takes UI category name and returns Eporner-API fetch params
 */
function getApiParamsFromCategory(category: string) {
  switch (category) {
    case "Popular":
      return "&order=top-weekly";
    case "Trending":
      return "&order=top-weekly";
    case "New":
      return "&order=latest";
    case "Recommended":
      return "&order=latest";
    case "All":
      return "&order=latest";
    default:
      // Assume user is searching if not a predefined category
      return `&query=${encodeURIComponent(category)}`;
  }
}

/**
 * Returns array of formatted Video objects from Eporner API's response
 */
function mapFromEpornerAPI(result: any): Video[] {
  if (!result || !Array.isArray(result.videos)) return [];
  return result.videos.map((video: any) => {
    // Format the categories/tags properly for display
    let categoryText = "General";
    if (video.tags && Array.isArray(video.tags) && video.tags.length > 0) {
      // Capitalize first letter of each tag
      const formattedTags = video.tags.map((tag: string) => 
        tag.charAt(0).toUpperCase() + tag.slice(1).toLowerCase()
      );
      categoryText = formattedTags.join(", ");
    } else if (video.categories && Array.isArray(video.categories) && video.categories.length > 0) {
      categoryText = video.categories.join(", ");
    }
    
    return {
      id: video.id || Math.random().toString(36).substring(7),
      title: video.title,
      category: categoryText,
      duration: video.length_min ? `${video.length_min}` : "-",
      thumbnail: video.default_thumb?.src || (video.thumbs?.[0]?.src ?? ""),
      embed: video.embed,
      views: video.views ? `${video.views}` : "N/A",
    };
  });
}

export function useVideos(category: string) {
  return useQuery({
    queryKey: ["videos", category],
    queryFn: async (): Promise<Video[]> => {
      console.log("Fetching videos with category:", category);
      // Build the correct URL according to wanted filter
      const url = EPORNER_API_BASE + getApiParamsFromCategory(category);
      console.log("API URL:", url);
      
      try {
        const res = await fetch(url, { 
          headers: { Accept: "application/json" },
          signal: AbortSignal.timeout(10000) // 10 second timeout
        });
        
        if (!res.ok) {
          throw new Error(`Failed to fetch videos: ${res.status}`);
        }
        
        const data = await res.json();
        return mapFromEpornerAPI(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
        toast.error("Failed to load videos. Please try again.");
        throw error;
      }
    },
    refetchOnWindowFocus: false,
    staleTime: 60000, // 1 minute
  });
}
