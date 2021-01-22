import './Navbar.css';
import { Link } from 'react-router-dom';
import logo from '../../img/logo.png';

function Navbar() {
  return (
    <div className="Navbar">
      <nav className="navbar navbar-expand-lg navbar-light">
        <Link className="navbar-brand" to="/"><img src={logo} alt="logo" /></Link>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link to="/" className="link">Portfolio</Link>
            </li>
            <li className="nav-item">
              <Link to="/edit" className="link">Edit</Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
