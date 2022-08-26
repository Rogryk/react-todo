import { useState, useEffect } from "react";

export function useOutsideAlerter(ref: React.MutableRefObject<any>) {
  const [isClickedOutside, setIsClickedOutside] = useState(false);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsClickedOutside(true);
        setTimeout(() => {
          setIsClickedOutside(false);
        }, 50);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return isClickedOutside;
}
