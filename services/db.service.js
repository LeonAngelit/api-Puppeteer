const { MongoClient, ServerApiVersion } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();
const USER = process.env.USER;
const PASS = process.env.PASS;
const CLUSTER = process.env.CLUSTER;
const URI = `mongodb+srv://${USER}:${PASS}@${CLUSTER}retryWrites=true&w=majority`;
const CLIENT = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});
const DB_NAME = process.env.DB_NAME;
const COLLECTION_NAME = process.env.DB_COLLECTION;
const DATABASE = CLIENT.db(DB_NAME);
const COLLECTION = DATABASE.collection(COLLECTION_NAME);

class DBService {
  constructor() {}
  // Create a MongoClient with a MongoClientOptions object to set the Stable API version

  async #run() {
    try {
      // Connect the client to the server	(optional starting in v4.7)
      await CLIENT.connect();
      // Send a ping to confirm a successful connection
      await CLIENT.db("admin").command({ ping: 1 });
      console.log(
        "Pinged your deployment. You successfully connected to MongoDB!"
      );
    } finally {
      // Ensures that the client will close when you finish/error
      await CLIENT.close();
    }
  }

  async #retrieve(id) {
    try {
      await CLIENT.connect();
      let cursos = await COLLECTION.findOne({ _id: id });
      return cursos;
    } catch (err) {
      console.error(
        `Something went wrong trying to find the documents: ${err}\n`
      );
    } finally {
      // Ensures that the client will close when you finish/error
      await CLIENT.close();
    }
  }

  async #insert(id, element) {
    try {
      await CLIENT.connect();
      const IS_ADDED = await COLLECTION.findOne({ _id: id });
      IS_ADDED
        ? await COLLECTION.replaceOne(
            {
              _id: id,
            },
            { courses: element }
          )
        : await COLLECTION.insertOne({
            _id: id,
            courses: element,
          });
    } catch (err) {
      console.error(
        `Something went wrong trying to insert the new documents: ${err}\n`
      );
    } finally {
      // Ensures that the client will close when you finish/error
      await CLIENT.close();
    }
  }

  save(id, element) {
    return this.#insert(id, element);
  }

  get(id) {
    return this.#retrieve(id);
  }
}

module.exports = DBService;
