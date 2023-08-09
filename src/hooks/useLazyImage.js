import { useEffect, useRef, useState } from "react";

export const useLazyImage = () => {
const [shouldLoadImage, setShouldLoadImage] = useState(false);
const imageRef = useRef(null);

useEffect(() => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoadImage(true);
        observer.disconnect();
      }
    },
    { threshold: 0.3 }
  );
  if (imageRef.current) {
    observer.observe(imageRef.current);
  }

  return () => {
    if (imageRef.current) {
      observer.unobserve(imageRef.current);
    }
  };
}, []);

return {imageRef, shouldLoadImage};
}