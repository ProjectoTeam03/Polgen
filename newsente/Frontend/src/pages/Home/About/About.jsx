import React from 'react';
import styles from './About.module.css';

const About = () => {
  return (
    <div>
      <div className={styles.about_company}>
        <div className={styles.about_company_text}>
          <h5>Şirket Profili</h5>
          <p>
            2016 yılında Hüseyin ERYİĞİT tarafından start-up olarak kurulan POLGEN Biyoteknoloji Anonim Şirketi biyoteknoloji alanında yenilikçi çalışmalarını sürdürmektedir. Verdiği hizmetlerin yanında AR-GE projeleri ile kendini devamlı olarak yineleyerek alanında başarılı bir şirket olmayı hedeflemektedir.
            Ekibimizde Moleküler Biyoloji, Tıbbi Genetik, Eczacılık, Malzeme Bilimi ve Nanoteknoloji dallarında tıp doktoru (M.D.) ve doktoralı (Ph.D.) araştırmacıların yanı sıra Kimya, Biyoloji ve Moleküler Biyoloji ve Genetik alanlarında lisans ve lisansüstü eğitime sahip deneyimli takım arkadaşlarımız yer almaktadır.
            Polgen MEBID ve UMUDDER üyesidir.
          </p>
        </div>
        <div className={styles.about_company_img}>
          <img src="" alt="about_company_img" />
        </div>
      </div>
      <div className={styles.mission_vision}>
        <div className={styles.mission_vision_text}>
          <h5>Vizyon & Misyon</h5>
          <p>
            2016 yılında Hüseyin ERYİĞİT tarafından start-up olarak kurulan POLGEN Biyoteknoloji Anonim Şirketi biyoteknoloji alanında yenilikçi çalışmalarını sürdürmektedir. Verdiği hizmetlerin yanında AR-GE projeleri ile kendini devamlı olarak yineleyerek alanında başarılı bir şirket olmayı hedeflemektedir.
            Ekibimizde Moleküler Biyoloji, Tıbbi Genetik, Eczacılık, Malzeme Bilimi ve Nanoteknoloji dallarında tıp doktoru (M.D.) ve doktoralı (Ph.D.) araştırmacıların yanı sıra Kimya, Biyoloji ve Moleküler Biyoloji ve Genetik alanlarında lisans ve lisansüstü eğitime sahip deneyimli takım arkadaşlarımız yer almaktadır.
            Polgen MEBID ve UMUDDER üyesidir.
          </p>
        </div>
        <div className={styles.mission_vision_img}>
          <img src="" alt="mission_vision_img" />
        </div>
      </div>
    </div>
  );
};

export default About;

