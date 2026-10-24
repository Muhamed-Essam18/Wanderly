import { placesTypes } from "@/Data/Data";
import { getData } from "@/app/lib/api-helper";
import City from "@/Components/City/City";
import { findCountryByRoute } from "@/lib/journey-utils";
import { notFound } from "next/navigation";
interface PageProps {
  params: Promise<{ countryName: string; placeType: string }>;
}
const PlaceType = async ({ params }: PageProps) => {
  const { countryName: countryRouteParam, placeType } = await params;
  const decodedPlaceType = decodeURIComponent(placeType);
  const country = findCountryByRoute(countryRouteParam);

  if (!country || !placesTypes.some((type) => type.name === decodedPlaceType)) {
    return notFound();
  }

  const data = await getData(`${decodedPlaceType} in ${country.name}`, country.name, decodedPlaceType);

  return (
    <>
      <City
        locationName={country.name}
        data={data}
        placeType={decodedPlaceType}
      ></City>
    </>
  );
};

export default PlaceType;
