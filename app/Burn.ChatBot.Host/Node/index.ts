import { Wechaty } from "wechaty";

const BotMap: { [key: string]: Wechaty } = {};

// 登录
async function onLogin(user) {
    console.log(`贴心小助理${user}登录了`);
};
//登出
async function onLogout(user) {
    console.log(`小助手${user} 已经登出`);
};
// 监听对话
async function onMessage(msg) {
    const contact = msg.from() // 发消息人
    const content = msg.text() //消息内容
    const room = msg.room() //是否是群消息

    if (msg.self()) { return; }
    if (room) { // 如果是群消息
        const topic = await room.topic()
        console.log(`群名: ${topic} 发消息人: ${contact.name()} 内容: ${content}`)
    } else { // 如果非群消息
        console.log(`发消息人: ${contact.name()} 消息内容: ${content}`);
        try {
            await contact.say(content);
        } catch (e) {
            console.error(e)
        }
    }
};

function startBot(callback, botName) {
    const bot = new Wechaty({ name: botName });
    bot.on('login', onLogin);
    bot.on('logout', onLogout);
    bot.on('message', onMessage);

    BotMap[botName] = bot;

    bot.on('scan', (qrcode, status) => {
        console.log('OnScan');
        callback(null, ['https://api.qrserver.com/v1/create-qr-code/?data=', encodeURIComponent(qrcode)].join(''));
    })
        .start()
        .then(() => { console.log('开始登陆微信'); })
        .catch(e => { console.error(e); callback(e); });
}

async function say(callback, botName, nameorAlias, content) {
    const bot = BotMap[botName];
    let logMsg
    let contact = await bot.Contact.find({ name: nameorAlias }) || await bot.Contact.find({ alias: nameorAlias }) // 获取你要发送的联系人
    try {
        await contact.say(content)
        callback(null, "");
    } catch (e) {
        logMsg = e.message
        callback(logMsg, null);
    }
    console.log(logMsg)
}

module.exports = { startBot, say };