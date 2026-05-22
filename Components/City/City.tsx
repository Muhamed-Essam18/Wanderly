import SelectionsBar from "./SelectionsBar";
import { CityCard } from "./CityCard/CityCard";
interface Props {
  cityName: string;
  data: any;
  placeType: string;
}
const City = ({ cityName, data, placeType }: Props) => {
  return (
    <>
      <section className=" md:pb-10  text-center w-[90%] m-auto pt-30">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
          <span className="text-sm text-primary font-medium">
            About {cityName}
          </span>
        </div>
        <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-text-primary mb-4">
          Explore your Favourite
          <span className="text-primary"> City</span>
        </h1>
        <p className="text-text-muted text-lg max-w-2xl mx-auto">
          Explore test and uncover its most popular and visited places
        </p>
      </section>
      <section className="pb-10">
        <SelectionsBar length={data?.length} />
      </section>
      <section className="grid grid-cols-1 md:grid-cols-3">
        {data?.length > 0 ? (
          data?.map((place: any) => {
            const photoName = place.photos?.[0]?.name;
            console.log(photoName);
            return (
              <CityCard
                key={place.displayName.text}
                name={place.displayName.text}
                adress={place.formattedAddress}
                rating={place.rating}
                picUrl={photoName}
                place={placeType}
                mapsUrl={place.googleMapsUri}
              />
            );
          })
        ) : (
          <div>
            No {placeType} found in {cityName}
          </div>
        )}
      </section>
    </>
  );
};

export default City;
