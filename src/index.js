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
if (process.argv[1] == "remote") token = process.env["token"]; // Running from Replit.
else token = require("./config.json").token; // Running locally.

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
	leaveOnEmpty: false,
	leaveOnStop: false,
	leaveOnFinish: false,
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

// Retrieves events from "events" directory.
for (const file of eventFiles) {
  const filePath = path.join(eventsPath, file);
  const event = require(filePath);

  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
}

// Creates and handles music queue.
const status = (queue) =>
	`Volume: \`${queue.volume}%\` | Filter: \`${queue.filters.names.join(', ') || 'Off'}\` | Loop: \`${
		queue.repeatMode ? (queue.repeatMode === 2 ? 'All Queue' : 'This Song') : 'Off'
	}\` | Autoplay: \`${queue.autoplay ? 'On' : 'Off'}\``
client.distube
	.on('playSong', (queue, song) =>
		queue.textChannel.send(
			`Playing \`${song.name}\` - \`${song.formattedDuration}\`\nRequested by: ${
				song.user
			}\n${status(queue)}`
		)
	)
	.on('addSong', (queue, song) =>
		queue.textChannel.send(
			`Added ${song.name} - \`${song.formattedDuration}\` to the queue by ${song.user}`
		)
	)
	.on('addList', (queue, playlist) =>
		queue.textChannel.send(
			`Added \`${playlist.name}\` playlist (${
				playlist.songs.length
			} songs) to queue\n${status(queue)}`
		)
	)
	.on('error', (channel, e) => {
		if (channel) channel.send(`An error encountered: ${e.toString().slice(0, 1974)}`)
		else console.error(e)
	})
	.on('empty', channel => channel.send('Voice channel is empty! Leaving the channel...'))
	.on('searchNoResult', (message, query) =>
		message.channel.send(`No result found for \`${query}\`!`)
	)
	.on('finish', queue => queue.textChannel.send('Finished!'));

client.login(token);
