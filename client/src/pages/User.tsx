import { Container, Card, CardGroup } from "react-bootstrap"
import UserComp from "../components/user/Info/User"

//import { useParams } from "react-router-dom"
import PersonalInfo from "../components/patient/PersonalInfo/PersonalInfo"
import PatientSummary from "../components/patient/Summary/Summary";
import UserSummary from "../components/user/Summary/Summary";
import styled from "styled-components";


const User = () => {

    return (
        <Container>
            {/*USER PROFILE */}
            <br/>
            <UserComp/>
            {/* ***maybe user UserComp instead of Patient-Personal-Info***
            <PersonalInfo text="Signup" variant="primary" isSignupFlow={true} pId={`${id}`} /> */}
            
            <CardGroup>
                <Card>
                <PatientSummary></PatientSummary>
                </Card>
                <Card>
                <UserSummary></UserSummary>
                </Card>                
            </CardGroup>
        </Container>
    )
}

export default User