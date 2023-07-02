const Table = ({ tableHeaders, tableBody, includeIndex = false }) => {
  return (
    <div className="relative border w-fit my-3 border-primary">
      <table className="w-full text-sm text-left text-primary">
        <thead className="text-xs text-secondary uppercase bg-primary">
          <tr>
            {tableHeaders.map((header, headerIndex) => (
              <th scope="col" className="px-6 py-3" key={headerIndex}>
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableBody.map((row, rowIndex) => (
            <tr className="bg-secondary" key={rowIndex}>
              {includeIndex ? <td className="px-6 py-4">{rowIndex}</td> : ""}
              {Object.values(row).map((value, valueIndex) => (
                <td key={valueIndex} className="px-6 py-4">
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
