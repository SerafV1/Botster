const Discord = require('discord.js')
const client = new Discord.Client()
const config = require('./conf.json');

client.on('ready', () => {
    // List servers the bot is connected to
    console.log("Connected as " + client.user.tag)

    client.user.setActivity("with his brain")

    client.guilds.cache.forEach((guild) => {
        console.log(" - " + guild.name)

        // List all channels
        guild.channels.cache.forEach((channel) => {
            console.log(` -- ${channel.name} (${channel.type}) - ${channel.id}`)
        })
        
    })
  // let receivedMessage = client.channels.cache.get(config.default_channel)
    
    client.on('message', (receivedMessage) => {
        
        if (receivedMessage.author == client.user) { // Prevent bot from responding to its own messages
            return
        }
        
        if (receivedMessage.content) {
            processCommand(receivedMessage)
        }
    })
    
    function processCommand(receivedMessage) {
        let fullCommand = receivedMessage.content // Remove the leading exclamation mark
        let splitCommand = fullCommand.split(" ") // Split the message up in to pieces for each space
        let primaryCommand = splitCommand[0] // The first word directly after the exclamation is the command
        let arguments = splitCommand.slice(1) // All other words are arguments/parameters/options for the command
       
        console.log("Command received: " + primaryCommand)
        console.log("Arguments: " + arguments) // There may not be any arguments
    
        if (primaryCommand == config.name) {
            helpCommand(arguments, receivedMessage)
            halloCommand(arguments, receivedMessage)
        } else if (primaryCommand == "multiply") {
            multiplyCommand(arguments, receivedMessage)
        } else {
            receivedMessage.channel.send("I don't understand the command. Try `!help` or `!multiply`")
        }
    }
    
    function helpCommand(arguments, receivedMessage) {
        if (arguments.length > 0) {
            receivedMessage.channel.send("It looks like you might need help with " + arguments)
        } else {
            receivedMessage.channel.send("I'm not sure what you need help with. Try `!help [topic]`")
        }
        

    }
    /*function emojiCommand(arguments, receivedMessage) {
        if (arguments == "👍") {
    // You can copy/paste the actual unicode emoji in the code (not _every_ unicode emoji works)
    receivedMessage.react("👍")
    receivedMessage.react("🛐")
    // Unicode emojis: https://unicode.org/emoji/charts/full-emoji-list.html

    // Get every custom emoji from the server (if any) and react with each one
    receivedMessage.guild.emojis.forEach(customEmoji => {
        console.log(`Reacting with custom emoji: ${customEmoji.name} (${customEmoji.id})`)
        receivedMessage.react(customEmoji)
    })
    // If you know the ID of the custom emoji you want, you can get it directly with:
    // let customEmoji = receivedMessage.guild.emojis.get(emojiId)
}
}
*/

    function halloCommand(arguments, receivedMessage) {
        var random1 = Math.floor(Math.random() * (config.answer.hallo.length)) ;
        var choice1 = config.answer.hallo[random1];
       
        if (arguments == '!react') {
            receivedMessage.react('😄')
        }
     else if (arguments == "hallo") {
             receivedMessage.channel.send(choice1 + receivedMessage.author.toString())
            //generalChannel.send(choice1 + receivedMessage.author.toString())
        } else if (arguments == "how are you?"){
            receivedMessage.channel.send(choice1 + receivedMessage.author.toString())
        }
            else if (arguments == "price"){
            const burl = "https://api.binance.com"

            var query = '/api/v1/ticker/24hr?symbol=BTCUSDT'
                
            
            const url = burl + query
            const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
            const ourRequest = new XMLHttpRequest()
            ourRequest.open('GET',url,true)
            ourRequest.onload = function(){
                console.log(ourRequest.responseText)
            }
            ourRequest.send(); 
            receivedMessage.channel.send(ourRequest.responseText)
        } else {
            receivedMessage.channel.send("I'm not sure what you need help with")
        }
    }

    function multiplyCommand(arguments, receivedMessage) {
        if (arguments.length < 2) {
            receivedMessage.channel.send("Not enough values to multiply. Try `!multiply 2 4 10` or `!multiply 5.2 7`")
            return
        }
        let product = 1 
        arguments.forEach((value) => {
            product = product * parseFloat(value)
        })
        receivedMessage.channel.send("The product of " + arguments + " multiplied together is: " + product.toString())
    
    }

})

client.login(config.token)