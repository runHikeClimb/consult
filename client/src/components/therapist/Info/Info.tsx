import styled from "styled-components";

/*

Properties from LocalBusiness
openingHours/operatingHours
priceRange
paymentAccepted
currenciesAccepted

others: 
Languages or dialect

*/

const Info = () => {

    return (
        <>
        <div>Physician/Therapist Info</div>
        
        <div>
            <div>Last Name: </div>
            <div>First Name: </div>
            <div>Middle Name: </div>
            <div>Birthdate: somedateval</div>
            <div>Age: computed val</div>
            <div>Nationality: nationality</div>
            <div>Race: race</div>
            <div>Gender: gender</div>
            <div>Status: status</div>
        </div>
        <div>
            <div>Languages: </div>
            <div>Dialect: </div>
        </div>
        <div>
            <div>license?</div>
            <div>therapist ? physician</div>
            <div>availableService</div>
            <div>hospitalAffiliation</div>
            <div>medicalSpecialty</div>
            <div>clinicAffiliation</div>
        </div>
            
        </>)
    ;
};

export default Info;