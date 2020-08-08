const functions = require('firebase-functions');
const cors = require('cors')
const app = require('express')();
const auth = require('./util/auth');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
// Automatically allow cross-origin requests
const corsUrls = (process.env.CORS_URLS || '*').split(',');

  app.use(cors({
    origin: (origin, cb) => cb(null, corsUrls.includes('*') || corsUrls.includes(origin)),
    credentials: true,
  }))
const {
    loginUser,
    signUpUser,
    uploadProfilePhoto,
    getUserDetail,
    updateUserDetails,
} = require('./APIs/users')

const {
  postSinglePatient,
  getAllPatients,
  getSinglePatient,
  deletePatient,
  editPatient
} = require('./APIs/patients')


const {
  postSingleAppointment,
  getAllAppointments,
  getSingleAppointment,
  deleteAppointment,
  editAppointment
} = require('./APIs/appointments')


const {
  postSingleFacility,
  getAllFacilities,
  deleteFacility,
  editFacility,
  getSingleFacility
} = require('./APIs/facilities')


const {
  postSinglePhysician,
  getAllPhysicians,
  getSinglePhysicians,
  deletePhysician,
  editPhysician
} = require('./APIs/physicians')

const {
  postSingleReceptionist,
  getAllReceptionists,
  getSingleReceptionist,
  deleteReceptionist,
  editReceptionist
} = require('./APIs/receptionists')

app.post('/login',loginUser);
app.post('/signup',signUpUser);
app.post('/user/image', auth, uploadProfilePhoto);
app.get('/user', auth, getUserDetail);
app.post('/user', auth, updateUserDetails);


app.post('/patient',postSinglePatient);
app.get('/patients',getAllPatients);
app.get('/patients/:patientId',getSinglePatient)
app.delete('/patients/:patientId',deletePatient);
app.post('/patients/:patientId',editPatient);


app.post('/apointment',postSingleAppointment);
app.get('/apointments',getAllAppointments);
app.get('/appointments/:appointmentId',getSingleAppointment);
app.delete('/appointments/:appointmentId',deleteAppointment);
app.post('/appointments/:appointmentId',editAppointment);


app.post('/facility',postSingleFacility);
app.get('/facilities',getAllFacilities);
app.get('/facilities/:facilityId',getSingleFacility)
app.delete('/facilities/:facilityId',deleteFacility);
app.post('/facilities/:facilityId',editFacility);


app.post('/physician', postSinglePhysician);
app.get('/physicians', getAllPhysicians);
app.get('/physicians/:physicianId',getSinglePhysicians);
app.delete('/physicians/:physicianId',deletePhysician);
app.post('/physicians/:physicianId',editPhysician);


app.post('/receptionist', postSingleReceptionist);
app.get('/receptionists',getAllReceptionists);
app.get('/receptionists/:receptionistId',getAllReceptionists);
app.delete('/receptionists/:receptionistId',deleteReceptionist);
app.post('/receptionists/:receptionistId', editReceptionist);


 exports.api = functions.https.onRequest(app);

// exports.api = functions.https.onRequest((request, response) => {
//     cors(request, response, () => {
//         response.set('Access-Control-Allow-Origin', '*');
        
//     });
//     return app;
// });