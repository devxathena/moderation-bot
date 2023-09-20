module.exports = {
    name: "interactionCreate",
    run: async (client, interaction) => {

        if (interaction.isChatInputCommand()) {
            const command = client.commands.get(interaction.commandName);
            if (!command) return;

            try {
                await command.execute(client, interaction);
            } catch (error) {
                console.error(`Error executing ${interaction.commandName}`);
                console.error(error);
                await interaction.reply({
                    content: "There was an error while executing this command!" +
                        error.message,
                    ephemeral: true,
                });
            }
        }
        if (interaction.isButton()) {
            const button = client.buttons.get(interaction.customId);
            if (!button) return;

            try {
                await button.execute(client, interaction);
                console.log(`
                ${interaction.customId} ID'li Buton Tetiklendi.\n Tetikleyen: ${interaction.user.tag} (${interaction.user.id})\n Butonun İşlevi: ${button.data.description}`
                );

            } catch (error) {
                console.log(button);
                console.error(error);
                await interaction.reply({
                    content: "There was an error while executing this button!",
                    ephemeral: true,
                });
            }
        }
        if (interaction.isStringSelectMenu()) {
            const selectMenu = client.selectMenus.get(interaction.values.toString());
            if (!selectMenu) return;

            try {
                await selectMenu.execute(client, interaction);
                console.log(`
                ${interaction.values} değerli bir selectMenu Tetiklendi.\n Tetikleyen: ${interaction.user.tag} (${interaction.user.id})\n selectMenu İşlevi: ${selectMenu.data.description} \n selectMenu ID: ${selectMenu.data.customId}`
                );

            } catch (error) {
                console.log(selectMenu);
                console.error(error);
                await interaction.reply({
                    content: "There was an error while executing this selectMenu!",
                    ephemeral: true,
                });
            }
        }
        if (interaction.isMessageContextMenuCommand()) {
            console.log("MessageContextMenuCommand Kullanıldı");
        }
        if (interaction.isUserContextMenuCommand()) {
            console.log("UserContextMenuCommand Kullanıldı");
        }
        if (interaction.isModalSubmit()) {
            console.log("ModalSubmit Kullanıldı");
        }
    }
};