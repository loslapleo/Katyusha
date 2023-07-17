/*
 * This file deploys all commands.
 */

const fs = require("node:fs");
const { REST, Routes } = require("discord.js");
// Use this if you're running it locally.
// const { clientId, guildId, token } = require("./config.json");
// Use these if you're running form Replit.
const clientId = process.env["clientId"]; 
const guildId = process.env["guildId"];
const token = process.env["token"]; 

const commands = [];
const commandFiles = fs.readdirSync("./src/commands").filter(file =>
	file.endsWith(".js"));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	commands.push(command.data.toJSON());
}

const rest = new REST({ version: "10" }).setToken(token);

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
