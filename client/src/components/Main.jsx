import { useState } from "react";
import ArrivalTable from "./ArrivalTable";
import SimulationTable from "./SimulationTable";
import InputBox from "./InputBox";
import { EXP_POIS_RAND_DIST } from "../../utils/constants";
import { headingStyle } from "../styles";

const Main = () => {
  const [meanArrival, setMeanArrival] = useState(0);
  const [varianceArrival, setVarianceArrival] = useState(0);
  const [meanService, setMeanService] = useState(0);
  const [varianceService, setVarianceService] = useState(0);
  const [numOfServers, setNumofServers] = useState(0);
  const [arrivalDistType, setArrivalDistType] = useState(EXP_POIS_RAND_DIST);
  const [serviceDistType, setServiceDistType] = useState(EXP_POIS_RAND_DIST);
  const [numOfObservations, setNumOfObservations] = useState(0);
  const [displayResult, setDisplayResult] = useState(false);

  const handleInputForm = () => {
    // Check if all fields are filled
    if (meanArrival && meanService && numOfServers && numOfObservations) {
      if (meanArrival < meanService) {
        alert("Arrival mean time should be greater than Service mean time.");
        return;
      }
      if (
        (arrivalDistType !== EXP_POIS_RAND_DIST && !varianceArrival) ||
        (serviceDistType !== EXP_POIS_RAND_DIST && !varianceService)
      ) {
        alert("Please fill in all fields.");
        return;
      }
      setDisplayResult(!displayResult);
    } else {
      // Show an error message or perform other actions
      alert("Please fill in all fields.");
    }
  };

  return (
    <div className="flex-grow flex justify-center items-center">
      <div className="w-3/4 h-full box-border">
        <div className="flex flex-col justify-center items-center p-3 gap-4 w-full font-quicksand uppercase">
          <InputBox
            displayResult={displayResult}
            arrivalDistType={arrivalDistType}
            serviceDistType={serviceDistType}
            updateMeanArrival={setMeanArrival}
            updateMeanService={setMeanService}
            updateNumofServers={setNumofServers}
            updateArrivalDistType={setArrivalDistType}
            updateServiceDistType={setServiceDistType}
            updateNumOfObservations={setNumOfObservations}
            updateVarianceArrival={setVarianceArrival}
            updateVarianceService={setVarianceService}
          />
          {displayResult ? (
            <>
              <h3 className={headingStyle}>
                Inter-Arrival Lookup Table
              </h3>
              <ArrivalTable
                meanArrival={meanArrival}
                arrivalDistType={arrivalDistType}
                varianceArrival={varianceArrival}
              />
              <h3 className={headingStyle}>
                Simulation Table:
              </h3>
              <SimulationTable
                meanArrival={meanArrival}
                meanService={meanService}
                numOfServers={numOfServers}
                numOfObservations={numOfObservations}
                arrivalDistType={arrivalDistType}
                serviceDistType={serviceDistType}
                varianceArrival={varianceArrival}
                varianceService={varianceService}
              />
            </>
          ) : (
            ""
          )}
          <button
            type="button"
            className="text-primary w-min hover:text-secondary border border-primary hover:bg-primary focus:ring-4 focus:outline-none focus:ring-secondary font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 "
            onClick={handleInputForm}
          >
            {displayResult ? "Clear" : "Calculate"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Main;
