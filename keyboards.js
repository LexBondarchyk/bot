import  Markup  from './node_modules/telegraf/lib/markup.js'

export function getMainMenu() {
    return Markup.keyboard([
        ['Мои задачи', 'Добавить задачу'],
        ['Смотивируй меня']
    ]).resize().extra()
}

export function yesNoKeyboard() {
    return Markup.inlineKeyboard([
        Markup.callbackButton('Да', 'yes'),
        Markup.callbackButton('Нет', 'no')
    ], {columns: 2}).extra()
}