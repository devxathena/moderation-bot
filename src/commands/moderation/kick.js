const {PermissionsBitField} = require("discord.js");
const {succesEmbed, errorEmbed} = require("../../utils/builder");

module.exports = {
    data: {
        name: "kick",
        description: "Kullanıcıyı atar.",
        permissions: PermissionsBitField.KickMembers | PermissionsBitField.MuteMembers,
        options: [
            {
                name: "uye",
                description: "Atılacak üyeyi seçiniz.",
                required: true,
                type: 6
            },
            {
                name: "sebep",
                description: "Atılma sebebini yazınız.",
                required: false,
                type: 3
            }]
    },
    async execute(client, interaction) {

        try {
            let uye = interaction.guild.members.cache.get(interaction.options.getUser("uye").id);
            const reason = interaction.options.getString("sebep") || `${interaction.member.user.username} tarafından atıldı.`;
            const log = client.channels.cache.get(process.env.MOD_LOG_CHANNEL_ID);

            if (!uye) {
                uye = interaction.options.getUser("uye");
                const kickErrorEmbed = errorEmbed("Üyeyi Atamadım",
                    `${uye.tag} (${uye.id}) kişisi atılamadı.`,
                    `${interaction.member.displayName} tarafından istendi.`,
                    interaction.member.displayAvatarURL({dynamic: true, size: 1024}),
                    uye.displayAvatarURL({dynamic: true, size: 1024}));

                return interaction.reply({embeds: [kickErrorEmbed]});
            } else {

                if (uye.kickable === true) {
                    const embed = succesEmbed(
                        "Üyeyi Attım",
                        "Atılan üye: <@" + uye.id + `> (${uye.id})\nAtılma sebebi: ` + reason,
                        `${interaction.member.displayName} tarafından istendi.`,
                        interaction.member.displayAvatarURL({dynamic: true, size: 1024}),
                        uye.displayAvatarURL({dynamic: true, size: 1024}));
                    interaction.reply({embeds: [embed]});
                    await uye.kick(reason);
                    log.send({embeds: [embed]})
                } else {
                    const kickErrEmbed = errorEmbed(
                        "Üyeyi Atamadım",
                        `${uye.user.tag} (${uye.id}) kişisi atılamadı.`,
                        `${interaction.member.displayName} tarafından istendi.`,
                        interaction.member.displayAvatarURL({dynamic: true, size: 1024}),
                        uye.displayAvatarURL({dynamic: true, size: 1024})
                    );

                    interaction.reply({embeds: [kickErrEmbed]});
                }
            }
        } catch (e) {
            console.log(`${this.data.name} - komutunda bir hataya rastladım: ` + e.message);
            interaction.reply({
                content: `${this.data.name} - komutunda bir hataya rastladım: ` + e.message,
                ephemeral: true
            });
        }

    }

};