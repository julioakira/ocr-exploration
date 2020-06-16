import fs from 'fs'
import Jimp from 'jimp'
import path from 'path'
import { createWorker } from 'tesseract.js'

const test1 = fs.readFileSync(path.join(__dirname, '/../img/test1.jpg'))
const test2 = fs.readFileSync(path.join(__dirname, '/../img/test2.jpg'))
const test3 = fs.readFileSync(path.join(__dirname, '/../img/test3.jpg'))
const test4 = fs.readFileSync(path.join(__dirname, '/../img/test4.jpg'))

const monster = () => {
  Jimp.read(test2)
    .then(t2 => {
      return t2
        .quality(90)
        .crop(280, 100, 500, 200)
        .greyscale()
        .write(path.join(__dirname, '/../img/monster.jpg'))
    })
    .catch(err => console.log(err))
}

const gscale = () => {
  Jimp.read(test2)
    .then(t2 => {
      return t2
        .quality(90)
        .greyscale()
        .write(path.join(__dirname, '/../img/gscale.jpg'))
    })
    .catch(err => console.log(err))
}

gscale()

const date = () => {
  Jimp.read(test2)
    .then(t2 => {
      return t2
        .quality(90)
        .crop(1670, 180, 120, 100)
        .greyscale()
        .write(path.join(__dirname, '/../img/date.jpg'))
    })
    .catch(err => console.log(err))
}

const worker = createWorker({
  logger: m => console.log(m)
});

(async () => {
  await worker.load()
  await worker.loadLanguage('eng')
  await worker.initialize('eng')
  const { data: { text } } = await worker.recognize(path.join(__dirname, '/../img/date.jpg'))
  console.log(text)
  await worker.terminate()
})()
