export function calculatePoissonCdf(k, mean) {
  let cdf = 0.0;
  for (let i = 0; i <= k; i++) {
    cdf += (Math.pow(mean, i) * Math.exp(-mean)) / factorial(i);
  }
  return cdf;
}

export function calculateServiceTime(randomNum, mean) {
  return Math.ceil(-Math.log(1 - randomNum) * mean);
}

export function getInterArrivalTime(randomNum, avgArrivalTimeLookup) {
  for (let index = 0; index < avgArrivalTimeLookup.length; index++) {
    const row = avgArrivalTimeLookup[index];
    if (randomNum >= row.cumProbLookup && randomNum < row.cumProb) {
      return row.interArrivalTime;
    }
  }
}

export function isServerIdle(arrivalTime, server) {
  return server.length === 0 || server[server.length - 1].end <= arrivalTime;
}

export function findServerIndexWithMinTimeLeft(servers) {
  const endTimeOfServers = servers.map(
    (server) => server[server.length - 1].end
  );
  return endTimeOfServers.indexOf(Math.min(...endTimeOfServers));
}

// Helper function for factorial calculation
function factorial(n) {
  if (n === 0 || n === 1) {
    return 1;
  }
  return n * factorial(n - 1);
}
