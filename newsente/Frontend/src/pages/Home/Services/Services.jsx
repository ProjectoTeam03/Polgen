import styles from './Services.module.css';

const Services = () => {
  const services = [
    { title: 'Service 1', description: 'Description of service 1.' },
    { title: 'Service 2', description: 'Description of service 2.' },
    { title: 'Service 3', description: 'Description of service 3.' }
  ];

  return (
    <div className={styles.container}>
      <h2 className={styles.heading}>Our Services</h2>
      <div className={styles.cardContainer}>
        {services.map((service, index) => (
          <div key={index} className={styles.card}>
            <h3 className={styles.cardTitle}>{service.title}</h3>
            <p className={styles.cardDescription}>{service.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Services;

