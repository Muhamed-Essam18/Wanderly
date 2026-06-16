import { countryWhiteList, citiesWhiteList } from "@/Data/Data";
import { placesTypes } from "@/Data/Data";
import { getData } from "@/app/lib/api-helper";
import City from "@/Components/City/City";
import { notFound } from "next/navigation";
interface PageProps {
  params: Promise<{ cityName: string; placeType: string }>;
}
const PlaceType = async ({ params }: PageProps) => {
  const { cityName, placeType } = await params;
    const spaceLessCityName = cityName;
    const decodedPlaceType = decodeURIComponent(placeType);
   console.log("placeType:", decodedPlaceType);
   
  if (
    (!countryWhiteList.has(cityName.toLowerCase()) &&
      !citiesWhiteList.has(cityName.toLowerCase())) ||
    !placesTypes.some((type) => type.name === decodedPlaceType)
  ) {
    return notFound();
  }

  const data = await getData(decodedPlaceType + " " + "in" + " " + spaceLessCityName,cityName,decodedPlaceType);

  return (
    <>
      <City
        cityName={spaceLessCityName}
        data={data}
        placeType={placeType}
      ></City>
    </>
  );
};

export default PlaceType;
