/*
 * This file deploys all commands.
 */

const fs = require("node:fs");
const { REST, Routes } = require("discord.js");

let clientId;
let guildId;
let token;
if (process.argv[1] == "remote") { // Running from Replit.
	clientId = process.env["clientId"];
	guildId = process.env["guildId"];
	token = process.env["token"];
} else { // Running locally.
	clientId = require("./config.json").clientId;
	guildId = require("./config.json").guildId;
	token = require("./config.json").token;
}

const commands = [];
const commandFiles = fs.readdirSync("./src/commands").filter(file =>
	file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(token);

/* This is just for when you want to clear all commands.
rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);
rest.put(Routes.applicationCommands(clientId), { body: [] })
	.then(() => console.log('Successfully deleted all application commands.'))
	.catch(console.error);
*/

(async () => {
	try {
		console.log(`[ UPDATE ] Started refreshing ${commands.length} application (/) commands.`);

		const data = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: commands },
		);

		console.log(`[ UPDATE ] Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.log(error);
	}
})();
