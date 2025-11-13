const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const cors = require('cors')
require('dotenv').config()

const app = express()
const port = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

const admin = require("firebase-admin");

const serviceAccount = require("./serviceKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.dqh3ts3.mongodb.net/?appName=Cluster0`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});
// midleware

const verifyToken=async(req,res,next)=>{
const authorization=req.headers.authorization; 
const token=authorization.split(' ')[1]

if(!token){
  res.status(401).send({
  message:'Token not found'
})
}

try{
 await admin.auth().verifyIdToken(token)

next()
}catch(err){
res.status(401).send({
  message:'unauthorized access'
})
}





}

async function run() {
  try {
    // await client.connect();
    // collecction

    const db = client.db('livento-db');
    const proCollection = db.collection('liventos');
    const myproperCollection = db.collection('myproperties');
    const userReviewsCollection = db.collection("userReviews");


    //  Get all properties
    app.get('/propertis', async (req, res) => {
      const result = await proCollection.find().toArray();
      res.send(result);
    });

    //  Featured (sort) 
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

    // search

    app.get('/search',async(req,res)=>{
      const search_text=req.query.search;
      const result= await proCollection.find({
propertyName: {$regex: search_text, $options:'i'}}).toArray()
      res.send(result)
    })

    // Single property
    app.get('/propertis/:id',verifyToken, async (req, res) => {
      const { id } = req.params;
      const result = await proCollection.findOne({ _id: new ObjectId(id) });
      res.send({ success: true, result });
    });

    //  Add new property
    app.post('/propertis', async (req, res) => {
      const data = req.body;
      try {
       
        const resultMain = await proCollection.insertOne(data);

        const myData = {
          ...data,
          mainId: resultMain.insertedId
        };
        await myproperCollection.insertOne(myData);

        res.send({
          success: true,
          main: resultMain,
          myProperties: myData
        });
      } catch (err) {
        res.send({ success: false, message: err.message });
      }
    });

    // Get my properties
    app.get('/myproperties', async (req, res) => {
      try {
        const email = req.query.email;
        

        const result = await myproperCollection
          .find({ "postedBy.email": email })
          .toArray();
        res.send(result);
      } catch (err) {
        res.send({ error: err.message });
      }
    });

    //Update both collections
    app.put('/propertis/:id', async (req, res) => {
      const { id } = req.params;
      const data = req.body;
      const objectId = new ObjectId(id);

      try {
        const resultMain = await proCollection.updateOne(
          { _id: objectId },
          { $set: data }
        );

        const resultMy = await myproperCollection.updateOne(
          { mainId: objectId },
          { $set: data }
        );

        res.send({
          success: true,
          updatedMain: resultMain.modifiedCount,
          updatedMyProperties: resultMy.modifiedCount
        });
      } catch (err) {
        res.send({ success: false, message: err.message });
      }
    });

    //  Delete from both collections
    app.delete('/propertis/:id', async (req, res) => {
      const { id } = req.params;
      const objectId = new ObjectId(id);

      try {
        await proCollection.deleteOne({ _id: objectId });
        await myproperCollection.deleteOne({ mainId: objectId });
        res.send({ success: true });
      } catch (err) {
        res.send({ success: false, message: err.message });
      }
    });



    // reviwes

    app.post("/propertis/:id/reviews", async (req, res) => {
  const { id } = req.params; 
  const reviewData = req.body; 

  try {
    const objectId = new ObjectId(id);

    
    await proCollection.updateOne(
      { _id: objectId },
      { $push: { ratings: reviewData } }
    );

   
    await userReviewsCollection.insertOne(reviewData);

    res.send({ success: true, message: "Review added successfully" });
  } catch (err) {
    console.error(err);
    res.send({ success: false, message: err.message });
  }
});

// Get reviw of  user
app.get("/userReviews", async (req, res) => {
  try {
    const email = req.query.email;
    if (!email) return res.status(400).send({ error: "Email query missing" });

    const reviews = await userReviewsCollection
      .find({ reviewerEmail: email })
      .sort({ reviewDate: -1 })
      .toArray();

    res.send(reviews);
  } catch (err) {
    res.send({ error: err.message });
  }
});


// delete reviews


app.delete('/reviews/:reviewId/:propertyId', async (req, res) => {
  const { reviewId, propertyId } = req.params;
  try {
 
    await client.db('livento-db').collection('userReviews').deleteOne({ _id: new ObjectId(reviewId) });

  
    await client.db('livento-db').collection('liventos').updateOne(
      { _id: new ObjectId(propertyId) },
      { $pull: { ratings: { _id: new ObjectId(reviewId) } } }
    );

    res.send({ success: true, message: "Review deleted from both collections" });
  } catch (err) {
    res.send({ success: false, message: err.message });
  }
});

// sort


    // await client.db("admin").command({ ping: 1 });
    console.log("✅ MongoDB connected successfully!");
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Server is running');
});

app.listen(port, () => {
  console.log(` Server listening on port ${port}`);
});
