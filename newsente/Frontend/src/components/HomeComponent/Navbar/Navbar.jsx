import React from 'react';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';
import { Link } from 'react-router-dom';
import styles from './Navbar.module.css'; // Importing the CSS module

const Navbar = () => {
  const Logo = '/polgen-logo.png'; // Accesses the logo from the public directory

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <Link to="/">
          <img src={Logo} alt="Logo" />
        </Link>
      </div>
      <div className={styles.links}>
        <ul>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/contact">Contact Us</Link></li>
          <li><Link to="/services">Our Products</Link></li>
          <li><Link to="/covid_19_test">Covid-19 Test</Link></li>
          <li><Link to="/Ar-Ge">Ar-Ge</Link></li>
        </ul>
        <div className={styles.icons}>
          <Link to="/login"><LocalGroceryStoreIcon /></Link>
          <SearchIcon />
          <LanguageIcon />
        </div>
      </div>
    </div>
  );
};

export default Navbar;

