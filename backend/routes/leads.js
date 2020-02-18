const router = require('express').Router(); 
let Lead = require('../models/leads.model'); 

router.route('/').get((req, res) => {
    Lead.find()
            .then(leads => res.json(leads))
            .catch(err => res.status(400).json('Error : ' + err)); 


});

    router.route('/add').post((req, res) =>  {
        const name = req.body.name; 
        const lastname = req.body.lastname;
        const comment = req.body.comment;
        const email = req.body.email;
        const tlfnr = Number(req.body.tlfnr);
        const date = Date.parse(req.body.date);

        const newLead = new Lead({
            name,
            lastname,
            comment,
            email,
            tlfnr,
            date
        });

    newLead.save()
        .then(() => res.json('Lead added'))
        .catch(err => res.status(400).json('Error: ' + err));
});


    router.route('/:id').get((req, res) => {
        Lead.findById(req.params.id)
            .then(leads => res.json(leads))
            .catch(err => res.status(400).json('Error: ' + err)); 


    });

    router.route('/:id').delete((req, res) => {
        Lead.findByIdAndDelete(req.params.id)
            .then(() => res.json('Lead deleted'))
            .catch(err => res.status(400).json('Error: ' + err)); 
    });

    router.route('/update/:id').post((req, res) => {
        Lead.findById(req.params.id)
            .then(leads => {

                //if (!Lead) return res.status(404).send();

                leads.name = req.body.name; 
                leads.lastname = req.body.lastname;
                leads.email = req.body.email;
                leads.tlfnr = Number(req.body.tlfnr);
                leads.comment = req.body.comment; 
                leads.date = Date.parse(req.body.date);

                leads.save() 
                    .then(() => res.json('Lead updated'))
                    .catch(err => res.status(400).json('Error: ' + err)); 
            })
            .catch(err => res.status(400).json('Error: ' + err));
    });

module.exports = router;