const fs = require('fs');
const path = require('path');

// fs.mkdir(path.join('main'), (err) => {
//     if (err) throw new Error(err.message);
// })

// for (let i = 0; i < 5; i++) {
//     fs.mkdir(path.join('main', `dir${i}`), (err) => {
//         if (err) throw new Error(err.message);
//     })
// }

// for (let i = 0; i < 3; i++) {
//     fs.writeFile(path.join('main', `javascript${i}.js`), '', (err) => {
//         if (err) throw new Error(err.message)
//     })
// }
//
// for (let i = 3; i < 5; i++) {
//     fs.writeFile(path.join('main', `text${i}.txt`), '', (err) => {
//         if (err) throw new Error(err.message)
//     })
// }

fs.readdir(path.join('main'), {withFileTypes: true},(err, data)=>{
  if (err) throw new Error();
  data.forEach(data => {
      if (data.isDirectory()) {
          console.log('FOLDER: ', data.name)
      } if (data.isFile()) {
          console.log('FILE: ', data.name)
      }
  })
})