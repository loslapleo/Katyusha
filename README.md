# Katyusha

General purpose Discord bot that I'm hoping to use myself one day.

## Requirements

- [Node.js](https://nodejs.org/en/download)
- [FFmpeg](https://www.ffmpeg.org/download.html)

## Installation

```
git clone https://github.com/loslapleo/Katyusha.git &&\
cd Katyusha/src &&\
npm install
```

## Configuration

Create a file named `config.json` in the `\src` directory. Insert your bot token, guildId, and clientId into the file like below:

```
{
    "token": "YOUR_BOT_TOKEN",
    "guildId": "YOUR_GUILD_ID",
    "clientId": "YOUR_CLIENT_ID"
}
```

## Usage

In the main directory you can run the `local.sh` bash script to start the bot.
