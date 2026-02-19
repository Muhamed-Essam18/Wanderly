export const getData = async function (name: string) {
  const data = await fetch(`http://localhost:3000/api/cities/?query=${name}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await data.json();
  const places = result.places;
  console.log(places);
  return places;
};
