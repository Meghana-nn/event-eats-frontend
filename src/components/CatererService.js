import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import { Form, FormGroup, Label, Input, Button ,Col,Row} from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import '../components/service.css';

const initialState = {
    serviceName: '',
    description: '',
    price: '',
    duration: '',
    vegetarian: 'yes',
    services: [],
    error: null
};

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_FIELD':
            return {
                ...state,
                [action.field]: action.value
            };
        case 'SET_SERVICES':
            return {
                ...state,
                services: action.payload
            };
        case 'SET_ERROR':
            return {
                ...state,
                error: action.payload
            };
        case 'RESET_FORM':
            return {
                ...state,
                serviceName: '',
                description: '',
                price: '',
                duration: '',
                vegetarian: 'yes'
            };
        default:
            throw new Error(`Unhandled action type: ${action.type}`);
    }
};

const CatererServices = () => {
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();

    useEffect(() => {
        fetchServices();
    }, []);

    const fetchServices = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:3010/api/services', {
                headers: {
                    Authorization: token
                }
            });
            dispatch({ type: 'SET_SERVICES', payload: response.data });
        } catch (err) {
            dispatch({ type: 'SET_ERROR', payload: err.message });
        }
    };

    const handleChange = (e) => {
        dispatch({
            type: 'SET_FIELD',
            field: e.target.name,
            value: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token');
            await axios.post('http://localhost:3010/api/services', state, {
                headers: {
                    Authorization: token
                }
            });
            fetchServices();
            navigate('caterer-details', { state: { submittedData: state.services } });
            dispatch({ type: 'RESET_FORM' });
        } catch (error) {
            dispatch({ type: 'SET_ERROR', payload: error.message });
        }
    };

    return (
        <div className="service-tableForm">
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <FormGroup className="form-group">
                            <Label for="serviceName">Service Name:</Label>
                            <Input
                                type="text"
                                name="serviceName"
                                id="serviceName"
                                value={state.serviceName}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup className="form-group">
                            <Label for="price">Price:</Label>
                            <Input
                                type="number"
                                name="price"
                                id="price"
                                value={state.price}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                    </Col>
                </Row>
                <Row>
                    <Col md={6}>
                        <FormGroup className="form-group">
                            <Label for="duration">Duration (hours):</Label>
                            <Input
                                type="number"
                                name="duration"
                                id="duration"
                                value={state.duration}
                                onChange={handleChange}
                                required
                            />
                        </FormGroup>
                    </Col>
                    <Col md={6}>
                        <FormGroup className="form-group">
                            <Label for="vegetarian">Vegetarian Options:</Label>
                            <Input
                                type="select"
                                name="vegetarian"
                                id="vegetarian"
                                value={state.vegetarian}
                                onChange={handleChange}
                                required
                            >
                                <option value="yes">Yes</option>
                                <option value="no">No</option>
                            </Input>
                        </FormGroup>
                    </Col>
                </Row>
                <FormGroup className="form-group">
                    <Label for="description">Description:</Label>
                    <Input
                        type="textarea"
                        name="description"
                        id="description"
                        value={state.description}
                        onChange={handleChange}
                        required
                    />
                </FormGroup>
                <FormGroup className="form-group">
                    <Button type="submit" color="primary">Add Service</Button>
                </FormGroup>
            </Form>
        </div>
    );
}

export default CatererServices;
