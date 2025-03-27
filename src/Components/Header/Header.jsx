import { Link } from 'react-router-dom';
import './Header.css';

const Header = () => {
  return (
    <header className='main-header'>
      <nav>
        <ul className='nav-list'>
          <li>
            <Link to='/'>Inicio</Link>
          </li>
          <li>
            <Link to='/scorespage'>Puntuaciones</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
