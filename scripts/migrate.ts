import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { promises as fs } from "fs";
import { Pool } from "pg";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

// Validate environment variables
const CLOUDFLARE_ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const CLOUDFLARE_ACCESS_KEY_ID = process.env.CLOUDFLARE_ACCESS_KEY_ID;
const CLOUDFLARE_SECRET_ACCESS_KEY = process.env.CLOUDFLARE_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const POSTGRES_URL = process.env.DATABASE_URL;

if (
  !CLOUDFLARE_ACCOUNT_ID ||
  !CLOUDFLARE_ACCESS_KEY_ID ||
  !CLOUDFLARE_SECRET_ACCESS_KEY ||
  !R2_BUCKET_NAME ||
  !POSTGRES_URL
) {
  console.error(
    "Missing requrired Environment Variables. Please check your .env.local file"
  );
  process.exit(1);
}

// R2 S3 Client Initialization
const s3 = new S3Client({
  region: "auto",
  endpoint: `https://${CLOUDFLARE_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: CLOUDFLARE_ACCESS_KEY_ID,
    secretAccessKey: CLOUDFLARE_SECRET_ACCESS_KEY,
  },
});

// PostgreSQL Pool Initialization
const pool = new Pool({
  connectionString: POSTGRES_URL,
});

async function migrateImages() {
  console.log("Starting image migration...");

  try {
    const result = await pool.query<{ slug: string; image: string }>(
      "SELECT slug, image FROM meals"
    );
    const meals = result.rows;

    for (const meal of meals) {
      const localImagePath = `public${meal.image}`;
      const imageFileName = meal.image.split("/").pop();

      if (!imageFileName) {
        console.error(
          `Skipping invalid image path for meal ${meal.slug}: ${meal.image}`
        );
        continue;
      }

      try {
        const fileBuffer = await fs.readFile(localImagePath);

        await s3.send(
          new PutObjectCommand({
            Bucket: R2_BUCKET_NAME,
            Key: imageFileName,
            Body: fileBuffer,
            ContentType: "image/jpeg", // Adjust content type as needed
          })
        );
        console.log(`Successfully uploaded ${imageFileName} to R2.`);

        await pool.query("UPDATE meals SET image = $1 WHERE slug = $2", [
          imageFileName,
          meal.slug,
        ]);
        console.log(`Successfully updated database for meal ${meal.slug}.`);
      } catch (error) {
        console.error(
          `Failed to migrate image for meal ${meal.slug}:`,
          (error as Error).message
        );
      }
    }

    console.log("Image migration complete! ✨");
  } catch (error) {
    console.error(
      "An error occurred during migration:",
      (error as Error).message
    );
  } finally {
    await pool.end();
  }
}

migrateImages();
