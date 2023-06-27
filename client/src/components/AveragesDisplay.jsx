import React from "react";
import { getAveragesAndUtilizationFactor } from "../../utils/simulationTable";

const AveragesDisplay = ({averages}) => {
  return (
    <div className="w-fit mx-auto">
      <ul className="max-w-md space-y-1 text-gray-500 list-disc list-inside">
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
