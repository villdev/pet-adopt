import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

const Modal = ({ children }) => {
  const elRef = useRef(null);
  if (!elRef.current) {
    const div = document.createElement("div");
    elRef.current = div;
  }
  // above we want to create it only once

  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.appendChild(elRef.current);

    return () => modalRoot.removeChild(elRef.current); //remove this child only when the modalRoot gets closed
    //special feature of useEffect, return gives a cleanup fn that runs when component dismounts
  }, []);

  return createPortal(<div>{children}</div>, elRef.current); //inside of elReff.current first parameter will be there
};

export default Modal;
