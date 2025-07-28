const path = require('path')
const dotenv = require('dotenv')
dotenv.config()
const express = require('express')
const serverless=require('serverless-http')
const cors = require('cors')
const connectDB = require('./db')
connectDB()
const Car = require('./model')
const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname,'dist')))
app.get('/',(req,res)=>{
  res.sendFile(path.join(__dirname,'dist/index.html'))
})
app.get('/car', async (req, res) => {
    try {
        const response = await Car.find()
        res.json(response)

    } catch (error) {
       console.error(error);
       
    }
})
app.post('/car', async (req, res) => {
    try {
        const response = await Car.create(req.body)
        res.json(response)

    } catch (error) {
       console.error(error);
       
    }
})
app.get('/car/:id', async (req, res) => {
  try {
    const data = await Car.findById(req.params.id);
    if (!data) return res.status(404).json({ error: 'Car not found' });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});
app.put('/car/:id', async (req, res) => {
  try {
    const data = await Car.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!data) return res.status(404).json({ error: 'Car not found' });
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});
app.delete('/car/:id', async (req, res) => {
    try {
        const response = await Car.findByIdAndDelete(req.params.id)
        res.json(response)
    } catch (error) {
       console.error(error);
       
    }
})
app.listen(process.env.PORT, () => {
    console.log('Server Running on Port ' + process.env.PORT);

})
//module.exports= (req,res)=>  app(req,res)
module.exports=serverless(app)







