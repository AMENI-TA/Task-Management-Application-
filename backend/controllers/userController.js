

const User = require('../models/User')






//CREATE

const createUser = async (req, res) =>{

    try{ 
        const user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password

            

        })
        res.status(200).json({
            message: "✅ User was created successflly!",
            user: user
        })
    }
    catch(err){
        res.status(400).json({ message: 'Error while creating the user', err})
    }
}


//get

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();  // Récupérer tous les utilisateurs de la base de données
    res.status(200).json(users);  // Envoyer la liste des utilisateurs en réponse
  } catch (err) {
    res.status(500).json({ message: 'Erreur serveur' });
  }
};


// READ

const findUser= async (req,res)=>{
    try{
        console.log(req.params.id)
        const user =await User.findById(req.params.id)
        if(!user){
            return res.status(400).json({
                message:`this ID:${req.params.id} is not found! please try with another ID`,
                user
            })
        }

        console.log(2)

        res.status(200).json({
          message:`informations of this ID ${req.params.id}`,
          user
        })
    }
    catch(err){
        res.status(400).json(err)
    }
}


//UPDATE
 
const updateUser= async (req, res)=>{
    try{

        const user = await User.findByIdAndUpdate(req.params.id,
            {name: req.body.name, email: req.body.email},
            {new: true}
        )
    if(!user){
        res.status(400).json({
            message: `there is no user with this id ${req.params.id} please check`
        })
    }
    res.status(200).json({
        message: `YES! user with this id ${req.params.id} was updated successfully`,
        user
    })
    }
    catch(err){
        res.status(400).json(err)
    }
}

//DELETE

const deleteUser = async (req,res)=>{
    try{
        const deleteUser= await User.findByIdAndDelete(req.params.id)

        if(!deleteUser){
            res.status(400).json({
                message: `user with this id ${req.params.id} is not found`
            })
        }
        res.status(200).json({
            message: `user with this id ${req.params.id} was deleted successfully`
        })
    }
    catch(err){
        res.status(400).json(err)
    }
}

module.exports = {getAllUsers,createUser,findUser,updateUser,deleteUser}