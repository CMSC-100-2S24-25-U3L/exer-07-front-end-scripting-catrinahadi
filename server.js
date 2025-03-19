import express from 'express';
const app = express();

app.use(express.static('static_files'))

app.listen('4000', ()=>{
    console.log('PORT 4000')
})
