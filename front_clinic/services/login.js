export const login = async () => {
  const response = await fetch("http://localhost:8080/home", {
    method: "GET",
    // headers: {
    //   "Content-Type": "application/json"//,
    //   //Authorization: `Bearer ${token}`,
    // },
    //body: JSON.stringify(data)
  });

  const data = await response()
  return data
};
