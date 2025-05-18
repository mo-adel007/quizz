import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';

import DashboardLayout from '../components/layout/DashboardLayout';
import AnnouncementCard from '../components/announcements/AnnouncementCard';
import AnnouncementForm from '../components/announcements/AnnouncementForm';
import { AppDispatch, RootState } from '../store';
import { 
  fetchAnnouncements, 
  createAnnouncement, 
  updateAnnouncement, 
  deleteAnnouncement,
  Announcement
} from '../store/slices/announcementsSlice';

const AnnouncementsPage: React.FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { announcements, loading, error } = useSelector((state: RootState) => state.announcements);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedAnnouncement, setSelectedAnnouncement] = useState<Announcement | undefined>(undefined);
  
  useEffect(() => {
    dispatch(fetchAnnouncements());
  }, [dispatch]);
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };
  
  const filteredAnnouncements = announcements.filter(announcement => 
    announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    announcement.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
    announcement.author.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleAdd = () => {
    setSelectedAnnouncement(undefined);
    setIsDialogOpen(true);
  };
  
  const handleEdit = (announcement: Announcement) => {
    setSelectedAnnouncement(announcement);
    setIsDialogOpen(true);
  };
  
  const handleDelete = (id: string) => {
    if (confirm(t('announcements.deleteConfirm'))) {
      dispatch(deleteAnnouncement(id));
    }
  };
  
  const handleSubmit = (announcement: Omit<Announcement, '_id'> | Announcement) => {
    if ('_id' in announcement) {
      dispatch(updateAnnouncement(announcement as Announcement));
    } else {
      dispatch(createAnnouncement(announcement));
    }
  };
  
  return (
    <DashboardLayout>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          {t('dashboard.menu.announcements')}
        </Typography>
        <Button 
          variant="contained" 
          color="primary" 
          startIcon={<AddIcon />}
          onClick={handleAdd}
          sx={{
            transition: 'all 0.2s ease',
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
            }
          }}
        >
          {t('common.add')}
        </Button>
      </Box>
      
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder={t('common.search')}
          value={searchTerm}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          variant="outlined"
        />
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      ) : filteredAnnouncements.length > 0 ? (
        <Box>
          {filteredAnnouncements.map(announcement => (
            <AnnouncementCard 
              key={announcement._id} 
              announcement={announcement}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </Box>
      ) : (
        <Box sx={{ textAlign: 'center', my: 8 }}>
          <Typography variant="h6" color="text.secondary">
            {t('announcements.noAnnouncements')}
          </Typography>
        </Box>
      )}
      
      <AnnouncementForm 
        open={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onSubmit={handleSubmit}
        announcement={selectedAnnouncement}
      />
    </DashboardLayout>
  );
};

export default AnnouncementsPage;