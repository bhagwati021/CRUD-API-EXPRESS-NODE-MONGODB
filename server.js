const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const Event = require('./models/Events.model.js');// the event.js file


const app = express()
//dynamic rendering of HTML code in your Node.js application.
app.set('view engine', 'ejs');
app.use(express.json());


// const dbURL = 'mongodb+srv://admin:admin@cluster0.rczfk.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0'

//routing path
app.get('/', (req, res) => {
    res.send('Hello World!!!!');
  });

// reading the data
app.get('/api/products', async (req, res) => {
    try{
       const events = await Event.find({});
       res.status(200).json(events);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: error.message});
    }
  });

  //reading with ids
  app.get('/api/products/:id', async (req, res) => {
    try{
       const { id } = req.params;
       const event = await Event.findById(id);
       res.status(200).json(event);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: error.message});
    }
  });

//update content
app.put('/api/products/:id', async (req, res) => {
    try{
        const { id } = req.params;

    const event = await Event.findByIdAndUpdate(id, req.body);

    if (!event) {
      return res.status(404).json({ message: "not found" });
    }
    const updatedProduct = await Product.findById(id);
    res.status(200).json(updatedProduct);
    }
    catch(err){
        console.error(err);
        res.status(404).json({message: error.message});
    }
  });

//deleting 
app.delete('/api/products/:id', async (req, res) => {
    try{
       const { id } = req.params;
       const event = await Event.findByIdAndDelete(id);

       if (!event) {
        return res.status(404).json({ message: "not found" });
      }

      res.status(200).json({ message: "deleted successfully" });
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: error.message});
    }
  });

// posting a data
app.post('/api/products', async (req, res) => {
    try{
       const event = await Event.create(req.body);
       res.status(200).json(event);
    }
    catch(err){
        console.error(err);
        res.status(500).json({message: error.message});
    }
  });

mongoose
  .connect("mongodb+srv://admin:admin@cluster0.rczfk.mongodb.net/Node-API?retryWrites=true&w=majority&appName=Cluster0")
  .then((result) => {
    console.log('Connected to MongoDB');
    app.listen(3000, () => {
      console.log('Server started on port 3000');
    });
  })
  .catch((err) => {
    console.error('Could not connect to MongoDB:', err);
  });


// To get all the event

  //node --watch server.js