
import styles from './Contact.module.css';

const Contact = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Contact Us</h1>
      <p className={styles.description}>
        We’d love to hear from you! Fill out the form below or reach us at:
      </p>
      <p className={styles.contactInfo}>
        Email: contact@example.com
      </p>
      <form className={styles.form}>
        <label className={styles.label}>
          Name:
          <input type="text" className={styles.input} placeholder="Your Name" />
        </label>
        <label className={styles.label}>
          Email:
          <input type="email" className={styles.input} placeholder="Your Email" />
        </label>
        <label className={styles.label}>
          Message:
          <textarea className={styles.textarea} placeholder="Your Message"></textarea>
        </label>
        <button type="submit" className={styles.button}>Submit</button>
      </form>
    </div>
  );
};

export default Contact;

