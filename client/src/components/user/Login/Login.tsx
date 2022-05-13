import styled from "styled-components";
import { Container } from "react-bootstrap";
import ModalComponent from "../../Modal/Modal";
import logo from '../../../img/caduceus.jpg';
//url(./logo.png)
//background-image: url(../../../img/caduceus.jpg);
//background-image: url("../../../img/caduceus.jpg");
//background-color: blue;
//background-color: rgb(120, 150, 120);
//background-color: rgb(5, 148, 112);
const LoginComponent = styled.header`
  padding: 5rem 0;
  height: 60vh;
  background-color: rgb(50, 50, 50);
  background-size: cover;
  background-position: left;  
`;

const LoginContainer = styled.div`
  background-color: rgb(80, 80, 80);
  padding: 3rem;
  color: white;
  max-width: 32.5rem;
`;

const Heading = styled.h1`
  font-size: 5rem;
`;

const SubHeading = styled.h3`
  margin: 1rem 0;
  font-weight: 400;
`;

const Login = () => {
    return (
      <LoginComponent>
        <Container>
          <LoginContainer>
            <Heading>Consult</Heading>
            <SubHeading>
              Records, Schedule
            </SubHeading>
            <div>
            {/* <ModalComponent text="Signup" variant="primary" isSignupFlow={true} /> */}
            <ModalComponent text="Login" variant="danger" isSignupFlow={false} />
            </div>
          </LoginContainer>
        </Container>
      </LoginComponent>
    );
  };
  
  export default Login;