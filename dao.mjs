import Database from './database.mjs';

// Inicializar 
const database = new Database();

/**
 * 
 * @param query Función a ejecutar con la base de datos. Admite un parámetro (db)
 */
function dbQuery(query) {
  database.open()
    .then(query)
    .then(() => database.close)
    .catch(error => console.log(error));
}

async function listByName(whenEndCallback) {
    const db = await database.open();
    db.collection('companies').find({}, {
        projection: {
            name: 1,
            _id: 0
        }
    }).toArray((error, result) => {
        if (error) {
            console.error(error);
        } else {
            console.log(result);
            whenEndCallback(result);
        }
        await database.close();
    });
    
}

export default {dbQuery, listByName};