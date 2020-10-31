/** Yandex music transformer */
const getHTML = (url) => {
  const urlParts = url.split('/')
  const albumId = urlParts[urlParts.length - 1]

  return `<iframe
    frameborder="0" 
    style="border:none; width:100%; height:450px;"
    width="100%"
    height="450"
    src="https://music.yandex.ru/iframe/#album/${albumId}"
  ></iframe>`
}

const name = 'yandexMusic'

const regex = /^https?:\/\/music\.yandex\.ru\/album\//
const shouldTransform = (url) => regex.test(url)

module.exports = { getHTML, name, shouldTransform }
