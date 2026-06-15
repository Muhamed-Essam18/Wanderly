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
 

  if (
    (!countryWhiteList.has(cityName.toLowerCase()) &&
      !citiesWhiteList.has(cityName.toLowerCase())) ||
    !placesTypes.some((type) => type.name === placeType)
  ) {
    return notFound();
  }
  const spaceLessCityName = cityName.replace(/\s/g, "");
  const data = await getData(placeType + " " + "in" + " " + spaceLessCityName,cityName,placeType);

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
