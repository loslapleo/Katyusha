/*
 * This is the music player. It handles all song queries, queues and general
 * functions that would be expected from a music player.
 */

class MusicPlayer {
	// Adds new song to the queue.
	static add(song) {
		if (!this.songs) this.resetQueue();

		this.songs[this.backIndex] = song;
		this.backIndex++;

		// TODO debug
		this.printQueue();
	}

	// Plays song that is first in queue.
	static play() {
	}

	// Pauses the currently playing song.
	static pause() {
	}

	// Skips the current song.
	static skip() {
		if (!this.songs) this.resetQueue();

		delete this.songs[this.frontIndex];
		this.frontIndex++;

		if (this.frontIndex == this.backIndex) this.resetQueue();

		// TODO debug
		this.printQueue();
	}

	// Stops playing current song and clears queue.
	static stop() {
	}

	// Check what song is currently playing.
	static check() {
		if (!this.songs) this.resetQueue();

		return this.songs[this.frontIndex];
	}

	// Returns current song queue.
	static getQueue() {
		return this.songs;
	}
	
	// Resets queue to empty queue.
	static resetQueue() {
		this.songs = [];
		this.frontIndex = 0;
		this.backIndex = 0;
		return;
	}

	// Debug function that prints the current queue to console.
	static printQueue() {
		let str = this.songs[0];
		for (let i = 1; i < this.songs.length; i++) str += ", " + this.songs[i];
		if (str == undefined) console.log(`[ DEBUG ] Queue: <empty>`);
		else console.log(`[ DEBUG ] Queue: ${str}.`);
	}
}

module.exports = MusicPlayer;
