import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UserForm from '../../Components/UserForm/UserForm';
import './HomePage.css';

const HomePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  const handleFormSubmit = ({ name, age }) => {
    localStorage.setItem('userData', JSON.stringify({ name, age }));
    setUserData({ name, age });
    navigate('/setuppage');
  };

  useEffect(() => {
    const storedData = localStorage.getItem('userData');
    if (storedData) {
      setUserData(JSON.parse(storedData));
    }
  }, []);

  const handleReset = () => {
    localStorage.removeItem('userData');
    setUserData(null);
  };

  return (
    <main className='home-page'>
      <h1 className='home-title'>Bienvenido a Memo-Pockemon</h1>
      {!userData ? (
        <UserForm onSubmit={handleFormSubmit} />
      ) : (
        <section className='user-data'>
          <p>
            Hola {userData.name}, tienes {userData.age} años.
          </p>
          <button
            className='continue-button'
            onClick={() => navigate('/setuppage')}
          >
            Continuar
          </button>
          <button className='reset-button' onClick={handleReset}>
            Reiniciar datos
          </button>
        </section>
      )}
    </main>
  );
};

export default HomePage;
