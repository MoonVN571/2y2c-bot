var Scriptdb = require("script.db");

var a = require('../api');
var api = new a();

module.exports = {
    name: "firstwords",
    description: "firstwords command.",
    aliases: ['fw'],
    
    async execute(bot, username, args) {
		let quote = new Scriptdb(`./data/quotes/${args[0]}.json`)
		let msgs = quote.get('messages')
		let times = quote.get('times')
        
        if (msgs === undefined || times == undefined) return bot.whisper(username, "> không tìm thấy người chơi."); 

		var data;
		var time;
        
        try {
            data = msgs.split(" | ")[msgs.split(" | ").length - 1];
        } catch(e) {
            data = mgs;
        }

        try {
            time = times.split(" | ")[0];
        } catch(e) {
            time = times;
        }

        bot.whisper(username, `> ${args[0]} [${api.ageCalc(time)} trước]: ${data}`);
    }
}