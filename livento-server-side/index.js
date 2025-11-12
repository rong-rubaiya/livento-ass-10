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
    // collecction

    const db = client.db('livento-db');
    const proCollection = db.collection('liventos');
    const myproperCollection = db.collection('myproperties');
    const userReviewsCollection = db.collection("userReviews");


    // ✅ Get all properties
    app.get('/propertis', async (req, res) => {
      const result = await proCollection.find().toArray();
      res.send(result);
    });

    // ✅ Featured (sort) route (DON’T delete this!)
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

    // ✅ Single property
    app.get('/propertis/:id', async (req, res) => {
      const { id } = req.params;
      const result = await proCollection.findOne({ _id: new ObjectId(id) });
      res.send({ success: true, result });
    });

    // ✅ Add new property
    app.post('/propertis', async (req, res) => {
      const data = req.body;
      try {
        // 1️⃣ Insert to main collection
        const resultMain = await proCollection.insertOne(data);

        // 2️⃣ Insert to my-properties (with mainId)
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
        res.status(500).send({ success: false, message: err.message });
      }
    });

    // ✅ Get my properties
    app.get('/myproperties', async (req, res) => {
      try {
        const email = req.query.email;
        if (!email) return res.status(400).send({ error: "Email query missing" });

        const result = await myproperCollection
          .find({ "postedBy.email": email })
          .toArray();
        res.send(result);
      } catch (err) {
        res.status(500).send({ error: err.message });
      }
    });

    // ✅ Update both collections
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
        res.status(500).send({ success: false, message: err.message });
      }
    });

    // ✅ Delete from both collections
    app.delete('/propertis/:id', async (req, res) => {
      const { id } = req.params;
      const objectId = new ObjectId(id);

      try {
        await proCollection.deleteOne({ _id: objectId });
        await myproperCollection.deleteOne({ mainId: objectId });
        res.send({ success: true });
      } catch (err) {
        res.status(500).send({ success: false, message: err.message });
      }
    });



    // reviews

    app.post("/propertis/:id/reviews", async (req, res) => {
  const { id } = req.params; // property _id
  const reviewData = req.body; // { reviewerName, reviewerEmail, starRating, reviewText, reviewDate, ... }

  try {
    const objectId = new ObjectId(id);

    // 1️⃣ Add review to property's ratings array
    await proCollection.updateOne(
      { _id: objectId },
      { $push: { ratings: reviewData } }
    );

    // 2️⃣ Optionally, add review to userReviews collection
    await userReviewsCollection.insertOne(reviewData);

    res.send({ success: true, message: "Review added successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ success: false, message: err.message });
  }
});

// Get reviews of a specific user
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
    res.status(500).send({ error: err.message });
  }
});


// delete reviews

// DELETE review (remove from both collections)
app.delete('/reviews/:reviewId/:propertyId', async (req, res) => {
  const { reviewId, propertyId } = req.params;
  try {
    // 1️⃣ Delete from userReviews
    await client.db('livento-db').collection('userReviews').deleteOne({ _id: new ObjectId(reviewId) });

    // 2️⃣ Remove from property's ratings array
    await client.db('livento-db').collection('liventos').updateOne(
      { _id: new ObjectId(propertyId) },
      { $pull: { ratings: { _id: new ObjectId(reviewId) } } }
    );

    res.send({ success: true, message: "Review deleted from both collections" });
  } catch (err) {
    res.status(500).send({ success: false, message: err.message });
  }
});


    await client.db("admin").command({ ping: 1 });
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
  console.log(`🚀 Server listening on port ${port}`);
});
