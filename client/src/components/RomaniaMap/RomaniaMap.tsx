import React from "react";
import Romania from "@react-map/romania";

export const RomaniaMap: React.FunctionComponent<{onSelect?: (state: string)=> void}> = ({onSelect}) => {
  return (
    <div style={{ display: "flex" }}>
      <Romania type="select-single" size={100000} mapColor="green" hints={true} onSelect={onSelect}/>
    </div>
  );
};
