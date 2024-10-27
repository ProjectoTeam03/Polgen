import styles from './Ar_Ge.module.css';

const Ar_Ge = () => {
  return (
    <div>
      <div className={styles.Ar_Ge}>
        <div className={styles.Ar_Ge_text}>
          <h5>TÜBİTAK-TEYDEB 1507: CRISPR Tabanlı Genom Düzenleme Kiti Geliştirilmesi</h5>
          <p>
            Yeni nesil DNA dizileme teknolojileri, biyoinformatik veri analiz araçları ve genetik mühendisliği uygulamalarının bir arada kullanılarak hedeflenilen genom bölgesinde hassas seviyede düzenleme yapılması sağlanabilecektir. Bu projenin CRISPR-tabanlı geliştirilmesi ile ülkemizde yerli, ulaşılabilir, güvenilir ve etkin bir genom düzenleme aracı oluşturulacak ve bu teknolojinin uygulanması yönünde hizmet verecektir.
          </p>
        </div>
        <div className={styles.Ar_Ge_img}>
          <img src="" alt="Ar_Ge_img" />
        </div>
      </div>
    </div>
  );
}

export default Ar_Ge;

