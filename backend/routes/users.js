const router = require('express').Router();
let User = require('../models/user.model'); 

router.route('/').get((req, res) => {
    User.aggregate([{ "$lookup": {
        "from": "leads",
        "localField": "username", 
        "foreignField": "name", 
        "as": "leads" 
    }


    }])
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err)); 

}); 

router.route('/add').post((req, res) => {
    const username = req.body.username; 
    const email = req.body.email;
    const password = req.body.password;

    const newUser = new User({username, email, password}); 

    newUser.save()
           .then(() => res.json('User Added!'))
           .catch(err => res.status(400).json('Error: ' + err));


});

module.exports = router; 