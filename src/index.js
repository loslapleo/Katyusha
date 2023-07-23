/*
 * Main file for Katyusha.
 */

const fs = require("node:fs");
const path = require("node:path");
const { Client, Collection, GatewayIntentBits } = require("discord.js");
const { DisTube } = require("distube");
const { SpotifyPlugin } = require("@distube/spotify");
const { SoundCloudPlugin } = require("@distube/soundcloud");
const { YtDlpPlugin } = require("@distube/yt-dlp");

let token;
// Running from Replit.
if (process.argv[1] == "remote") token = process.env["token"];
// Running locally.
else token = require("./config.json").token;

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.GuildVoiceStates,
		GatewayIntentBits.GuildIntegrations,
	],
});
module.exports = client;

// DisTube setup.
client.distube = new DisTube(client, {
	leaveOnEmpty: true,
	leaveOnStop: true,
	leaveOnFinish: true,
	emitNewSongOnly: true,
	emitAddSongWhenCreatingQueue: false,
	emitAddListWhenCreatingQueue: false,
	nsfw: true,
	plugins: [
		new SpotifyPlugin({
			emitEventsAfterFetching: true,
		}),
		new SoundCloudPlugin(),
		new YtDlpPlugin({
			update: false,
		}),
	]
});

client.commands = new Collection();
const commandsPath = path.join(__dirname, "commands");
const commandFiles = fs.readdirSync(commandsPath).filter(file =>
	file.endsWith(".js"));

const eventsPath = path.join(__dirname, "events");
const eventFiles = fs.readdirSync(eventsPath).filter(file =>
	file.endsWith(".js"));

// Retrieves commands from "command" directory.
for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);

	if ("data" in command && "execute" in command) {
		client.commands.set(command.data.name, command);
	} else {
		console.log(`[ WARNING ] The command at ${filePath} is missing a required "data" or "execute" property.`);
	}
}

// Creates and handles music queue.
const status = (queue) =>
	`Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${
		queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
	}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``;

// Retrieves events from "events" directory.
for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);

	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else if (event.distube) {
		client.distube.on(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(token);
