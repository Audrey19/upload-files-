var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");
const multer = require('multer');
const upload = multer({ dest: 'tmp/', limits:{
  fileSize : 3 * 1024 * 1024,
} 
});
const fs = require('fs');


router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.use(function (req, res, next) {
  console.log('Time:', Date.now());
  next();
});

router.get('/superMiddleware', (req, res, next) => {
      console.log("hello middleware");
      res.send('hello world');
  
});

/* GET mail. */
router.get('/askForCookiesRecipe', (req, res, next) => {

  var smtpTransport = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "sixtinewcs@gmail.com",
        pass: "jecode4wcs"
    }
  });

  smtpTransport.sendMail({
    from: "audrey mertens <sixtinewcs@gmail.com>", // Expediteur
    to: "supergrandma@yopmail.com", // Destinataires
    subject: "Recette Coockie!", // Sujet
    text: "quel est ta recette de cookie mémé?✔", // plaintext body
    html: "<b>quel est ta recette de cookie mémé?✔</b>" // html body
    }, (error, response) => {
      if(error) {
        console.log(error);
      } else {
        console.log("Message sent: " + response.response);
      }
    });
})

/* post multer. */
router.post('/monupload', upload.array('monfichier',3), function (req, res, next) {
    for(let i = 0; i < req.files.length; i++){
      fs.rename(req.files[i].path, 'public/images/' + req.files[i].originalname, function(err){
        if (err) {
          res.send('problème durant le déplacement');
        } 
    }
  )};
  res.send('Fichier uploadé avec succès');
})





module.exports = router;
