import request from 'request';
import passKeys from './config';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser  from 'body-parser';
const port = process.env.PORT;
const app= express();
dotenv.config();
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({
    extended: true
}));

console.log(passKeys);
app.set ('view engine', 'ejs')

app.get('/', (req, res) => {
   res.render('home'); 
});

app.post('/validate', (req, res) => {
    let data = req.body;
    console.log(data)
    request('https://ravesandboxapi.flutterwave.com/v2/kyc/bvn/'+data.bvn+'?seckey='+passKeys.secKey, (err, response, detail) => {
        try {
            console.log(response.statusCode);
            console.log(detail);     
            res.render('validated', {detail});
        }
        catch (err) {
            console.log(err);
            return res.redirect('/');
        }
    });
});

const server = app.listen(port, proceess.env.IP, (req, res) => { console.log('Server starting on port ' + port) }); 