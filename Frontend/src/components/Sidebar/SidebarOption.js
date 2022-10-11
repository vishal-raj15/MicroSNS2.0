import React from "react";
import "./SidebarOption.css";
import "../../App.css";

const SidebarOption = ({ active, text, Icon }) => {
  // Icon because its a component not a variable so not icon
  return (
    <div className={`sidebarOption ${active && "sidebarOption--active"}`}>
      <Icon />

      <h2> {text}</h2>
    </div>
  );
};

export default SidebarOption;
