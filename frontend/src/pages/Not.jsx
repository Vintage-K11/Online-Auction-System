import React, { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Not = () => {
  useEffect(() => {
    toast.error("Page Not Found!", { position: "top-right" });
  }, []);

  return (
    <div className="text-[#d06717] font-bold text-xl mb-8 flex justify-center">
      Page Not Found
    </div>
  );
};

export default Not;
