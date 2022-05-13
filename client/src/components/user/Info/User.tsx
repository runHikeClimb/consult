import styled from "styled-components";
//import { useState } from "react";
import { Button, InputGroup, FormControl, Form} from "react-bootstrap";

import { useState, useContext, useEffect } from "react";
import axios from "axios";
import { UserContext } from "../../../context";

interface User {
    _id: string;
    lastName: string;
    firstName: string;
    middleName: string;
    email: string;
    password: string;
}

const User = () => {
    const [show, setShow] = useState(false)

    const [userInfo, setUserInfo] = useState<User>();

    const [lastName, setLastName] = useState("");
    const [firstName, setFirstName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [userType, setUserType] = useState("user");
    
    const checkPassword = (check) => {
        if (check != password){
            alert("Passsword do not match")
        }
    }

    
    //const {id} = useParams() //use usestate instead
    const [state, setState] = useContext(UserContext);
    //const id = state.data.id;
    const id = "6232e94c6e3c8bf3e3704f21";
    //TODO: get userid from the login context UserContext

    //const [userInfo, setUserInfo] = useState<UserIntf>();
    
    useEffect(() => {
        fetchUserInfo();
    }, []);  

    //"https://berg-consult.herokuapp.com/user/userInfo",
    //"http://localhost:8080/user/userInfo",
    const fetchUserInfo = async () => {
        const { data: response } = await axios.post(
            "https://berg-consult.herokuapp.com/user/userInfo",
            { "id": id } 
        );
        setUserInfo(response);
        console.log("start")
        console.log(userInfo)
        console.log("end")
    };


    return (
        <>
        <div>
        <InputGroup className="mb-3">
            <InputGroup.Text>Last Name</InputGroup.Text>
            <FormControl
            type="lastName"
            value={userInfo?.lastName}
            onChange={(e) => setLastName(e.target.value)}
            />
        </InputGroup> 
        <InputGroup className="mb-3">
            <InputGroup.Text>First Name</InputGroup.Text>
            <FormControl
            type="firstName"
            value={userInfo?.firstName}
            onChange={(e) => setFirstName(e.target.value)}
            />
        </InputGroup> 
        <InputGroup className="mb-3">
            <InputGroup.Text>Middle Name</InputGroup.Text>
            <FormControl
            type="middleName"
            value={userInfo?.middleName}
            onChange={(e) => setMiddleName(e.target.value)}
            />
        </InputGroup> 
        <InputGroup className="mb-3">
            <InputGroup.Text>Email</InputGroup.Text>
            <FormControl
            type="email"
            value={userInfo?.email}
            onChange={(e) => setEmail(e.target.value)}
            />
        </InputGroup> 
        <InputGroup className="mb-3">
            <InputGroup.Text>Password</InputGroup.Text>
            <FormControl
            type="password"
            value={userInfo?.password}
            onChange={(e) => setPassword(e.target.value)}
            />
        </InputGroup> 
        <InputGroup className="mb-3">
            <InputGroup.Text>Check Password</InputGroup.Text>
            {/* <FormControl
            onChangeCapture={(e) => checkPassword(e.target.value)}
            /> */}
        </InputGroup> 
        <InputGroup className="mb-3">
            <InputGroup.Text>User Type</InputGroup.Text>
            
            {/* <Form.Check 
                type='checkbox'
                id={`default-checkbox`}
                label={`default checkbox`}
            /> */}
            <div className="form-control">
            <input type="radio" name={userType} value="user" checked={userType === "user"} onChange={(e) => setUserType(e.target.value)} />User
            <span>          </span>
            <input type="radio" name={userType} value="therapist" checked={userType === "therapist"} onChange={(e) => setUserType(e.target.value)} />Therapist
            </div>

        </InputGroup> 
        </div>
        {/* <div>
            <div>multiple accounts: </div>
            <div>list of hospitals: </div>
            <div>list of clinics: </div>
        </div> */}
        {/* <div>
            <div>list of patients: </div>
        </div> */}
        </>)
    ;
};

export default User;