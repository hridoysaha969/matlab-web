import { Star, StarBorder } from "@mui/icons-material";
import React from "react";

function Stars({ filled, onClick }) {
  return (
    <span onClick={onClick} style={{ cursor: "pointer", color: "#FFD700" }}>
      {filled ? (
        <span>
          <Star />{" "}
        </span>
      ) : (
        <span>
          <StarBorder />
        </span>
      )}
    </span>
  );
}

export default Stars;
