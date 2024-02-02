// copyright ©️ https://telegram.dog/imMitsuoSuwa

const { Telegraf, Markup, InputFile } = require('telegraf');
const { MongoClient } = require('mongodb');

const mongoUri = "YOUR MONGOURL";
const client = new MongoClient(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });

let usersCollection;
let userFileSequences = {};

// start message//
async function startMessage(ctx) {
    const userId = ctx.message.from.id;
    const username = ctx.message.from.username;
    const name = ctx.message.from.first_name;

    updateUserInfo(userId, username, name);

    const buttonURL = 'https://t.me/eBotHub';

    const welcomeText = `Welcome, ${name}! 🌟 I am a file sequencing bot. Built with ❤️ using JavaScript and the Telegraf library.\n\n`;
    const botDescription = `🤖 What I do:\nI help you sequence and organize your files. Use /ssequence to start the process. Send documents, videos, or audio files, and when you're done, use /esequence to get the sequenced files. Use /cancel to cancel all sequences.\n\n`;
    const additionalInfo = `🔗 Owner: @ImMitsuoSuwa`;

    const messageText = welcomeText + botDescription + additionalInfo;

    await ctx.reply(messageText, Markup.inlineKeyboard([Markup.button.url('Updates!', buttonURL)]));
}
// function for processing ur files //
async function processFileSequence(ctx, fileType) {
    const userId = ctx.message.from.id;

    if (userId in userFileSequences) {
        const user_data = userFileSequences[userId];

        const file = ctx.message[fileType];

        if (file) {
            user_data.files.push(ctx.message);
            ctx.reply('File received and added to the sequencing process.');
        } else {
            ctx.reply('Unsupported file type. Send documents or videos.');
        }
    }
}
// end sequence to get ur files //
async function endSequence(ctx) {
    const userId = ctx.message.from.id;

    if (userId in userFileSequences) {
        const user_data = userFileSequences[userId];

        if (user_data.files.length > 0) {
            user_data.files.sort((a, b) => {
                const fileA = a.document || a.video;
                const fileB = b.document || b.video;
                return fileA.file_name.localeCompare(fileB.file_name);
            });

            for (let i = 0; i < user_data.files.length; i++) {
                const file_message = user_data.files[i];
                const file = file_message.document || file_message.video;

                if (file) {
                    const caption = file_message.caption || '';

                    if (file_message.document) {
                        await ctx.replyWithDocument(file.file_id, { caption });
                    } else if (file_message.video) {
                        await ctx.replyWithVideo(file.file_id, { caption });
                    }
                }
            }

            ctx.reply(`File sequencing completed. You have received ${user_data.files.length} sequenced files.`);

            const total_sequences = (await usersCollection.findOne({ user_id: userId }))?.total_sequences || 0;
            usersCollection.updateOne({ user_id: userId }, { $set: { total_sequences: total_sequences + user_data.files.length } });

        } else {
            ctx.reply('No files to sequence. Send some files with /ssequence first.');
        }

        delete userFileSequences[userId];

    } else {
        ctx.reply('No ongoing file sequencing process. Use /ssequence to begin.');
    }
}

async function updateUserInfo(userId, username, name) {
    await usersCollection.updateOne(
        { user_id: userId },
        { $set: { username: username, name: name } },
        { upsert: true }
    );
}
// bot stats //
async function showStats(ctx) {
    const totalUsers = await usersCollection.countDocuments();
    const totalSequences = (await usersCollection.aggregate([{ $group: { _id: null, total: { $sum: '$total_sequences' } } }]).toArray())[0]?.total || 0;

    ctx.reply(`Total Users: ${totalUsers}\nTotal File Sequences: ${totalSequences}`);
}

client.connect().then(() => {
    console.log('Connected to MongoDB');

    const db = client.db('seq');
    usersCollection = db.collection('users');
// fll ur bot token correctly//
    const bot = new Telegraf('UR BOT TOKEN');
    const port = process.env.PORT || 3000;

    bot.start(startMessage);

    bot.command('ssequence', (ctx) => {
        const userId = ctx.message.from.id;

        if (userId in userFileSequences) {
            ctx.reply('You are currently in a file sequencing process. Use /esequence to finish it.');
            return;
        }

        userFileSequences[userId] = { files: [] };
        ctx.reply('You have started a file sequencing process. Send the files you want to sequence one by one. ' +
            'When you are done, use /esequence to finish and get the sequenced files.');
    });

    bot.on('document', (ctx) => processFileSequence(ctx, 'document'));
    bot.on('video', (ctx) => processFileSequence(ctx, 'video'));
    bot.on('audio', (ctx) => processFileSequence(ctx, 'audio'));

    bot.command('esequence', endSequence);
    bot.command('stats', showStats);
// cancel sequence//
    bot.command('cancel', (ctx) => {
        const userId = ctx.message.from.id;

        if (userId in userFileSequences) {
            delete userFileSequences[userId];
            ctx.reply('File sequencing process canceled. Use /ssequence to start a new one.');
        } else {
            ctx.reply('No ongoing file sequencing process to cancel. Use /ssequence to begin.');
        }
    });

    bot.launch({
        port: port,
    }).then(() => {
        console.log(`Bot is running on port ${port}`);
    }).catch((err) => {
        console.error(`Error starting bot: ${err}`);
    });
});
