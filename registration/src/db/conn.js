const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/EEEdept').then(() => {
    console.log('db connected')
}).catch((e) => {
    console.log('no connection')
})

