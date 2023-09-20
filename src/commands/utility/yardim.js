const {embed, button, actionRow, selectMenu, selectMenuOptions, attachment} = require("../../utils/builder");

module.exports = {
    data: {
        name: "yardim",
        description: "Yardim komutlarini gosterir"
    },
    async execute(client, interaction) {
        const helpEmbed = embed(
            "**Moderasyon Komutları**",
            `[Aşağıda gördüğün komutlar ile beni yönetebilirsin.](https://github.com/X4TH3N4/moderation-bot)\n
            \n /yardim: Bu komutu gösterir.
            
            `,
            `${interaction.member.user.username} tarafından istendi. | ${client.user.username} 2023 `,
            interaction.member.avatarURL({dynamic: true, size: 1024}),
            client.user.avatarURL({dynamic: true, size: 1024}),
            "Green"
        )

        const yardimButton = button(4, "yardim-xathena", process.env.EMOJI_ID, false, "Label Denemesi"
        )

        const secMenu = selectMenu(
            "select-menu",
            "Ben bir placeholder'ım",
            [
                selectMenuOptions("Bu bir test label",
                    "test",
                    "Bu bir test açıklama",
                    process.env.EMOJI_ID,
                    true
                ),
                selectMenuOptions(
                    "Bu bir test2 label",
                    "test2",
                    "Bu bir test2 açıklama",
                    process.env.EMOJI_ID
                )
            ],
            1,
            1
        )

        const action = actionRow(yardimButton);
        const secAction = actionRow(secMenu);

        const ek = attachment("Bu bir açıklama testi.", './src/png.png', "test_dosya", "testfotograf.png")

        await interaction.reply({embeds: [helpEmbed], ephemeral: true, components: [action, secAction], files: [ek]});
    }
};