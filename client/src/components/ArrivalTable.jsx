import React from "react";
import { getArrivalLookUpTable } from "../../utils/arrivalTable";
import Table from "./Table";
import { useEffect, useState } from "react";

const ArrivalTable = (arrivalTableProps) => {
  const arrivalTableHeaders = [
    "Cumulative Prob. LookUp",
    "Cumulative Probability",
    "Inter-arrival time",
  ];
  // const arrivalTableBody = getArrivalLookUpTable(meanArrival);

  const [arrivalTableBody, setArrivalTableBody] = useState([]);

  const fetchArrivalTable = async () => {
    const endpointUrl = "http://127.0.0.1:5000/get-interarrival-lookup-table";
    const queryString = new URLSearchParams(arrivalTableProps).toString();
    const urlWithQuery = `${endpointUrl}?${queryString}`;
    try {
      const response = await fetch(urlWithQuery, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setArrivalTableBody(data);
      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchArrivalTable();
  }, []);

  return (
    <Table
      tableHeaders={arrivalTableHeaders}
      tableBody={arrivalTableBody}
      ignoreIndex={false}
    />
  );
};

export default ArrivalTable;
