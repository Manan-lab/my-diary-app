import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import _ from 'lodash';
import { toast } from 'react-toastify';
import { useStore } from '../../store';
import Button from '../../components/common/button/Button';
import DiaryModal from '../../components/modals/diaryModal/DiaryModal';
import Typography from '../../components/common/typography/Typography';
import ModalWrapper from '../../components/common/modalWrapper/ModalWrapper';
import { type DiaryType } from '../../types';
import Api from '../../api';
import styles from './diaryDetailsPage.module.css';

const DiaryDetailsPage: React.FC = observer(() => {
  const api = new Api();
  const { diaryId } = useParams();
  const { diaryStore } = useStore();
  const navigate = useNavigate();
  const { diary } = diaryStore;

  const [showDiaryModal, setShowDiaryModal] = useState<boolean>(false);

  useEffect(() => {
    if (!_.isNil(diaryId)) {
      void api.getDiaryById(diaryId)
        .then(res => {
          diaryStore.setDiary(res);
        })
        .catch(err => {
          toast.error(err.message);
        });
    }
  }, [diaryId]);

  const handleDiarySave = (updatedDiary: DiaryType): void => {
    void api.updateDiary(updatedDiary)
      .then(res => {
        diaryStore.setDiary(res);
        toast.success('The Diary has been updated successfully!');
        setShowDiaryModal(false);
      })
      .catch(err => {
        toast.error(err.message);
      });
  };

  const handleDiaryDelete = (diaryId: string): void => {
    void api.deleteDiary(diaryId)
      .then(() => {
        diaryStore.setDiary(null);
        toast.success('The Diary has been deleted successfully!');
        navigate('/diary');
      })
      .catch(err => {
        toast.error(err.message);
      });
  };

  return (
    <div className={styles.diaryContainer}>
      {_.isNil(diary)
        ? <Typography variant="h1" textAlign='center'>No diary foud</Typography>
        : <>
          <Typography variant="h3" textAlign='center'>
            {diary.title}
          </Typography>
          <Typography variant="p2">
            {diary.description}
          </Typography>
          <Typography variant="p3" >
            Created At: {diary.created_date}
          </Typography>
          <Typography variant="p3">
            Updated At: {diary.updated_date}
          </Typography>
          <div className={styles.diaryFooter}>
            <Button
              onClick={() => { setShowDiaryModal(true); }}
              variant="info"
            >
              Edit Diary
            </Button>
            <Button
              variant="error"
              onClick={() => { handleDiaryDelete(diary.id); }}
            >
              Delete
            </Button>
          </div>
          {
            showDiaryModal && (
              <ModalWrapper
                title='Edit Diary'
                content={DiaryModal}
                modalProps={{ diary }}
                handleClose={() => { setShowDiaryModal(false); }}
                handleSave={handleDiarySave}
              />
            )
          }
        </>
      }
    </div>
  );
});

export default DiaryDetailsPage;
