const { db } = require('../util/admin');

exports.postSinglePatient = (request, response) => {
    
    const newPatient = {
        username: request.body.username,
        password: request.body.password,
        pre_name: request.body.pre_name,
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        full_name: request.body.full_name,
        dob: request.body.dob,
        sex: request.body.sex,
        cnic: request.body.cnic,
        address: request.body.address,
        city: request.body.city,
        state: request.body.state,
        email: request.body.email,
        phone_no: request.body.phone_no,
        guardian_name: request.body.guardian_name,
        relationship: request.body.relationship,
        guardian_phone_no: request.body.guardian_phone_no,
        guardian_address: request.body.guardian_name,
        medical_list:request.body.medical_list,
        medical_issue_list: request.body.medical_issue_list,
        medicine_allergy_list: request.body.medicine_allergy_list,
        immunization_list: request.body.immunization_list,
    }
    db
        .collection('patients')
        .add(newPatient)
        .then((doc)=>{
            const responsePatientItem = newPatient;
            responsePatientItem.id = doc.id;
            db.collection('patients').doc(doc.id).update({
                id: doc.id
            });
            return response.json(responsePatientItem);
        })
        .catch((err) => {
			response.status(500).json({ error: 'Something went wrong' });
			console.error(err);
		});
};

exports.getAllPatients = (request, response) => {
	db
        .collection('patients')
		.get()
		.then((data) => {
			let patients = [];
			data.forEach((doc) => {
				patients.push({
                    id: doc.id,
                    username: doc.data().username,
                    password: doc.data().password,
                    pre_name: doc.data().pre_name,
                    first_name: doc.data().first_name,
                    last_name: doc.data().last_name,
                    full_name: doc.data().full_name,
                    dob: doc.data().dob,
                    sex: doc.data().sex,
                    cnic: doc.data().cnic,
                    address: doc.data().address,
                    city: doc.data().city,
                    state: doc.data().state,
                    email: doc.data().email,
                    phone_no: doc.data().phone_no,
                    guardian_name: doc.data().guardian_name,
                    relationship: doc.data().relationship,
                    guardian_phone_no: doc.data().guardian_phone_no,
                    guardian_address: doc.data().guardian_name,
                    medical_list:doc.data().medical_list,
                    medical_issue_list: doc.data().medical_issue_list,
                    medicine_allergy_list: doc.data().medicine_allergy_list,
                    immunization_list: doc.data().immunization_list,
				});
			});
			return response.json(patients);
		})
		.catch((err) => {
			console.error(err);
			return response.status(500).json({ error: err.code});
		});
};

exports.getSinglePatient = (request, response) => {
    const document = db.doc(`/patients/${request.params.patientId}`);
    document.get().then((doc) => {
        if(!doc.exists)
        {
            return response.status(404).json({error: 'Something went wrong during fetching desired patiend'});
        }

        let data = {
                    'id': doc.id,
                    'username': doc.data().username,
                    'password': doc.data().password,
                    'pre_name': doc.data().pre_name,
                    'first_name': doc.data().first_name,
                    'last_name': doc.data().last_name,
                    'full_name': doc.data().full_name,
                    'dob': doc.data().dob,
                    'sex': doc.data().sex,
                    'cnic': doc.data().cnic,
                    'address': doc.data().address,
                    'city': doc.data().city,
                    'state': doc.data().state,
                    'email': doc.data().email,
                    'phone_no': doc.data().phone_no,
                    'guardian_name': doc.data().guardian_name,
                    'relationship': doc.data().relationship,
                    'guardian_phone_no': doc.data().guardian_phone_no,
                    'guardian_address': doc.data().guardian_name,
                    'medical_list':doc.data().medical_list,
                    'medical_issue_list': doc.data().medical_issue_list,
                    'medicine_allergy_list': doc.data().medicine_allergy_list,
                    'immunization_list': doc.data().immunization_list,
        }
        
        console.log('Single patient data is: ', data);

        return response.json([data]);
    }).catch( (error) => {
        console.log('Something went wrong during fetching single patient');
    });
    };

exports.deletePatient = (request, response) => {
    const document = db.doc(`/patients/${request.params.patientId}`);
    document
        .get()
        .then((doc) => {
            if (!doc.exists) {
                return response.status(404).json({ error: 'Patient not found' })
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

exports.editPatient = ( request, response ) => { 
   
    let document = db.collection('patients').doc(`${request.params.patientId}`);
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