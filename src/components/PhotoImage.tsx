"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface PhotoImageProps {
  photo: File | string | null | undefined;
  width: number;
  height: number;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function PhotoImage({
  photo,
  width,
  height,
  alt,
  className,
  style,
}: PhotoImageProps) {
  const [photoSrc, setPhotoSrc] = useState<string | null>(null);

  useEffect(() => {
    if (typeof photo === "string") {
      setPhotoSrc(photo);
    } else if (photo instanceof File) {
      const objectUrl = URL.createObjectURL(photo);
      setPhotoSrc(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPhotoSrc(null);
    }
  }, [photo]);

  if (!photoSrc) return null;

  const imageStyle = {
    ...style,
    width: `${width}px`,
    height: `${height}px`,
    objectFit: "cover" as const,
  };

  // Use regular img tag for blob URLs (File objects)
  if (photo instanceof File) {
    return (
      <img
        src={photoSrc}
        alt={alt}
        className={className}
        style={imageStyle}
      />
    );
  }

  // Use Next.js Image for regular URLs
  return (
    <Image
      src={photoSrc}
      width={width}
      height={height}
      alt={alt}
      className={className}
      style={style}
    />
  );
}
