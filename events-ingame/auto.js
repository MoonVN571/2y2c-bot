var { readFile, writeFile, appendFile } = require('fs');
var Scriptdb = require('script.db');

var a = require('../api');
var api = new a();

const mc = require("minecraft-protocol");
const log = require('../log');

var e = require('../gotEvent');

var event = new e();

module.exports = (bot, client) => {
    if(event.getAuto()) return;

    setInterval(() => {
        log("Interval: Topic");

        var datas = new Scriptdb(`./data.json`).get('tab-content');
        if(datas == undefined) return;
        
        client.channels.cache.get(bot.defaultChannel).setTopic(
        datas + " - Đã vào server từ " + api.calcTime() + " trước."
        ).then(() => {
            log("Update topic successful")
        });

        client.guilds.cache.forEach((guild) => {
            const data = new Scriptdb(`./data/guilds/setup-${guild.id}.json`);
            const checkdata = data.get('livechat');

            if(checkdata == undefined || guild == undefined) return;
            
            try {
                if(bot.dev) return;
                client.channels.cache.get(checkdata).setTopic(datas + " - Đã vào server từ " + api.calcTime() + " trước.")
            } catch(e) {}
        }); 
    }, 5 * 60 * 1000);

    setInterval(() => {
        log("Saved player is online.")
        const data = new Scriptdb(`./data.json`);
        var list = Object.values(bot.players).map(p => p.username);
        data.set('players', list);
    }, 60 * 1000);

    setInterval(() => {
        log("try to anti-afk.");
        bot.swingArm("left");
        bot.look(Math.floor(Math.random() * Math.floor("360")), 0, true, null);
    }, 60 * 1000);

    setInterval(() => {
        log("Set server data.")
        
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

                data.set('status', status);
                data.set('queue', queue);
                data.set('prio', prio);
            }
        });
    }, 1 * 60 * 1000);

    setInterval(() => {
        log("Send message");

        readFile("ads.txt", 'utf8', function (err, data) {
            if (err) throw err;
            const lines = data.split('\n');
            var random = lines[Math.floor(Math.random() * lines.length)];

            if(random == "") return;

            bot.chat(random);
        });
    },  10 * 60 * 1000);
}