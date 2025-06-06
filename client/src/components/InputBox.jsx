import {
  EXP_POIS_RAND_DIST,
  NORMAL_DIST,
  UNIFORM_DIST,
  GAMMA_DIST,
} from "../../utils/constants";
import { inputStyle, labelStyle } from "../styles";

const InputBox = ({
  form,
  setForm,
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
  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setForm({
      ...form,
      [name]: value,
    });
    // console.log(form)
  };
  return (
    <>
    <div className="relative md:w-2/6 w-5/6">
      <select
          id="isPriority"
          className={inputStyle}
          name="isPriority"
          // onChange={(event) => {
          //   updateArrivalDistType(event.target.value);
          // }}
          onChange={handleChange}
          disabled={displayResult}
        >
          <option value={0}>FIFO</option>
          <option value={1}>Priority</option>
        </select>
      </div>
      <div className="relative md:w-2/6 w-5/6">
        <label htmlFor="arrival-dist-select" className={labelStyle}>
          TYPE OF ARRIVAL DISTRIBUTION
        </label>
        <select
          id="arrival-dist-select"
          className={inputStyle}
          name="arrivalDistType"
          // onChange={(event) => {
          //   updateArrivalDistType(event.target.value);
          // }}
          onChange={handleChange}
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
          name="meanArrival"
          className={inputStyle}
          placeholder=" "
          // onChange={(event) => updateMeanArrival(event.target.value)}
          onChange={handleChange}
          disabled={displayResult}
        />
        <label htmlFor="mean-arrival" className={labelStyle}>
          MEAN OF ARRIVAL
        </label>
      </div>

      {arrivalDistType !== EXP_POIS_RAND_DIST ? (
        <div className="relative md:w-2/6 w-5/6">
          <input
            type="number"
            id="var-arrival"
            name="varianceArrival"
            className={inputStyle}
            placeholder=" "
            // onChange={(event) => {
            //   updateVarianceArrival(event.target.value);
            // }}
            onChange={handleChange}
            disabled={displayResult}
          />
          <label htmlFor="var-arrival" className={labelStyle}>
            VARIANCE OF ARRIVAL
          </label>
        </div>
      ) : (
        ""
      )}

      <div className="relative md:w-2/6 w-5/6">
        <label htmlFor="service-dist-select" className={labelStyle}>
          TYPE OF SERVICE DISTRIBUTION
        </label>
        <select
          id="service-dist-select"
          className={inputStyle}
          name="serviceDistType"
          // onChange={(event) => updateServiceDistType(event.target.value)}
          onChange={handleChange}
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
          className={inputStyle}
          placeholder=" "
          name="meanService"
          // onChange={(event) => updateMeanService(event.target.value)}
          onChange={handleChange}
          disabled={displayResult}
        />
        <label htmlFor="mean-service" className={labelStyle}>
          MEAN OF SERVICE
        </label>
      </div>

      {serviceDistType !== EXP_POIS_RAND_DIST ? (
        <div className="relative md:w-2/6 w-5/6">
          <input
            type="number"
            id="vari-service"
            name="varianceService"
            className={inputStyle}
            placeholder=" "
            // onChange={(event) => updateVarianceService(event.target.value)}
            onChange={handleChange}
            disabled={displayResult}
          />
          <label htmlFor="var-service" className={labelStyle}>
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
          name="numOfServers"
          className={inputStyle}
          placeholder=" "
          // onChange={(event) => updateNumofServers(event.target.value)}
          onChange={handleChange}
          disabled={displayResult}
        />
        <label htmlFor="num-of-servers" className={labelStyle}>
          NUMBER OF SERVERS
        </label>
      </div>
      {/* <div className="relative md:w-2/6 sm:w-5/6">
        <input
          type="number"
          id="num-of-observations"
          className={inputStyle}
          placeholder=" "
          // onChange={(event) => updateNumOfObservations(event.target.value)}
          onChange={handleChange}
          disabled={displayResult}
        />
        <label htmlFor="num-of-observations" className={labelStyle}>
          NUMBER OF OBSERVATIONS
        </label>
      </div> */}
    </>
  );
};

export default InputBox;
