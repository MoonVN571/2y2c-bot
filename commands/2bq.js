var superagent = require('superagent');
var Discord = require('discord.js');

module.exports = {
    name: "2bqueue",
    description: "2bqueue command.",
    aliases: ['2bq', '2bqueue'],
    
    async execute(client, message, args) {
        superagent.get("https://2b2t.io/api/queue?last=true").end((err, data) => {
			let queuequeue = data.body[0][1];
			if(err) {
				queuequeue = "Lỗi";
			}
			
            superagent.get("https://api.2b2t.dev/prioq").end((err, dataq) => {
				let prio = dataq.body[1];
				if(err) {
					prio = "Lỗi";
				}

				var queue = new Discord.MessageEmbed()
									.setDescription("Hàng chờ 2B2T: " + queuequeue + " - Ưu tiên 2B2T: " + prio)
									.setColor(0x2EA711);

				message.channel.send(queue);
			});
		});
    }
}