const {authorEmbed} = require("../utils/builder");
const {time} = require("discord.js");
module.exports = {
    name: "guildMemberAdd",
    run: async (client, member) => {

        const welcomeChannel = client.channels.cache.get(process.env.WELCOME_CHANNEL_ID);

        if (member.guild.id === process.env.GUILD_ID) {

        const botRoleID = process.env.BOT_ROLE_ID;
        const memberRoleID = process.env.MEMBER_ROLE_ID;
        if (member.user.bot === false) {
            await member.roles.add(memberRoleID);
        } else {
            await member.roles.add(botRoleID);
        }

        const embedWelcome = authorEmbed(
            member.user.username,
            member.displayAvatarURL({dynamic: true, size: 1024}),
            ":inbox_tray: Sunucuya Katıldı!",
            `${member.user.tag} (` + "`" + `${member.user.id}` + "`" + `)\n<@${member.user.id}> \n\n**Katıldığı Tarih** \n${time(member.joinedAt, "f")} (${time(member.joinedAt, 'R')})\n\n**Hesap Oluşturma Tarihi** \n${time(member.user.createdAt, 'f')} (${time(member.user.createdAt, 'R')})`,
            `Kişi: ${member.user.tag} | ${member.user.id}`,
            client.user.displayAvatarURL({dynamic: true, size: 1024}),
            member.displayAvatarURL({dynamic: true, size: 1024}),
            "Green"
        );
        welcomeChannel.send({embeds: [embedWelcome]});
    }}
}