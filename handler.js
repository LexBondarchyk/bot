const telegram = require('./telegram');

module.exports.processWebhook = async event => {
    const body = JSON.parse(event.body);

    console.log(body); // Логируем body

    if (body && body.message) {
        const { chat, text } = body.message;

        await telegram.sendMessage({ chat_id: chat.id, text: `You said: ${text}` });
    }

    return { statusCode: 200 };
};