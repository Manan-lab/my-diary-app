import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/button/Button';
import Typography from '../common/typography/Typography';
import { type DiaryType } from '../../types';
import styles from './diaryCard.module.css';

interface DiaryCardProps {
  data: DiaryType;
  handleDelete: (id: string) => void
}

function DiaryCard ({ data, handleDelete }: DiaryCardProps): React.JSX.Element {
  return (
    <div className={styles.cardContainer}>
      <div>
        <Typography variant="h3" className={styles.textEllipsis} textAlign='center'>
          {data.title}
        </Typography>
        <Typography variant="p2" className={styles.textEllipsis}>
          {data.description}
        </Typography>
        <Typography variant="p3" >
          Created At: {data.created_date}
        </Typography>
        <Typography variant="p3">
          Updated At: {data.updated_date}
        </Typography>
      </div>
      <div className={styles.cardFooter}>
        <Link to={`/diary/${data.id}`}>Show more</Link>
        <Button
          variant="error"
          onClick={() => { handleDelete(data.id); }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default DiaryCard;
