import React from 'react';
import { Link } from 'react-router-dom';
import Typography from '../../components/common/typography/Typography';
import styles from './notFoundPage.module.css';

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.notFoundContainer}>
      <Typography variant='h1' textAlign='center'>
        404
      </Typography>
      <Typography variant='h3' textAlign='center'>
        Woops. Looks like this page does not exist
      </Typography>
      <Link to='/'>
        <Typography variant='p2' textAlign='center'>
          Go to homepage
        </Typography>
      </Link>
    </div>
  );
};

export default NotFoundPage;
