const mercadopago = require('mercadopago');

const createOrder = async (req, res) => {
    const { products } = req.body.products;
    try {
        const items = products.map(product => ({
            title: product.title,
            description: product.description,
            unit_price: Number(product.unit_price),
            quantity: Number(product.quantity)
        }))
        const result = await mercadopago.preferences.create({

            items: items,

            // auto_return: 'http://localhost:3001/success', 
     
            back_urls: {
                //aca las URLS que redireccionan dependiendo como haya salido la transaccion
                success: 'http://localhost:3001/success',
                failure: 'http://localhost:3001/failure',
            },
            //URL del webhook, donde recibe las notificaciones del back de MP(debe ser una url HTTPS por lo que MP va a tirar un error al pagar)
            notification_url: 'http://localhost:3001/webhook'
        })
        res.send(result.body)   
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

const success = (req, res) => res.send('Salio bien');

const failure = (req, res) => res.send('Salio mal');

module.exports = {
    createOrder,
    success,
    failure,
    receiveWebhook
};
