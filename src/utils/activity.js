const {ActivityType} = require("discord.js");

module.exports = (client, moment) => {

    function setStatus() {
        client.user.setPresence({
            activities: [{
                name: `🌍 /yardım  | ` + process.env.BOT_NAME + ` 🔥`,
                type: ActivityType.Streaming,
                url: "https://www.twitch.tv/xathena_"
            }],
            status: 'dnd',
        });

        setTimeout(() => {
            client.user.setPresence({
                activities: [{
                    name: `🌍 ` + process.env.BOT_NAME + ` 🔥`,
                    type: ActivityType.Streaming,
                    url: "https://www.twitch.tv/xathena_"
                }],
                status: 'dnd',
            });
        }, 5000);
    }

    console.log(`${client.user.username} is serving ${client.channels.cache.size} channels, ${client.guilds.cache.size} servers, and ${client.users.cache.size} users.`);
    console.log(`[${moment().format('DD-MM-YYYY HH:mm:ss')}] BOT: Game name set!`);
    console.log(`[${moment().format('DD-MM-YYYY HH:mm:ss')}] BOT: Active, commands loaded!`);
    console.log(`[${moment().format('DD-MM-YYYY HH:mm:ss')}] BOT: Logged in as ${client.user.tag}!`);
    console.log(`Guilds where ${client.user.username} is present: `);
    client.guilds.cache.forEach((guild) => console.log(`- ${guild.name}`));
    console.log("------------------------------------------");
    setInterval(setStatus, 10000);
}