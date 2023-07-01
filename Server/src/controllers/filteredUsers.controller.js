const { User, Role } = require('../models/relationship/relationship');

const filteredUsers = async (req, res) => {
    const { role, isActive } = req.query;
    try {
        
        //Si hay role lo filtra (por role).
        if(role && !isActive){
            const response = await User.findAll({
                include:{
                    model: Role,
                    where: {
                        name: role,
                    },
                },
            });

            const users = response.map(user => ({
                userId: user.userId,
                name: user.name,
                email: user.email,
                password: user.password,
                isActive: user.isActive,
                verified: user.verified,
                role: user.role,
            }));
        res.status(200).json(users)
        };

        //Si llega isActive los filtra (por si estan activos o no).
    if(isActive && !role){
        const response = await User.findAll({
            include:{
                model: Role,
            },
            where:{
                isActive: isActive,
            },
        });
        const users = response.map(user => ({
            userId: user.userId,
            name: user.name,
            email: user.email,
            password: user.password,
            isActive: user.isActive,
            verified: user.verified,
            role: user.role
        }))
        res.status(200).json(users)
    };

    //Si nos llega role y isACtive los filtra en conjunto.
    if(role && isActive){
        const response = await User.findAll({
            include: {
                model: Role,
                where: {
                    name: role,
                }
            },
            where: {
                isActive: isActive,
            },
        });

        const users = response.map(user => ({
            userId: user.userId,
            name: user.name,
            email: user.email,
            password: user.password,
            isActive: user.isActive,
            verified: user.verified,
            role: user.role
        }))
        res.status(200).json(users);
    }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = filteredUsers;