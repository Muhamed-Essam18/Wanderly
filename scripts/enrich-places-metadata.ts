/// <reference types="node" />
import fs from "fs";
import path from "path";
import { connectDB } from "../lib/mongodb.ts";
import modelTest from "../app/models/testModel.ts";

type DbDoc = {
  _id: string;
  cashKey?: string;
};

function loadEnv() {
  for (const envFile of [".env", ".env.local"]) {
    const envPath = path.resolve(process.cwd(), envFile);
    if (!fs.existsSync(envPath)) continue;

    const env = fs.readFileSync(envPath, "utf8");
    for (const line of env.split(/\r?\n/)) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;

      const [key, ...rest] = trimmed.split("=");
      if (key && process.env[key] === undefined) {
        process.env[key] = rest.join("=");
      }
    }
  }
}

function getApiBaseUrl() {
  return (process.env.ENRICH_API_BASE_URL || "http://localhost:3000").replace(/\/$/, "");
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchFromCitiesApi(baseUrl: string, query: string) {
  const url = `${baseUrl}/api/cities?${new URLSearchParams({ query }).toString()}`;
  const response = await fetch(url);

  if (!response.ok) {
    const body = await response.text();
    throw new Error(`Cities API failed (${response.status}): ${body}`);
  }

  return response.json();
}

async function run() {
  loadEnv();

  const baseUrl = getApiBaseUrl();
  console.log(`Using Cities API: ${baseUrl}`);

  await connectDB();

  const docs = (await modelTest.find({}, { _id: 1, cashKey: 1 }).lean()) as DbDoc[];

  let updated = 0;
  let skipped = 0;
  let failed = 0;

  for (const doc of docs) {
    const query = doc.cashKey?.trim();

    if (!query) {
      skipped += 1;
      continue;
    }

    try {
      const data = await fetchFromCitiesApi(baseUrl, query);

      await modelTest.updateOne(
        { _id: doc._id },
        {
          $set: {
            output: data,
          },
        },
      );

      updated += 1;
      await sleep(150);
    } catch (error) {
      failed += 1;
      console.warn(`Failed doc ${doc._id}:`, error);
    }
  }

  console.log("\nDone");
  console.log(`Total docs: ${docs.length}`);
  console.log(`Updated: ${updated}`);
  console.log(`Skipped: ${skipped}`);
  console.log(`Failed: ${failed}`);
}

run()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error("Script failed:", error);
    process.exit(1);
  });
