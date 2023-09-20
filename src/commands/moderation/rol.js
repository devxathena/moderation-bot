const {PermissionsBitField} = require("discord.js");
const {errorEmbed, succesEmbed} = require("../../utils/builder");

module.exports = {
    data: {
        name: "rol",
        description: "Üyeye rol ekler veya siler.",
        permissions: PermissionsBitField.KickMembers,
        options: [
            {
                name: "ver", description: "Üyeye rol ekler.", type: 1, options: [
                    {name: "uye", description: "Rol verilecek üyeyi seçin.", type: 6, required: true},
                    {name: "rol", description: "Üyeye verilecek rolü seçin.", type: 8, required: true},
                ]
            },
            {
                name: "sil", description: "Üyeden rol siler.", type: 1, options: [
                    {name: "uye", description: "Rol verilecek üyeyi seçin.", type: 6, required: true},
                    {name: "rol", description: "Üyeye verilecek rolü seçin.", type: 8, required: true},
                ]
            }
        ]
    },
    async execute(client, interaction) {

        const uye = interaction.guild.members.cache.get(interaction.options.getUser("uye").id);
        const rol = interaction.options.getRole("rol");
        const log = client.channels.cache.get(process.env.MOD_LOG_CHANNEL_ID);

        try {
            switch (interaction.options.getSubcommand()) {
                case "ver":
                    switch (uye.roles.cache.has(rol.id)) {
                        case true:
                            //Üyede bu rol varsa sadece bir uyarı mesajı at ve geç.

                            const giveErrEmbed = errorEmbed({
                                title: "Üyede Zaten Rol Var!",
                                description: `<@${uye.id}> (${uye.id}) kişisinde zaten <@&${rol.id}> rolü var.`,
                                footer_text: `${interaction.member.displayName} tarafından istendi.`,
                                footer_icon: `${interaction.member.displayAvatarURL({dynamic: true, size: 1024})}`,
                                thumbnail: uye.displayAvatarURL({dynamic: true, size: 1024})
                            });
                            interaction.reply({embeds: [giveErrEmbed]});
                            break;

                        case false:
                            //Üyeye rolü ver ve verdiğine dair bir mesaj at. Sonradan bu mesajı log kanalına at.
                            const giveEmbed = succesEmbed(
                                "Rol Verildi",
                                `<@${uye.id}> (${uye.id}) kişisine <@&${rol.id}> rolü verildi.`,
                                `${interaction.member.displayName} tarafından istendi.`,
                                `${interaction.member.displayAvatarURL({dynamic: true, size: 1024})}`,
                                uye.displayAvatarURL({dynamic: true, size: 1024})
                            )
                            uye.roles.add(rol);
                            interaction.reply({embeds: [giveEmbed]});
                            log.send({embeds: [giveEmbed]});
                            break;
                    }
                    break;
                case "sil":
                    switch (uye.roles.cache.has(rol.id)) {
                        case false:
                            //Üyede zaten bu rol yoksa uyarı mesajı at ve geç.
                            const removeErrEmbed = errorEmbed(
                                "Üyede Zaten Rol Yok!",
                                `<@${uye.id}> (${uye.id}) kişisinde zaten <@&${rol.id}> rolü yok.`,
                                `${interaction.member.displayName} tarafından istendi.`,
                                `${interaction.member.displayAvatarURL({dynamic: true, size: 1024})}`,
                                uye.displayAvatarURL({dynamic: true, size: 1024})
                            );

                            interaction.reply({embeds: [removeErrEmbed]});
                            break;

                        case true:
                            //Üyeden rolü sil ve silindiğine dair bir mesaj at. Sonradan bu mesajı log kanalına at.
                            const removeEmbed = succesEmbed(
                                "Rol Silindi",
                                `<@${uye.id}> (${uye.id}) kişisinden <@&${rol.id}> rolü silindi.`,
                                `${interaction.member.displayName} tarafından istendi.`,
                                `${interaction.member.displayAvatarURL({dynamic: true, size: 1024})}`,
                                uye.displayAvatarURL({dynamic: true, size: 1024})
                            )

                            uye.roles.remove(rol);
                            interaction.reply({embeds: [removeEmbed]});
                            log.send({embeds: [removeEmbed]});
                            break;
                    }
                    break;


            }
        } catch (e) {
            console.log(`${this.data.name} - komutunda bir hataya rastladım: ` + e.message);
            interaction.reply({
                content: `${this.data.name} - komutunda bir hataya rastladım: ` + e.message,
                ephemeral: true
            });
        }


    }
}