import styled from "styled-components";
import {Button, InputGroup, FormControl} from "react-bootstrap";
import { useState, useContext, useEffect } from "react";


const Session = () => {

    const [height, setHeight] = useState("");
    const [weight, setWeight] = useState("");
    const [temperature, setTemperature] = useState("");
    const [pulse, setPulse] = useState("");
    const [bloodPressure, setBloodPressure] = useState("");

    return (
        <>
            <div>test session
                <div>
                    health info
                </div>
                <InputGroup className="mb-3">
                <InputGroup.Text>Height</InputGroup.Text>
                <FormControl
                    type="height"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                />
                </InputGroup>
                <InputGroup className="mb-3">
                <InputGroup.Text>Weight</InputGroup.Text>
                <FormControl
                    type="weight"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                />
                </InputGroup>
                <InputGroup className="mb-3">
                <InputGroup.Text>Temperature</InputGroup.Text>
                <FormControl
                    type="temperature"
                    value={temperature}
                    onChange={(e) => setTemperature(e.target.value)}
                />
                </InputGroup>
                <InputGroup className="mb-3">
                <InputGroup.Text>Pulse</InputGroup.Text>
                <FormControl
                    type="pulse"
                    value={pulse}
                    onChange={(e) => setPulse(e.target.value)}
                />
                </InputGroup>
                <InputGroup className="mb-3">
                <InputGroup.Text>Blood Pressure</InputGroup.Text>
                <FormControl
                    type="bloodPressure"
                    value={bloodPressure}
                    onChange={(e) => setBloodPressure(e.target.value)}
                />
                </InputGroup>
                <div>
                    symptoms
                </div>
                <div>
                    notes, prognosis, diagnosis
                </div>
            </div>
        </>)
    ;
};

export default Session;