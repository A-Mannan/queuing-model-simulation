import { calculatePoissonCdf } from "./helper.js";

export function getArrivalLookUpTable(meanArrival) {
  const avgArrivalTimeLookup = [];

  // Constructing Inter-Arrival Table Lookup
  let rowIndex = 0;
  let lastCumProb = 0;
  while (lastCumProb < 0.9999) {
    const row = {
      cumProbLookup:
        rowIndex === 0 ? 0 : avgArrivalTimeLookup[rowIndex - 1].cumProb,
      cumProb: calculatePoissonCdf(rowIndex, meanArrival),
      interArrivalTime: rowIndex + 1,
    };
    avgArrivalTimeLookup.push(row);
    lastCumProb = row.cumProb;
    rowIndex++;
  }

  return avgArrivalTimeLookup;
}
