const { User } = require('../models/relationship/relationship');
const {enviarNotificacion} = require("../utils/notificaciones");
const {diasSemana} = require("../utils/fechas");
const {EMAIL_CREDENTIALS} = process.env;

const userFinalDelete = async (req, res) => {
    const { id } = req.params;
    try {
        // Buscamos el usuario por su userId
        const user = await User.findAll({where:{userId: id,}});

        const fecha = new Date;
        // Definimos las opciones de mensaje
        const mensaje = {
            userId: user[0].userId,
            date: `${diasSemana[fecha.getDay()]}, ${fecha.toLocaleDateString()} a las  ${fecha.toLocaleTimeString()}`,
            mailWW: EMAIL_CREDENTIALS,
        };

        // Eliminamos De manera definitiva 
        await User.destroy({
            where: { userId: id }
        });


        // Enviamos una notificacion al administrador, sobre la eliminacion definitiva del usuario
        enviarNotificacion(14, user[0].name, user[0].email, mensaje);
        // Enviamos una notificacion al usuario, sobre la eliminacion definitiva de su cuenta
        enviarNotificacion(15, user[0].name, user[0].email, mensaje);

        res.status(200).send('User has been successfully deleted!')
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
};

module.exports = userFinalDelete;