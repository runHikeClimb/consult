import { Navbar, Nav, NavItem, NavLink, NavDropdown } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context";
import styled from "styled-components";

import { Hospital, Person, BoxArrowRight, Plus } from 'react-bootstrap-icons';


const LeftNavContainer = styled.div`
  margin-left: auto;
`;


const NavComponent = () => {
  const [state, setState] = useContext(UserContext);

  const navigate = useNavigate();

  const displayHome = ( (state.data?.email)) ?  "/dashboard" :  "/"

  const handleLogout = () => {
    setState({ data: null, loading: false, error: null });
    localStorage.removeItem("token");
    navigate("/");
  };

  const handleProfile = () => {
    //setState({ data: null, loading: false, error: null });
    navigate("/user");
  };

  return (      
    <Navbar bg="dark">
      <Navbar.Brand href={displayHome} className="text-white bg-dark" title="Home">
      <Hospital />
      </Navbar.Brand>
      {state.data && (
      <Nav className="ms-auto">
        <NavDropdown title={ <Plus /> } id="basic-nav-dropdown" bsPrefix="text-white bg-dark nav-link" align="end" >
          <NavDropdown.Item href="/patient">New Patient</NavDropdown.Item>
          <NavDropdown.Item href="/user">New User</NavDropdown.Item>
        </NavDropdown>
          <NavItem>
            <NavLink title="Profile" onClick={handleProfile} className="text-white bg-dark"><Person /></NavLink>
          </NavItem>
          <NavItem>
              <NavLink title="Logout" onClick={handleLogout} className="text-white bg-dark"><BoxArrowRight/></NavLink>
          </NavItem>
      </Nav>
      )}
      </Navbar>
  );
};

export default NavComponent;
