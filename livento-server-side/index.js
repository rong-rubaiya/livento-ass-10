const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = 5000

app.use(cors())
app.use(express.json())




const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.dqh3ts3.mongodb.net/?appName=Cluster0`;


const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
   
    await client.connect();

    // collection
    const db=client.db('livento-db')
    const proCollection=db.collection('liventos')



    // get api

    app.get('/propertis',async(req,res)=>{
        const result=await proCollection.find().toArray()  //its give promis,so get data need to async
        // console.log(result);
        res.send(result)
      })

      // sort:

       app.get('/propertis/featured', async (req, res) => {
      try {
        const result = await proCollection
          .find()
          .sort({ postedDate: -1 }) 
          .limit(6)
          .toArray();
        res.send(result);
      } catch (err) {
        res.status(500).send({ message: err.message });
      }
    });

    

    // get single data

    app.get('/propertis/:id',async(req,res)=>{
  const {id} =req.params
  console.log(id);
  const result=await proCollection.findOne({_id: new ObjectId(id)})
  res.send({
    success:true,
    result
  })
})

// add property

app.post('/propertis',async(req,res)=>{
  // need to data pathano
  const data =req.body
  console.log(data);
  const result=await proCollection.insertOne(data)
  res.send({
    success: true,
    result
  })
})
    
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Server is running')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})