const {PermissionsBitField} = require("discord.js");
const {succesEmbed, errorEmbed} = require("../../utils/builder");

module.exports = {
    data: {
        name: "ban",
        description: "Kullanıcıyı banlar.",
        permissions: PermissionsBitField.BanMembers | PermissionsBitField.KickMembers,
        options: [
            {
                name: "uye",
                description: "Yasaklanacak üyeyi seçiniz.",
                required: true,
                type: 6
            },
            {
                name: "sebep",
                description: "Yasaklama sebebini yazınız.",
                required: false,
                type: 3
            }]
    },
    async execute(client, interaction) {
        const uye = interaction.options.getUser("uye");
        const reason = interaction.options.getString("sebep") || `${interaction.member.user.tag} tarafından yasaklandı.`;
        const log = client.channels.cache.get(process.env.MOD_LOG_CHANNEL_ID);
        let guildUye = interaction.guild.members.cache.get(uye.id);

        try {

            if (guildUye) {

                if (guildUye.bannable === true) {
                    const banEmbed = succesEmbed(
                        "Üyeyi Banladım!",
                        "Yasaklanan üye: <@" + guildUye.id + `> (${guildUye.id})\nYasaklanma sebebi: ` + reason,
                        `${interaction.member.displayName} tarafından istendi.`,
                        interaction.member.displayAvatarURL({dynamic: true, size: 1024}),
                        guildUye.displayAvatarURL({dynamic: true, size: 1024}),
                    );
                    interaction.reply({embeds: [banEmbed]});
                    await guildUye.ban({
                        reason: reason,
                        deleteMessageSeconds: 604800 // MAX: 604800 MIN: 0
                    });
                    log.send({embeds: [banEmbed]})
                } else {
                    const banErrEmbed = errorEmbed(
                        "Üyeyi Banlayamadım",
                        `${guildUye.user.tag} (${guildUye.id}) kişisi banlanamadı.`,
                        `${interaction.member.displayName} tarafından istendi.`,
                        interaction.member.displayAvatarURL({dynamic: true, size: 1024}),
                        guildUye.displayAvatarURL({dynamic: true, size: 1024})
                    );
                    interaction.reply({embeds: [banErrEmbed]});
                }
            } else {
                guildUye = uye;
                try {
                    const uyeBanEmbed = succesEmbed(
                        "Üyeyi Banladım!",
                        "Yasaklanan üye: <@" + guildUye.id + `> (${guildUye.id})\nYasaklanma sebebi: ` + reason,
                        `${interaction.member.displayName} tarafından istendi.`,
                        interaction.member.displayAvatarURL({dynamic: true, size: 1024}),
                        guildUye.displayAvatarURL({dynamic: true, size: 1024}),
                    );
                    interaction.reply({embeds: [uyeBanEmbed]});
                    await interaction.guild.bans.create(guildUye, {
                        reason: reason
                    });
                    log.send({embeds: [uyeBanEmbed]});
                } catch (e) {
                    console.log(`${this.data.name} - komutunda bir hataya rastladım: ` + e.message);
                    const banErrorEmbed = errorEmbed(
                        "Üyeyi Banlayamadım",
                        `${guildUye.user.tag} (${guildUye.id}) kişisi banlanamadı.`,
                        `${interaction.member.displayName} tarafından istendi.`,
                        interaction.member.displayAvatarURL({dynamic: true, size: 1024}),
                        guildUye.displayAvatarURL({dynamic: true, size: 1024})
                    );
                    interaction.reply({embeds: [banErrorEmbed]});
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
