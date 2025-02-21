import React from "react";
import { Grid, Box, Typography, Tooltip, IconButton, Card, CardContent } from "@mui/material";
import ChatIcon from '@mui/icons-material/Chat';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ConversationsTable from "./dashboard-components/ConversationsTable";
import FeedbackTable from "./dashboard-components/FeedbackTable";

const StatsCard = ({ title, value, subtitle, icon: Icon }) => (
  <Card sx={{
    border: '1px solid',
    borderColor: 'divider',
    boxShadow: 'none',
    height: '100%',
    p: 4
  }}>
    <CardContent sx={{ p: 0 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
        <Icon color="primary" sx={{ mr: 2, width: 28, height: 28 }} />
        <Typography variant="h5" component="div">
          {title}
        </Typography>
      </Box>
      <Typography variant="h3" component="div" sx={{ mb: 1, color: 'primary.main' }}>
        {value}
      </Typography>
      {subtitle && (
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </CardContent>
  </Card>
);

const ConvoDashboard = () => {
  // Calculate feedback stats
  const calculateFeedbackStats = (conversations) => {
    const stats = {
      totalFeedbackRatings: 0,
      totalCategories: 0,
      totalComments: 0,
      positiveCount: 0,
      negativeCount: 0
    };

    conversations.forEach(conv => {
      // Count feedback ratings
      if (conv.feedback) {
        stats.totalFeedbackRatings++;
        if (conv.feedback === 'positive') {
          stats.positiveCount++;
        } else {
          stats.negativeCount++;
        }
      }
      // Count feedback categories
      if (conv.feedbackCategory) {
        stats.totalCategories++;
      }
      // Count user comments
      if (conv.userComment) {
        stats.totalComments++;
      }
    });

    // Total interactions is sum of ratings, categories and comments
    const totalInteractions = stats.totalFeedbackRatings + stats.totalCategories + stats.totalComments;

    // Calculate satisfaction rates based on thumbs up/down ratio
    const totalFeedback = stats.positiveCount + stats.negativeCount;
    const satisfactionRate = totalFeedback > 0 ? Math.round((stats.positiveCount / totalFeedback) * 100) : 0;
    const dissatisfactionRate = totalFeedback > 0 ? Math.round((stats.negativeCount / totalFeedback) * 100) : 0;

    return {
      totalInteractions,
      positiveCount: stats.positiveCount,
      negativeCount: stats.negativeCount,
      satisfactionRate,
      dissatisfactionRate
    };
  };

  // Get stats from the feedback table data
  const formatNumber = (num) => {
    return new Intl.NumberFormat('en-GB').format(num);
  };

  const feedbackStats = calculateFeedbackStats([
    { id: 'conv-001-1', feedback: 'positive' },
    { id: 'conv-002-1', feedback: 'negative', feedbackCategory: 'Encountered error message' },
    { id: 'conv-003-1', feedback: 'positive' },
    { id: 'conv-002-2', feedback: 'negative', feedbackCategory: 'Slow (inefficient)' },
    { id: 'conv-004-1', feedback: 'negative', feedbackCategory: 'Answers were not helpful' },
    { id: 'conv-001-3', feedback: 'positive', feedbackCategory: 'Other' },
    { id: 'conv-003-3', feedback: 'positive', feedbackCategory: 'Clear and helpful answers' },
    { id: 'conv-004-2', feedback: 'positive', feedbackCategory: 'Fast (efficient)' },
    { id: 'conv-002-3', feedback: 'negative', feedbackCategory: 'Difficult to interact with' }
  ]);

  const cardStyle = {
    border: '1px solid',
    borderColor: 'divider',
    boxShadow: 'none',
    height: '100%',
    '& .MuiCardContent-root': {
      height: '100%',
    },
  };

  return (
    <Box sx={{ p: 3, mt: 3 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 6, ml: 1.2 }}>
        <Typography variant="h2" component="h1">
          Convo Dashboard
        </Typography>
        <Tooltip title="Each row in the table represents a single query and response. Conversations may be split across multiple rows." placement="right">
          <IconButton size="small" sx={{ ml: 1 }}>
            <InfoOutlined fontSize="small" />
          </IconButton>
        </Tooltip>
      </Box>
      
      {/* Row 1 - Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 6 }}>
        <Grid item xs={12} md={4}>
          <StatsCard
            title="Total Interactions"
            value={formatNumber(feedbackStats.totalInteractions)}
            subtitle="Total number of feedback ratings, categories, and comments from all sources"
            icon={ChatIcon}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard
            title="Customer Satisfaction"
            value={`${feedbackStats.satisfactionRate}%`}
            subtitle={`${feedbackStats.positiveCount} positive responses`}
            icon={ThumbUpIcon}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatsCard
            title="Customer Dissatisfaction"
            value={`${feedbackStats.dissatisfactionRate}%`}
            subtitle={`${feedbackStats.negativeCount} negative responses`}
            icon={ThumbDownIcon}
          />
        </Grid>
      </Grid>

      {/* Row 2 - Feedback Table */}
      <Grid container sx={{ mb: 6 }}>
        <Grid item xs={12}>
          <FeedbackTable sx={cardStyle} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default ConvoDashboard;
