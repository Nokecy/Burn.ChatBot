"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var wechaty_1 = require("wechaty");
var BotMap = {};
// 登录
function onLogin(user) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log("\u8D34\u5FC3\u5C0F\u52A9\u7406" + user + "\u767B\u5F55\u4E86");
            return [2 /*return*/];
        });
    });
}
;
//登出
function onLogout(user) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            console.log("\u5C0F\u52A9\u624B" + user + " \u5DF2\u7ECF\u767B\u51FA");
            return [2 /*return*/];
        });
    });
}
;
// 监听对话
function onMessage(msg) {
    return __awaiter(this, void 0, void 0, function () {
        var contact, content, room, topic, e_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    contact = msg.from() // 发消息人
                    ;
                    content = msg.text() //消息内容
                    ;
                    room = msg.room() //是否是群消息
                    ;
                    if (msg.self()) {
                        return [2 /*return*/];
                    }
                    if (!room) return [3 /*break*/, 2];
                    return [4 /*yield*/, room.topic()];
                case 1:
                    topic = _a.sent();
                    console.log("\u7FA4\u540D: " + topic + " \u53D1\u6D88\u606F\u4EBA: " + contact.name() + " \u5185\u5BB9: " + content);
                    return [3 /*break*/, 6];
                case 2:
                    console.log("\u53D1\u6D88\u606F\u4EBA: " + contact.name() + " \u6D88\u606F\u5185\u5BB9: " + content);
                    _a.label = 3;
                case 3:
                    _a.trys.push([3, 5, , 6]);
                    return [4 /*yield*/, contact.say(content)];
                case 4:
                    _a.sent();
                    return [3 /*break*/, 6];
                case 5:
                    e_1 = _a.sent();
                    console.error(e_1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
;
function startBot(callback, botName) {
    var bot = new wechaty_1.Wechaty({ name: botName });
    bot.on('login', onLogin);
    bot.on('logout', onLogout);
    bot.on('message', onMessage);
    BotMap[botName] = bot;
    bot.on('scan', function (qrcode, status) {
        console.log('OnScan');
        callback(null, ['https://api.qrserver.com/v1/create-qr-code/?data=', encodeURIComponent(qrcode)].join(''));
    })
        .start()
        .then(function () { console.log('开始登陆微信'); })
        .catch(function (e) { console.error(e); callback(e); });
}
function say(callback, botName, nameorAlias, content) {
    return __awaiter(this, void 0, void 0, function () {
        var bot, logMsg, contact, _a, e_2;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0:
                    bot = BotMap[botName];
                    return [4 /*yield*/, bot.Contact.find({ name: nameorAlias })];
                case 1:
                    _a = (_b.sent());
                    if (_a) return [3 /*break*/, 3];
                    return [4 /*yield*/, bot.Contact.find({ alias: nameorAlias })]; // 获取你要发送的联系人
                case 2:
                    _a = (_b.sent() // 获取你要发送的联系人
                    );
                    _b.label = 3;
                case 3:
                    contact = _a;
                    _b.label = 4;
                case 4:
                    _b.trys.push([4, 6, , 7]);
                    return [4 /*yield*/, contact.say(content)];
                case 5:
                    _b.sent();
                    callback(null, "");
                    return [3 /*break*/, 7];
                case 6:
                    e_2 = _b.sent();
                    logMsg = e_2.message;
                    callback(logMsg, null);
                    return [3 /*break*/, 7];
                case 7:
                    console.log(logMsg);
                    return [2 /*return*/];
            }
        });
    });
}
module.exports = { startBot: startBot, say: say };
//# sourceMappingURL=index.js.map