import { useEffect, useRef } from "react";

export function useOutsideClick({ close }) {
  const ref = useRef();
  useEffect(
    function () {
      function handleClick(e) {
        // Early return if modal isn't open
        if (!ref.current) return;

        // Handle ESC key
        if (e.key === "Escape") {
          close();
          return;
        }

        // Handle outside clicks
        if (e.type === "mousedown" && !ref.current.contains(e.target)) {
          close();
        }
      }

      // Listen for both clicks and keyboard events
      document.addEventListener("mousedown", handleClick);
      document.addEventListener("keydown", handleClick);

      return () => {
        document.removeEventListener("mousedown", handleClick);
        document.removeEventListener("keydown", handleClick);
      };
    },
    [close]
  );

  return { ref };
}
