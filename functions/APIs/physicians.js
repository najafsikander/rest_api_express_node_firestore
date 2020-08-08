const { db } = require('../util/admin');
const { response } = require('express');


exports.postSinglePhysician = (request, response) => {
    
    const newPhysician = {
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
        phone_no: request.body.phone_no,
        practitionerTitles: request.body.practitionerTitles,
        practitionerEducation: request.body.practitionerTitles,
        openings:request.body.openings 
    }
    db
        .collection('physicians')
        .add(newPhysician)
        .then((doc)=>{
            const responsePhysicianItem = newPhysician;
            responsePhysicianItem.id = doc.id;
            db.collection('physicians').doc(doc.id).update({
                id: doc.id
            });
            return response.json(responsePhysicianItem);
        })
        .catch((err) => {
			response.status(500).json({ error: 'Something went wrong' });
			console.error(err);
		});
};


exports.getAllPhysicians = (request, response) => {
	db
        .collection('physicians')
		.get()
		.then((data) => {
			let physicians = [];
			data.forEach((doc) => {
				physicians.push({
                    id: doc.data().id,
                    username:doc.data().username,
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
                    phone_no: doc.data().phone_no,
                    practitionerTitles: doc.data().practitionerTitles,
                    practitionerEducation: doc.data().practitionerTitles,
                    openings: doc.data().openings 
				});
			});
			return response.json(physicians);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code});
		});
};

exports.getSinglePhysicians = (request, response) => {
    const document = db.doc(`physicians/${request.params.physicianId}`);

    document.get().then( (doc) => {
        if(!doc.exists)
        {
            return response.status(400).json({error: 'Something went wrong during fetching desired physicians'});
        }

        let data = {
            'id': doc.data().id,
            'username':doc.data().username,
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
            'phone_no': doc.data().phone_no,
            'practitionerTitles': doc.data().practitionerTitles,
            'practitionerEducation': doc.data().practitionerTitles,
            'openings': doc.data().openings
        }

        return response.json([data]);
    }).catch( (error) => {
        console.log('Something went wrong during fetching single physicians');
    });
}

exports.deletePhysician = (request, response) => {
    const document = db.doc(`/physicians/${request.params.physicianId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: 'Physician not found' })
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

exports.editPhysician = ( request, response ) => { 
   
    let document = db.collection('physicians').doc(`${request.params.physicianId}`);
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