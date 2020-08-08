const { db } = require('../util/admin');
const { request, response } = require('express');


exports.postSingleReceptionist = (request, response) => {
    
    const newReceptionist = {
        id: request.body.id,
        username: request.body.username,
        password: request.body.password,
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        full_name: request.body.full_name,
        dob: request.body.dob,
        sex: request.body.sex,
        address: request.body.address,
        city: request.body.city,
        state: request.body.state,
        email: request.body.email,
        phone_no: request.body.phone_no
    }
    db
        .collection('receptionists')
        .add(newReceptionist)
        .then((doc)=>{
            const responseReceptionistItem = newReceptionist;
            responseReceptionistItem.id = doc.id;
            db.collection('receptionists').doc(doc.id).update({
                id: doc.id
            });
            return response.json(responseReceptionistItem);
        })
        .catch((err) => {
			response.status(500).json({ error: 'Something went wrong' });
			console.error(err);
		});
};


exports.getAllReceptionists = (request, response) => {
	db
        .collection('receptionists')
		.get()
		.then((data) => {
			let receptionists = [];
			data.forEach((doc) => {
				receptionists.push({
                    id: doc.data().id,
                    username: doc.data().username,
                    password: doc.data().password,
                    first_name: doc.data().first_name,
                    last_name: doc.data().last_name,
                    full_name: doc.data().full_name,
                    dob: doc.data().dob,
                    sex: doc.data().sex,
                    address: doc.data().address,
                    city: doc.data().city,
                    state: doc.data().state,
                    email: doc.data().email,
                    phone_no: doc.data().phone_no
				});
			});
			return response.json(receptionists);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code});
		});
};

exports.getSingleReceptionist = (request, response) => {
    const document = db.doc(`receptionists/${request.params.receptionistId}`);
    document.get().then( (doc) => {
        if(!doc.exists)
        {
            return response.status(400).json({error: 'Something went wrong while fetching single receptionist'});
        }

        let data = {
                    'id': doc.data().id,
                    'username': doc.data().username,
                    'password': doc.data().password,
                    'first_name': doc.data().first_name,
                    'last_name': doc.data().last_name,
                    'full_name': doc.data().full_name,
                    'dob': doc.data().dob,
                    'sex': doc.data().sex,
                    'address': doc.data().address,
                    'city': doc.data().city,
                    'state': doc.data().state,
                    'email': doc.data().email,
                    'phone_no': doc.data().phone_no
        };

        return response.json([data]);
    })
    .catch( (error) => {
        console.log('Something went wrong during fetching single receptionist');
    });
};

exports.deleteReceptionist = (request, response) => {
    const document = db.doc(`/receptionists/${request.params.receptionistId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: 'Receptionist not found' })
            }
            return document.delete();
        })
        .then(() => {
            response.json({ message: 'Delete successfull' });
        })
        .catch((err) => {
            console.error(err);
            return response.status(500).json({ error: err.code });
        });
};

exports.editReceptionist = ( request, response ) => { 
   
    let document = db.collection('receptionists').doc(`${request.params.receptionistId}`);
    document.update(request.body)
    .then(()=> {
        response.json({message: 'Updated successfully'});
    })
    .catch((err) => {
        console.error(err);
        return response.status(500).json({ 
                error: err.code 
        });
    });
};