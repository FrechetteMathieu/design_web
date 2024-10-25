// Importer le module express
const express = require ('express');
const fs = require('fs');

// Créer une application express
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware pour parser les données JSON et les données de formulaire
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/submit', (req, res) => {
    // const data = JSON.stringify(req.body, null, 2);
    const dataRows = Object.entries(req.body)
        .map(([key, value]) => `<tr><td>${key}</td><td>${value}</td></li>`)
        .join('');

    // Lecture du fichier HTML et remplacement du contenu dynamique
    fs.readFile('template_form.html', 'utf8', (err, html) => {
    
        if (err) {
            console.error("Erreur lors de la lecture du fichier HTML :", err);
            res.status(500).send("Erreur serveur");
            return;
        }

        let tableContent = "<p>Aucune donnée</p>";
        if(dataRows) {
            tableContent = `
            <table id="datatable">
                <thead>
                    <tr>
                        <th>Nom</th>
                        <th>Valeur</th>
                    </tr>
                </thead>
                <tbody>
                    ${dataRows}
                </tbody>
            </table>`;
        }
        
        // Remplacement du marqueur {{data}} par les données reçues
        const htmlContent = html.replace('{{data}}', tableContent);

        // Envoi de la page HTML modifié
        res.send(htmlContent);
    });
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
