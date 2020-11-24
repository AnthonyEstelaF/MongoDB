var express = require('express');
var router = express.Router();

const MongoClient = require('mongodb').MongoClient; //Importo la libreria mongodb


router.get('/length_year/:length/:year', function (req, res, next) {
    console.log(req.params); //Leggo i parametri passati all'url
    let num = parseInt(req.params.length);
    let num2 = parseInt(req.params.year);
    const uri = 'mongodb+srv://anro01:antony123@anroo-sample.x4cug.mongodb.net/anroo-sample?retryWrites=true&w=majority'
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    client.connect(err => {
        const collection = client.db("sample_mflix").collection("movies"); //Mi connetto alla collection movies
        // eseguo una find sulla collection
        collection.find({ 'runtime': num},{'year':num2 }).toArray((err, result) => {
            if (err) console.log(err.message); //Se c'è qualche errore lo stampo
            else res.send(result);
            client.close(); //Quando ho terminato la find chiudo la sessione con il db
        }); //Eseguo la query e passo una funzione di callback

    });
});
module.exports = router;