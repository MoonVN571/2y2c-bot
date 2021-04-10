module.exports = {
    name: "help",
    description: "help command.",
    aliases: ['help'],
    
    async execute(client, message, args) {
        var prefix = client.prefix;
        var footer = client.footer;

        var noargs = new client.Discord.MessageEmbed()
                            .setDescription( 
                            "*Sử dụng " + prefix + "help **<LOẠI LỆNH>***" +
                            "\n\n**Các loại lệnh:**" + 
                            "\n``discord`` - Xem các lệnh bot về thông số server." +
                            "\n``check`` - Xem các lệnh để kiểm tra thông tin của người chơi." +
                            "\n``ingame-command`` - Xem các lệnh của bot ( trong game ) " +
                            "\n``all`` - Xem tất cả các lệnh. ( không chi tiết )")
                            .addField("\u200b", '\n\nBạn có thể thêm bot cho discord [tại đây](https://discord.com/api/oauth2/authorize?client_id=768448728125407242&permissions=8&scope=bot).')
                            .setColor(0x000DFF);

        if (!args[0]) return message.channel.send(noargs);

        if (args[0] == "discord") {
            var helpdiscord = new client.Discord.MessageEmbed()
                .setTitle("*[Discord Command]*")
                .setColor(0x000DFF)
                .setDescription(prefix + 'status - ``Xem trạng thái của server hàng chờ, ưu tiên, trực tuyến.``\n' + 
                                prefix + 'queue - ``Xem thông số server.`` \n' +
                                prefix + 'prio - ``Xem thông số server.``\n' +
                                prefix + 'uptime - ``Xem thông số server.``\n' +
                                prefix + 'setup - ``Cài đặt bot cho livechat.``' +
                                prefix + 'invite - ``Mời bot vào servers của bạn.`')
                .addField("\u200b", '\n\nBạn có thể thêm bot cho discord [tại đây](https://discord.com/api/oauth2/authorize?client_id=768448728125407242&permissions=8&scope=bot).')
                .setFooter(footer)
                .setTimestamp();

            message.channel.send(helpdiscord);
        }

        if (args[0] === "ingame-command") {
            var ingamecmd = new client.Discord.MessageEmbed()
                .setColor(0x000DFF)
                .setDescription("***Các lệnh bot:***\n" 
                + '!help - ``Xem các lệnh có sẵn.`` \n' 
                + '!tps - ``Xem tps server.`` \n'
                + '!coords - ``Xem toạ độ bot.`` \n' 
                + '!kill - ``Thực hiện lệnh /kill cho bot.`` \n' 
                + '!ping - ``Xem ping của bạn, nhập tên để xem ping người khác.`` \n'
                + '!prio - ``Xem hàng chờ ưu tiên.`` \n'
                + '!queue - ``Xem hàng chờ và hàng chờ ưu tiên.`` \n'
                + '!stats - ``Xem chỉ số K/D. ( Death tính từ 13/1, Kil tính từ 15/1 )`` \n'
                + '!joindate - ``Xem ngày người chơi lần đầu tham gia server. ( Tính từ 28/1 )`` \n'
                + '!playtime - ``Xem thời gian bạn đã chơi. ( Bắt đầu từ ngày 1/2 )`` \n'
                + '!seen - ``Xem lần hoạt động gần nhất của người chơi. ( Tính từ 2/2 )`` \n'
                + '!2bqueue - ``Xem hàng chờ hiện tại của 2b2t.`` \n'
                + '!buykit - ``Shop kit.`` \n'
                + '!runtime - ``Xem thời gian bot đã ở trong server.`` \n'
                + '!report - ``Báo cáo người chơi cho admin server.`` \n'
                + '!rules - ``Xem luật của server.`` \n'
                + '!firstwords - ``Xem tin nhắn đầu tiên.`` \n'
                + '!lastwords - ``Xem tin nhắn mới nhất.`` \n'
                + '!follow - ``Cho bot đi theo bạn.`` \n'
                + '!avoid - ``Tránh.`` \n'
                + '!come - ``Di chuyển tới vị trí của bạn.`` \n'
                + '!stop - ``Dừng bot.`` \n'
                )
                .addField("\u200b", '\n\nBạn có thể thêm bot cho discord [tại đây](https://discord.com/api/oauth2/authorize?client_id=768448728125407242&permissions=8&scope=bot).')
                .setFooter(footer)
                .setTimestamp();

            message.channel.send(ingamecmd);
        }
        if (args[0] === "check") {
            var check = new client.Discord.MessageEmbed()
                .setColor(0x000DFF)
                .setDescription("***Các lệnh xem chỉ số:***\n" +
                prefix + 'kd - ``Xem chỉ số K/D.``'
                + prefix + 'joindate - ``Xem ngày người chơi lần đầu tham gia server.`` \n'
                + prefix + 'playtime - ``Xem thời người chơi đã chơi.`` \n'
                + prefix + 'seen - ``Xem lần hoạt động gần nhất của người chơi.`` \n')
                .setFooter(footer)
                .setTimestamp();

            message.channel.send(check);
        }

        if (args[0] == "all") {
            var embed = new client.Discord.MessageEmbed()
                                .setColor(0x000DFF)
                                .addField("*Discord Commands*", "help*, status, invite. ($)", false)
                                .addField("*Check Commands*", "stats, playtime, joindate, seen, uptime. ($)", false)
                                .addField("*Ingame Command*", "help, tps, coordinate, kill, ping, queue, prio, stats, joindate, playtime, seen, 2bqueue, buykit, runtime, report, rules, avoid, come, follow, stop, firstwords, lastwords. (!)", false)
                                .addField("\u200b", '\n\nBạn có thể thêm bot cho discord [tại đây](https://discord.com/api/oauth2/authorize?client_id=768448728125407242&permissions=8&scope=bot).')
                                .setFooter(footer)
                                .setTimestamp();

            message.channel.send(embed);
        }
    }
}