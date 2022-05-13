import {Modal, Button, InputGroup, FormControl} from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context";
import DateTimePicker from 'react-datetime-picker'
import { JournalPlus, Journals, JournalCheck, JournalX } from 'react-bootstrap-icons';

interface ModalProps {
    text : string;
    variant: "create" | "update" | "delete";
    pId: string;
    uId: string;
    nId: string;
    nNote: string;
}

const ErrorMessage = styled.p`
color: red;
`;

const Note = ({ text, variant, pId, uId, nId, nNote }: ModalProps) => {
  
    const [show, setShow] = useState(false)
    
    const [note, setNote] = useState(nNote);

    const [errorMsg, setErrorMsg] = useState("");
    
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();
  

    const handleClick = async () => {
        let response;
        let uri;
        let param;
        switch(variant) { 
            case "create": { 
                uri = "http://localhost:8080/patient/cnote";
                param = {
                    "pId" : pId,
                    "notes" : note,
                    "createdBy" : uId,
                    "modifiedBy" : uId,
                  };
               break; 
            } 
            case "update": { 
                uri = "http://localhost:8080/patient/unote";
                param = {
                    "pId" : pId,
                    "nId" : nId,
                    "notes" : note,
                    "modifiedBy" : uId,
                  };
               break; 
            } 
            case "delete": { 
                uri = "http://localhost:8080/session/dnote";
               break; 
            } 
            default: { 
               //statements; 
               break; 
            } 
         } 

        //"https://berg-consult.herokuapp.com/session/cnote",
        //console.log("posting to uri ", uri);
        const { data: signUpData } = await axios.post(
            uri,
            {
                "pId" : pId,
                "nId" : nId,
                "notes" : note,
                "modifiedBy" : uId,
            }
          );
          response = signUpData;
        //console.log(response);

        //response.errors.length response.errors.length()
        if (response.errors) {
          //console.log(response.errors[0].msg);
          return setErrorMsg(response.errors[0].msg);
        }

        //localStorage.setItem("token", response.data.token);
        //axios.defaults.headers.common["authorization"] = `Bearer ${response.data.token}`;

        //TODO:close the modal
        //handleClose();
        //setShow(false)
        //console.log("log note saved successfully");
        //alert("note saved successfully");
        handleClose();
    };

    return (
    <> 
        {/* <Button onClick={handleShow}>{text}</Button> */}
        <Button title={text} onClick={handleShow}> 
            {variant=="create" && <JournalPlus/> }
            {variant=="update" && <Journals/> }
            {variant=="delete"  && <JournalX/> }
        </Button>
        
        <Modal show={show} onHide={handleClose} backdrop="static">
        <Modal.Header>
          <Modal.Title>{text}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <InputGroup className="mb-3">
            <InputGroup.Text>Patient Name</InputGroup.Text>
            <InputGroup.Text>{pId}</InputGroup.Text>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>User</InputGroup.Text>
            <InputGroup.Text>{uId}</InputGroup.Text>
          </InputGroup>
          <InputGroup className="mb-3">
            <InputGroup.Text>NOTE</InputGroup.Text>
            <InputGroup.Text>{nId}</InputGroup.Text>
          </InputGroup> */}
          
          <InputGroup className="mb-3">
            <InputGroup.Text>Note</InputGroup.Text>
            <FormControl
              as="textarea" 
              value={note}
              disabled={variant=="delete"}
              onChange={(e) => setNote(e.target.value)}
            />
          </InputGroup>
          {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleClose}>
            Close
          </Button>
          <Button onClick={handleClick}>
            {text}
          </Button>
        </Modal.Footer>
        </Modal>
    </>
    )
}

export default Note