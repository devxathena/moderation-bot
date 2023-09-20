const moment = require("moment");
moment.locale("tr");
const embed = require("../utils/builder");

module.exports = {
    name: "ready",
    run: async (client) => {
        require("../utils/activity")(client, moment);
        embed.readyEmbed(client);
    },
};
