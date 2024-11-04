const fs = require('fs');

const submit = (req, res) => {
    let dataRows = [];
    let methode = req.method;

    // Récupération des paramêtres selon la méthode utilisée
    if (methode === 'GET') {
        dataRows = Object.entries(req.query)
            .map(([key, value]) => `<tr><td>${key}</td><td>${value}</td></li>`)
            .join('');
    } else if (methode === 'POST') {
            dataRows = Object.entries(req.body)
                .map(([key, value]) => `<tr><td>${key}</td><td>${value}</td></li>`)
                .join('');
    }

    // Lecture du fichier HTML et remplacement du contenu dynamique
    fs.readFile('./src/templates/submit.template.html', 'utf8', (err, html) => {
    
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
        let htmlContent = html.replace('{{data}}', tableContent);
        // Remplacement du marqueur {{methode}} par la méthode utilisée 
        htmlContent = htmlContent.replace('{{methode}}', methode);

        // Envoi de la page HTML modifié
        res.send(htmlContent);
    });
}

module.exports = {
    submit
}