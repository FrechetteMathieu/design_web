const fs = require('fs');

const RevB = (req, res) => {
    const listeJeux = {
        "Q1JBC-3ZPX8-TVHUH" : { "nom" : "Final Fantasy 1", "image_url" : "/assets/images/ff1.jpg"},
        "P3CJN-JNGJM-XYYT4" : { "nom" : "Contra", "image_url" : "/assets/images/contra.jpg" },
        "2RCWA-XPRPX-GJHPR" : { "nom" : "The Legend of Zelda", "image_url" : "/assets/images/zelda.png" },
        "H4LS8-L1L3T-08D9X" : { "nom" : "Rygar", "image_url" : "/assets/images/rygar.jpg" },
        "KBZB7-PQYDY-D5TMZ-MUABS-JNGJM" : { "nom" : "Metroid", "image_url" : "/assets/images/metroid.jpg" },
        "VPTU1-9UZXA-X4ED4-F596J-XPRPX" : { "nom" : "Ninja Gaiden", "image_url" : "/assets/images/ninja_gaiden.jpg" },
        "SUY17-21D57-5QYJU-UE6PN-HZ452" : { "nom" : "Kirby's Adventure", "image_url" : "/assets/images/kirby.png" },
        "defaut" : { "nom" : "Super jeu secret activé!!", "image_url" : "/assets/images/duckHunt.jpg"}
    }

    let cleActivation = req.body['cle_activation'] ? req.body['cle_activation'] : "defaut";
    let produit = !listeJeux[cleActivation] ? listeJeux["defaut"] : listeJeux[cleActivation];

    // Lecture du fichier HTML et remplacement du contenu dynamique
    fs.readFile('./src/templates/ex2-revB.template.html', 'utf8', (err, html) => {
    
        if (err) {
            console.error("Erreur lors de la lecture du fichier HTML :", err);
            res.status(500).send("Erreur serveur");
            return;
        }

        // Remplacement les marqueurs par les données reçues
        let htmlContent = html
            .replace('{{image_url}}', produit.image_url)
            .replace('{{nom_jeux}}', produit.nom);

        // Envoi de la page HTML modifié
        res.send(htmlContent);
    });
};

module.exports = {
    RevB
}