let currentDate = new Date()
const time = currentDate.getHours()
console.log(time)
function greetings() {
    if (time > 6 && time <= 12) { return "Доброе утро, " }
    if (time > 12 && time <= 18) { return "Добрый день, " }
    if (time > 18 && time <= 23) { return "Добрый вечер, " }
    if (time >= 0 && time <= 6) { return "Доброй ночи, " }
}

export default greetings