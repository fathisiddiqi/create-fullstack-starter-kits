#!/usr/bin/env node

import { cac } from "cac";
import degit from "degit";
import fs from "fs-extra";
import path from "node:path";

const cli = cac("create-fullstack-starter-kits");

const templates = {
	"expo-offline": "fathisiddiqi/fullstack-starter-kits/expo-offline-first-app",
	"hono-cloudflare-workers":
		"fathisiddiqi/fullstack-starter-kits/hono-cloudflare-workers",
};

cli
	.command("<project name>", "Create a new project from a template")
	.option("-t, --template <template>", "Template to use", {
		default: "expo-offline",
	})
	.action(async (projectName, options) => {
		const template = options.template || "expo-offline";
		if (!templates[template]) {
			console.error(`Template ${template} not found`);
			process.exit(1);
		}

		const repo = templates[template];
		const emitter = degit(repo, { cache: false, force: true });

		console.log(`Creating project ${projectName} from template ${template}...`);
		await emitter.clone(projectName);

		const pkgPath = path.join(projectName, "package.json");
		if (await fs.pathExists(pkgPath)) {
			const pkg = await fs.readJson(pkgPath);
			pkg.name = projectName;
			await fs.writeJson(pkgPath, pkg, { spaces: 2 });
		}

		console.log();
		console.log();

		console.log(`Project ${projectName} created from template ${template}`);
		console.log(`Next steps:`);
		console.log(`1. cd ${projectName}`);
		console.log(`2. pnpm install`);
		console.log(`3. pnpm run dev`);
	});

cli.help();
cli.parse();
