async function fetchData() {
  const endpointUrl = "http://127.0.0.1:5000/get-interarrival-lookup-table";

  const payloadData = {
    key1: "value1",
    key2: "value2",
  };

  const queryString = new URLSearchParams(payloadData).toString();
  const urlWithQuery = `${endpointUrl}?${queryString}`;
  try {
    const response = await fetch(urlWithQuery, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error:", error);
  }
}

fetchData();
