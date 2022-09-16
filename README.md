# The-memster

This is a bot which takes memes from reddit via an API and posts the meme in a desired channel. It posts a meme every 24 hours. This can be changed on te cron.schedule setting.

**Update** 16/09/2022 - The memster has Music functionality.

## How to run the bot

Install all the node modules by `npm install` in the files directory

To run the bot create an .env file with the parameters:

- `token` (your discord token)
- `clientID` (Your discord bot client ID)
- `guildId` (ID of the server you want to put the bot in)
- `memechannel` (ID of the channel you want the memes to be sent to)


Random change by G

Finally do `node index.js` which will start your bot.
