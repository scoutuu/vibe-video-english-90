
import { useEffect, useRef, useState } from 'react';
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface VideoPlayerProps {
  src?: string;
  title: string;
  autoplay?: boolean;
  poster?: string;
}

const VideoPlayer = ({ src, title, autoplay = true, poster }: VideoPlayerProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);
  
  // Process embed URL to ensure it's properly formatted
  const getProcessedSrc = (src?: string) => {
    if (!src) return undefined;
    
    // Already an iframe embed code
    if (src.includes('<iframe')) {
      // Extract src attribute from iframe HTML
      const srcMatch = src.match(/src=["'](.*?)["']/);
      return srcMatch ? srcMatch[1] : undefined;
    }
    
    return src;
  };
  
  const processedSrc = getProcessedSrc(src);
  
  useEffect(() => {
    if (processedSrc) {
      setIsLoading(true);
      setError(false);
      
      // This timeout simulates the loading process
      const timer = setTimeout(() => {
        setIsLoading(false);
        toast.success("Video loaded successfully");
      }, 1000);
      
      return () => clearTimeout(timer);
    } else if (src) {
      // We have a src but it's invalid
      setError(true);
      setIsLoading(false);
      toast.error("Unable to load video source");
    } else {
      // No src provided
      setError(true);
      setIsLoading(false);
    }
  }, [processedSrc, src]);
  
  if (isLoading) {
    return (
      <div className="relative pt-[56.25%] w-full bg-zinc-900 rounded-lg overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="space-y-3 w-full max-w-[80%]">
            <Skeleton className="h-4 w-full bg-zinc-800/50" />
            <Skeleton className="h-4 w-3/4 mx-auto bg-zinc-800/50" />
            <Skeleton className="h-4 w-1/2 mx-auto bg-zinc-800/50" />
          </div>
        </div>
      </div>
    );
  }
  
  // Handle iframe or direct embed
  if (processedSrc) {
    return (
      <div className="relative pt-[56.25%] w-full bg-zinc-900 rounded-lg overflow-hidden shadow-xl">
        <iframe
          ref={iframeRef}
          className="absolute top-0 left-0 w-full h-full"
          src={processedSrc}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          onLoad={() => setIsLoading(false)}
          onError={() => {
            setError(true);
            setIsLoading(false);
          }}
        ></iframe>
      </div>
    );
  }
  
  // Fallback for missing source
  return (
    <div className="relative pt-[56.25%] w-full bg-zinc-900 rounded-lg overflow-hidden flex items-center justify-center shadow-md">
      <div className="absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center text-center p-4">
        <p className="text-gray-400 text-lg mb-2">Video unavailable</p>
        <p className="text-gray-500 text-sm">The video source could not be loaded</p>
      </div>
    </div>
  );
};

export default VideoPlayer;
