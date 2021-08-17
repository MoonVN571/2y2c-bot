var Scriptdb = require("script.db");

module.exports = {
    name: "setup",
    
    async execute(client, message, args) {
        if (!message.guild.member(message.author).hasPermission("ADMINISTRATOR")) return message.channel.send("Không có quyền để dùng lệnh này.")
        var prefix = client.config.prefix;
        
        let checkVote = new Scriptdb('./voted.json').get('users-' + new Date().getUTCDate() + (new Date().getUTCMonth()+1) + new Date().getUTCFullYear());

        if(!checkVote || checkVote.split(" ").indexOf(message.author.id) < 0) return message.channel.send("Bạn phải vote bot để sử dụng lệnh này.\n\nVote tại: https://top.gg/bot/768448728125407242/vote");
        
        if(!args[0]) return message.channel.send("Cách dùng: " + prefix + "setup chat <Kênh>");
        
        if(args[0] === "chat") {
            if(!args[1]) return message.channel.send("Cách dùng: " + prefix + "setup chat <Kênh>");

            var channel;
            channel = message.content.replace(/\D/g,'');
            if(channel === "") channel = args[2];

            var guild = message.guild.id;
            const data = new Scriptdb(`./data/guilds/setup-${guild}.json`);
            const checkdata = data.get('livechat')
            
            if(checkdata == undefined) {
                message.channel.send("Bạn đã setup chat tại kênh: <#" + channel + "> thành công!").then(() => {
                    client.channels.cache.get(channel).send({embed: {
                        description: "Livechat đã sẵn sàng! Hãy chờ bot đồng bộ trong lần tiếp theo nào!",
                        color: 0x15ff00
                    }})
                }).then(() => {
                    message.channel.send("Bạn nên tham gia discord dev để cập nhật tình hình của bot tại announcements.\n\ndiscord.gg/yrNvvkqp6w");
                });
                setTimeout(() => {
                    data.set('livechat', channel);
                }, 60 * 1000);
            } else {
                message.channel.send("Bạn đã setup livechat rồi. Xoá livechat bằng lệnh " + prefix + "delete chat <Kênh>")
            }
        }

        /*
        if(args[0] == 'restart') {
            if(!client.dev) return;
            if(!args[1]) return message.channel.send("Cách dùng: " + prefix + "setup restart <tag hoặc nhập id kênh> <tên role>");
            if(!args[2] && args[1]) return message.channel.send("Cách dùng: " + prefix + "setup restart " + args[1] + " <tên role>");

            var channel;
            channel = args[1].replace(/\D/g,'');
            if(channel === "") {
                channel = args[1];
            }

            var guild = message.guild.id;
            const data = new Scriptdb(`./data/guilds/setup-${guild}.json`);

            var checkData = data.get('restart-role');
            if(checkData !== undefined) return message.channel.send("Đã setup restart role")

            data.set('restart-channels', channel);
            data.set('restart-roles', args[2].split("<@&")[1].split(">")[0]);

            message.channel.send("Đã setup kênh thông báo restart: " + channel + " và role: " + args[2])   
        }

        if(args[0] == 'stats') {
            if(!bot.dev) return;
            var channel;
            channel = message.content.replace(/\D/g,'');
            if(channel === "") {
                channel = args[2];
            }

            var guild = message.guild.id;
            const data = new Scriptdb(`./data/guilds/setup-${guild}.json`);
            const checkdata = data.get('livechat')
            
            if(checkdata == undefined) {
                data.set('stats', channel); // nó sẽ ra 2 loại, 1 là id, 2 là tên channel đã setup
                if(channel !== "NaN") {
                    message.channel.send("Bạn đã setup chat tại channel: " + channel.toString())
                } else {
                    message.channel.send("Bạn đã setup chat tại channel: " + channel)
                }
            } else {
                if(args[1] == "commands") {
                    message.channel.send("Đã setup ròi. Cách xoá: " + prefix + "setup delete stats <tag hoặc nhập kênh>")
                } else {
                    message.channel.send("Đã setup ròi. Cách xoá: " + prefix + "setup delete <chat hoặc stats> <tag hoặc nhập id kênh>")
                }
            }
        } */
    }
}