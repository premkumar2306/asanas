import { useEffect, useState } from "react";

/**
 * Hook to determine if the screen size is considered mobile based on a given breakpoint.
 * @param breakpoint - The pixel width below which the screen is considered mobile (default: 768px)
 */
export function useIsMobile(breakpoint = 768): boolean {
  const [isMobile, setIsMobile] = useState(
    () => window.innerWidth < breakpoint,
  );

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < breakpoint);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [breakpoint]);

  return isMobile;
}
