var fs = require('fs');
var Scriptdb = require('script.db');
var Discord = require('discord.js');

var a = require('../api');
var api = new a();

const mc = require("minecraft-protocol");
const log = require('log-to-file');

module.exports = (bot, client) => {
    if(!bot.oneTime) {
        setInterval(() => {
            if(!bot.dev) {
                log("Set topic status repeating.");
            }

            var get = new Scriptdb(`./data.json`).get('tab-content');
            if(get == undefined) return;
            
            var datas = get.toString().split("| ")[0];

            client.channels.cache.get(bot.defaultChannel).setTopic(
                datas + " - Đã vào server từ " + api.uptimeCalc().replace("s", " giây").replace("h", " giờ").replace("m", " phút") + " trước."
                ).then(() => {
                    log("Update topic status with all channels")
                });

            setTimeout(() => {
                var guild = client.guilds.cache.map(guild => guild.id);
                setInterval(() => {
                    if (guild[0]) {
                        const line = guild.pop()
                        const data = new Scriptdb(`./data/guilds/setup-${line}.json`);
                        const checkdata = data.get('livechat');

                        if(guild == undefined || checkdata == undefined) return;
                        
                        try {
                            if(bot.dev) return;
                            client.channels.cache.get(checkdata).setTopic(datas + " - Đã vào server từ " + api.uptimeCalc() + " trước.")
                        } catch(e) {}
                    }
                }, 200);
            }, 300);
        }, 5 * 60 * 1000);

        setInterval(() => {
            mc.ping({ "host": "2y2c.org" }, (err, result) => {
                if (result) {
                    try {
                        var players = [];
                        for (i = 0; result.players.sample.length > i; i++) {
                            players.push(result.players.sample[i].name);
                        }
                        var players2 = players.splice(0, Math.ceil(players.length / 2));
                        if (players == []) {
                            players.push(players2);
                            players2 = ".";
                        }
                    } catch {
                        var players = 'Error';
                        var players2 = 'Error';
                    }

                    var old = players.toString().replace(",§6Cựu binh: §l0", "");
                    var queue = old.toString().replace("§6Bình thường: §l", "");
                    var prio = players2.toString().replace("2y2c §6Queue Size,§6Ưu Tiên: §l", "");
                    var status = "Hàng chờ: " + queue + " - Ưu tiên: " + prio + " - Trực tuyến: " + result.players.online;

                    var Scriptdb = require('script.db');
                    const data = new Scriptdb(`./data.json`);

                    data.set('status', status + " | " + Date.now());
                    data.set('queue', queue + " | " + Date.now());
                    data.set('prio', prio + " | " + Date.now());

                    log("Set status queue repeating");
                }
            });
        }, 1 * 60 * 1000);

        setInterval(() => {
            if(bot.lobby) return;

            log("Trying to anti afk.")
            
            bot.swingArm("left");
            bot.look(Math.floor(Math.random() * Math.floor("360")), 0, true, null);
        }, 1 * 60 * 1000);

        setInterval(() => {
            log("Bot was send a messages");

            fs.readFile("ads.txt", 'utf8', function (err, data) {
                if (err) throw err;
                const lines = data.split('\n');
                var random = lines[Math.floor(Math.random() * lines.length)];

                bot.chat(random);
            });
        },  10 * 60 * 1000);
    }

    bot.once('spawn', () => { // listen khi bot spawn trong lobby
        log("Bot started function")

        const uptime = new Scriptdb(`./data.json`);

        var d = new Date();
        uptime.set(`uptime`, d.getTime());

        const queuejoined = new Discord.MessageEmbed()
                            .setDescription(`Bot đang vào server..`)
                            .setColor(0x15ff00);


        const joinedd = new Discord.MessageEmbed()
                            .setDescription(`☘️ Đang vào server.. ☘️`)
                            .setColor(0x15ff00);

        bot.joined = true;
        if(bot.dev) {
            client.channels.cache.get(bot.defaultChannel).send(joinedd);
            client.channels.cache.get("807045720699830273").send(queuejoined); // bot log
        } else {
            client.channels.cache.get(bot.defaultChannel).send(joinedd);
            
            setTimeout(() => {
                var guild = client.guilds.cache.map(guild => guild.id);
                setInterval(() => {
                    if (guild[0]) {
                        const line = guild.pop()
                        const data = new Scriptdb(`./data/guilds/setup-${line}.json`);
                        const checkdata = data.get('livechat');

                        if(checkdata == undefined || guild == undefined) return;

                        try {
                            client.channels.cache.get(checkdata).send(joinedd);
                        } catch(e) {}
                    }
                }, 200);
            }, 100)

            client.channels.cache.get("806881615623880704").send(queuejoined); // devlog
        }
    })
}