import { useEffect, useRef } from "react";

const HandleClickOut = ({ onClickOutside, ...props }) => {
  const ref = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        onClickOutside && onClickOutside();
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [onClickOutside]);
  return (
    <div ref={ref} style={props.style}>
      {props.children}
    </div>
  );
};

export default HandleClickOut;
