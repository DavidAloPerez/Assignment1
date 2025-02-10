import { Link } from 'react-router-dom';

// Header Component
const Header = () => {
  return <header className="navbar-title">WhatToDoApp</header>;
};

// Sidebar Component (Navigation)
const Navigation = () => {
  return (
    <div className="sidebar">
      <Header />
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/tasks">Tasks</Link>
      </div>
    </div>
  );
};

export default Navigation;
