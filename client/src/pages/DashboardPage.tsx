import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import { Monitor } from "lucide-react";

import DashboardLayout from "../components/layout/DashboardLayout";
import { AppDispatch, RootState } from "../store";
import { fetchQuizzes } from "../store/slices/quizzesSlice";
import { fetchAnnouncements } from "../store/slices/announcementsSlice";
import RecentAnnouncements from "../components/dashboard/RecentAnnouncements";
import UpcomingQuizzes from "../components/dashboard/UpcomingQuizzes";

const DashboardPage: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(fetchQuizzes());
    dispatch(fetchAnnouncements());
  }, [dispatch]);

  return (
    <DashboardLayout>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Card
            sx={{
              backgroundImage: "linear-gradient(to right, #FFFFF, #1A7BA6)",
              color: "#0D4C63",
              overflow: "visible",
              position: "relative",
            }}
          >
            <CardContent
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Box sx={{ flex: 1 }}>
                <Typography variant="h4" gutterBottom>
                  EXAMS TIME
                </Typography>
                <Typography variant="body1" sx={{ mb: 2, opacity: 0.9 }}>
                  Here we are, Are you ready to fight? Don't worry, we prepared
                  some tips to be ready for your exams.
                </Typography>
                <Typography
                  variant="body2"
                  sx={{ mb: 3, opacity: 0.8, fontStyle: "italic" }}
                >
                  "Nothing happens until something moves" - Albert Einstein
                </Typography>
                <Button
                  variant="contained"
                  color="secondary"
                  sx={{
                    color: "white",
                    "&:hover": {
                      backgroundColor: "#2B9B84",
                    },
                  }}
                >
                  View exams tips
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6">Announcements</Typography>
                <Button color="primary">All</Button>
              </Box>
              <RecentAnnouncements />{" "}
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  mb: 2,
                }}
              >
                <Typography variant="h6">What's due</Typography>
                <Button color="primary">All</Button>
              </Box>
              <UpcomingQuizzes />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default DashboardPage;
