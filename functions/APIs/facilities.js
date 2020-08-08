const { db } = require('../util/admin');
const { request, response } = require('express');


exports.postSingleFacility = (request, response) => {
    
    const newFacility = {
        id: request.body.id,
        username: request.body.username,
        password: request.body.password,
        type: request.body.type,
        name: request.body.name,
        address: request.body.address,
        city: request.body.city,
        state: request.body.state,
        phone_no: request.body.phone_no,
        email: request.body.email,
        website: request.body.website,
        receptionist: request.body.receptionist,
        physician: request.body.physician,
    }
    db
        .collection('facilities')
        .add(newFacility)
        .then((doc)=>{
            const responseFacilityItem = newFacility;
            responseFacilityItem.id = doc.id;
            db.collection('facilities').doc(doc.id).update({
                id: doc.id
            });
            return response.json(responseFacilityItem);
        })
        .catch((err) => {
			response.status(500).json({ error: 'Something went wrong' });
			console.error(err);
		});
};


exports.getAllFacilities = (request, response) => {
	db
        .collection('facilities')
		.get()
		.then((data) => {
			let facilities = [];
			data.forEach((doc) => {
				facilities.push({
                    id: doc.data().id,
                    username: doc.data().username,
                    password: doc.data().password,
                    type: doc.data().type,
                    name: doc.data().name,
                    address: doc.data().address,
                    city: doc.data().city,
                    state: doc.data().state,
                    phone_no: doc.data().phone_no,
                    email: doc.data().email,
                    website: doc.data().website,
                    receptionist: doc.data().receptionist,
                    physician: doc.data().physician,
				});
			});
			return response.json(facilities);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code});
		});
};

exports.getSingleFacility = (request, response) => {
    const document = db.doc(`/facilities/${request.params.facilityId}`);

    document.get().then( (doc) => {
        console.log('Doc', doc);
        if(!doc.exists){
            return response.status(400).json({error: 'Something went wrong during fetching desired facility'});
        }

        let data = {
            'id': doc.data().id,
            'username': doc.data().username,
            'password': doc.data().password,
            'type': doc.data().type,
            'name': doc.data().name,
            'address': doc.data().address,
            'city': doc.data().city,
            'state': doc.data().state,
            'phone_no': doc.data().phone_no,
            'email': doc.data().email,
            'website': doc.data().website,
            'receptionist': doc.data().receptionist,
            'physician': doc.data().physician,
        };
        console.log('Single facility data: ',data);
        return response.json([data]);
    }).catch( (error) => {
        console.log('Something went wrong during fetching single facility');
    });
}

exports.deleteFacility = (request, response) => {
    const document = db.doc(`/facilities/${request.params.facilityId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: 'Facility not found' })
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

exports.editFacility = ( request, response ) => { 
   
    let document = db.collection('facilities').doc(`${request.params.facilityId}`);
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