import {MongoClient} from "mongodb";

const uri = String(process.env.MONGO_URI);

const client = new MongoClient(uri);
const database = client.db("bulakapal-ecommerce");

export default database