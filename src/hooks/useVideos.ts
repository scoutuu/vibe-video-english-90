
import { useQuery } from "@tanstack/react-query";

type Video = {
  title: string;
  category: string;
  duration: string;
  thumbnail: string;
};

export function useVideos(category: string) {
  return useQuery({
    queryKey: ["videos", category],
    queryFn: async (): Promise<Video[]> => {
      // Replace the following URL with your real API endpoint if different
      const url =
        category && category !== "All"
          ? `/api/videos?category=${encodeURIComponent(category)}`
          : `/api/videos`;
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Failed to fetch videos");
      }
      const data = await res.json();
      // Optionally adjust this mapping if the API field names differ
      return Array.isArray(data)
        ? data.map((v) => ({
            title: v.title,
            category: v.category,
            duration: v.duration,
            thumbnail: v.thumbnail,
          }))
        : [];
    },
  });
}
