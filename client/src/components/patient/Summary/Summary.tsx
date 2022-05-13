import styled from "styled-components";
import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
import { Container, InputGroup,  FormControl, Button} from "react-bootstrap";
import Table from 'react-bootstrap/Table'
import { Link } from "react-router-dom";
import { PersonPlus } from 'react-bootstrap-icons';


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

const Summary = () => {

    const [patients, setPatients] = useState<Patient[]>([]);
    const [search, setSearch] = useState("");
    const [filterPatients, setFilterPatients] = useState<Patient[]>([]);

    useEffect(() => {
    fetchPatients();
    }, []);
    
    const getFilterPatients =  (searchValue) => {
    setSearch(searchValue)
    if (search !== '') {
        const filteredData = patients.filter((item) => {
            return Object.values(item).join('').toLowerCase().includes(search.toLowerCase())
        })
        setFilterPatients(filteredData)
    }
    else{
        setFilterPatients(patients)
    }
    };

    //"https://berg-consult.herokuapp.com/test/patient"
    //"http://localhost:8080/test/patient"
    const fetchPatients = async () => {
    const { data: response } = await axios.get(
      "https://berg-consult.herokuapp.com/test/patient"
    );
    setPatients(response);
    setFilterPatients(response)
    };


    //events
    const handleClick = async () => {
    
    };
    
// display
return (
    <>
    
    <div>
            <InputGroup className="mb-3">
              <Button title="Add Patient" onClick={handleClick}>
                <PersonPlus/>
              </Button>
              <FormControl
                type="search"
                value={search}
                placeholder="Search patient"
                onChange={(e) => getFilterPatients(e.target.value)}
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
              {filterPatients.map((patient) => (
              <tr key={patient._id}>
                {/* <td>
                  <Link to={`/patient/${patient._id}`}>
                  {patient._id}
                  </Link>
                </td> */}
                <td>
                <Link to={`/patient/${patient._id}`}>
                  {patient.firstName}
                  </Link>
                </td>
                <td>{patient.middleName}</td>
                <td>{patient.lastName}</td>
              </tr>
              ))}
            </tbody>
          </Table>
    </>
);
};

export default Summary;