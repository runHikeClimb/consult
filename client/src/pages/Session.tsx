import SessionComp from "../components/patient/Session/Session"
import { Container } from "react-bootstrap"

const Session = () => {
    return (
        <Container>
            <div>today's session of patient</div>
            <div>start time</div>
            <div>end  time when save complete is checked</div>
            <hr/>
            <div>health info</div>
            <div>temp</div>
            <hr/>
            <SessionComp/>
        </Container>
    )
}

export default Session