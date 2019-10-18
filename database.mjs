import mongo from 'mongodb';

const MongoClient = mongo.MongoClient;


export default class {
    
    url;
    dbName;
    client;

    constructor() {
        this.url = "mongodb://localhost:27017";
        this.dbName = "social";
        this.client = new MongoClient(this.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
    }

    async _initDatabase() {
        const db = this.open();
        // Borrar base de datos si existe
        db.then()
            .catch("Error con la base de datos");
        // instalar base de datos
    }

    async open() {
        try {
            await this.client.connect();
            //console.log("Connected to server");
            return this.client.db(this.dbName);
        } catch(error) {
            console.log(error.stack);
        }
    }

    async close() {
        this.client.close();
        //return console.log("Connection closed");
    }

}

