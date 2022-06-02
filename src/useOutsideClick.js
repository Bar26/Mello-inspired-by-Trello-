import { useEffect } from "react";

const useOutsideClick = (ref, callback) => {
  const handleClick = ev => {
    if (ref.current && !ref.current.contains(ev.target)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  });
};

export default useOutsideClick;