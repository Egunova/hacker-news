export function unixToDate(unixTimeInSeconds) {
    const data = new Date(unixTimeInSeconds * 1000)
    const dd = data.getDate()
    const mm = data.getMonth() + 1
    const yy = data.getFullYear()
    return `${dd}/${mm}/${yy}`
}

//Отображает короткую ссылку
export function  domainToHostName (url) {
    const domain = new URL(url)
    return domain.hostname
}

export function openExternalUrl(url) {
    window.open(url)
}

export function copy(entity) {
    return JSON.parse(JSON.stringify(entity));
}
