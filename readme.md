Hospital management app

Credentials:

ADMIN ROLE:
user: admin/pw: admin

PATIENT ROLE:
user: maria/pw: maria
user: petrut/pw: petrut

DOCTOR ROLE:
user: george/pw: george
user: doctor2/pw:doctor2

Details:

Only admin can add accounts and clinics
The doctor can check patient details by clicking the table row in appointments table
The patient can update the journal by accessing my profile section
The patient can check clinics location by accessing clinics and then "See on google maps"

How to start the app:

The backend is hosted via heroku on this address: https://appointment-mng.herokuapp.com/ (+ endpoint name). Because it is the free tier, when the endpoint is not called it enters a hibernating state, so the first call might take a while. Afterwards, everything runs smoothly.

To run the frontend just, run 'npm i' and then 'npm start' in the front/appointment-manager app