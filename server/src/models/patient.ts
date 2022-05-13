import mongoose from "mongoose";
const { Schema } = mongoose

const contactSchema = new Schema({ 
    address1:{
        type:String,
        trim: true,
        required: true
    },
    address2:{
        type:String,
        trim: true,
        required: false
    },
    city:{
        type:String,
        trim: true,
        required: false
    },
    province:{
        type:String,
        trim: true,
        required: false
    },
    zip:{
        type:String,
        trim: true,
        required: false
    },
    phoneNo:{
        type:String,
        trim: true,
        required: false
    },
    mobileNo:{
        type:String,
        trim: true,
        required: false
    },
    email:{
        type:String,
        trim: true,
        required: false
    },
 });


 const noteSchema = new Schema({
    notes:{
        type:String,
        required: false
    },
    createdDateTime:{
        type:Date,
        required: false
    },
    createdBy:{
        type:String,
        required: false
    },
    modifiedDateTime:{
        type:Date,
        required: false
    },
    modifiedBy:{
        type:String,
        required: false
    },
}
//, { _id : false }
);


const appointmentSchema = new Schema({
    startDateTime:{
        type:Date,
        required: false
    },
    endDateTime:{
        type:Date,
        required: false
    },
    therapistName:{
        type:String,
        required: false
    },
    notes:{
        type:String,
        required: false
    },
    createdDateTime:{
        type:Date,
        required: false
    },
    createdBy:{
        type:String,
        required: false
    },
    modifiedDateTime:{
        type:Date,
        required: false
    },
    modifiedBy:{
        type:String,
        required: false
    },
}
);


const patientSchema = new Schema({
    lastName:{
        type:String,
        required: true
    },
    firstName:{
        type:String,
        required: true
    },
    middleName:{
        type:String
    },
    birthdate:{
        type:Date
    },
    nationality:{
        type:String
    },
    race:{
        type:String
    },
    gender:{
        type:String
    },
    maritalStatus:{
        type:String
    },
    
    contactDetails: contactSchema,
    //note: [{ notes: String, createdDateTime:Date, createdBy: String, modifiedDateTime: Date, modifiedBy: String }]
    note: [noteSchema],
    appointment: [appointmentSchema]

});

export default mongoose.model("Patient", patientSchema);