import { useEffect, useRef, useState } from "react";

export const useScroll = () => {
  const scrollContainerRef = useRef<null | HTMLDivElement>(null);
  const [hideTabs, setHideTabs] = useState(false);
  const [lastScrollTop, setLastScrollTop] = useState(0);

  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const currentScrollTop = container.scrollTop;

      if (currentScrollTop > lastScrollTop) {
        setHideTabs(true);
      } else {
        setHideTabs(false);
      }

      setLastScrollTop(currentScrollTop);
    };

    

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [scrollContainerRef, lastScrollTop]);

  const toggleTabs = () => setHideTabs((prev) => !prev);
  
  return { hideTabs, scrollContainerRef, toggleTabs };
}