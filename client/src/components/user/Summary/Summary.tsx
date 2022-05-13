import styled from "styled-components";
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { Container, InputGroup,  FormControl, Button} from "react-bootstrap";
import Table from 'react-bootstrap/Table'
import { Link } from "react-router-dom";
import { PersonPlus } from 'react-bootstrap-icons';


interface User {
    _id: string;
    lastName: string;
    firstName: string;
    middleName: string;
    email: string;
    password: string;
  }

const Summary = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState("");
    const [filterUsers, setFilterUsers] = useState<User[]>([]);

    useEffect(() => {
      fetchUsers();
    }, []);
    
    const getFilterUsers =  (searchValue) => {
      setSearch(searchValue)
      if (search !== '') {
          const filteredData = users.filter((item) => {
              return Object.values(item).join('').toLowerCase().includes(search.toLowerCase())
          })
          setFilterUsers(filteredData)
      }
      else{
          setFilterUsers(users)
      }
    };

    //"https://berg-consult.herokuapp.com/user/user",
    //"http://localhost:8080/user/user",
    const fetchUsers = async () => {
      const { data: response } = await axios.get( "https://berg-consult.herokuapp.com/user/user" );
      setUsers(response);
      setFilterUsers(response)
    };


    //events
    const handleClick = async () => {
    
    };
    
// display
return (
    <>
    
    <div>
            <InputGroup className="mb-3">
              <Button title="Add User" onClick={handleClick}>
                <PersonPlus/>
              </Button>
              <FormControl
                type="search"
                value={search}
                placeholder="Search user"
                onChange={(e) => getFilterUsers(e.target.value)}
              />
            </InputGroup>
    </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                {/* <th>#</th> */}
                <th>First Name</th>
                <th>Middle Name</th>
                <th>Last Name</th>
              </tr>
            </thead>
            <tbody>
              {filterUsers.map((user) => (
              <tr key={user._id}>
                <td>
                <Link to={`/user/${user._id}`}>
                  {user.firstName}
                  </Link>
                </td>
                <td>{user.middleName}</td>
                <td>{user.lastName}</td>
              </tr>
              ))}
            </tbody>
          </Table>
    </>
);
};

export default Summary;