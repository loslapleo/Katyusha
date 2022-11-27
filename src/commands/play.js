/*
 * Command: play
 *
 * Plays a song with a given name or url from Youtube.
 */

const { SlashCommandBuilder } = require("discord.js");
const { join } = require("node:path");
const { AudioPlayerStatus, createAudioPlayer, createAudioResource,
	joinVoiceChannel } = require("@discordjs/voice");

module.exports = {
	data: new SlashCommandBuilder()
		.setName("play")
		.setDescription("Plays a song!")
		.addStringOption(option => option
				.setName("song")
				.setDescription("The song to be played!")
				.setRequired(true)),
	async execute(interaction, client) {
		const song = interaction.options.getString("song");
		const player = createAudioPlayer();
		const connection = joinVoiceChannel({
			channelId: channel.id,
			guildId: channel.guild.id,
			adapterCreator: channel.guild.voiceAdapterCreator,
		});
	}
}
