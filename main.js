const Discord = require('discord.js');

var fs = require('fs');
const readline = require('readline');

const client = new Discord.Client();

const prefix = '!';

var challenges = [];
const buildings = ['Market', 'Blacksmith', 'University', 'Barracks','Archery Range','Stable','Seige Workshop','Town Center']




async function processLineByLine() {
  const fileStream = fs.createReadStream('challenges.txt');

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });
  // Note: we use the crlfDelay option to recognize all instances of CR LF
  // ('\r\n') in input.txt as a single line break.

  for await (const line of rl) {
    // Each line in input.txt will be successively available here as `line`.
    console.log(`Line from file: ${line}`);
    challenges.push(line);
  }
}



client.once('ready', () => {
    console.log('Bot is online');

    processLineByLine();
    console.log(challenges);
});


client.on('message', message => {
    if(!message.content.startsWith(prefix) || message.author.bot){
        return;
    }

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if(command === 'help'){
        message.channel.send('type !get for a private message with 5 random challenges for you to complete in a coop game.');
    }
    else if(command === 'get'){
        var text = '';
        var indexes = [];
        //Add four challanges from file
        while (indexes.length < 4){
            var num = Math.floor(Math.random()* challenges.length);
            if (!indexes.includes(num)){
                indexes.push(num);
                //console.log('added:' + num);
            }
        }
        //Add one randomly Generated challenge
        var building_index = Math.floor(Math.random()* buildings.length);
        var number = Math.floor(Math.random()*5) * 2;
        var Random_Text = 'End the game with exactly ' + number +' '+ buildings[building_index] +'(s)\n';
        text += Random_Text;

        for(index in indexes){
            var i = indexes[index];
            text += challenges[i] + '\n';
            //console.log(text);
        }
        //console.log(indexes)

        message.author.send(text);
    }

});

//keep at the end
//Keep code secret
//Nz
client.login('removed for github');