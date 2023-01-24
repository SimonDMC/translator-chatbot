# Translator Chatbot

This is a simple Discord chatbot that uses the [Google Translate API](https://cloud.google.com/translate/) to translate messages between two users.

## Setup

1. Create a [Google Cloud Platform](https://cloud.google.com/) account.
2. Create a new project.
3. Enable the [Translate API](https://console.cloud.google.com/apis/library/translate.googleapis.com).
4. Create a [service account](https://console.cloud.google.com/iam-admin/serviceaccounts) and download the JSON key file.
5. Save the JSON key file as `keys.json` in the root of this project.
6. Create a Discord bot and invite it to your server.
7. Copy the bot token and save it as `token.json` in the root of this project as shown below:

```json
{
    "token": "YOUR_TOKEN_HERE"
}
```

8. Replace the first two lines of `index.js` with the IDs of the two users you want to translate between.
9. Set the third line of `index.js` to the language you want to translate to (the complete language code list can be found [here](https://cloud.google.com/translate/docs/languages)).
10. Run `npm install` to install the dependencies.
11. Run `node index.js` to start the bot.
