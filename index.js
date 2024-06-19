import express from "express";
import bodyParser from "body-parser";
import path, {dirname} from "path";
import qrcode from "qrcode";

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(new URL('.', import.meta.url).pathname, 'public')));

app.get('/',(req, res)=>{
    res.sendFile(path.join(new URL('.', import.meta.url).pathname, 'public', 'index.html'));
})

app.post('/qrcode', (req,res)=>{
    const url = req.body.url;
    if(!url){
        return res.status(400).send('URL is required');
    }
    qrcode.toDataURL(url,(err, src)=>{
        if(err) res.send('Internal Error');
        res.send({src})
    })
})
app.listen(3000, ()=>{
    console.log("server is running at 3000");
})