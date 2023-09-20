const {Collection} = require("discord.js");
module.exports = (client, fs) => {

    const buttons = [];
    client.buttons = new Collection();
    const buttonFolders = fs.readdirSync('src/buttons');

    for (const folder of buttonFolders) {
        const buttonFolderFiles = fs.readdirSync(`src/buttons/${folder}`).filter(file => file.endsWith('.js'));
        for (const file of buttonFolderFiles) {
            const button = require(`../buttons/${folder}/${file}`);
            const buttonName = button.data.name;
            buttons.push({
                name: buttonName,
                description: button.data.description,
                options: button.data.options,
                default_member_permissions: button.data.permissions
            });
            client.buttons.set(buttonName, button);
            console.log(`👌 Button loaded successfully: ${buttonName}`);
        }
    }


}