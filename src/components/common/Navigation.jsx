import { Link } from 'react-router-dom';

export default function Navigation() {
  const navLinks = [
    { to: '/', label: 'Home' },
    { to: '/pricing', label: 'Pricing' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' },
    { to: '/messages', label: 'Messages' },
    { to: '/profile', label: 'Profile' },
    { to: '/discovery', label: 'Discovery' },
    { to: '/collab', label: 'Collaboration' }
  ];

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          Leep Audio
        </Link>
        <div className="nav-links">
          {navLinks.map((link) => (
            <Link 
              key={link.to} 
              to={link.to} 
              className="nav-link"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}