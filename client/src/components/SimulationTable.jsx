import React, { useState, useEffect } from "react";
import Table from "./Table";
import GanttChart from "./GanttChart";
import AveragesDisplay from "./AveragesDisplay";
import { headingStyle } from "../styles";

const SimulationTable = (simulationTableProps) => {
  const simulationTableHeaders = [
    "Seq. No",
    "Random# for Arrival",
    "Inter-Arrival Time",
    "Arrival Time",
    "Random# for Service",
    "Service Time",
    "Start Time",
    "End Time",
    "Turn Around Time",
    "Waiting Time",
  ];

  const [simulationTableBody, setSimulationTableBody] = useState([]);
  const [servers, setServers] = useState([]);
  const [simulationAverages, setSimulationAverages] = useState([]);
  const [formulaAverages, setFormulaAverages] = useState([]);

  const fetchSimulationTable = async () => {
    const endpointUrl = "http://127.0.0.1:5000/get-complete-simulation";
    const queryString = new URLSearchParams(simulationTableProps).toString();
    const urlWithQuery = `${endpointUrl}?${queryString}`;
    try {
      const response = await fetch(urlWithQuery, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setSimulationTableBody(data.simulationTable);
      setServers(data.servers);
      setSimulationAverages(data.averages);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchAveragesByFormulas = async () => {
    const endpointUrl = "http://127.0.0.1:5000/get-averages";
    const queryString = new URLSearchParams(simulationTableProps).toString();
    const urlWithQuery = `${endpointUrl}?${queryString}`;
    try {
      const response = await fetch(urlWithQuery, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setFormulaAverages(data);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const fetchAllData = async () => {
    await fetchSimulationTable();
    await fetchAveragesByFormulas();
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center overflow-hidden">
      <Table
        tableHeaders={simulationTableHeaders}
        tableBody={simulationTableBody}
        includeIndex={true}
      />
      <div className="flex flex-col justify-center items-center">
        <h3 className={`text-centermt-10 ${headingStyle}`}>
          Gantt Chartt
        </h3>
        {servers.map((server, serverIndex) => (
          <div className="flex text-center">
            <h4 className="relative top-6 px-4 uppercase">Server {serverIndex}: </h4>
            <GanttChart server={server} />
          </div>
        ))}
      </div>
      <div className="flex flex-col justify-center items-center mt-6">
        <h3 className={`my-10 ${headingStyle}`}>
          Results Interpretation
        </h3>
        <AveragesDisplay averages={simulationAverages} />
      </div>
      <div className="flex flex-col justify-center items-center mt-6">
        <h3 className={`my-10 ${headingStyle}`}>
          Calculations using Formulas
        </h3>
        <AveragesDisplay averages={formulaAverages} />
      </div>
    </div>
  );
};

export default SimulationTable;
