import esbuild from "esbuild";
import process from "process";
import builtins from "builtin-modules";

const prod = (process.argv[2] === "production");

const context = await esbuild.context({
	entryPoints: ["src/index.mjs"],
	bundle: true,
	format: "cjs",
	target: "es2018",
	logLevel: "info",
	sourcemap: prod ? false : "inline",
	treeShaking: true,
	outfile: "index.js",
	external: builtins,
});

if (prod) {
	await context.rebuild();
	process.exit(0);
} else {
	await context.watch();
}
