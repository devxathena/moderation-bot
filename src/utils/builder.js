const {
    EmbedBuilder,
    ButtonBuilder,
    ButtonStyle,
    Colors,
    ComponentEmojiResolvable,
    ActionRowBuilder,
    AttachmentBuilder,
    StringSelectMenuBuilder,
    StringSelectMenuOptionBuilder,
} = require("discord.js");

/**
 * Embed yazdırmaya yarar.
 * @param author_text
 * @param author_icon
 * @param title Embed başlığını gösterir.
 * @param description Embed açıklamasını gösterir.
 * @param footer_text Footer açıklamasını gösterir.
 * @param footer_icon Footer resmini gösterir.
 * @param thumbnail Embed fotoğrafı. Bot avatarURL'i veya bir link.
 * @param color Embed rengini belirler. Red Green Blue etc.
 * @returns {EmbedBuilder}
 */

function authorEmbed(author_text, author_icon, title, description, footer_text, footer_icon, thumbnail, color) {
    return new EmbedBuilder()
        .setAuthor({name: author_text, iconURL: author_icon} || null)
        .setTitle(title || null)
        .setDescription(description || null)
        .setFooter({text: footer_text, iconURL: footer_icon} || null)
        .setThumbnail(thumbnail || null)
        .setColor(color || null)
        .setTimestamp();


}

/**
 * Embed yazdırmaya yarar.
 * @param author_text
 * @param author_icon
 * @param title Embed başlığını gösterir.
 * @param description Embed açıklamasını gösterir.
 * @param footer_text Footer açıklamasını gösterir.
 * @param footer_icon Footer resmini gösterir.
 * @param thumbnail Embed fotoğrafı. Bot avatarURL'i veya bir link.
 * @param color Embed rengini belirler. Red Green Blue etc.
 * @returns {EmbedBuilder}
 */

function embed(title, description, footer_text, footer_icon, thumbnail, color) {
    return new EmbedBuilder()
        .setTitle(title || null)
        .setDescription(description || null)
        .setFooter({text: footer_text, iconURL: footer_icon} || null)
        .setThumbnail(thumbnail || null)
        .setColor(color || null)
        .setTimestamp();


}

/**
 * Embed yazdırmaya yarar.
 * @param title Embed başlığını gösterir.
 * @param description Embed açıklamasını gösterir.
 * @param text
 * @param iconURL
 * @param thumbnail
 * @returns {EmbedBuilder}
 */

function errorEmbed(title, description, text, iconURL, thumbnail) {

    return new EmbedBuilder()
        .setTitle(title || null)
        .setDescription(`⛔ | ${description}`)
        .setFooter({
            text: text,
            iconURL: iconURL
        } || null)
        .setThumbnail(thumbnail || null)
        .setColor("Red")
        .setTimestamp()
}

/**
 * Embed yazdırmaya yarar.
 * @param title Embed başlığını gösterir.
 * @param description Embed açıklamasını gösterir.
 * @param text
 * @param iconURL
 * @param thumbnail
 * @returns {EmbedBuilder}
 */

function succesEmbed(title, description, text, iconURL, thumbnail) {

    return new EmbedBuilder()
        .setTitle(title || null)
        .setDescription("✅ | " + description)
        .setFooter({
            text: text,
            iconURL: iconURL
        } || null)
        .setThumbnail(thumbnail || null)
        .setColor("Green")
        .setTimestamp()
}

function readyEmbed(client) {
    const readyChannel = process.env.READY_CHANNEL_ID;
    const readyEmbedMessage = new EmbedBuilder()
        .setTitle(client.user.username + " Aktif!")
        .setDescription(
            `[Created by XATHENA.\nKomutları görmek için /müzik yazın.](https://twitch.tv/xathena_)`
        )
        .addFields(
            {
                name: "``Şu anda:``",
                value: `${client.channels.cache.size} adet kanala,\n ${client.guilds.cache.size} adet sunucuya,\n ${client.users.cache.size} adet kullanıcıya hizmet veriyor.`,
                inline: true,
            },
            {
                name: "``Sunucu listesi:``",
                value: `❯ ${client.guilds.cache.map((m) => m.name).join(` \n❯  `)}`,
                inline: false,
                split: true,
            }
        )
        .setThumbnail(client.user.avatarURL({dynamic: true, size: 1024}))
        .setFooter({
            text: `${client.user.username} 2023`,
            iconURL: client.user.avatarURL({dynamic: true, size: 1024})
        })
        .setColor("Green")
        .setTimestamp()

    client.channels.cache.get(readyChannel).send({embeds: [readyEmbedMessage]});
}

/**
 * URL Buton oluşturucu.
 * @param url
 * @paramemoji
 * @param disabled
 * @param label
 * @returns {ButtonBuilder}
 */

function buttonURL(url, emoji, disabled, label) {
    return new ButtonBuilder()
        .setStyle(5)
        .setURL(url)
        .setEmoji(emoji)
        .setDisabled(disabled)
        .setLabel(label)
}

/**
 * Buton oluşturucu
 * @param style
 * @param customId
 * @param emoji
 * @param disabled
 * @param label
 * @returns {ButtonBuilder}
 */
function button(style, customId, emoji, disabled, label) {
    return new ButtonBuilder()
        .setStyle(style)
        .setCustomId(customId)
        .setEmoji(emoji)
        .setDisabled(disabled)
        .setLabel(label)
}

/**
 *
 * @returns {ActionRowBuilder<AnyComponentBuilder>}
 * @param components
 */

function actionRow(components) {
    return new ActionRowBuilder().addComponents(components);
}

/**
 * Dosya Eki oluşturucu.
 * @param description
 * @param file
 * @param file_name
 * @param attachment_name
 * @param spoiler
 * @returns {AttachmentBuilder}
 */
function attachment(description, file, file_name, attachment_name) {
    return new AttachmentBuilder()
        .setDescription(description)
        .setFile(file, file_name)
        .setName(attachment_name)
}

/**
 * Select Menu Oluşturucu
 * @param customId ID
 * @param placeholder Gözükecek İsim
 * @param maxValues 1-10 arası
 * @param minValues 1-5 arası
 * @param menu_options Ayar Kısmı. İstediğin kadar selectMenuOptions ekleyebilirsin.
 * @returns {StringSelectMenuBuilder}
 */
function selectMenu(customId, placeholder, menu_options, maxValues, minValues) {
    return new StringSelectMenuBuilder()
        .setCustomId(customId)
        .setPlaceholder(placeholder)
        .addOptions(menu_options)
        .setMaxValues(maxValues)
        .setMinValues(minValues)
}

/**
 * Select Menu Ayarları
 * @param label Gözükecek İsim
 * @param value  Değer, herhangi bir değişken olabilir, ROL ID, USER ID, CHANNEL ID, EMOJI ID gibi.
 * @param description Açıklaması
 * @param emoji Başına bir emoji koyar.
 * @param isDefault true veya false verirsin. Select Menu açıldığında seçili gelecek değer budur. true verirsen placeholder gözükmez.
 * @returns {StringSelectMenuOptionBuilder}
 */
function selectMenuOptions(label, value, description, emoji, isDefault) {
    return new StringSelectMenuOptionBuilder()
        .setLabel(label)
        .setValue(value)
        .setDescription(description)
        .setEmoji(emoji)
        .setDefault(isDefault || false)
}

module.exports = {
    readyEmbed,
    errorEmbed,
    succesEmbed,
    button,
    actionRow,
    attachment,
    selectMenu,
    selectMenuOptions,
    embed,
    authorEmbed
}

