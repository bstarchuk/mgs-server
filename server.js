import express from 'express';
import Gamedig from 'gamedig';
import axios from 'axios';

const app = express();
const PORT = 3000;

app.get('/', async (req, res) => {
    res.send('Try https://mgs-server.vercel.app/<platform>/<ip>');
});

app.get('/:platform/:ip', async (req, res) => {
    try {
        const {platform, ip} = req.params;
        const [host, port] = ip.split(':')

        if (platform === 'discord') {

        } else if (platform === 'scum') {
            axios.get(`https://api.hellbz.de/scum/api.php?address=${host}&port=${port}`)
                .then((response) => {
                    res.send({game: platform, ip, data: response.data})
                })
                .catch((error) => {
                    console.log(error);
                    res.send('Server is offline')
                });
        } else {
            Gamedig.query({
                type: platform,
                host,
                port
            }).then((response) => {
                res.send({game: platform, ip, data: response})
            }).catch((error) => {
                console.log(error);
                res.send('Server is offline')
            });
        }
    } catch (e) {
        console.error(e);
    }
});

app.listen(PORT, () => console.log(`Listening on port http://localhost:${PORT}`));