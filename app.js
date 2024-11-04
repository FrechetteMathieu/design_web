// Importer le module express
const express = require ('express');

// Créer une application express
const app = express();
const PORT = process.env.PORT || 3000;


// Middleware pour parser les données JSON et les données de formulaire
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const submitRoutes = require('./src/routes/submit.route');
app.use('/submit', submitRoutes);


app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
