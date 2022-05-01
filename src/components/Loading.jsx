import React from "react";
import'./css/Loading.css'
const Loading = () => {
  return (
    <div style={{ position: "relative" }}>
    <h2
       style={{
         position: "fixed",
         top: "50%",
         left: "50%",
         transform: "translate(-50%, -50%)",
        }}
      > 
       <div className="spinner"></div>
      </h2>
   </div>
  );
};

export default Loading;