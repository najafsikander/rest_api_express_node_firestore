const { db } = require('../util/admin');


exports.postSingleAppointment = (request, response) => {
    
    const newAppointment = {
        id: request.body.id,
        patient_id: request.body.patient_id,
        patient_name: request.body.patient_name,
        provider_id: request.body.provider_id,
        provider_name: request.body.provider_name,
        facility_id: request.body.facility_id,
        facility_name: request.body.facility_name,
        date: request.body.date,
        time: request.body.time,
        visit_type: request.body.visit_type,
        checkout_time: request.body.checkout_time,
        status: request.body.status,
        vitals: request.body.vitals
    }
    db
        .collection('appointments')
        .add(newAppointment)
        .then((doc)=>{
            const responseAppointmentItem = newAppointment;
            responseAppointmentItem.id = doc.id;
            db.collection('appointments').doc(doc.id).update({
                id: doc.id
            });
            return response.json(responseAppointmentItem);
        })
        .catch((err) => {
			response.status(500).json({ error: 'Something went wrong' });
			console.error(err);
		});
};


exports.getAllAppointments = (request, response) => {
	db
        .collection('appointments')
		.get()
		.then((data) => {
			let appointments = [];
			data.forEach((doc) => {
				appointments.push({
                    id: doc.data().id,
                    patient_id: doc.data().patient_id,
                    patient_name: doc.data().patient_name,
                    provider_id: doc.data().provider_id,
                    provider_name: doc.data().provider_name,
                    facility_id: doc.data().facility_id,
                    facility_name: doc.data().facility_name,
                    date: doc.data().date,
                    time: doc.data().time,
                    visit_type: doc.data().visit_type,
                    checkout_time: doc.data().checkout_time,
                    status: doc.data().status,
                    vitals: doc.data().vitals
				});
			});
			return response.json(appointments);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code});
		});
};

exports.getSingleAppointment = (request, response) => {
    const document = db.doc(`/appointments/${request.params.appointmentId}`);

    document.get().then( (doc) => {
        if(!doc.exists)
        {
            return response.status(404).json('Requested appointment doc doesnot exist');
        }

        let data = {
                    'id': doc.data().id,
                    'patient_id': doc.data().patient_id,
                    'patient_name': doc.data().patient_name,
                    'provider_id': doc.data().provider_id,
                    'provider_name': doc.data().provider_name,
                    'facility_id': doc.data().facility_id,
                    'facility_name': doc.data().facility_name,
                    'date': doc.data().date,
                    'time': doc.data().time,
                    'visit_type': doc.data().visit_type,
                    'checkout_time': doc.data().checkout_time,
                    'status': doc.data().status,
                    'vitals': doc.data().vitals
        }

        return response.json([data]);
    }).catch( (error) => {
        console.log('Something went wrong during fetching single patient');
    });;
};

exports.deleteAppointment = (request, response) => {
    const document = db.doc(`/appointments/${request.params.appointmentId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: 'Appointment not found' })
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

exports.editAppointment = ( request, response ) => { 
   
    let document = db.collection('appointments').doc(`${request.params.appointmentId}`);
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