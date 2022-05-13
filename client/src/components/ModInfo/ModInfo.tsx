import {Modal, Button, InputGroup, FormControl} from "react-bootstrap";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context";
import Accordion from 'react-bootstrap/Accordion'
import { PersonPlus } from 'react-bootstrap-icons';

interface IModalRequiredProps {
    variant: "create" | "update" | "delete";
    //IsModalOpened: boolean;
}

interface IModalOptionalProps{
    mprops: {id:string,
        lastName:string,
        firstName:string,
        middleName:string,
        birthdate:string,
        nationality:string,
        race:string,
        gender:string,
        maritalStatus:string};
}

interface ModalProps  extends IModalRequiredProps,  IModalOptionalProps {}

const defaultProps: IModalOptionalProps = {
    mprops: {id:"",
        lastName:"",
        firstName:"",
        middleName:"",
        birthdate:"",
        nationality:"",
        race:"",
        gender:"",
        maritalStatus:""}
  };

interface Patient {
  _id: string;
  lastName: string;
  firstName: string;
  middleName: string;
  email: string;
  birthdate: Date;
  nationality: string;
  race: string;
  gender: string;
  maritalStatus: string;
}

const ErrorMessage = styled.p`
color: red;
`;

//const ModInfo = (mprops) => {
const ModInfo = ({ mprops, variant }: ModalProps, childFunc) => {
    const [show, setShow] = useState(false)

    const [patientId, setPatientId] = useState("");
    //const [patientInfo, setPatientInfo] = useState<Patient>();

    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    
    const [birthdate, setBirthDate] = useState("");
    const [nationality, setNationality] = useState("");
    const [race, setRace] = useState("");
    const [gender, setGender] = useState("");
    const [maritalStatus, setMaritalStatus] = useState("");

    const [errorMsg, setErrorMsg] = useState("");
  
    const handleClose = () => setShow(false);
    const handleShow = () =>{
        if (mprops){
            console.log("setting props...")
            setPatientId(mprops.id)
            setLastName(mprops.lastName)
            setFirstName(mprops.firstName)
            setMiddleName(mprops.middleName)
            setNationality(mprops.nationality)
            setRace(mprops.race)
            setGender(mprops.gender)
            setMaritalStatus(mprops.maritalStatus)
        }
        setShow(true);
        console.log(mprops)
    } 

    const navigate = useNavigate();
  
    const handleClick = async () => {
        let response;
        if (variant =="create"){
          //"https://berg-consult.herokuapp.com/test/cpatient",
          //"http://localhost:8080/test/cpatient",
            const { data: createData } = await axios.post(
              "https://berg-consult.herokuapp.com/test/cpatient",
                {
                  lastName,
                  firstName,
                  middleName,
                  birthdate,
                  nationality,
                  race,
                  gender,
                  maritalStatus,
                }
              );
              response = createData;
        }else{
          //"https://berg-consult.herokuapp.com/test/upatient",
          //"http://localhost:8080/test/upatient",
            const { data: updateData } = await axios.put(
              "https://berg-consult.herokuapp.com/test/upatient",
                {
                  "_id": patientId,
                  lastName,
                  firstName,
                  middleName,
                  birthdate,
                  nationality,
                  race,
                  gender,
                  maritalStatus,
                }
              );
              response = updateData;
        }
    
        if (response.errors.length) {
          return setErrorMsg(response.errors[0].msg);
        }

        setShow(false);
    };

    const handleDelete = async () => {

    };

    // useEffect(() => {
    //     setVisibility();
    // }, []);

    //const setVisibility
    //setShow(IsModalOpened)

    return (
    <> 
    {/* <Button onClick={handleShow}>Edit Personal Info MODAL</Button> */}

    <Button title="Add Patient" onClick={handleShow}>
        <PersonPlus/>
    </Button>
        
      <Modal show={show} onHide={handleClose}>
      <Modal.Header>
        {/* <Modal.Title>PATIENT PERSONAL INFO MODAL</Modal.Title> */}
        <Modal.Title>Add Patient</Modal.Title>
      </Modal.Header>

      {mprops ? (
      <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text>Last Name</InputGroup.Text>
          <FormControl
            type="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>First Name</InputGroup.Text>
          <FormControl
            type="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>Middle Name</InputGroup.Text>
          <FormControl
            type="middleName"
            value={middleName}
            onChange={(e) => setMiddleName(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3">
            <InputGroup.Text>Nationality</InputGroup.Text>
            <FormControl 
              type="nationality"
              value={nationality} 
              onChange={(e) => setNationality(e.target.value)}
              />        
        </InputGroup>
        <InputGroup className="mb-3">
            <InputGroup.Text>Race</InputGroup.Text>
            <FormControl 
              type="race"
              value={race} 
              onChange={(e) => setRace(e.target.value)}
              />        
        </InputGroup>
        <InputGroup className="mb-3">
            <InputGroup.Text>Gender</InputGroup.Text>
            <FormControl 
              type="gender"
              value={gender} 
              onChange={(e) => setGender(e.target.value)}
              />        
        </InputGroup>
        <InputGroup className="mb-3">
            <InputGroup.Text>Marital Status</InputGroup.Text>
            <FormControl 
              type="maritalStatus"
              value={maritalStatus} 
              onChange={(e) => setMaritalStatus(e.target.value)}
              />
        </InputGroup>
        {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
      </Modal.Body>
      ) : (
        <Modal.Body>
        <InputGroup className="mb-3">
          <InputGroup.Text>Last Name</InputGroup.Text>
          <FormControl
            type="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Text>First Name</InputGroup.Text>
          <FormControl
            type="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </InputGroup>
        </Modal.Body>
      )}

      <Modal.Footer>
        <Button onClick={handleClose}>
          Close
        </Button>
        <Button  onClick={handleClick}>
          Save Patient
        </Button>
        
        {(variant !== "create") && 
            <Button onClick={handleDelete}>
            Delete Patient
            </Button>
        }
        
      </Modal.Footer>
      </Modal>
    </>
    )
}

// Be sure to set the default props
ModInfo.defaultProps = defaultProps;
export default ModInfo