import React from "react";
import { getAveragesAndUtilizationFactor } from "../../utils/simulationTable";

const AveragesDisplay = ({averages}) => {
  return (
    <div className="w-fit mx-auto text-primary">
      <ul className="max-w-md space-y-1 font-quicksand list-disc list-inside ">
        {averages.map((item) => (
          <li>
            {item.name} : {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AveragesDisplay;
