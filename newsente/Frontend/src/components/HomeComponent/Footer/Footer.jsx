import React from 'react';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import styles from './Footer.module.css'; // Importing CSS module

const Footer = () => {
  return (
    <>
      <div className={styles.FooterUp}>
        <div className={styles.PolgenFooter}>
          <h6>POLGEN BİYOTEKNOLOJİ</h6>
          <p>CRISPR, Biyouyumluluk Analizleri, Yeni Nesil Dizileme, Biyoinformatik Analizler, Coronavirus Test Kiti, PCR Cihazı</p>
        </div>
        <div className={styles.Address}>
          <p>Vedik OSB, 1453. Cad., No: 3, 06378 Yenimahalle, ANKARA</p>
          <p>P: +90 312 395 5795</p>
          <p>P (m): +90 506 051 13 63</p>
          <p>e-mail: info@polgen.com.tr</p>
        </div>
      </div>
      <div className={styles.FooterSocialMedia}>
        <a href="https://www.X.com" target="_blank" rel="noopener noreferrer">
          <TwitterIcon />
        </a>
        <a href="https://www.LinkedIn.com" target="_blank" rel="noopener noreferrer">
          <LinkedInIcon />
        </a>
      </div>
    </>
  );
};

export default Footer;

