
import { useEffect, useRef } from 'react';
import { toast } from "sonner";

interface VideoPlayerProps {
  src?: string;
  title: string;
  autoplay?: boolean;
  poster?: string;
}

const VideoPlayer = ({ src, title, autoplay = true, poster }: VideoPlayerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  
  useEffect(() => {
    // If we have an iframe source, load it
    if (src && iframeRef.current) {
      toast.success("Loading video player");
    } else if (!src) {
      toast.error("Video source not found");
    }
  }, [src]);
  
  // Handle iframe or direct embed
  if (src) {
    // If it's an iframe embed URL
    if (src.includes('iframe') || src.includes('embed')) {
      return (
        <div className="relative pt-[56.25%] w-full bg-zinc-900 rounded-lg overflow-hidden">
          <iframe
            ref={iframeRef}
            className="absolute top-0 left-0 w-full h-full"
            src={src}
            title={title}
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      );
    }
    
    // If it's a direct video URL
    return (
      <div className="relative pt-[56.25%] w-full bg-zinc-900 rounded-lg overflow-hidden">
        <video
          className="absolute top-0 left-0 w-full h-full"
          controls
          autoPlay={autoplay}
          poster={poster}
        >
          <source src={src} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    );
  }
  
  // Fallback for missing source
  return (
    <div className="relative pt-[56.25%] w-full bg-zinc-900 rounded-lg overflow-hidden flex items-center justify-center">
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center p-4">
        <p className="text-gray-400 text-lg mb-2">Video unavailable</p>
        <p className="text-gray-500 text-sm">The video source could not be loaded</p>
      </div>
    </div>
  );
};

export default VideoPlayer;
