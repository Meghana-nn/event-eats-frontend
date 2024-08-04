import React from 'react';
import { useLocation } from 'react-router-dom';
import { Table } from 'reactstrap';

function CatererDetails() {
    const location = useLocation();
    const { submittedData } = location.state;

    return (
        <div className="user-details">
            <h3>User Details</h3>
            <Table>
                <thead>
                    <tr>
                        <th>Service Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Duration</th>
                        <th>Vegetarian</th>
                    </tr>
                </thead>
                <tbody>
                    {submittedData.map((data, index) => (
                        <tr key={index}>
                            <td>{data.serviceName}</td>
                            <td>{data.description}</td>
                            <td>{data.price}</td>
                            <td>{data.duration}</td>
                            <td>{data.vegetarian}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default CatererDetails;
