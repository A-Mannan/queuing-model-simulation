import React, { useState, useEffect } from "react";
import { getSimulationTable } from "../../utils/simulationTable";
import Table from "./Table";
import GanttChart from "./GanttChart";
import AveragesDisplay from "./AveragesDisplay";

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
  // const { simulationTable: simulationTableBody, servers } = getSimulationTable({
  //   meanArrival,
  //   meanService,
  //   numOfServers,
  //   numOfObservations,
  //   arrivalDistType,
  //   serviceDistType,
  // });

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
      <div>
        <h3 className="text-center mt-10 text-lg font-bold underline uppercase">
          Gantt Chartt :
        </h3>
        {servers.map((server, serverIndex) => (
          <div className="inline">
            <h4>Server {serverIndex}: </h4>
            <GanttChart server={server} />
          </div>
        ))}
      </div>
      <div>
        <h3 className="my-10 text-lg font-bold underline uppercase">
          Results Interpretation :
        </h3>
        <AveragesDisplay averages={simulationAverages} />
      </div>
      <div>
        <h3 className="my-10 text-lg font-bold underline uppercase">
          Calculations using Formulas :
        </h3>
        <AveragesDisplay averages={formulaAverages} />
      </div>
    </div>
  );
};

export default SimulationTable;
