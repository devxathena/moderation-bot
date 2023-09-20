const {Collection} = require("discord.js");
module.exports = (client, fs) => {

    const selectMenus = [];
    client.selectMenus = new Collection();
    const selectMenuFolders = fs.readdirSync('src/menus/select');

    for (const folder of selectMenuFolders) {
        const selectMenuFolder = fs.readdirSync(`src/menus/select/${folder}`);
        for (const subFolder of selectMenuFolder) {
            const selectMenuFolderSubFolderFiles = fs.readdirSync(`src/menus/select/${folder}/${subFolder}`).filter(file => file.endsWith('.js'));
        for (const file of selectMenuFolderSubFolderFiles) {
            const selectMenu = require(`../menus/select/${folder}/${subFolder}/${file}`);
            const selectMenuName = selectMenu.data.name;
            selectMenus.push({
                name: selectMenuName,
                description: selectMenu.data.description,
                customId: selectMenu.data.customId
            });
            client.selectMenus.set(selectMenuName, selectMenu);
            console.log(`👌 selectMenu loaded successfully: ${selectMenuName}`);
        }}
    }

}