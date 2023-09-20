const {PermissionsBitField} = require("discord.js");
const {embed} = require("../../utils/builder");
module.exports = {
    data: {
        name: "admin",
        description: "ADMIN",
        permissions: PermissionsBitField.KickMembers,
        options: [],
    },
    async execute(client, interaction) {
        await interaction.reply({ephemeral: true, content: "Test cevap mesaj content."});
        const channel = client.channels.cache.get(process.env.RULES_CHANNEL_ID);
        try {

            const embedMessage = embed(
                    "**Sunucu Kuralları**",
                "_Aşağıdaki kurallara uymak **zorundasınız**, aksi taktirde sunucudan **uzaklaştırılacaksınız**._\n" +
                "\n" +
                "*Bu nedenle aşağıdaki listeli kuralları okuyup anladığınıza emin olun:*\n" +
                "\n" +
                "- Sohbet kanallarında küfür kullanımı aşırıya kaçmamak kaydıyla serbesttir.\n" +
                "\n" +
                "- Cinsel içerikler ve cinsellik niteliği taşıyabilecek içerikler yasaktır.\n" +
                "\n" +
                "- Üyeleri özel mesaj yolu ile rahatsız etmek yasaktır.\n" +
                "\n" +
                "- Kişilerin özel bilgilerini paylaşmak yasaktır.\n" +
                "\n" +
                "- Spam ve Flood yapmak yasaktır.\n" +
                "\n" +
                "- Sunucu yetkililerinden herhangi bir yetki, ayrıcalık ve benzeri isteklerde bulunmak yasaktır.\n" +
                "\n" +
                "- Sunucu içi veya özel mesaj yolu ile reklam ve tanıtım yapmak yasaktır.\n" +
                "\n" +
                "- **Discord Topluluk Kılavuz İlkeleri** - **https://discord.com/guidelines** ve **Discord'un Hizmet Koşulları** - **https://discord.com/terms** geçerlidir.",
                "Sunucuya giren herkes üstteki tüm kuralları kabul etmiş sayılır.",
                interaction.guild.iconURL({dynamic: true, size: 1024}),
                interaction.guild.iconURL({dynamic: true, size: 1024}),
                "Purple");

            channel.send({embeds: [embedMessage]});
        } catch (e) {
            console.log(`${this.data.name} - komutunda bir hataya rastladım: ` + e.message);
            interaction.reply({
                content: `${this.data.name} - komutunda bir hataya rastladım: ` + e.message,
                ephemeral: true
            });
        }


    }
};
