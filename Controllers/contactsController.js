const mongoose = require('mongoose');
const{User} = require('../models/UserModel.js');

module.exports.getContacts = async(req, res) =>{
    const {skip=0, limit=10} = req.query;
    const contacts = await User.find(
        {userId: new mongoose.Types.ObjectId(req.user.id)},
        {_v: 0},
        {skip: parseInt(skip), limit:patseInt(limit)}
    )
    res.json({contacts});
}