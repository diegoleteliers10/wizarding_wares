const mercadopago = require('mercadopago');
const {baseURLFront} = require("../utils/urlBases");

const createOrder = async (req, res) => {
    const items = req.body.items;
    try {
        await mercadopago.preferences.create({
        items: items,

        back_urls: {
            //aca las URLS que redireccionan dependiendo como haya salido la transaccion
            success: `${baseURLFront}/success`,
            failure: `${baseURLFront}/failure`,
            pending: ''
        },
        statement_descriptor: 'Wizarding Wares',
        //auto retorna despues de unos segundos a la url de success o failure(dependiendo el resultado)
        auto_return: "approved",

        //URL del webhook, donde recibe las notificaciones del back de MP(debe ser una url HTTPS por lo que MP va a tirar un error al pagar)
        // notification_url: 'http://localhost:3001/webhook'
        })
        .then(function (response) {
            res.json({
                body: response.body
            })
        })   
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

const receiveWebhook = async (req, res) => {
    const payment = req.query
    try {
        //aca utilizo los datos que me manda el webhook para buscar el pago hecho anteriormente y ver su info en este caso por consola
        if(payment.type === 'payment'){
            const data = await mercadopago.payment.findById(payment['data.id'])
            console.log(data);
        }
        res.sendStatus(204)
    } catch (error) {
        return res.status(500).json({error: error.message})
    } 
};


module.exports = {
    createOrder,
    receiveWebhook
};
