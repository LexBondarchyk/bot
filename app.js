import express from 'express'
import { PORT, TOKEN } from './config.js'
import { Telegraf } from 'telegraf'
import  { session }  from 'telegraf/session.js'
import { getMainMenu, yesNoKeyboard } from './keyboards.js'
import { addTask } from './db.js'

const app = express()
const bot = new Telegraf(TOKEN)

bot.use(session())


bot.start(ctx => {
    ctx.replyWithHTML(
        'Приветсвую в <b>TaskManagerBot</b>\n\n'+
        'Чтобы быстро добавить задачу, просто напишите ее и отправьте боту',
        getMainMenu())
})

bot.hears('Мои задачи', ctx => {
    ctx.reply('Тут будут ваши задачи')
})

bot.hears('Добавить задачу', ctx => {
    ctx.reply('Тут вы сможете добавить свои задачи')
})

bot.hears('Смотивируй меня', ctx => {
    ctx.replyWithPhoto(
        'https://img2.goodfon.ru/wallpaper/nbig/7/ec/justdoit-dzhastduit-motivaciya.jpg',
        {
            caption: 'Не вздумай сдаваться!'
        }
    )
})

bot.on('text', ctx => {
    ctx.session.taskText = ctx.message.text

    ctx.replyWithHTML(
        `Вы действительно хотите добавить задачу:\n\n`+
        `<i>${ctx.message.text}</i>`,
        yesNoKeyboard()
    )
})

bot.action(['yes', 'no'], ctx => {
    if (ctx.callbackQuery.data === 'yes') {
        addTask('сюда будем передавать текст задачи')
        ctx.editMessageText('Ваша задача успешно добавлена')
    } else {
        ctx.deleteMessage()
    }
})

bot.launch()
app.listen(PORT, () => console.log(`My server is running on port ${PORT}`))
