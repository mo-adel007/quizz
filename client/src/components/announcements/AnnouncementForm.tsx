import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

import { Announcement } from '../../store/slices/announcementsSlice';

interface AnnouncementFormProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (announcement: Omit<Announcement, '_id'> | Announcement) => void;
  announcement?: Announcement;
}

const initialState = {
  title: '',
  content: '',
  author: '',
  date: new Date().toISOString().split('T')[0],
};

const AnnouncementForm: React.FC<AnnouncementFormProps> = ({ open, onClose, onSubmit, announcement }) => {
  const { t } = useTranslation();
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({
    title: false,
    content: false,
    author: false,
  });

  useEffect(() => {
    if (announcement) {
      const formattedDate = new Date(announcement.date).toISOString().split('T')[0];
      setFormData({
        ...announcement,
        date: formattedDate,
      });
    } else {
      setFormData(initialState);
    }
  }, [announcement, open]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user types
    if (errors[name as keyof typeof errors]) {
      setErrors({
        ...errors,
        [name]: false,
      });
    }
  };

  const handleSubmit = () => {
    // Validate form
    const newErrors = {
      title: !formData.title,
      content: !formData.content,
      author: !formData.author,
    };
    
    if (newErrors.title || newErrors.content || newErrors.author) {
      setErrors(newErrors);
      return;
    }
    
    // Submit valid form
    onSubmit(announcement ? { ...formData, _id: announcement._id } : formData);
    onClose();
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle>
        {announcement 
          ? t('announcements.editAnnouncement') 
          : t('announcements.newAnnouncement')
        }
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 1 }}>
          <TextField
            name="title"
            label={t('announcements.title')}
            fullWidth
            value={formData.title}
            onChange={handleChange}
            error={errors.title}
            helperText={errors.title ? t('common.fieldRequired') : ''}
          />
          <TextField
            name="content"
            label={t('announcements.content')}
            fullWidth
            multiline
            rows={4}
            value={formData.content}
            onChange={handleChange}
            error={errors.content}
            helperText={errors.content ? t('common.fieldRequired') : ''}
          />
          <TextField
            name="author"
            label={t('announcements.author')}
            fullWidth
            value={formData.author}
            onChange={handleChange}
            error={errors.author}
            helperText={errors.author ? t('common.fieldRequired') : ''}
          />
          <TextField
            name="date"
            label={t('announcements.date')}
            type="date"
            fullWidth
            value={formData.date}
            onChange={handleChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button onClick={onClose}>{t('common.cancel')}</Button>
        <Button 
          onClick={handleSubmit} 
          variant="contained" 
          color="primary"
        >
          {t('common.save')}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AnnouncementForm;