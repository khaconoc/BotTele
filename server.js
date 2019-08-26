// Bot telegram
// const chatSisimi = require('./sisimi');
const axios = require('axios');
const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '661955063:AAHAbSp8vLrrTJr93o086aV4T_l7QSa9BIs';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/start (.+)/, (msg, match) => {
    // 'msg' is the received Message from Telegram
    // 'match' is the result of executing the regexp above on the text content
    // of the message

    const chatId = msg.chat.id;
    const resp = match[1]; // the captured "whatever"

    // send back the matched "whatever" to the chat
    bot.sendMessage(chatId, '– Ông Chồng : Tôi là chồng hay là con bà mà cứ quát tôi thế ??\n' +
        '– Bà vợ : Chả biết, đứa nào còn bú sữa là con tui…..\n' +
        '– Thằng con cũng nhảy vào nói : Mẹ nói đúng đấy bố\n' +
        '– Thấy thằng con nói vậy, ông chồng liền quay lại mắng : Tao là bố hay là em mày mà mày dạy khôn tao\n' +
        '– Bà vợ : Thì đứa nào cai sữa trước thì làm anh thôi :)) ');
});


// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', async (msg) => {
    const chatId = msg.chat.id;

    var rep = '';
    if (msg.text === '/start') {
        rep = 'Để làm quen thì tao sẽ kể cho mày câu chuyện cười\n' +
            'Ông Chồng : Tôi là chồng hay là con bà mà cứ quát tôi thế ??\n' +
            'Bà vợ : Chả biết, đứa nào còn bú sữa là con tui…..\n' +
            'Thằng con cũng nhảy vào nói : Mẹ nói đúng đấy bố\n' +
            'Thấy thằng con nói vậy, ông chồng liền quay lại mắng : Tao là bố hay là em mày mà mày dạy khôn tao\n' +
            'Bà vợ : Thì đứa nào cai sữa trước thì làm anh thôi :)) \n';
        bot.sendMessage(chatId, rep);
    } else if (msg.text === undefined) {
        bot.sendPhoto(chatId, 'https://www.thehippocket.com.au/wp-content/uploads/2016/06/shrug-770x447.jpg');
    } else {
        rep = await chatSisimi(msg.text);
        bot.sendMessage(chatId, rep);
    }
    console.log(msg.chat.first_name + ' '+msg.chat.last_name+' : '+ msg.text);
    console.log('sim' +' : '+ rep);

});

const chatSisimi = async (text) => {
    let config = {
        method: 'POST',
        headers: {
            'x-api-key': 'QPyg/fViDbp7ftTYBit1esDr+GZXO+IlSwyH23cZ',
            'Content-Type': 'application/json'
        },
        url: 'https://wsapi.simsimi.com/190410/talk',
        data: {
            "utext": text,
            "lang": "vn"
        }
    };
    const res = await axios(config);
    // .then((res) => {
    //     console.log(res);
    //     console.log(res.status)
    // })
    // .catch((error) => {
    //     console.error(error)
    // });

    return res.data.atext;
};