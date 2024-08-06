import React from 'react';
import { useLocation } from 'react-router-dom';

const CatererDetails = () => {
    const location = useLocation();
    const { submittedData } = location.state || {};

    if (!submittedData) {
        return <p>No service details available</p>;
    }

    // Check if submittedData is an array or an object
    const isArray = Array.isArray(submittedData);
    const services = isArray ? submittedData : [submittedData];
    console.log(submittedData)
    
    return (
        <div className="caterer-details">
            <h2>Submitted Service Details</h2>
            {services.map((service, index) => (
                <div key={index} className="service-detail">
                    <h3>Service Name: {service.serviceName}</h3>
                    <p>Description: {service.description}</p>
                    <p>Price: ${service.price !== null ? service.price : 'Not specified'}</p>
                    <p>Duration: {service.duration} hours</p>
                    <p>Vegetarian Options: {service.vegetarian}</p>
                    <p>Caterer Name: {service.name}</p>
                    <p>Caterer ID: {service._id}</p>
                </div>
            ))}
        </div>
    );
};

export default CatererDetails;
