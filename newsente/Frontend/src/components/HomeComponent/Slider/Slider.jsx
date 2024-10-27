import { Carousel } from 'react-bootstrap';
import slider1 from "../../../assets/Slider_images/slider1.jpg";
import slider2 from "../../../assets/Slider_images/slider2.jpg";
import slider3 from "../../../assets/Slider_images/slider3.jpg";
import styles from './Slider.module.css';

const Slider = () => {
  return (
    <div className={styles.carouselContainer}>
      <Carousel>
        <Carousel.Item>
          <img
            className={`d-block w-100 ${styles.carouselImage}`}
            src={slider1}
            alt="First slide"
          />
          <Carousel.Caption className={styles.carouselCaption}>
            <h3>First slide label</h3>
            <p>Slide description here.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className={`d-block w-100 ${styles.carouselImage}`}
            src={slider2}
            alt="Second slide"
          />
          <Carousel.Caption className={styles.carouselCaption}>
            <h3>Second slide label</h3>
            <p>Slide description here.</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className={`d-block w-100 ${styles.carouselImage}`}
            src={slider3}
            alt="Third slide"
          />
          <Carousel.Caption className={styles.carouselCaption}>
            <h3>Third slide label</h3>
            <p>Slide description here.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

export default Slider;

