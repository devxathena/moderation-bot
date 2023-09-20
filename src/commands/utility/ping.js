const {embed} = require("../../utils/builder");
const {PermissionsBitField} = require("discord.js");

module.exports = {
    data: {
        name: "ping",
        description: "Ping command",
        options: [],
        permissions: PermissionsBitField.KickMembers,
    },
    async execute(client, interaction) {

        const test = embed(
            "Ping",
            "Pong!",
            `${interaction.user.username} tarafından istendi.`,
            `${interaction.member.avatarURL({
                dynamic: true,
                size: 1024
            })}`,
            client.user.avatarURL({dynamic: true, size: 1024}),
            "Purple"
        );
        await interaction.reply({embeds: [test]});
    },
};
