const WsTransporter = require('../controller/WsTransporter');
const lead = new WsTransporter.default();

module.exports = (router) => {
    // 
    router.get('/', (req, res, next) => {
        // res.render('index', { title: 'Express' });
        res.json({ title: 'Express', status: lead.status });
    });
    // 
    router.post('/message', async (req, res, next) => {

        let params = (req.body || req.query);
        
        let data = {
            message: params.message,
            phone: params.phone
        }

        let consulta = await lead.sendMsgText(data);
        res.json({ message: consulta});

    })
    
    router.post('/list', async (req, res, next) => {

        let params = (req.body || req.query);
        
        let data = {
            message: params.message,
            phone: params.phone
        }

        let consulta = await lead.sendMsgImage(data);
        res.json({ message: consulta});
    })
};

