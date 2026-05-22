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
  console.log(typeof placesTypes);
  console.log(placesTypes);

  if (
    (!countryWhiteList.has(cityName.toLowerCase()) &&
      !citiesWhiteList.has(cityName.toLowerCase())) ||
    !placesTypes.includes(placeType)
  ) {
    return notFound();
  }
  const spaceLessCityName = cityName.replace(/\s/g, "");

  const data = await getData(placeType + " " + "in" + " " + spaceLessCityName);

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
