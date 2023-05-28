import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { observer } from 'mobx-react';
import { useStore } from '../../store';
import Search from '../../components/search/Search';
import Button from '../../components/common/button/Button';
import DiaryCard from '../../components/diaryCard/DiaryCard';
import ModalWrapper from '../../components/common/modalWrapper/ModalWrapper';
import DiaryModal from '../../components/modals/diaryModal/DiaryModal';
import { type NewDiaryType } from '../../types';
import Api from '../../api';
import styles from './diaryPage.module.css';

const DiaryPage: React.FC = observer(() => {
  const api = new Api();
  const { diaryStore } = useStore();

  const [showDiaryModal, setShowDiaryModal] = useState<boolean>(false);

  useEffect(() => {
    void api.getDiaries()
      .then(res => {
        diaryStore.setDiaries(res);
      })
      .catch(err => {
        toast.error(err.message);
      });
  }, []);

  useEffect(() => {
    return () => {
      diaryStore.setDiaries([]);
    };
  }, []);

  const handleSearch = (searchValue: string): void => {
    void api.getDiaries(searchValue)
      .then(res => {
        diaryStore.setDiaries(res);
      })
      .catch(err => {
        toast.error(err.message);
      });
  };

  const handleDiarySave = (newDiary: NewDiaryType): void => {
    void api.createDiary(newDiary)
      .then(res => {
        diaryStore.appendDiary(res);
        toast.success('A new Diary has been created successfully!');
        setShowDiaryModal(false);
      })
      .catch(err => {
        toast.error(err.message);
      });
  };

  const handleDiaryDelete = (diaryId: string): void => {
    void api.deleteDiary(diaryId)
      .then(() => {
        diaryStore.deleteDiary(diaryId);
        toast.success('The Diary has been deleted successfully!');
      })
      .catch(err => {
        toast.error(err.message);
      });
  };

  return (
    <div className={styles.diaryContainer}>
      <div className={styles.diaryHeader}>
        <Button
          className={styles.createButton}
          onClick={() => { setShowDiaryModal(true); }}
          variant="info"
        >
          Create Diary
        </Button>
        <Search handleSearch={handleSearch} />
      </div>
      <div className={styles.cardsContainer}>
        {diaryStore.diaries.map(d => (
          <DiaryCard key={d.id} data={d} handleDelete={handleDiaryDelete} />
        ))}
      </div>
      {
        showDiaryModal && (
          <ModalWrapper
            content={DiaryModal}
            title='Create new Diary'
            handleClose={() => { setShowDiaryModal(false); }}
            handleSave={handleDiarySave}
          />
        )
      }
    </div>
  );
});

export default DiaryPage;
