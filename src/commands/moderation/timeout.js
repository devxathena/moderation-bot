const {EmbedBuilder, PermissionsBitField} = require("discord.js");
const {succesEmbed, errorEmbed} = require("../../utils/builder");

module.exports = {
    data: {
        name: "timeout",
        description: "Kullanıcıya zaman aşımı uygular.",
        permissions: PermissionsBitField.KickMembers,
        options: [
            {name: "uye", description: "Zaman aşımı uygulanacak üyeyi seçiniz.", required: true, type: 6},
            {
                name: "sure",
                description: "Zaman aşımı süresini seçiniz.",
                type: 4,
                required: true,
                choices: [{
                    name: "1 Dakika",
                    value: 60000,
                    description: "1 dakikalık zaman aşımına uğratır."
                }, {name: "1 Saat", value: 3600000, description: "1 saatlik zaman aşımına uğratır."}, {
                    name: "1 Gün",
                    value: 86400000,
                    description: "1 günlük zaman aşımına uğratır."
                }, {name: "1 Hafta", value: 604800000, description: "1 haftalık zaman aşımına uğratır."}]
            },
            {name: "sebep", description: "Zaman aşımı uygulama sebebini yazınız.", required: false, type: 3}]
    },
    async execute(client, interaction) {

        const deger = interaction.options.getInteger("sure");
        const uye = interaction.options.getUser("uye");
        let sunucu_uye = interaction.guild.members.cache.get(uye.id);
        const sebep = interaction.options.getString("sebep") || `${interaction.member.user.username} tarafından zaman aşımı uygulandı.`;
        if (!interaction.member.moderatable || !interaction.member.manageable) {
            const toErrEmbed = errorEmbed(
                "Üyeye Zaman Aşımı Uygulayamadım!",
                "<@" + uye.id + `> (${uye.id}) kişisine zaman aşımı uygulanamadı.`,
                `${interaction.member.displayName} tarafından istendi.`,
                interaction.member.displayAvatarURL({dynamic: true, size: 1024}),
                sunucu_uye.displayAvatarURL({dynamic: true, size: 1024})
            );
            interaction.reply({embeds: [toErrEmbed]});
            console.log(`${this.data.name} - komutunda bir hataya rastladım: ` + e.message);
        } else {
            if (sunucu_uye) {

                const toEmbed = succesEmbed(
                    "Üyeye Zaman Aşımı Uyguladım!",
                    "Zaman aşımı uygulanan üye: <@" + uye.id + `> (${uye.id})\nUygulama süresi: ${dk(deger)} \nUygulanma sebebi: ` + sebep,
                    `${interaction.member.displayName} tarafından istendi.`,
                    interaction.member.displayAvatarURL({dynamic: true, size: 1024}),
                    sunucu_uye.displayAvatarURL({dynamic: true, size: 1024})
                );
                sunucu_uye.timeout(deger);
                interaction.reply({embeds: [toEmbed]});
            } else {
                sunucu_uye = uye;
                const toErrorEmbed = errorEmbed(
                    "Üyeye Zaman Aşımı Uygulayamadım!",
                    "<@" + uye.id + `> (${uye.id}) kişisine zaman aşımı uygulanamadı.`,
                    `${interaction.member.displayName} tarafından istendi.`,
                    interaction.member.displayAvatarURL({dynamic: true, size: 1024}),
                    sunucu_uye.avatarURL({dynamic: true, size: 1024})
                );
                interaction.reply({embeds: [toErrorEmbed]});

            }
        }


    }
};

function dk(sure) {
    var dakika = Math.floor(sure / 60000);
    return dakika + " dakika";
}