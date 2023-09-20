module.exports = {
    data: {
        name: "test2",
        description: "test değerli bir select option.",
        customId: "select-menu"
    },
    async execute(client, interaction) {
        console.log("Bu " +interaction.values +" işlevinin çalıştığını gösterir.");
        interaction.reply({content: "Bu " +interaction.customId + " selectMenu ID'li " +interaction.values +" işlevinin çalıştığını gösterir.", ephemeral: true});

    }
}