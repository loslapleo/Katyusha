/*
 * Command: skip
 *
 * Skips the song that is currently being played.
 */

const { SlashCommandBuilder } = require("discord.js");
const MusicPlayer = require("../utils/MusicPlayer");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("skip")
		.setDescription("Skips the current song."),
	async execute(interaction) {
		if (!interaction.member.voice.channel) return await interaction.reply(
			"You must be in a voice channel to skip current song!");

		MusicPlayer.skip();
		await interaction.reply(`You skipped the current song!`);
	},
};
