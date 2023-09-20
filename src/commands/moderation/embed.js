const {PermissionsBitField} = require("discord.js");
const {embed} = require("../../utils/builder");
module.exports = {
    data: {
        name: "embed",
        description: "Embed yazdırır.",
        permissions: PermissionsBitField.KickMembers,
        options: [
            {
                name: "kanal",
                description: "Mesajın gönderileceği kanalı seçin.",
                required: true,
                type: 7
            },
            {
                name: "mesaj-basligi",
                description: "Mesaj başlığını yazın.",
                required: true,
                type: 3
            },
            {
                name: "mesaj-icerigi",
                description: "Mesaj içeriğini yazın.",
                required: true,
                type: 3
            },
            {
                name: "renk",
                description: "Mesaj rengini belirleyin.",
                required: true,
                type: 3,
                choices: [
                    {
                        name: "Kırmızı",
                        value: "Red",
                        description: "Kırmızı rengini seçersiniz."
                    },
                    {
                        name: "Yeşil",
                        value: "Green",
                        description: "Yeşil rengini seçersiniz."
                    },
                    {
                        name: "Sarı",
                        value: "Yellow",
                        description: "Sarı rengini seçersiniz."
                    },
                    {
                        name: "Mavi",
                        value: "Blue",
                        description: "Mavi rengini seçersiniz."
                    },
                    {
                        name: "Camgöbeği",
                        value: "Aqua",
                        description: "Camgöbeği rengini seçersiniz."
                    },
                    {
                        name: "Mor",
                        value: "Purple",
                        description: "Mor rengini seçersiniz."
                    },
                    {
                        name: "Altın",
                        value: "Gold",
                        description: "Altın rengini seçersiniz."
                    },
                    {
                        name: "Turuncu",
                        value: "Orange",
                        description: "Turuncu rengini seçersiniz."
                    },
                    {
                        name: "Gri",
                        value: "Grey",
                        description: "Gri rengini seçersiniz."
                    },
                    {
                        name: "Beyaz",
                        value: "White",
                        description: "Beyaz rengini seçersiniz."
                    },
                    {
                        name: "Sade",
                        value: "Default",
                        description: "Sade rengini seçersiniz."
                    }
                ]
            },
            {
                name: "thumbnail-fotografi",
                description: "Mesajda gösterilecek fotoğrafın linkini yazın.",
                required: false,
                type: 3
            },
            {
                name: "altyazi",
                description: "Altyazı mesajını girin.",
                required: false,
                type: 3
            },
            {
                name: "altyazi-fotografi",
                description: "Altyazıda gözükecek fotoğrafın linkini yazın.",
                required: false,
                type: 3
            }
        ]
    },
    async execute(client, interaction) {
        interaction.deferReply();
        const modLogChannel = client.channels.cache.get(process.env.MOD_LOG_CHANNEL_ID);
        const kanal = interaction.options.getChannel("kanal");
        const mesaj_basligi = interaction.options.getString("mesaj-basligi") || process.env.BOT_NAME;
        const mesaj_icerigi = interaction.options.getString("mesaj-icerigi");
        const thumbnail_fotografi = interaction.options.getString("thumbnail-fotografi") || interaction.guild.iconURL({
            dynamic: true,
            size: 1024
        });
        const renk = interaction.options.getString("renk") || "Purple";
        const altyazi = interaction.options.getString("altyazi") || `${client.user.username} 2023`;
        const altyazi_fotografi = interaction.options.getString("altyazi-fotografi") || interaction.guild.iconURL({
            dynamic: true,
            size: 1024
        });
        try {

            await interaction.deleteReply();

            const embedMessage = embed(mesaj_basligi,mesaj_icerigi,altyazi, altyazi_fotografi, thumbnail_fotografi,renk);
            const embedLog = embed("**Bir Mesaj Gönderildi**",
                `${interaction.member.displayName} (${interaction.member.id}) tarafından <#${kanal.id}> kanalına bir mesaj gönderildi.`,
               `${client.user.username} 2023`,
                client.user.displayAvatarURL({dynamic: true, size: 512}),
                interaction.member.displayAvatarURL({dynamic: true, size: 512}),
                "Green")

            kanal.send({embeds: [embedMessage]});
            modLogChannel.send({embeds: [embedLog]})
        } catch (e) {
            console.log(`${this.data.name} - komutunda bir hataya rastladım: ` + e.message);
            interaction.reply({
                content: `${this.data.name} - komutunda bir hataya rastladım: ` + e.message,
                ephemeral: true
            });
        }


    }
};
