const {embed, authorEmbed} = require("../utils/builder");
const {time, VoiceState, PermissionsBitField, GuildMember, Collection} = require('discord.js');
module.exports = {
    name: "voiceStateUpdate",
    run: async (client, oldState, newState) => {

        if ((oldState.guild.id || newState.guild.id) === process.env.GUILD_ID) {


            const logCh = client.channels.cache.get(process.env.LOG_CHANNEL_ID);
            const voiceCreatorCh = client.channels.cache.get(process.env.VOICE_CHANNEL_CREATOR_ID);
            const createdVoiceChannels = new Collection();

            const voiceCreatorChannel = client.channels.cache.get(process.env.VOICE_CHANNEL_CREATOR_ID);
            const voiceCreatorChannelParent = voiceCreatorChannel.parent;
            //Aynı sesli kanalda duruyor ise
            if (oldState.channelId === newState.channelId) return;
            //Yeni bir kanala katılmış ise
            if (oldState.channel === null && newState.channelId) {
                let chMember = newState.member;
                let chUser = chMember.user;
                const embedJoined = authorEmbed(
                    chUser.tag,
                    chUser.avatarURL({size: 512}),
                    `Ses Kanalına Girdi`,
                    `${chUser.tag} (` + "`" + `${chUser.id}` + "`" + `)\n<@${chUser.id}>\n\n**Kanal**\n<#${newState.channelId}> (` + "`" + `${newState.channelId}` + "`" + `)\n\n**Tarih**\n${time(new Date(), 'f')} (${time(new Date(), 'R')})`,
                    `Kişi: ${chUser.tag} | ${chMember.id} `,
                    client.user.avatarURL({size: 512}),
                    chUser.avatarURL({size: 512}),
                    `Green`
                )
                logCh.send({embeds: [embedJoined]});
            }
            //Kanal Değiştirmiş ise
            if (oldState.channelId && newState.channelId && oldState.channelId !== newState.channelId) {
                let chMember = newState.member;
                let chUser = chMember.user;
                const embedJoined = authorEmbed(
                    chUser.tag,
                    chUser.avatarURL({size: 512}),
                    `Ses Kanalını Değiştirdi`,
                    `${chUser.tag} (` + "`" + `${chUser.id}` + "`" + `)\n<@${chUser.id}>\n\n**Kanal**\n<#${oldState.channelId}> :arrow_right: <#${newState.channelId}>\n(` + "`" + `${oldState.channelId}` + "`" + `) :arrow_right: (` + "`" + `${newState.channelId}` + "`" + `)\n\n**Tarih**\n${time(new Date(), 'f')} (${time(new Date(), 'R')})`,
                    `Kişi: ${chUser.tag} | ${chMember.id} `,
                    client.user.avatarURL({size: 512}),
                    chUser.avatarURL({size: 512}),
                    `Blue`
                )
                logCh.send({embeds: [embedJoined]});
            }
            //Kanaldan ayrılmış ise
            if (oldState.channelId && newState.channel === null) {
                let chMember = oldState.member;
                let chUser = chMember.user;
                const embedJoined = authorEmbed(
                    chUser.tag,
                    chUser.avatarURL({size: 512}),
                    `Ses Kanalından Ayrıldı`,
                    `${chUser.tag} (` + "`" + `${chUser.id}` + "`" + `)\n<@${chUser.id}>\n\n**Kanal**\n<#${oldState.channelId}> (` + "`" + `${oldState.channelId}` + "`" + `)\n\n**Tarih**\n${time(new Date(), 'f')} (${time(new Date(), 'R')})`,
                    `Kişi: ${chUser.tag} | ${chMember.id} `,
                    client.user.avatarURL({size: 512}),
                    chUser.avatarURL({size: 512}),
                    `Red`
                )
                logCh.send({embeds: [embedJoined]});
            }

            try {
                // Member Ses Oluşturma Kanalına giriş yapmış ise
                if (oldState.channel !== newState.channel && newState.channelId === voiceCreatorChannel.id) {

                    async function channelCreator() {

                        const createdChannel = await newState.guild.channels.create({
                            parent: voiceCreatorChannel.parent, // 1117601070965854359 yani channelcreator
                            type: 2, //Guild Voice
                            name: newState.member.user.tag,
                            permissionOverwrites: [
                                {
                                    id: newState.member.id,
                                    allow: [PermissionsBitField.Flags.MoveMembers, PermissionsBitField.Flags.ManageChannels, PermissionsBitField.Flags.ManageRoles, PermissionsBitField.Flags.Stream]
                                },
                                {
                                    id: newState.guild.roles.everyone,
                                    deny: [PermissionsBitField.Flags.ViewChannel],
                                }
                            ],
                            bitrate: 384000,
                            userLimit: 1,
                            reason: `${newState.member.user.tag} tarafından bir ses kanalı oluşturuldu.`
                        });
                        createdVoiceChannels.set(newState.member.id, {
                            member: newState.member,
                            channel: createdChannel
                        });
                        await newState.member.voice.setChannel(
                            createdChannel,
                            `${newState.member.user.tag} tarafından oluşturulan ${createdChannel.name} kanalına ${client.user.tag} tarafından taşındı.`
                        )
                    }

                    // console.log(channelCollection.channel);
                    // console.log(channelCollection.member);

                    // if (oldState.channel.parent.id === voiceCreatorChannelParent.id) {
                    //     console.log("test")
                    // }

                    setTimeout(() => channelCreator(), 100)
                    setTimeout(() => commands(), 50)
                    function commands() {
                        const creatorChannelFromParent = voiceCreatorChannelParent.children.cache.first();
                        const filteredCreatorChannel = voiceCreatorChannelParent.children.cache.filter((channel) => (channel.type === 2) && (channel.id !== creatorChannelFromParent.id) && (channel.members.size < 1))

                        if (filteredCreatorChannel) {
                            setTimeout(() => filteredCreatorChannel.forEach((channel) => channel.delete()), 100)
                            createdVoiceChannels.delete(oldState.member.id);
                        }}
                }
                // get (tanımladıktan sonra içindeki her şeyi veriyor), has (key değerini arattıktan sonra value varsa true verir)
                // forEach (her bir x değeri için, her bir get değeri için x adet sonuç verir)
                // filter (filtreleme yapar ve aldığı sonuç get olur), delete (keyi siler), set (sıfırdan collection'a ekleme yapar)

                if (oldState.channel.parent.id !== newState.channel.parent.id) {
                    const creatorChannelFromParent = voiceCreatorChannelParent.children.cache.first();
                    const filteredCreatorChannel = voiceCreatorChannelParent.children.cache.filter((channel) => (channel.type === 2) && (channel.id !== creatorChannelFromParent.id) && (channel.members.size < 1))

                    if (filteredCreatorChannel) {
                        setTimeout(() => filteredCreatorChannel.forEach((channel) => channel.delete()), 100)
                        createdVoiceChannels.delete(oldState.member.id);}}

            } catch (e) {
                console.log(e);
            }

            // const emptyCreatedVoiceChannels = createdVoiceChannels.filter(
            //     (channelData) => channelData.voiceChannel.members.cache.size < 1
            // );
            //
            // if (emptyCreatedVoiceChannels) {
            //     emptyCreatedVoiceChannels.forEach((channelData) => {
            //         const channel = channelData.voiceChannel;
            //         const channelAuthor = channelData.author;
            //
            //         if (channel) {
            //             channel
            //                 .delete(`${channelAuthor.user.tag} oluşturduğu ${channel.name} sesli kanalda kimse olmadığı için silindi!`)
            //                 .then(() => {
            //                     createdVoiceChannels.delete(channelData.voiceChannelId);
            //                 })
            //                 .catch((error) => {
            //                     console.error(`Failed to delete voice channel with ID ${channelId}: ${error}`);
            //                 });
            //         }
            //     });
            // }
        } else {
            return;
        }}
}
