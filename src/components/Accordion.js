import React, { useState } from "react";
import classes from "@/styles/accordion.module.css";
import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";

const Accordion = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState(null);

  const onTitleClick = (index) => {
    setActiveIndex(index);
  };

  const renderedItems = items.map((item, index) => {
    const active = index === activeIndex ? classes.active : "";

    return (
      <div key={index}>
        <div
          className={`${classes.title} ${active}`}
          onClick={() => onTitleClick(index)}
        >
          {item.title}
          {active ? <KeyboardArrowUp /> : <KeyboardArrowDown />}
        </div>
        <div className={`${classes.content} ${active}`}>
          <p>{item.content}</p>
        </div>
      </div>
    );
  });

  return (
    <div className={`${classes.ui} ${classes.styled} ${classes.accordion}`}>
      {renderedItems}
    </div>
  );
};

export default Accordion;
