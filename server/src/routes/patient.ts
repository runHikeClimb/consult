import express from "express"
import {body, validationResult} from "express-validator"
import Patient from "../models/patient"

const router = express.Router()

router.post("/patientInfoB", 
    body("id"), 
    async (req, res) => {
    
    const { id } = req.body;
    const patientInfo = await Patient.findOne({ "_id" : id });

    if (!patientInfo) {
      return res.json({
        errors: [
          {
            msg: "Patient does not exists",
          },
        ],
        data: null,
      });
    }
    return res.json(patientInfo);
});

interface iNote {
  notes: String;
  createdDateTime: Date;
  createdBy?: String;    
  modifiedDateTime: Date;
  modifiedBy?: String;
};

interface iAppointment {
  startDateTime: Date;
  endDateTime: Date;
  therapistName: String;
  notes: String;
  createdDateTime: Date;
  createdBy?: String;    
  modifiedDateTime: Date;
  modifiedBy?: String;
};

router.post('/cnote',  async(req, res) => {
  const {pId,
      notes,
      createdBy,
      modifiedBy
      } = req.body;
  
  // const newSchedule= await Session.create({
  //     "_id" : pId,
  //     notes,
  //     "createdDateTime" : new Date(),
  //     createdBy,
  //     "modifiedDateTime" : new Date(),
  //     modifiedBy
  // })

  console.log("received");
  
  const objNote: iNote = {
    "notes": notes,
    "createdDateTime" : new Date(),
    "createdBy" : createdBy,
    "modifiedDateTime" : new Date(),
    "modifiedBy" : modifiedBy
  };

  console.log(objNote);

  // let objNote = { "notes": notes,
  //   "createdDateTime" : new Date(),
  //   "createdBy" : createdBy,
  //   "modifiedDateTime" : new Date(),
  //   "modifiedBy" : modifiedBy };

  // const patients = await Patient.findOneAndUpdate(
  //    { _id: pId }, 
  //    { $push: { "note": objNote  } },
  //   function (error, success) {
  //         if (error) {
  //             console.log(error);
  //         } else {
  //             console.log(success);
  //         }
  //     }
  // );

  // Patient.findOneAndUpdate(
  //   { _id: pId }, 
  //   { $addToSet: { note: objNote } }
  // );

  console.log("updating...");
  const patientInfo = await Patient.findOneAndUpdate(
    { "_id": pId }, 
    { $push: { "note": objNote  } }
  );

  // ,
  //   {new: true,
  //     upsert: true,
  //     rawResult: true}

  console.log("updated");

  return res.json(patientInfo);

  //  Patient.findOneAndUpdate(
  //   { _id: pId }, 
  //   { $addToSet: { note: objNote } },
  //   function (error, success) {
  //     if (error) {
  //       console.log(error);
  //     } else {
  //       console.log(success);
  //     }
  //   });
    
 //);
  

})

router.post('/unote',  async(req, res) => {
  const {pId,
      nId,
      notes,
      modifiedBy
      } = req.body;

  const patientInfo = await Patient.findOneAndUpdate(
    { "_id": pId, "note._id": nId },
    { 
        "$set": {
            "note.$.notes" : notes,
            "note.$.modifiedDateTime" : new Date(),
            "note.$.modifiedBy" : modifiedBy
        }
    }
  );

  return res.json(patientInfo);
})

router.post('/dnote',  async(req, res) => {
  const {pId,
      nId,
      modifiedBy
      } = req.body;

  const patientInfo = await Patient.findOneAndUpdate(
    { "_id": pId },
    { "$pull": { note: { "_id": nId} } }
  );

  return res.json(patientInfo);
})



router.post('/cappointment',  async(req, res) => {
  const {pId,
      startDateTime,
      endDateTime,
      therapistName,
      notes,
      createdBy
      } = req.body;
  
  console.log("received");
  
  const objAppointment: iAppointment = {
    "startDateTime" : startDateTime,
    "endDateTime" : endDateTime,
    "therapistName" : therapistName,
    "notes" : notes,
    "createdDateTime" : new Date(),
    "createdBy" : createdBy,
    "modifiedDateTime" : new Date(),
    "modifiedBy" : createdBy
  };

  console.log(objAppointment);
  console.log("creating...");
  const patientInfo = await Patient.findOneAndUpdate(
    { "_id": pId }, 
    { $push: { "appointment": objAppointment  } }
  );

  return res.json(patientInfo);
})


router.get("/appointment", 
    async (req, res) => {
    const { startDateTime, endDateTime } = req.body;

    const schedule = await Patient.find({
        "startDateTime": {
        "$gte": new Date(startDateTime),
        "$lt": new Date(endDateTime)
        }
    });

        
    const agg = [
      {
        '$match': {
          'startDateTime': {
            '$gte': new Date(startDateTime),
            '$lt': new Date(endDateTime)
          }
        }
      }, {
        '$unwind': {
          'path': '$appointment'
        }
      }, {
        '$project': {
          'appointment.startDateTime': 1
        }
      }, {
        '$group': {
          '_id': {
            '$dateToString': {
              'format': '%d-%m-%Y', 
              'date': {
                '$toDate': '$appointment.startDateTime'
              }
            }
          }, 
          'appointmentTotal': {
            '$sum': 1
          }
        }
      }
    ];

    if (!schedule) {
      return res.json({
        errors: [
          {
            msg: "Session does not exists",
          },
        ],
        data: null,
      });
    }
    return res.json(schedule);
});



export default router