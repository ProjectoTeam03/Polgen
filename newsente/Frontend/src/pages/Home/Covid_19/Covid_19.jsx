import styles from './Covid_19.module.css';

const Covid_19 = () => {
  return (
    <div className={styles.container}>
      {/* Image Section */}
      <div className={styles.imageContainer}>
        <img src="covid-19-image.jpg" alt="Covid-19" className={styles.image} />
      </div>

      {/* Tabs Section */}
      <div className={styles.tabs}>
        <h5 className={styles.title}>POLGEN CORONAVIRUS TESPİT/TEST KİTİ</h5>
        <p className={styles.description}>
          Bu kit insan numunelerinden elde edilen RNA örneklerinde yeni tip koronavirüsün (SARS-CoV-2)
          tespiti amacıyla geliştirilmiştir.
          • Reaksiyon süresi yaklaşık 1 saattir, kullanılan qPCR cihazına göre ufak farklılıklar gösterebilir.
          • Kit içeriğindeki N1 ve N2 olarak adlandırılan primer ve problar SARS-CoV-2 virüsüne ait nükleokapsid (N) genini virüse spesifik olarak tanımaktadır.
          Bu primer ve problar genetik yapısı SARS-CoV-2 ile yüksek benzerlik taşıyan SARS-CoV virüsünü tanımamaktadır ve SARSCoV-2 virüsünün spesifik olarak teşhisi amacıyla geliştirilmiştir.
          • Kit içeriğinde bulunan RNAseP primer ve probları numunelerden hazırlanan RNA örneklerinin kalitesini kontrol amaçlıdır ve insan RNAseP genini tanımaktadır.
          • Kit içeriğinde bulunan kalıp DNA pozitif kontrol amaçlı kullanılmak üzere hazırlanmış bir sentetik DNA’dır.
          SAKLAMA KOŞULLARI
          • Ürünler -20°C’de saklanmalıdır.
          • Ürünlerin ikiden fazla dondur-çöz yapılmaması önerilmektedir.
          • Primer/prob karışımları ışığa duyarlıdır ve kahverengi viallerde gönderilmiştir.
        </p>
      </div>
    </div>
  );
};

export default Covid_19;

