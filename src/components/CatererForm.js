import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { Form,  FormGroup, Label, Input, Button } from 'reactstrap';
import '../components/Caterer.css'


// Initial state for the reducer
const initialState = {
  caterers: [],
  newCaterer: {
    name: '',
    mobile: '',
    location: '',
    categories: '',
    cuisines: '',
    isVeg: false,
    isVerified: false,
  },
};

// Reducer function to handle state updates
const reducer = (state, action) => {
  switch (action.type) {
    case 'SET_CATERERS':
      return { ...state, caterers: action.payload };
    case 'SET_NEW_CATERER':
      return { ...state, newCaterer: { ...state.newCaterer, ...action.payload } };
    case 'RESET_NEW_CATERER':
      return {
        ...state,
        newCaterer: {
          name: '',
          mobile: '',
          location: '',
          categories: '',
          cuisines: '',
          isVeg: false,
          isVerified: false,
        },
      };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

function CatererForm() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const navigate = useNavigate(); // Initialize useNavigate hook
  const location = useLocation();
  const catererId = location.state?.catererId;

  useEffect(() => {
    if (catererId) {
      fetchCatererDetails(catererId);
    } else {
      fetchCaterers(); // Fetch all caterers if no ID is provided (for new entries)
    }
  }, [catererId]);

  const fetchCaterers = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get('http://localhost:3010/api/caterers', {
        headers: {
          Authorization: token,
        },
      });
      dispatch({ type: 'SET_CATERERS', payload: response.data });
    } catch (error) {
      console.error('Error fetching caterers:', error.message);
    }
  };

  const fetchCatererDetails = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get(`http://localhost:3010/api/caterers/${id}`, {
        headers: {
          Authorization: token,
        },
      });
      dispatch({ type: 'SET_NEW_CATERER', payload: response.data });
    } catch (error) {
      console.error('Error fetching caterer details:', error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch({
      type: 'SET_NEW_CATERER',
      payload: { [name]: value },
    });
  };

  const validateForm = () => {
    const { name, mobile, location, categories, cuisines } = state.newCaterer;
    if (!name || !mobile || !location || !categories || !cuisines) {
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      alert('Please fill in all required fields.');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const payload = {
        ...state.newCaterer,
        categories: state.newCaterer.categories.split(',').map((item) => item.trim()),
        cuisines: state.newCaterer.cuisines.split(',').map((item) => item.trim()),
      };
      const response = catererId
        ? await axios.put(`http://localhost:3010/api/caterers/${catererId}`, payload, {
            headers: {
              Authorization: token,
            },
          })
        : await axios.post('http://localhost:3010/api/caterers', payload, {
            headers: {
              Authorization: token,
            },
          });

      if (response.data.isVerified) {
        navigate('/service');
      } else {
        navigate('/waiting', { state: { catererId: response.data._id } });
      }
    } catch (error) {
      console.error('Error creating/updating caterer:', error.response ? error.response.data : error.message);
    }
  };
return (
  <>
  <div className='background-img'>
    
</div>
  <Form className="tableForm" onSubmit={handleSubmit}>
      <div className="form-group">
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            id="name"
            name="name"
            placeholder="Enter name"
            type="text"
            value={state.newCaterer.name}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label form="mobile">Mobile</Label>
          <Input
            id="mobile"
            name="mobile"
            placeholder="Enter mobile number"
            type="tel"
            value={state.newCaterer.mobile}
            onChange={handleChange}
            required
          />
        </FormGroup>
      </div>
      <div className="form-group">
        <FormGroup>
          <Label form="location">Location</Label>
          <Input
            id="location"
            name="location"
            placeholder="Enter valid address"
            type="text"
            value={state.newCaterer.location}
            onChange={handleChange}
            required
          />
        </FormGroup>
        <FormGroup>
          <Label form="categories">Categories</Label>
          <Input
            id="categories"
            name="categories"
            placeholder="Enter the food categories"
            type="text"
            value={state.newCaterer.categories}
            onChange={handleChange}
            required
          />
        </FormGroup>
      </div>
      <div className="form-group">
        <FormGroup>
          <Label for="cuisines">Cuisines</Label>
          <Input
            id="cuisines"
            name="cuisines"
            placeholder="Enter cuisines"
            type="text"
            value={state.newCaterer.cuisines}
            onChange={handleChange}
            required
          />
        </FormGroup>
        </div>
      <div className="form-group">
        <FormGroup>
          <Label for="isVeg">Vegetarian</Label>
          <Input
            id="isVeg"
            name="isVeg"
            type="select"
            value={state.newCaterer.isVeg}
            onChange={handleChange}
          >
            <option value={true}>Yes</option>
            <option value={false}>No</option>
          </Input>
        </FormGroup>
      </div>
      <div className="form-row">
        <Button className="submit-btn" type="submit">Submit</Button>
      </div>
    </Form>
    </>
  );
}

export default CatererForm;