import {
  EXP_POIS_RAND_DIST,
  NORMAL_DIST,
  UNIFORM_DIST,
  GAMMA_DIST,
} from "../../utils/constants";
import { inputStyle, labelStyle } from "../../styles";

const InputBox = ({
  displayResult,
  updateMeanArrival,
  updateVarianceArrival,
  updateMeanService,
  updateVarianceService,
  updateNumofServers,
  arrivalDistType,
  updateArrivalDistType,
  serviceDistType,
  updateServiceDistType,
  updateNumOfObservations,
}) => {
  return (
    <>
      <div className="relative md:w-2/6 w-5/6">
        <label
          htmlFor="arrival-dist-select"
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:bg-slate-600 peer-focus:px-2 peer-focus:text-gray-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
          TYPE OF ARRIVAL DISTRIBUTION
        </label>
        <select
          id="arrival-dist-select"
          className="px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-2 border-gray-900 text-black dark:border-gray-600 focus:outline-none focus:ring-0 peer"
          onChange={(event) => {
            updateArrivalDistType(event.target.value);
          }}
          disabled={displayResult}
        >
          <option value={EXP_POIS_RAND_DIST}>Poisson</option>
          <option value={EXP_POIS_RAND_DIST}>Exponential</option>
          <option value={EXP_POIS_RAND_DIST}>Random</option>
          <option value={NORMAL_DIST}>Normal</option>
          <option value={UNIFORM_DIST}>Uniform</option>
          <option value={GAMMA_DIST}>Gamma</option>
        </select>
      </div>
      <div className="relative md:w-2/6 w-5/6">
        <input
          type="number"
          id="mean-arrival"
          className="px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-2 border-gray-900 text-black dark:border-gray-600 focus:outline-none focus:ring-0 peer"
          placeholder=" "
          onChange={(event) => updateMeanArrival(event.target.value)}
          disabled={displayResult}
        />
        <label
          htmlFor="mean-arrival"
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:bg-slate-600 peer-focus:px-2 peer-focus:text-gray-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
          MEAN OF ARRIVAL
        </label>
      </div>

      {arrivalDistType !== EXP_POIS_RAND_DIST ? (
        <div className="relative md:w-2/6 w-5/6">
          <input
            type="number"
            id="var-arrival"
            className="px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-2 border-gray-900 text-black dark:border-gray-600 focus:outline-none focus:ring-0 peer"
            placeholder=" "
            onChange={(event) => {
              updateVarianceArrival(event.target.value);
            }}
            disabled={displayResult}
          />
          <label
            htmlFor="var-arrival"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:bg-slate-600 peer-focus:px-2 peer-focus:text-gray-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            VARIANCE OF ARRIVAL
          </label>
        </div>
      ) : (
        ""
      )}

      <div className="relative md:w-2/6 w-5/6">
        <label
          htmlFor="service-dist-select"
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:bg-slate-600 peer-focus:px-2 peer-focus:text-gray-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
          TYPE OF SERVICE DISTRIBUTION
        </label>
        <select
          id="service-dist-select"
          className="px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-2 border-gray-900 text-black dark:border-gray-600 focus:outline-none focus:ring-0 peer"
          onChange={(event) => updateServiceDistType(event.target.value)}
          disabled={displayResult}
        >
          <option value={EXP_POIS_RAND_DIST}>Poisson</option>
          <option value={EXP_POIS_RAND_DIST}>Exponential</option>
          <option value={EXP_POIS_RAND_DIST}>Random</option>
          <option value={NORMAL_DIST}>Normal</option>
          <option value={UNIFORM_DIST}>Uniform</option>
          <option value={GAMMA_DIST}>Gamma</option>
        </select>
      </div>

      <div className="relative md:w-2/6 w-5/6">
        <input
          type="number"
          id="mean-service"
          className="px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-2 border-gray-900 text-black dark:border-gray-600 focus:outline-none focus:ring-0 peer"
          placeholder=" "
          onChange={(event) => updateMeanService(event.target.value)}
          disabled={displayResult}
        />
        <label
          htmlFor="mean-service"
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:bg-slate-600 peer-focus:px-2 peer-focus:text-gray-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
          MEAN OF SERVICE
        </label>
      </div>

      {serviceDistType !== EXP_POIS_RAND_DIST ? (
        <div className="relative md:w-2/6 w-5/6">
          <input
            type="number"
            id="vari-service"
            className="px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-2 border-gray-900 text-black dark:border-gray-600 focus:outline-none focus:ring-0 peer"
            placeholder=" "
            onChange={(event) => updateVarianceService(event.target.value)}
            disabled={displayResult}
          />
          <label
            htmlFor="var-service"
            className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:bg-slate-600 peer-focus:px-2 peer-focus:text-gray-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
          >
            VARIANCE OF SERVICE
          </label>
        </div>
      ) : (
        ""
      )}

      <div className="relative md:w-2/6 w-5/6">
        <input
          type="number"
          id="num-of-servers"
          className="px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-2 border-gray-900 text-black dark:border-gray-600 focus:outline-none focus:ring-0 peer"
          placeholder=" "
          onChange={(event) => updateNumofServers(event.target.value)}
          disabled={displayResult}
        />
        <label
          htmlFor="num-of-servers"
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:bg-slate-600 peer-focus:px-2 peer-focus:text-gray-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
          NUMBER OF SERVERS
        </label>
      </div>
      <div className="relative md:w-2/6 sm:w-5/6">
        <input
          type="number"
          id="num-of-observations"
          className="px-2.5 pb-2.5 pt-4 w-full text-sm bg-transparent rounded-lg border-2 border-gray-900 text-black dark:border-gray-600 focus:outline-none focus:ring-0 peer"
          placeholder=" "
          onChange={(event) => updateNumOfObservations(event.target.value)}
          disabled={displayResult}
        />
        <label
          htmlFor="num-of-observations"
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-white px-2 peer-focus:bg-slate-600 peer-focus:px-2 peer-focus:text-gray-600 peer-focus:dark:text-white peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
        >
          NUMBER OF OBSERVATIONS
        </label>
      </div>
    </>
  );
};

export default InputBox;
