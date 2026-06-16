import fs from "fs";
import path from "path";

function loadEnv() {
  const envPath = path.resolve(process.cwd(), ".env");
  if (!fs.existsSync(envPath)) return;
  const env = fs.readFileSync(envPath, "utf8");
  for (const line of env.split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const [key, ...rest] = line.split("=");
    if (!key) continue;
    if (process.env[key] === undefined) {
      process.env[key] = rest.join("=");
    }
  }
}

loadEnv();

async function main() {
  const { connectDB } = await import("../lib/mongodb");
  const modelTest = (await import("../app/models/testModel")).default;
  const { countries } = await import("../Data/Data");

  await connectDB();

  const cityToCountry = new Map<string, string>();
  const allCities = new Set<string>();
  const allCountries = new Set<string>();

  for (const country of countries) {
    allCountries.add(country.name.toLowerCase());
    for (const city of country.cities) {
      allCities.add(city.toLowerCase());
      cityToCountry.set(city.toLowerCase(), country.name.toLowerCase());
    }
  }

  const dbCities = (await modelTest.distinct("city")).map((city: string) => city.toLowerCase());
  const dbCitySet = new Set(dbCities);

  const missingCities = [...allCities].filter((city) => !dbCitySet.has(city));
  const countriesWithDocs = new Set(
    dbCities
      .map((city) => cityToCountry.get(city))
      .filter((country): country is string => Boolean(country)),
  );
  const missingCountries = [...allCountries].filter((country) => !countriesWithDocs.has(country));

  console.log(`Total defined countries: ${allCountries.size}`);
  console.log(`Total defined cities: ${allCities.size}`);
  console.log(`Distinct registered cities in DB: ${dbCitySet.size}`);
  console.log(`Missing cities: ${missingCities.length}`);
  console.log(`Missing countries (no city records): ${missingCountries.length}`);
  console.log("\nMissing cities list:", missingCities);
  console.log("\nMissing countries list:", missingCountries);

  process.exit(0);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
