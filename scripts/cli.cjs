#!/usr/bin/env node

const { spawn } = require("node:child_process");
const { constants: osConstants } = require("node:os");
const { getCandidatePackageNames, isRosettaTranslated, resolveBinaryPath } = require("./resolveBinary.cjs");

function printInstallHelp(packageName) {
	console.error(`Detected: ${process.platform}-${process.arch} (Node ${process.version})`);
	if (packageName !== "backlog.md") {
		console.error("Use a Node.js installation that matches your operating system and CPU architecture.");
		console.error(`Reinstall with the platform dependency: npm install -g ${packageName} --include=optional`);
		return;
	}
	if (process.platform === "darwin") {
		const rosetta = isRosettaTranslated();
		console.error(`Rosetta translation: ${rosetta ? "yes" : "no"}`);
		if (rosetta) {
			console.error(
				"Your Node/Bun runs as x64 under Rosetta on an Apple Silicon Mac, so the wrong CPU variant may have been installed.",
			);
		}
		console.error("To fix on macOS:");
		console.error("  - Compare architectures: `node -p process.arch` vs `uname -m` (arm64 = Apple Silicon hardware).");
		console.error(
			"  - Homebrew: use the native brew (`which brew`; /opt/homebrew = arm64, /usr/local = Intel), then `brew reinstall backlog-md`.",
		);
		console.error("  - npm on Apple Silicon: `arch -arm64 npm i -g backlog.md`");
		console.error("  - Bun on Apple Silicon: `arch -arm64 bun add -g backlog.md`");
		console.error("More details: https://github.com/MrLesk/Backlog.md#apple-silicon-macos");
	} else {
		console.error("Reinstall backlog.md so the platform package matching this architecture gets installed.");
	}
}

/**
 * Spawn/exec failures that indicate a missing or wrong-architecture binary.
 * macOS reports a wrong-arch Mach-O as EBADARCH (errno 86), which libuv has no
 * name for, so it surfaces as errno -86 ("Unknown system error -86").
 */
function isBinaryInstallError(error) {
	return error?.errno === -86 || error?.code === "EBADARCH" || error?.code === "ENOEXEC" || error?.code === "ENOENT";
}

function isArchitectureSignal(signal) {
	return signal === "SIGILL" || signal === "SIGTRAP";
}

function getSignalExitCode(signal) {
	const signalNumber = osConstants.signals[signal];
	return signalNumber ? 128 + signalNumber : 1;
}

function handleSpawnError(binaryPath, error, packageName, commandName) {
	if (isBinaryInstallError(error)) {
		console.error(`Cannot execute ${binaryPath} (${error.code ?? error.errno}).`);
		console.error("The binary is missing or was built for a different CPU architecture.");
		printInstallHelp(packageName);
	} else {
		console.error(`Failed to start ${commandName}:`, error);
	}
	process.exit(1);
}

function main({ packageName = "backlog.md", commandName = "backlog" } = {}) {
	let binaryPath;
	try {
		binaryPath = resolveBinaryPath(undefined, undefined, undefined, packageName);
	} catch {
		console.error(`Binary package not installed for ${process.platform}-${process.arch}.`);
		console.error(
			`Tried packages: ${getCandidatePackageNames(undefined, undefined, undefined, packageName).join(", ")}`,
		);
		printInstallHelp(packageName);
		process.exit(1);
	}

	// Clean up unexpected args some global shims pass (e.g. bun) like the binary path itself
	const packagePrefix = packageName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
	const platformBinaryPath = new RegExp(
		`node_modules/${packagePrefix}-(darwin|linux|windows)-[^/]+/backlog(\\.exe)?$`,
		"i",
	);
	const cleanedArgs = process.argv
		.slice(2)
		.filter((arg) => arg !== binaryPath && !platformBinaryPath.test(arg.replace(/\\/g, "/")));

	// Spawn failures can surface as a synchronous throw (e.g. ENOEXEC) or as an 'error' event
	let child;
	try {
		child = spawn(binaryPath, cleanedArgs, {
			stdio: "inherit",
			windowsHide: true,
			// Internal: lets a watch end when the process that started this launcher ends.
			env: { ...process.env, BACKLOG_LAUNCHER: `${process.pid}:${process.ppid}` },
		});
	} catch (error) {
		handleSpawnError(binaryPath, error, packageName, commandName);
		return;
	}

	// Stay alive until the binary exits, so a signal sent to the launcher's PID does not leave it running.
	// Ctrl+C already reaches the binary from the terminal, so SIGINT is waited out instead of sent twice.
	if (process.platform !== "win32") {
		process.on("SIGINT", () => {});
		for (const signal of ["SIGTERM", "SIGHUP", "SIGQUIT"]) {
			process.on(signal, () => child.kill(signal));
		}
	}

	child.on("exit", (code, signal) => {
		if (isArchitectureSignal(signal)) {
			// Typical symptom of running a binary built for the other CPU architecture
			console.error(`\n${commandName} crashed with ${signal} (illegal instruction): ${binaryPath}`);
			console.error("The installed binary was likely built for a different CPU architecture.");
			printInstallHelp(packageName);
			process.exit(1);
		}
		if (signal) {
			process.exit(getSignalExitCode(signal));
		}
		process.exit(code ?? 1);
	});

	child.on("error", (error) => handleSpawnError(binaryPath, error, packageName, commandName));
}

if (require.main === module) main();

module.exports = { getSignalExitCode, isArchitectureSignal, isBinaryInstallError, main };
