// Importer le module express
const express = require ('express');

// Créer une application express
const app = express();
const PORT = process.env.PORT || 3000;


// Middleware pour parser les données JSON et les données de formulaire
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// Middleware pour servir les fichiers statiques
app.use(express.static(__dirname + '/public'));
console.log(__dirname + '/public');

const submitRoutes = require('./src/routes/submit.route');
const examen2Routes = require('./src/routes/examen2.route');

app.use('/submit', submitRoutes);
app.use('/examen2', examen2Routes);


app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
