const express = require('express');
const router = express.Router();

const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
const { IamAuthenticator } = require('ibm-watson/auth');

const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
    version: '2020-08-01',
    authenticator: new IamAuthenticator({
        apikey: 'XKtMnE9RY_PkeRot5TXl_5sa9DqSTpsCzI_3HpDRpaVe',
    }),
    serviceUrl: 'https://api.us-south.natural-language-understanding.watson.cloud.ibm.com/instances/bcd83e82-878e-49d8-9a16-5440dcaed735',
});


router.get('/firstExperience', (req, res) => {

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            console.log(JSON.stringify(analysisResults, null, 2));
        })
        .catch(err => {
            console.log('error:', err);
        });

    res.send('Contacto');
});

router.post('/consumeNLU', (req, res) => {
    const text = req.body.comentario;
    const analyzeParams = {
        "text": text,
        "features": {
            "entities": {
                "model": "042ae203-1b0d-4917-b9ab-a0186e225fb8"
            },
            "keywords": {
                "emotion": true,
                "sentiment": true
            },
            "emotion": {
                "sentiment": true
            },
            "categories": {
                "sentiment": true
            },
            "relations": {
                "model": "042ae203-1b0d-4917-b9ab-a0186e225fb8"
            },
            "sentiment": {}
        }
    };

    naturalLanguageUnderstanding.analyze(analyzeParams)
        .then(analysisResults => {
            var aux = JSON.stringify(analysisResults, null, 2)
            console.log(aux.emotion);
            
        })
        .catch(err => {
            console.log('error:', err);
        });
    console.log(text);
    res.render('opinon');
});

router.get('/opinion', (req, res) => {
    res.render('opinon');
});

router.get('/', (req, res) => {
    res.render('index');
});

module.exports = router;

