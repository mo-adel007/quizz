import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import { format } from 'date-fns';

import { RootState } from '../../store';

const RecentAnnouncements: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { announcements } = useSelector((state: RootState) => state.announcements);
  
  // Get most recent announcements
  const recentAnnouncements = [...announcements]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  
  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column', 
      }}
    >
      <CardContent sx={{ flex: 1 }}>
        <Box 
          sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            mb: 2
          }}
        >
          <Typography variant="h6" component="h2">
            {t('dashboard.recentAnnouncements')}
          </Typography>
          <Button 
            size="small" 
            onClick={() => navigate('/announcements')}
            sx={{ textTransform: 'none' }}
          >
            {t('common.viewAll')}
          </Button>
        </Box>
        
        {recentAnnouncements.length > 0 ? (
          <List disablePadding>
            {recentAnnouncements.map((announcement, index) => (
              <React.Fragment key={announcement._id}>
                {index > 0 && <Divider component="li" />}
                <ListItem 
                  alignItems="flex-start"
                  sx={{ 
                    px: 0,
                    transition: 'background-color 0.2s',
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                    }
                  }}
                >
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="subtitle1" component="span">
                          {announcement.title}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {format(new Date(announcement.date), 'MMM d')}
                        </Typography>
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'block', mb: 0.5 }}
                          component="span"
                          variant="body2"
                          color="text.secondary"
                        >
                          {t('announcements.by', { author: announcement.author })}
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {announcement.content.length > 100 
                            ? `${announcement.content.substring(0, 100)}...` 
                            : announcement.content}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Box sx={{ py: 4, textAlign: 'center' }}>
            <Typography variant="body1" color="text.secondary">
              {t('dashboard.noRecentAnnouncements')}
            </Typography>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default RecentAnnouncements;