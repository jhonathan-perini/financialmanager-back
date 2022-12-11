import {MongoClient} from "mongodb";

const URI = `mongodb+srv://financialManager:financialManager@application.u0mkmwi.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const mongoClient = client.db('financial-manager')

export default mongoClient