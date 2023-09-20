const {Client, Partials} = require("discord.js");

class clientXATHENA extends Client {
    constructor() {
        super({
            intents: 131071,
            partials: [
                Partials.User,
                Partials.Channel,
                Partials.Message,
                Partials.GuildMember,
                Partials.GuildScheduledEvent,
                Partials.Reaction,
                Partials.ThreadMember,
            ],
        });
    }
}

module.exports = clientXATHENA;
