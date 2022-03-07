const express = require('express')
const app = express();
var server = require('http').createServer(app)
app.use(
    express.urlencoded({
       extended:true
    })
);
//app.use(express.static('public'))

app.get('/', function(req, res) {
    res.sendFile('/home/alisa/WebstormProjects/scoring/public/index.html')
});
app.post('/scoring', function(req, res) {
    var scoring=0;
    console.log(req.body);
    let age = String(req.body.birthDate);
    age = Number(age[0] + age[1] + age[2] + age[3]); 
    let currentDate = new Date();
    //let years = Math.round((currentDate - age)/(60 * 60 * 24 *1000 * 365)); 
    let years = currentDate.getFullYear() - age;
    console.log(years);
    if ((years > 60) || (years < 18)) {
        res.send('У вас неподходящий возраст');
        return;
    } else if (years > 22) {
        scoring = scoring + 0.3;
    } else if (years > 20) {
        scoring = scoring + (years-20)*0.1;
    }
    let gender = String(req.body.gender);
    if (gender=="female") {
        scoring = scoring + 0.4;
    }
    let periodLife = Number(req.body.periodLife);
    if (periodLife > 9) {
        scoring = scoring + 0.42;
        console.log('0.42');
    } else {
        scoring = scoring + (0.042 * periodLife);
        console.log(String(0.042 * periodLife));
    }
    let profession = String(req.body.profession);
    if (profession=="low") {
        scoring = scoring + 0.55;
        console.log('low');
    }
    else if (profession=="other") {
        scoring = scoring + 0.16;
        console.log('other');
    }
    let sphere = String(req.body.sphere);
    if (sphere=="public") {
        scoring = scoring + 0.21;
        console.log('public');
    }
    scoring = scoring + 0.059*Number(req.body.periodWork);
    if (req.body.account) {
        scoring = scoring + 0.45;
        console.log('account');
    }
    if (req.body.estate) {
        scoring = scoring + 0.35;
        console.log('estate');
    }
    if (req.body.insurance) {
        scoring = scoring + 0.19;
        console.log('insurance');
    }
    if (scoring < 1.5) {
        res.send("Ваш балл меньше 1.5, вам не одобрен кредит. Ваш балл: "+String(scoring));
    } else {
        res.send("Ваш балл больше 1.5, вам одобрен кредит. Ваш балл: "+String(scoring));
    }
    
});

server.listen(3000);