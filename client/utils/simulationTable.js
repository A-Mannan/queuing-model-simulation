import {
  isServerIdle,
  calculateServiceTime,
  findServerIndexWithMinTimeLeft,
  getInterArrivalTime,
} from "./helper.js";
import { getArrivalLookUpTable } from "./arrivalTable.js";

export function getSimulationTable({
  meanArrival,
  meanService,
  numOfServers,
  numOfObservations,
  arrivalDistType,
  serviceDistType
}) {
  const simulationTable = [];
  const avgArrivalTimeLookup = getArrivalLookUpTable(meanArrival);
  const servers = Array.from({ length: numOfServers }, () => []);

  for (let rowIndex = 0; rowIndex < numOfObservations; rowIndex++) {
    simulationTable[rowIndex] = {};
    simulationTable[rowIndex].arrivalRandomNum = Math.random();
    simulationTable[rowIndex].interArrivalTime =
      rowIndex === 0
        ? 0
        : getInterArrivalTime(
            simulationTable[rowIndex].arrivalRandomNum,
            avgArrivalTimeLookup
          );

    const arrivalTime = (simulationTable[rowIndex].arrivalTime =
      rowIndex === 0
        ? 0
        : simulationTable[rowIndex].interArrivalTime +
          simulationTable[rowIndex - 1].arrivalTime);

    simulationTable[rowIndex].serviceRandomNum = Math.random();
    const serviceTime = (simulationTable[rowIndex].serviceTime =
      calculateServiceTime(
        simulationTable[rowIndex].serviceRandomNum,
        meanService
      ));

    let allocated = false;
    let startTime, endTime;
    for (let serverIndex = 0; serverIndex < servers.length; serverIndex++) {
      const server = servers[serverIndex];
      if (isServerIdle(arrivalTime, server)) {
        if (server.length && server[server.length - 1].endTime < arrivalTime) {
          servers[serverIndex].push({
            id: undefined,
            start: server[server.length - 1].endTime,
            end: arrivalTime,
          });
        }
        servers[serverIndex].push({
          id: rowIndex,
          start: arrivalTime,
          end: arrivalTime + serviceTime,
        });
        startTime = arrivalTime;
        endTime = arrivalTime + serviceTime;
        allocated = true;

        break;
      }
    }

    if (!allocated) {
      const minTimeServerIndex = findServerIndexWithMinTimeLeft(servers);
      servers[minTimeServerIndex].push({
        id: rowIndex,
        start:
          servers[minTimeServerIndex][servers[minTimeServerIndex].length - 1]
            .end,
        end:
          servers[minTimeServerIndex][servers[minTimeServerIndex].length - 1]
            .end + serviceTime,
      });
      startTime =
        servers[minTimeServerIndex][servers[minTimeServerIndex].length - 1].end;
      endTime =
        servers[minTimeServerIndex][servers[minTimeServerIndex].length - 1]
          .end + serviceTime;
    }

    simulationTable[rowIndex].startTime = startTime;
    simulationTable[rowIndex].endTime = endTime;
    simulationTable[rowIndex].turnAroundTime = endTime - arrivalTime;
    simulationTable[rowIndex].waitTime = startTime - arrivalTime;
  }

  return { simulationTable, servers };
}

export function getAveragesAndUtilizationFactor(simulationTable, numOfServers) {
  let interArrivalSum = 0;
  let serviceTimeSum = 0;
  let turnAroundTimeSum = 0;
  let waitTimeSum = 0;
  for (let row of simulationTable) {
    interArrivalSum += row.interArrivalTime;
    serviceTimeSum += row.serviceTime;
    turnAroundTimeSum += row.turnAroundTime;
    waitTimeSum += row.waitTime;
  }
  const utilizationFactor =
    serviceTimeSum /
    (numOfServers * Math.max(...simulationTable.map((row) => row.endTime)));

  return [
    {
      name: "Average Inter-Arrival Time",
      value: interArrivalSum / simulationTable.length,
    },
    {
      name: "Average Service Time",
      value: serviceTimeSum / simulationTable.length,
    },
    {
      name: "Average Turn Around Time (Ws)",
      value: turnAroundTimeSum / simulationTable.length,
    },
    {
      name: "Average Waiting Time (Wq)",
      value: waitTimeSum / simulationTable.length,
    },
    {
      name: "Length of system (Ls)",
      value:
        turnAroundTimeSum / simulationTable[simulationTable.length - 1].endTime,
    },
    {
      name: "Length of queue (Lq)",
      value:
        waitTimeSum / simulationTable[simulationTable.length - 1].startTime,
    },
    {
      name: "Utilization factor (Rho)",
      value: utilizationFactor * 100,
    },

    {
      name: "Server Idle",
      value: (1 - utilizationFactor) * 100,
    },
  ];
}
