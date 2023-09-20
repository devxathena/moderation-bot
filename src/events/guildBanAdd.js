const {authorEmbed} = require("../utils/builder");
const {time, AuditLogEvent} = require("discord.js");
module.exports = {
    name: "guildBanAdd",
    run: async (client, ban) => {

        if (ban.guild.id === process.env.GUILD_ID) {

        const modLogChannel = client.channels.cache.get(process.env.MOD_LOG_CHANNEL_ID);
        const bannedUser = ban.user;

        const getBanAuditLog = await ban.guild.fetchAuditLogs({
            limit: 1,
            type: 22
        });

        const banAuditLog = getBanAuditLog.entries.first();
       const banner = banAuditLog.executor;
       const banAuthor = ban.guild.members.cache.get(banAuditLog.target);
        let reason = banAuditLog.reason;
       if (banAuditLog.reason === null) reason = `<@${banner.id}> tarafından yasaklandı.`;

            const embedRemove = authorEmbed(
                bannedUser.username,
                bannedUser.displayAvatarURL({dynamic: true, size: 1024}),
                ":outbox_tray: Sunucudan Yasaklandı!",
                `${bannedUser.tag} (` + "`" + `${bannedUser.id}` + "`" + `)\n<@${bannedUser.id}>\n\n**Yasaklayan Kişi**\n${banner.tag} (` + "`" + `${banner.id}` + "`" + `)\n<@${banner.id}>\n\n**Sebep**\n${reason}\n\n**Yasaklandığı Tarih**\n${time(new Date(), 'f')} (${time(new Date(), 'R')})\n\n**Hesap Oluşturma Tarihi**\n${time(bannedUser.createdAt, 'f')} (${time(bannedUser.createdAt, 'R')})`,
                `Kişi: ${bannedUser.tag} | ${bannedUser.id}`,
                client.user.displayAvatarURL({dynamic: true, size: 1024}),
                bannedUser.displayAvatarURL({dynamic: true, size: 1024}),
                "Red"
            );
            modLogChannel.send({embeds: [embedRemove]});
    } else return}
}