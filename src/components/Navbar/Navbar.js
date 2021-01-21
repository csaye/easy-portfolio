import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="Navbar">
      <Link to="/">Portfolio</Link>
      <Link to="/edit">Edit</Link>
    </div>
  );
}

export default Navbar;
