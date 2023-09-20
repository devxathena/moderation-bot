const {PermissionsBitField} = require("discord.js");
module.exports = {
    data: {
        name: "yardim-xathena",
        description: "Yardım komutunun yardim-xathena buton işlevi.",
        permissions: PermissionsBitField.KickMembers
    },
    async execute(client, interaction) {
        await interaction.reply({content: "Bu **Button Handler** işlevinin çalıştığını gösterir.", ephemeral: true});

        // interaction.type =
        //     ChatInput = 1,
        //     User = 2,
        //     Message = 3
        //
        // interaction.customId = butonun ID'si
        //
        // interaction.componentType =
        //     ActionRow = 1,
        //     Button = 2,
        //     StringSelect = 3,
        //     TextInput = 4,
        //     UserSelect = 5,
        //     RoleSelect = 6,
        //     MentionableSelect = 7,
        //     ChannelSelect = 8,
        //     SelectMenu = 3

    }
}