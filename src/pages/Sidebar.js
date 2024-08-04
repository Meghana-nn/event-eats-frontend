import React, { useState } from 'react';
import '../App.css';
import CatererForm from '../components/CatererForm';
import CatererMenu from '../components/menu/CatererMenu';
import CatererDetail from '../components/CatererDetails';
import CatererService from '../components/CatererService'

function Sidebar() {
  const [select, setSelect] = useState(null);

  const render = () => {
    switch (select) {
      case 'CatererForm':
        return <CatererForm />;
      case 'CatererMenu':
        return <CatererMenu />;
        case 'Service':
          return <CatererService/>
          case 'CatererDetail':
            return <CatererDetail/>
      default:
        return <div></div>
    }
  };

  return (
    <div className='container'>
      <div className='sidebarSection'>
        <ul>
          <li onClick={() => setSelect('CatererForm')}>Caterer Form</li>
          <li onClick={() => setSelect('CatererMenu')}>Caterer Menu</li>
          <li onClick={() => setSelect('Service')}>Add Services</li>
           <li onClick={() => setSelect('CatererDetail')}>Caterer Details</li>
        </ul>
      </div>
      <div className='contentSection'>
      <div className="contentContainer">
       
        {render()}
      </div>
       
        </div>
       
      </div>


  );
}

export default Sidebar;
