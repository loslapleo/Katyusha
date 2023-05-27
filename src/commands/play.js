/*
 * Command: play <song>
 *
 * <song>: song that is to be played
 *
 * Plays song that was requested by the user.
 */

const { SlashCommandBuilder } = require("discord.js");
const MusicPlayer = require("../utils/MusicPlayer");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("Plays the song requested.")
		.addStringOption(option => option
			.setName("song")
			.setDescription("Song to be played.")
			.setRequired(true)),
	async execute(interaction) {
		if (!interaction.member.voice.channel) return await interaction.reply(
			"You must be in a voice channel to play something!");

		const song = interaction.options.getString("song");
		MusicPlayer.add(song);
		await interaction.reply(`You wanted to play \"${song}\"!`);
	},
};
