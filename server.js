import express from 'express';
const app = express();

app.use(express.static('static_files'))

app.listen('3000', ()=>{
    console.log('PORT 3000')
})
