
import { useQuery } from "@tanstack/react-query";

export type Video = {
  id?: string;
  title: string;
  category: string;
  duration: string;
  thumbnail: string;
  embed?: string;
  views?: string;
};

// Using a higher quality setting (removing lq=1 parameter)
const EPORNER_API_BASE = "https://www.eporner.com/api/v2/video/search/?format=json&per_page=24";

/**
 * Takes UI category name and returns Eporner-API fetch params
 */
function getApiParamsFromCategory(category: string) {
  switch (category) {
    case "Popular":
      return "&order=top-weekly";
    case "Trending":
      return "&order=top-monthly";
    case "New":
      return "&order=latest";
    case "Recommended":
      return "&order=top-rated";
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
    
    // Improved thumbnail selection logic
    let thumbnailUrl = "";
    
    // Try to get the best quality thumbnail
    if (video.thumbs && Array.isArray(video.thumbs) && video.thumbs.length > 0) {
      // First, try to find a mid-sequence thumbnail (around 50-70% through the available thumbs)
      // This often shows a more representative frame than the first or last thumbnails
      const midIndex = Math.floor(video.thumbs.length * 0.6);
      const midThumb = video.thumbs[midIndex];
      
      // Next, prioritize medium or big size for better quality
      const bigThumb = video.thumbs.find((thumb: any) => thumb.size === "big");
      const mediumThumb = video.thumbs.find((thumb: any) => thumb.size === "medium");
      
      if (midThumb && midThumb.src) {
        thumbnailUrl = midThumb.src;
      } else if (bigThumb && bigThumb.src) {
        thumbnailUrl = bigThumb.src;
      } else if (mediumThumb && mediumThumb.src) {
        thumbnailUrl = mediumThumb.src;
      } else if (video.default_thumb?.src) {
        thumbnailUrl = video.default_thumb.src;
      } else {
        // Fallback to the first thumbnail
        thumbnailUrl = video.thumbs[0].src;
      }
    } else if (video.default_thumb?.src) {
      thumbnailUrl = video.default_thumb.src;
    }
    
    return {
      id: video.id || Math.random().toString(36).substring(7),
      title: video.title,
      category: categoryText,
      duration: video.length_min ? `${video.length_min}` : "-",
      thumbnail: thumbnailUrl,
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
        const res = await fetch(url, { headers: { Accept: "application/json" } });
        if (!res.ok) {
          throw new Error("Failed to fetch videos");
        }
        const data = await res.json();
        console.log("API returned videos count:", data.videos?.length || 0);
        return mapFromEpornerAPI(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
        throw error;
      }
    },
  });
}
