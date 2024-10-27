import Slider from "../../../components/HomeComponent/Slider/Slider.jsx";
import styles from './Main.module.css';

const Main = () => {
  return (
    <>
      <Slider />

      <div className={styles.container}>
        <div className={styles.section}>
          <h5 className={styles.label}>Coronavirus Test Kiti</h5>
        </div>
        <div className={styles.section}>
          <h5 className={styles.label}>Big Data Çözümleri</h5>
        </div>
      </div>
    </>
  );
}

export default Main;

