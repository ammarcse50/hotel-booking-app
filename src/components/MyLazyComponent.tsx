"use client";
import { useState } from "react";
import Image from "next/image";
import cn from "classnames"; // Assuming you are using classnames to handle conditional classes

interface CustomImageComponentProps {
  src: string;
  alt: string;
  blurDataUrl?: string;
  width?: number;
  height?: number;
  className?: string;
  onClick: () => void;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  onLoad?: () => void;
  onError?: () => void;
  onLoadStart?:
    | ((event: React.SyntheticEvent<HTMLImageElement, Event>) => void)
    | undefined;
  onAbort?:
    | ((event: React.SyntheticEvent<HTMLImageElement, Event>) => void)
    | undefined;
  onScroll?:
    | ((event: React.SyntheticEvent<HTMLImageElement, Event>) => void)
    | undefined;
}

function MyLazyComponent({
  src,
  alt,
  blurDataUrl,
  width,
  height,
  className,
  onClick,
  onMouseEnter,
  onMouseLeave,
  onLoad,
  onError,
  onLoadStart,
  onAbort,
  onScroll,
}: CustomImageComponentProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [srcState, setSrcState] = useState(src);

  return (
    <div className={cn("flex justify-center items-center", className)}>
      <Image
        onClick={onClick}
        alt={alt}
        style={{
          transform: "translate3d(0, 0, 0)",
          width: "100%",
          height: "auto",
        }}
        className="brightness-90 group-hover:brightness-110 rounded-lg transition transform"
        onError={() => setSrcState("/place-holder.webp")} // fallback image
        blurDataURL={blurDataUrl}
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
        onLoad={() => {
          setIsLoading(false);
          if (onLoad) onLoad(); // Call external onLoad callback
        }}
        onLoadStart={onLoadStart}
        onScroll={onScroll}
        onAbort={onAbort}
        // Automatically lazy load the image
        src={srcState}
        width={width || 500} // Ensure width is set, or default to 500px
        height={height || 300} // Ensure height is set, or default to 300px
        loading="lazy" // Native lazy loading in Next.js
        sizes="(max-width: 768px) 100vw, 50vw" // Responsive image sizes
      />
      {isLoading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <svg
            className="inline-block h-10 w-10 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}{" "}
      {/* Optional loading spinner/indicator */}
    </div>
  );
}

export default MyLazyComponent;
