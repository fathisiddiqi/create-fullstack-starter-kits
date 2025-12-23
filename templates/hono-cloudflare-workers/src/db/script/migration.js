import { drizzle } from "drizzle-orm/d1";
import { migrate } from "drizzle-orm/d1/migrator";
import { getPlatformProxy } from "wrangler";

async function runMigrations() {
	try {
		console.log("Connecting to local D1 database...\n");

		const { env, dispose } = await getPlatformProxy({
			configPath: "./wrangler.toml",
		});

		const db = drizzle(env.DB);

		console.log("Running migrations on local database...\n");

		await migrate(db, { migrationsFolder: "./src/db/generated" });

		console.log("Local migrations completed successfully!");

		// Clean up
		await dispose();
	} catch (err) {
		console.error("Migration failed:", err);
		process.exit(1);
	}
}

runMigrations();
