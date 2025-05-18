import React from 'react';
import { useTranslation } from 'react-i18next';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import { format } from 'date-fns';

import { Announcement } from '../../store/slices/announcementsSlice';

interface AnnouncementCardProps {
  announcement: Announcement;
  onEdit: (announcement: Announcement) => void;
  onDelete: (id: string) => void;
}

const AnnouncementCard: React.FC<AnnouncementCardProps> = ({ announcement, onEdit, onDelete }) => {
  const { t } = useTranslation();
  const { _id, title, content, date, author } = announcement;
  
  return (
    <Card 
      sx={{ 
        mb: 2, 
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 6px 12px rgba(0,0,0,0.1)',
        }
      }}
    >
      <CardContent>
        <Typography variant="h5" component="div" gutterBottom>
          {title}
        </Typography>
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <span>{t('announcements.by', { author })}</span>
          <span>{format(new Date(date), 'MMM d, yyyy')}</span>
        </Typography>
        <Typography variant="body1" component="div">
          {content}
        </Typography>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
        <Tooltip title={t('common.edit')}>
          <IconButton 
            color="primary" 
            onClick={() => onEdit(announcement)}
            sx={{ 
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.1)' }
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title={t('common.delete')}>
          <IconButton 
            color="error" 
            onClick={() => onDelete(_id)}
            sx={{ 
              transition: 'transform 0.2s',
              '&:hover': { transform: 'scale(1.1)' }
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default AnnouncementCard;