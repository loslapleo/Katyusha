/*
 * Command: stop
 *
 * Stops the bot from playing music.
 */

const { SlashCommandBuilder } = require("discord.js");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("stop")
		.setDescription("Stops playing music."),
	async execute(interaction) {
		if (!interaction.member.voice.channel) return await interaction.reply(
			"You must be in a voice channel to play something!");

		interaction.client.distube.stop(interaction);
		await interaction.reply("Stopped playing ...");
	},
};
