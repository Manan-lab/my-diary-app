import React, { useEffect, useState } from 'react';
import _ from 'lodash';
import Input from '../../common/input/Input';
import Button from '../../common/button/Button';
import Typography from '../../common/typography/Typography';
import { type DiaryType, type NewDiaryType } from '../../../types';
import styles from './diaryModal.module.css';

interface DiaryModalProps {
  diary?: DiaryType;
  handleSave: (diaryParams: DiaryType | NewDiaryType) => void
}

const DiaryModal: React.FC<DiaryModalProps> = ({ handleSave, diary }) => {
  const [diaryTitleValidationMessage, setDiaryTitleValidationMessage] = useState<string>('');
  const [diaryData, setDiaryData] = useState<DiaryType | NewDiaryType>(
    {
      title: '',
      description: ''
    }
  );

  useEffect(() => {
    if (!_.isNil(diary)) {
      setDiaryData({ ...diary });
    }
  }, [diary]);

  const handleChangeDiaryData = (value: string, key: string): void => {
    const updatedDiary = {
      ...diaryData,
      [key]: value
    };
    setDiaryData(updatedDiary);
  };

  const handleSaveChanges = (): void => {
    if (diaryData.title === '') {
      setDiaryTitleValidationMessage('Title is required.');
    } else {
      setDiaryTitleValidationMessage('');
      handleSave(diaryData);
    }
  };

  return (
    <div className={styles.modalContainer}>
      <label htmlFor="title">Title:</label>
      <Input
        id="title"
        type="text"
        className={`${diaryTitleValidationMessage !== '' ? styles.errorContainer : ''}`}
        value={diaryData.title}
        handleChange={(evt) => { handleChangeDiaryData(evt.target.value, 'title'); }}
      />
      {(diaryTitleValidationMessage !== '') && (
        <Typography variant="p3" className={styles.errorMessage}>{diaryTitleValidationMessage}</Typography>
      )}
      <label htmlFor="description">Description:</label>
      <Input
        rows={5}
        id="description"
        type="textArea"
        className={styles.descriptionContainer}
        value={diaryData.description}
        handleChange={(evt) => { handleChangeDiaryData(evt.target.value, 'description'); }}
      />
      <Button
        variant='info'
        onClick={handleSaveChanges}
      >
        Save
      </Button>
    </div>
  );
};

export default DiaryModal;
