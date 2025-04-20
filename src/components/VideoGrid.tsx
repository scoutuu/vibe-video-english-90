
import VideoCard from "./VideoCard";

const demoVideos = [
  {
    title: "Sunset In The City",
    category: "Travel",
    duration: "7:45",
    thumbnail: "https://images.pexels.com/photos/3401402/pexels-photo-3401402.jpeg?auto=compress&w=400&h=280&fit=crop",
  },
  {
    title: "Cooking Hacks",
    category: "Food",
    duration: "4:02",
    thumbnail: "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&w=400&h=280&fit=crop",
  },
  {
    title: "Street Dance Show",
    category: "Art",
    duration: "6:15",
    thumbnail: "https://images.pexels.com/photos/1543766/pexels-photo-1543766.jpeg?auto=compress&w=400&h=280&fit=crop",
  },
  {
    title: "Gardening 101",
    category: "Education",
    duration: "12:11",
    thumbnail: "https://images.pexels.com/photos/296230/pexels-photo-296230.jpeg?auto=compress&w=400&h=280&fit=crop",
  },
  {
    title: "Mountain Adventure",
    category: "Adventure",
    duration: "8:29",
    thumbnail: "https://images.pexels.com/photos/674010/pexels-photo-674010.jpeg?auto=compress&w=400&h=280&fit=crop",
  },
  {
    title: "Morning Yoga",
    category: "Fitness",
    duration: "35:02",
    thumbnail: "https://images.pexels.com/photos/317157/pexels-photo-317157.jpeg?auto=compress&w=400&h=280&fit=crop",
  },
];

const VideoGrid = ({ category }: { category?: string }) => {
  // Filter videos by category unless "All"
  const videos =
    category && category !== "All"
      ? demoVideos.filter((v) => v.category === category)
      : demoVideos;

  return (
    <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
      {videos.map((v, idx) => (
        <VideoCard key={idx} {...v} />
      ))}
    </div>
  );
};

export default VideoGrid;
