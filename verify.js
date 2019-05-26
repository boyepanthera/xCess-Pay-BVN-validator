import request from 'request';
import passKeys from './config';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser  from 'body-parser';
import flash from 'connect-flash';
const port = 4040;
const app= express();

// app.configure(function () {
//     app.use(express.cookieParser('keyboard cat'));
//     app.use(express.session({
//         cookie: {
//             maxAge: 60000
//         }
//     }));
//     app.use(flash());
// });

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
            // req.flash ('success', 'Verification done successfully');
            res.render('validated', {detail});
        }
        catch (err) {
            console.log(err);
            // req.flash('error', "Your BVN is incorrect kindly crosscheck your BVN");
            return res.redirect('/');
        }
    });
});

const server = app.listen(port, (req, res) => { console.log('Server starting on port ' + port) }); 