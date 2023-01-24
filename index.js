const FOREIGN_USER = ""; // example: 393459078338314243
const ENGLISH_USER = ""; // example: 443789089196736513
const LANG_CODE = ""; // example: cs

const { Translate } = require("@google-cloud/translate").v2;
const { Client, Events, GatewayIntentBits, Partials } = require("discord.js");
const { token } = require("./token.json");
const { project_id } = require("./keys.json");

// set up translate
const translate = new Translate({
    projectId: project_id,
    keyFilename: "keys.json",
});

// set up bot
const client = new Client({
    partials: [Partials.Channel, Partials.Message],
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.DirectMessageReactions,
    ],
});

client.once(Events.ClientReady, (c) => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

// log in
client.login(token);

// foreign to en
client.on(Events.MessageCreate, async (message) => {
    if (
        message.author.id === FOREIGN_USER &&
        message.content !== "" &&
        message.guild === null
    ) {
        const translated = await translateText(message.content, "en");
        console.log(`${message.content} -> ${translated}`);
        client.users.fetch(ENGLISH_USER, false).then((user) => {
            user.send(translated);
        });
    }
});

// en to foreign
client.on(Events.MessageCreate, async (message) => {
    if (
        message.author.id === ENGLISH_USER &&
        message.content !== "" &&
        message.guild === null
    ) {
        const translated = await translateText(message.content, LANG_CODE);
        console.log(`${message.content} -> ${translated}`);
        client.users.fetch(FOREIGN_USER, false).then((user) => {
            user.send(translated);
        });
    }
});

async function translateText(text, lang) {
    const translated = await translate.translate(text, lang);
    return translated[0];
}
