const { Status } = require('../models/relationship/relationship');


//EDITAR ESTADO.
const editStatus = async (id, name) => {
    //verifica si llega el nuevo name.
    if(name){ 
        //Modifica el estado
        const status = await Status.findByPk(id)
        status.update({ name: name });
    } else {
        throw new Error('Missing new status name.')
    }
};

//ELIMINAR ESTADO.
const deleteStatus = async (id) => {
    //Verifica si llega un id.
    if(id){
        //Elimina por completo el estado.
        await Status.destroy({
            where: { statusId: id }
        });
    } else {
        throw new Error('Missing status ID.')
    }
};

//CREAR ESTADO.
const createStatus = async (name) => {
    //Verifica si llega un name para el estado.
    if(name){ 
        //Crea un nuevo estado
        const status = await Status.create({
            name: name,
        });
        return status;
    } else{
        throw new Error('Missing status name.')
    }
};

module.exports = { editStatus, deleteStatus, createStatus };