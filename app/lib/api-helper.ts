export const getData = async function (query: string,cityName:string,placeType:string) {
  const data = await fetch(`http://localhost:3000/api/cities/?query=${query}&cityName=${cityName}&placeType=${placeType}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  const result = await data.json();
  const places = result.places;
 
  return places;
};
