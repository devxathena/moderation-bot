const {embed, authorEmbed} = require("../utils/builder");
const {time} = require("discord.js");
module.exports = {
    name: "guildMemberRemove",
    run: async (client, member) => {
        if (member.guild.id === process.env.GUILD_ID) {
        const goodbyeChannel = client.channels.cache.get(process.env.WELCOME_CHANNEL_ID);
        let memberRoles = member.roles.cache
            .filter((roles) => roles.id !== member.guild.id)
            .map((r) => r)
            .join(`\n`);
        if (memberRoles.length > 1024) memberRoles = "`ÇOK ROLÜ VAR`";
        if (!memberRoles) memberRoles = "`YOK`";

        const embedRemove = authorEmbed(
            member.user.username,
            member.displayAvatarURL({dynamic: true, size: 1024}),
            ":outbox_tray: Sunucudan Ayrıldı!",
            `${member.user.tag} (` + "`" + `${member.id}` + "`" + `)\n<@${member.user.id}>\n\n**Ayrıldığı Tarih**\n${time(new Date(), 'f')} (${time(new Date(), 'R')})\n\n**Katıldığı Tarih**\n${time(member.joinedAt, 'f')} (${time(member.joinedAt, 'R')})\n\n**Hesap Oluşturma Tarihi**\n${time(member.user.createdAt, 'f')} (${time(member.user.createdAt, 'R')})\n\n**Roller**\n${memberRoles}`,
            `Kişi: ${member.user.tag} | ${member.user.id}`,
            client.user.displayAvatarURL({dynamic: true, size: 1024}),
            member.displayAvatarURL({dynamic: true, size: 1024}),
            "Red"
        );

        goodbyeChannel.send({embeds: [embedRemove]});
    } else return}
}