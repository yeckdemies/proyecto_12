import React, { useState } from 'react';
import './UserForm.css';

const UserForm = ({ onSubmit }) => {
  console.log('Renderizando UserForm');
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (Number(age) < 12) {
      setError('Debes tener al menos 12 años para jugar.');
      return;
    }

    if (onSubmit) {
      onSubmit({ name, age });
    }
  };

  return (
    <form className='user-form' onSubmit={handleSubmit}>
      <section className='form-group'>
        <label htmlFor='name'>Nombre:</label>
        <input
          type='text'
          id='name'
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder='Introduce tu nombre'
          required
        />
      </section>

      <section className='form-group'>
        <label htmlFor='age'>Edad:</label>
        <input
          type='number'
          id='age'
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder='Introduce tu edad'
          required
        />
      </section>

      {error && <p className='error-message'>{error}</p>}

      <button type='submit' className='submit-button'>
        Comenzar
      </button>
    </form>
  );
};

export default UserForm;
