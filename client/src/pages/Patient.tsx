import { useParams } from "react-router-dom"
import PersonalInfo from "../components/patient/PersonalInfo/PersonalInfo"
import { Container } from "react-bootstrap"

const Patient = () => {
    const {id} = useParams()
    return (
        <Container>
            <PersonalInfo text="Signup" variant="primary" isSignupFlow={true} pId={`${id}`} />
        </Container>
    )
}

export default Patient