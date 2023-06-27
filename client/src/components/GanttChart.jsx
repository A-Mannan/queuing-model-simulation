import React from "react";

const GanttChart = ({ server }) => {
  return (
    <div className="flex w-min mx-auto p-2 m-2">
      {server.map((task, taskIndex) => {
        return (
          <div
            className={`${
              task.id !== undefined ? "bg-white" : "bg-gray-600"
            } relative flex justify-center items-center w-16 h-10 ${
              taskIndex === 0 ? "border" : "border-r border-t border-b"
            } border-black`}
          >
            <div className="text-center">{task.id}</div>
            { taskIndex === 0 ? <div className="absolute -left-1 -bottom-5 text-xs">0</div>:""}
            <div className="absolute -right-1 -bottom-5 text-xs">{task.end}</div>
          </div>
        );
      })}
    </div>
  );
};

export default GanttChart;
