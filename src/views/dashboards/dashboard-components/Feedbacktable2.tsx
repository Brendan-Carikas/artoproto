import React, { useState, useRef } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  TablePagination,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Menu,
  MenuItem,
  InputAdornment,
  Switch,
  FormControlLabel,
  FormLabel,
  Collapse,
  Divider,
  Tooltip,
  Radio,
  Checkbox,
  Chip,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import FilterListIcon from '@mui/icons-material/FilterList';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ChatIcon from '@mui/icons-material/Chat';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router-dom';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { enGB } from 'date-fns/locale';

interface FeedbackTableProps {
  sx?: any;
}

interface FeedbackRating {
  value: string;
  label: string;
}

interface FeedbackCategory {
  value: string;
  label: string;
}

interface Conversation {
  id: string;
  time: string;
  source: string;
  identifier: string;
  query: string;
  response: string;
  feedback?: 'positive' | 'negative';
  feedbackCategory?: string;
  userComment?: string;
}

interface TimeFilter {
  value: string;
  label: string;
}

const Feedbacktable2: React.FC<FeedbackTableProps> = ({ sx }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(10);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [selectedSources, setSelectedSources] = useState<string[]>(['all']);
  const [selectedFeedbackRatings, setSelectedFeedbackRatings] = useState<string[]>([]);
  const [selectedFeedbackCategories, setSelectedFeedbackCategories] = useState<string[]>([]);
  const [filterAnchorEl, setFilterAnchorEl] = useState<HTMLElement | null>(null);
  const [customDateDialog, setCustomDateDialog] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [orderBy, setOrderBy] = useState<string>('time');
  const [order, setOrder] = useState<'asc' | 'desc'>('desc');
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [focusedRowId, setFocusedRowId] = useState<string | null>(null);
  const [focusedTimeFilter, setFocusedTimeFilter] = useState<number | null>(null);
  const [focusedSource, setFocusedSource] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState<boolean>(false);
  
  const timeFilterRef = useRef<HTMLDivElement>(null);
  const sourceFilterRef = useRef<HTMLDivElement>(null);

  const feedbackRatings: FeedbackRating[] = [
    { value: 'positive', label: 'Helpful' },
    { value: 'negative', label: 'Not helpful' }
  ];

  const feedbackCategories: Record<string, FeedbackCategory[]> = {
    positive: [
      { value: 'fast', label: 'Fast and efficient' },
      { value: 'helpful', label: 'Helpful resolution' },
      { value: 'knowledgeable', label: 'Knowledgeable support' },
      { value: 'friendly', label: 'Friendly tone' },
      { value: 'easy', label: 'Easy to use' },
      { value: 'intelligent', label: 'Chatbot was intelligent' },
      { value: 'other_positive', label: 'Other' }
    ],
    negative: [
      { value: 'slow', label: 'Slow and inefficient' },
      { value: 'unhelpful', label: 'Unhelpful resolution' },
      { value: 'lack_expertise', label: 'Lack of expertise' },
      { value: 'unfriendly', label: 'Unfriendly tone' },
      { value: 'technical_issues', label: 'Technical issues' },
      { value: 'not_understood', label: "Chatbot didn't understand" },
      { value: 'other_negative', label: 'Other' }
    ]
  };

  const conversations: Conversation[] = [
    { 
      id: 'conv-001-1', 
      time: '29-01-25 10:15', 
      source: 'WhatsApp', 
      identifier: '+44 7700 900123',
      query: "Hi, I need to check my order status for #ORD-456789",
      response: "Hello! I'll help you check that order. I can see that order #ORD-456789 is currently scheduled for delivery tomorrow between 2-4 PM. Would you like me to send you the tracking details?",
      feedback: 'positive',
      userComment: 'Great service, thank you!'
    },
    { 
      id: 'conv-002-1', 
      time: '29-01-25 10:16', 
      source: 'Teams', 
      identifier: 'sarah.jones@company.com',
      query: "I'm getting an error when trying to access the CRM system. It says 'Authentication Failed' but I'm sure my password is correct.",
      response: "Hi Sarah, I'll help you troubleshoot this. First, could you confirm when you last successfully accessed the CRM? Also, have you recently changed your password or received any password reset emails?",
      feedback: 'negative',
      feedbackCategory: 'technical_issues'
    },
    { 
      id: 'conv-003-1', 
      time: '29-01-25 10:17', 
      source: 'Website Chatbot', 
      identifier: 'customer_29jan_1017',
      query: "Hello, I'm trying to find the sizing guide for your winter collection.",
      response: "I'll help you find our sizing guide. Are you looking for men's, women's, or children's sizing information?",
      feedback: 'positive',
      userComment: 'Great service, thank you!'
    },
    { 
      id: 'conv-001-2', 
      time: '29-01-25 10:18', 
      source: 'WhatsApp', 
      identifier: '+44 7700 900123',
      query: "Actually, I won't be home during that time. Can I change the delivery slot?",
      response: "Of course! I can help you reschedule the delivery. Let me check the available slots for the rest of the week. We have the following options: Thursday 9-11 AM, Thursday 1-3 PM, or Friday 10-12 PM. Which would work better for you?"
    },
    { 
      id: 'conv-003-2', 
      time: '29-01-25 10:19', 
      source: 'Website Chatbot', 
      identifier: 'customer_29jan_1017',
      query: "Women's sizing please.",
      response: "Here's our women's sizing guide: [Link]. It includes detailed measurements for all items in our winter collection. Would you like me to explain any specific measurements?"
    },
    { 
      id: 'conv-002-2', 
      time: '29-01-25 10:20', 
      source: 'Teams', 
      identifier: 'sarah.jones@company.com',
      query: "I was able to access it yesterday afternoon, and I haven't changed my password recently.",
      response: "Thank you for confirming. I can see there were multiple failed login attempts from a different IP address this morning, which triggered our security protocol. Your account was temporarily locked as a precaution. I can help you unlock it and set up a new password. Would you like to proceed with that?",
      feedback: 'negative',
      feedbackCategory: 'slow'
    },
    { 
      id: 'conv-004-1', 
      time: '30-01-25 09:05', 
      source: 'WhatsApp', 
      identifier: '+44 7700 900456',
      query: "Do you have any vegetarian options on your lunch menu?",
      response: "Yes, we have several vegetarian options! Our lunch menu includes a Mediterranean vegetable pasta, a halloumi salad, and a plant-based burger. Would you like more details about any of these dishes?",
      feedback: 'positive',
      userComment: 'Great service, thank you!'
    },
    { 
      id: 'conv-005-1', 
      time: '30-01-25 09:30', 
      source: 'Teams', 
      identifier: 'john.smith@company.com',
      query: "How do I request time off in the new HR system?",
      response: "To request time off in our new HR system, log in to the employee portal, click on 'Time Management' in the left sidebar, then select 'Request Time Off'. You'll need to specify the dates and type of leave. Would you like me to walk you through the steps with screenshots?",
      feedback: 'positive',
      userComment: 'Great service, thank you!',
      feedbackCategory: 'helpful'
    },
    { 
      id: 'conv-006-1', 
      time: '30-01-25 10:15', 
      source: 'Website Chatbot', 
      identifier: 'customer_30jan_1015',
      query: "What's your return policy for online purchases?",
      response: "Our return policy allows returns within 30 days of purchase for a full refund. Items must be unused with original tags attached. For online purchases, you can initiate a return through your account or use the return form included in your package. Would you like information on how to start a return?",
      feedback: 'positive',
      userComment: 'Great service, thank you!'
    },
    { 
      id: 'conv-007-1', 
      time: '30-01-25 11:20', 
      source: 'WhatsApp', 
      identifier: '+44 7700 900789',
      query: "My internet connection keeps dropping. Can you help?",
      response: "I'm sorry to hear about your connection issues. Let's troubleshoot this together. First, have you tried restarting your router? Also, are other devices experiencing the same issue, or is it just one device?",
      feedback: 'negative',
      feedbackCategory: 'unhelpful'
    },
    { 
      id: 'conv-008-1', 
      time: '30-01-25 12:45', 
      source: 'Teams', 
      identifier: 'emma.wilson@company.com',
      query: "When is the next company-wide meeting scheduled?",
      response: "The next company-wide meeting is scheduled for February 15th at 2:00 PM GMT. It will be held via Teams, and calendar invites have been sent out. If you haven't received an invite, please let me know and I'll make sure you're added to the distribution list."
      // No feedback submitted
    },
    { 
      id: 'conv-009-1', 
      time: '30-01-25 14:10', 
      source: 'Website Chatbot', 
      identifier: 'customer_30jan_1410',
      query: "Do you ship internationally?",
      response: "Yes, we do ship internationally to over 50 countries. Shipping costs and delivery times vary by destination. Would you like me to check the shipping options for a specific country?",
      feedback: 'positive',
      userComment: 'Great service, thank you!'
    },
    { 
      id: 'conv-010-1', 
      time: '30-01-25 15:30', 
      source: 'WhatsApp', 
      identifier: '+44 7700 900234',
      query: "I need to update my billing address for my monthly subscription.",
      response: "I'd be happy to help you update your billing address. For security purposes, could you please confirm your account email address and the last four digits of the payment card associated with your subscription?"
      // No feedback submitted
    },
    { 
      id: 'conv-011-1', 
      time: '31-01-25 08:15', 
      source: 'Teams', 
      identifier: 'david.brown@company.com',
      query: "The printer on the second floor isn't working. Can someone take a look?",
      response: "I'll create a support ticket for the IT team to investigate the printer issue on the second floor. Could you provide any specific error messages you're seeing? Also, is it not printing at all, or is there a specific problem with the print quality?",
      feedback: 'positive',
      userComment: 'Great service, thank you!'
    },
    { 
      id: 'conv-012-1', 
      time: '31-01-25 09:20', 
      source: 'Website Chatbot', 
      identifier: 'customer_31jan_0920',
      query: "I forgot my password and can't log in.",
      response: "No problem, I can help you reset your password. Please click on the 'Forgot Password' link on the login page, and you'll receive an email with instructions to create a new password. The email should arrive within a few minutes. If you don't see it, please check your spam folder.",
      feedback: 'negative',
      feedbackCategory: 'technical_issues'
    },
    { 
      id: 'conv-013-1', 
      time: '31-01-25 10:45', 
      source: 'WhatsApp', 
      identifier: '+44 7700 900567',
      query: "What are your store hours today?",
      response: "Our store hours today are 9:00 AM to 8:00 PM. We're open with these same hours Monday through Saturday, and on Sundays we're open from 11:00 AM to 5:00 PM. Is there a specific store location you're inquiring about?"
      // No feedback submitted
    },
    { 
      id: 'conv-014-1', 
      time: '31-01-25 11:30', 
      source: 'Teams', 
      identifier: 'lisa.taylor@company.com',
      query: "How do I access the new marketing materials for the spring campaign?",
      response: "The new marketing materials for the spring campaign are available in the shared Marketing drive under 'Campaigns > Spring 2025'. I can send you a direct link if that would be helpful. You'll need to use your company credentials to access the files.",
      feedback: 'positive',
      userComment: 'Great service, thank you!',
      feedbackCategory: 'helpful'
    },
    { 
      id: 'conv-015-1', 
      time: '31-01-25 13:15', 
      source: 'Website Chatbot', 
      identifier: 'customer_31jan_1315',
      query: "Do you have this jacket in size medium?",
      response: "I'll check our inventory for you. Could you please provide the product name or item number of the specific jacket you're interested in?"
      // No feedback submitted
    },
    { 
      id: 'conv-016-1', 
      time: '31-01-25 14:40', 
      source: 'WhatsApp', 
      identifier: '+44 7700 900890',
      query: "My delivery was supposed to arrive yesterday but it hasn't shown up.",
      response: "I apologize for the delay with your delivery. Let me look into this for you right away. Could you please provide your order number so I can check the status?",
      feedback: 'negative',
      feedbackCategory: 'slow'
    },
    { 
      id: 'conv-017-1', 
      time: '01-02-25 09:10', 
      source: 'Teams', 
      identifier: 'michael.green@company.com',
      query: "Is there a template for the quarterly report?",
      response: "Yes, we have a template for the quarterly report. You can find it in the shared Templates folder on SharePoint. I'll send you the direct link now. The template includes all the required sections and formatting guidelines.",
      feedback: 'positive',
      userComment: 'Great service, thank you!'
    },
    { 
      id: 'conv-018-1', 
      time: '01-02-25 10:25', 
      source: 'Website Chatbot', 
      identifier: 'customer_01feb_1025',
      query: "Can I use multiple discount codes on one order?",
      response: "Unfortunately, our system only allows one discount code per order. However, we always apply the code that gives you the best possible discount. If you have multiple codes, I'd recommend trying each one separately in the cart to see which offers the highest savings.",
      feedback: 'negative',
      feedbackCategory: 'unhelpful'
    },
    { 
      id: 'conv-019-1', 
      time: '01-02-25 11:50', 
      source: 'WhatsApp', 
      identifier: '+44 7700 900345',
      query: "Do you have any gluten-free options on your menu?",
      response: "Yes, we have several gluten-free options! Our menu clearly marks all gluten-free items with a 'GF' symbol. Some popular gluten-free choices include our grilled salmon, quinoa salad, and chocolate torte dessert. Would you like me to email you our full gluten-free menu?",
      feedback: 'positive',
      userComment: 'Great service, thank you!',
      feedbackCategory: 'helpful'
    },
    { 
      id: 'conv-020-1', 
      time: '01-02-25 13:30', 
      source: 'Teams', 
      identifier: 'olivia.martin@company.com',
      query: "How do I connect my laptop to the conference room display?",
      response: "To connect your laptop to the conference room display, you can use either the HDMI cable or connect wirelessly via the AirMedia system. For HDMI, simply plug the cable into your laptop and select the correct input on the display. For wireless connection, connect to the conference room WiFi and follow the instructions shown on the display screen. Let me know if you need more detailed instructions."
    },
    { 
      id: 'conv-021-1', 
      time: '01-02-25 14:55', 
      source: 'Website Chatbot', 
      identifier: 'customer_01feb_1455',
      query: "What's the difference between your basic and premium subscriptions?",
      response: "Our basic subscription includes access to our core content library, standard streaming quality, and usage on one device at a time. The premium subscription offers our full content library including exclusive releases, 4K streaming quality, offline downloads, and simultaneous streaming on up to four devices. The basic plan is $8.99/month, while premium is $14.99/month. Would you like more details on either plan?",
      feedback: 'positive',
      userComment: 'Great service, thank you!'
    },
    { 
      id: 'conv-022-1', 
      time: '01-02-25 16:20', 
      source: 'WhatsApp', 
      identifier: '+44 7700 900678',
      query: "I need to cancel my appointment for tomorrow.",
      response: "I'd be happy to help you cancel your appointment. Could you please provide your name and the time of your scheduled appointment so I can locate it in our system?",
      feedback: 'negative',
      feedbackCategory: 'technical_issues'
    },
    { 
      id: 'conv-023-1', 
      time: '02-02-25 08:40', 
      source: 'Teams', 
      identifier: 'robert.clark@company.com',
      query: "When will the new expense reporting system go live?",
      response: "The new expense reporting system is scheduled to go live on March 1st. There will be training sessions available starting next week. You should have received a calendar invite for your department's training session. If not, please let me know and I'll make sure you're added to the appropriate session.",
      feedback: 'positive',
      userComment: 'Great service, thank you!'
    },
    { 
      id: 'conv-024-1', 
      time: '02-02-25 09:55', 
      source: 'Website Chatbot', 
      identifier: 'customer_02feb_0955',
      query: "How long does shipping usually take?",
      response: "Standard shipping typically takes 3-5 business days within the continental US. Express shipping is available for 1-2 business day delivery. International shipping varies by destination but generally takes 7-14 business days. Please note that these are estimates and actual delivery times may vary based on your location and any potential customs processing for international orders."
    },
    { 
      id: 'conv-025-1', 
      time: '02-02-25 11:15', 
      source: 'WhatsApp', 
      identifier: '+44 7700 900901',
      query: "I think I've been charged twice for my last order.",
      response: "I apologize for the confusion with your charges. Let me look into this for you right away. Could you please provide your order number so I can check our payment records?",
      feedback: 'negative',
      feedbackCategory: 'slow'
    },
    { 
      id: 'conv-026-1', 
      time: '02-02-25 13:40', 
      source: 'Teams', 
      identifier: 'sophia.white@company.com',
      query: "Where can I find the brand guidelines for the new product launch?",
      response: "The brand guidelines for the new product launch are available in the Marketing Resources folder on the shared drive. I'll send you the direct link. The document includes logo usage, color palette, typography guidelines, and approved messaging for all marketing materials.",
      feedback: 'positive',
      userComment: 'Great service, thank you!',
      feedbackCategory: 'helpful'
    },
    { 
      id: 'conv-027-1', 
      time: '02-02-25 15:05', 
      source: 'Website Chatbot', 
      identifier: 'customer_02feb_1505',
      query: "Do you offer gift wrapping?",
      response: "Yes, we do offer gift wrapping services! You can select the gift wrapping option during checkout for an additional $5 per item. We offer several wrapping paper designs and you can also include a personalized message on a gift card. Would you like more information about our gift wrapping options?",
      feedback: 'positive',
      userComment: 'Great service, thank you!'
    },
    { 
      id: 'conv-028-1', 
      time: '02-02-25 16:30', 
      source: 'WhatsApp', 
      identifier: '+44 7700 900123',
      query: "What's the status of my repair? I dropped off my laptop last week.",
      response: "Let me check the status of your repair for you. Could you please provide your repair ticket number or the name under which the laptop was registered for service?"
    },
    { 
      id: 'conv-029-1', 
      time: '03-02-25 09:15', 
      source: 'Teams', 
      identifier: 'thomas.harris@company.com',
      query: "How do I request access to the sales analytics dashboard?",
      response: "To request access to the sales analytics dashboard, you'll need to submit a request through the IT Service Portal. Go to the portal, select 'Access Request' from the service catalog, and choose 'Sales Analytics Dashboard' from the dropdown menu. Your request will be routed to your department head for approval, and then to IT for implementation. Typically, access is granted within 24-48 hours after approval.",
      feedback: 'negative',
      feedbackCategory: 'technical_issues'
    },
    { 
      id: 'conv-030-1', 
      time: '03-02-25 10:40', 
      source: 'Website Chatbot', 
      identifier: 'customer_03feb_1040',
      query: "Can I change the delivery address for my order?",
      response: "Yes, you can change the delivery address for your order if it hasn't been shipped yet. Please log into your account, go to 'Order History', select the relevant order, and click on 'Update Shipping Address'. If you're unable to make the change online, please provide your order number and I can help you update it manually.",
      feedback: 'positive',
      userComment: 'Great service, thank you!'
    }
  ];

  const timeFilters: TimeFilter[] = [
    { value: 'all', label: 'All time' },
    { value: '30d', label: 'Last 30 days' },
    { value: '7d', label: 'Last 7 days' },
    { value: 'today', label: 'Today' },
    { value: 'custom', label: 'Custom range' }
  ];

  const sources = ['all', 'Teams', 'Website Chatbot', 'WhatsApp'];

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleFilterClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleTimeFilterKeyDown = (event: React.KeyboardEvent, index: number) => {
    event.stopPropagation();
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setFocusedTimeFilter((prev) => {
          const next = prev === null ? 0 : (prev + 1) % timeFilters.length;
          (timeFilterRef.current?.children[next] as HTMLElement)?.focus();
          return next;
        });
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusedTimeFilter((prev) => {
          const next = prev === null ? timeFilters.length - 1 : (prev - 1 + timeFilters.length) % timeFilters.length;
          (timeFilterRef.current?.children[next] as HTMLElement)?.focus();
          return next;
        });
        break;
      case 'Tab':
        if (!event.shiftKey && index === timeFilters.length - 1) {
          event.preventDefault();
          (sourceFilterRef.current?.children[0] as HTMLElement)?.focus();
          setFocusedSource(0);
        }
        break;
    }
  };

  const handleSourceFilterKeyDown = (event: React.KeyboardEvent, index: number) => {
    event.stopPropagation();
    
    switch (event.key) {
      case 'ArrowDown':
        event.preventDefault();
        setFocusedSource((prev) => {
          const next = prev === null ? 0 : (prev + 1) % sources.length;
          (sourceFilterRef.current?.children[next] as HTMLElement)?.focus();
          return next;
        });
        break;
      case 'ArrowUp':
        event.preventDefault();
        setFocusedSource((prev) => {
          const next = prev === null ? sources.length - 1 : (prev - 1 + sources.length) % sources.length;
          (sourceFilterRef.current?.children[next] as HTMLElement)?.focus();
          return next;
        });
        break;
      case 'Tab':
        if (event.shiftKey && index === 0) {
          event.preventDefault();
          (timeFilterRef.current?.children[timeFilters.length - 1] as HTMLElement)?.focus();
          setFocusedTimeFilter(timeFilters.length - 1);
        }
        break;
    }
  };

  const handleFilterSelect = (filter: string) => {
    setSelectedFilter(filter);
    if (filter === 'custom') {
      setCustomDateDialog(true);
    }
  };

  const handleSourceSelect = (source: string) => {
    if (source === 'all') {
      setSelectedSources(['all']);
    } else {
      const newSources = selectedSources.filter(s => s !== 'all');
      if (selectedSources.includes(source)) {
        if (newSources.length === 1) {
          setSelectedSources(['all']);
        } else {
          setSelectedSources(newSources.filter(s => s !== source));
        }
      } else {
        setSelectedSources([...newSources, source]);
      }
    }
  };

  const handleRowClick = (id: string) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
    setFocusedRowId(id);
  };

  const getFilteredConversations = (): Conversation[] => {
    let filtered = [...conversations];
    
    // No filtering based on feedback toggle - show all rows regardless

    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(conv => 
        (conv.identifier && conv.identifier.toLowerCase().includes(term)) || 
        conv.query.toLowerCase().includes(term) || 
        conv.response.toLowerCase().includes(term)
      );
    }

    // Filter by source
    if (!selectedSources.includes('all')) {
      filtered = filtered.filter(conv => selectedSources.includes(conv.source));
    }

    // Filter by feedback rating
    if (selectedFeedbackRatings.length > 0) {
      filtered = filtered.filter(conv => 
        conv.feedback && selectedFeedbackRatings.includes(conv.feedback)
      );
    }

    // Filter by feedback category
    if (selectedFeedbackCategories.length > 0) {
      filtered = filtered.filter(conv => 
        conv.feedbackCategory && selectedFeedbackCategories.includes(conv.feedbackCategory)
      );
    }

    // Sort the filtered conversations
    filtered.sort((a, b) => {
      const aValue = a[orderBy as keyof Conversation];
      const bValue = b[orderBy as keyof Conversation];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return order === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      return 0;
    });

    return filtered;
  };

  const filteredConversations = getFilteredConversations();
  const emptyRows = page > 0 
    ? Math.max(0, (1 + page) * rowsPerPage - filteredConversations.length) 
    : 0;

  const visibleRows = filteredConversations.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  const CollapsibleRow: React.FC<{ conversation: Conversation }> = ({ conversation }) => {
    const isExpanded = expandedRows.has(conversation.id);
    
    return (
      <>
        <TableRow 
          sx={{ 
            '&:last-child td, &:last-child th': { border: 0 },
            backgroundColor: focusedRowId === conversation.id ? 'rgba(0, 0, 0, 0.04)' : 'inherit',
            cursor: 'pointer'
          }}
          onClick={() => handleRowClick(conversation.id)}
          onMouseEnter={() => setFocusedRowId(conversation.id)}
          onMouseLeave={() => setFocusedRowId(null)}
        >
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.stopPropagation();
                handleRowClick(conversation.id);
              }}
            >
              {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          {!showFeedback && <TableCell><Typography sx={{ fontSize: '0.875rem', color: 'text.secondary' }}>{conversation.time}</Typography></TableCell>}
          {!showFeedback && (
            <TableCell>
              <Chip 
                label={conversation.source} 
                size="small" 
                variant="outlined"
                sx={{ 
                  color: 'text.secondary',
                  fontSize: '0.875rem',
                  borderColor: 'divider'
                }} 
              />
            </TableCell>
          )}
          {!showFeedback && (
            <TableCell>
              <Typography noWrap={!isExpanded} sx={{ maxWidth: isExpanded ? 'none' : 150, fontSize: '0.875rem', color: 'text.secondary' }}>
                {conversation.identifier}
              </Typography>
            </TableCell>
          )}
          <TableCell>
            <Typography noWrap={!isExpanded} sx={{ maxWidth: 200, fontSize: '0.875rem' }}>
              {conversation.query}
            </Typography>
          </TableCell>
          <TableCell>
            <Typography noWrap={!isExpanded} sx={{ maxWidth: 200, fontSize: '0.875rem' }}>
              {conversation.response}
            </Typography>
          </TableCell>
          {showFeedback && (
            <TableCell>
              {conversation.feedback ? (
                <Chip 
                  label={conversation.feedback === 'positive' ? 'Helpful' : 'Not helpful'} 
                  icon={conversation.feedback === 'positive' 
                    ? <ThumbUpOutlinedIcon color="success" fontSize="medium" /> 
                    : <ThumbDownOutlinedIcon color="error" fontSize="medium" />
                  }
                  sx={{
                    color: conversation.feedback === 'positive' ? 'success.main' : 'error.main',
                    bgcolor: 'transparent',
                    border: 'none',
                    fontSize: '0.95rem',
                    height: 'auto',
                    padding: '4px 0',
                    '& .MuiChip-label': {
                      padding: '0 8px',
                      fontWeight: 500
                    }
                  }}
                />
              ) : (
                <Typography sx={{ fontSize: '0.875rem' }}>None</Typography>
              )}
            </TableCell>
          )}
          {showFeedback && (
            <TableCell>
              {conversation.feedback ? (
                <Chip 
                  label={conversation.feedbackCategory ? 
                    feedbackCategories[conversation.feedback || 'positive'].find(
                      cat => cat.value === conversation.feedbackCategory
                    )?.label || conversation.feedbackCategory : 'Other'}
                  variant="outlined"
                  size="small"
                />
              ) : (
                <Typography sx={{ fontSize: '0.875rem' }}>None</Typography>
              )}
            </TableCell>
          )}
          {showFeedback && (
            <TableCell>
              {conversation.feedback ? (
                !conversation.feedbackCategory && conversation.userComment ? (
                  <Typography noWrap={!isExpanded} sx={{ maxWidth: isExpanded ? 'none' : 150, fontSize: '0.875rem' }}>
                    {conversation.userComment}
                  </Typography>
                ) : (
                  <Typography sx={{ fontSize: '0.875rem' }}>None</Typography>
                )
              ) : (
                <Typography sx={{ fontSize: '0.875rem' }}>None</Typography>
              )}
            </TableCell>
          )}
        </TableRow>

      </>
    );
  };

  // Add additional handlers for feedback toggle and filter reset
  const handleFeedbackToggle = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowFeedback(event.target.checked);
  };

  const handleFeedbackRatingToggle = (rating: string) => {
    setSelectedFeedbackRatings(prevRatings => {
      if (prevRatings.includes(rating)) {
        return prevRatings.filter(r => r !== rating);
      } else {
        return [...prevRatings, rating];
      }
    });
  };

  const handleFeedbackCategoryToggle = (category: string) => {
    setSelectedFeedbackCategories(prevCategories => {
      if (prevCategories.includes(category)) {
        return prevCategories.filter(c => c !== category);
      } else {
        return [...prevCategories, category];
      }
    });
  };

  const handleFilterReset = () => {
    setSelectedFilter('all');
    setSelectedSources(['all']);
    setSelectedFeedbackRatings([]);
    setSelectedFeedbackCategories([]);
    setStartDate(null);
    setEndDate(null);
    setPage(0);
  };

  const handleCustomDateConfirm = () => {
    setCustomDateDialog(false);
    setPage(0);
  };

  const handleCustomDateCancel = () => {
    setCustomDateDialog(false);
    setSelectedFilter('all');
    setStartDate(null);
    setEndDate(null);
    setPage(0);
  };

  return (
    <Card sx={sx}>
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <Box>
            <TextField
              size="small"
              placeholder="Search by identifier, query or response..."
              value={searchTerm}
              onChange={handleSearchChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
              sx={{ width: 500 }}
            />
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <FormControlLabel
              control={<Switch checked={showFeedback} onChange={handleFeedbackToggle} />}
              label={<Typography sx={{ fontSize: '0.875rem', fontWeight: 700 }}>Include feedback</Typography>}
              sx={{ mr: 2 }}
            />
            <Button
              variant="outlined"
              startIcon={<FilterListIcon />}
              onClick={handleFilterClick}
              size="small"
            >
              Filter
            </Button>
          </Box>
        </Box>
        
        {/* Custom Date Dialog */}
        <Dialog open={customDateDialog} onClose={handleCustomDateCancel}>
          <DialogTitle>Select Date Range</DialogTitle>
          <IconButton
            aria-label="close"
            onClick={handleCustomDateCancel}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
          <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={enGB}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 1 }}>
                <TextField
                  label="Start Date"
                  type="date"
                  value={startDate ? startDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => setStartDate(e.target.value ? new Date(e.target.value) : null)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                />
                <TextField
                  label="End Date"
                  type="date"
                  value={endDate ? endDate.toISOString().split('T')[0] : ''}
                  onChange={(e) => setEndDate(e.target.value ? new Date(e.target.value) : null)}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  inputProps={{
                    min: startDate ? startDate.toISOString().split('T')[0] : undefined
                  }}
                />
              </Box>
            </LocalizationProvider>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCustomDateCancel}>Cancel</Button>
            <Button onClick={handleCustomDateConfirm} variant="contained" disabled={!startDate || !endDate}>
              Apply
            </Button>
          </DialogActions>
        </Dialog>
        
        {/* Filter Menu */}
        <Menu
          anchorEl={filterAnchorEl}
          open={Boolean(filterAnchorEl)}
          onClose={handleFilterClose}
          PaperProps={{
            sx: { width: 320, maxHeight: 500, p: 1 }
          }}
        >
          <Box sx={{ p: 1 }}>
            <Typography variant="subtitle1" gutterBottom>Time Period</Typography>
            <Box ref={timeFilterRef} sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
              {timeFilters.map((filter, index) => (
                <MenuItem 
                  key={filter.value}
                  selected={selectedFilter === filter.value}
                  onClick={() => handleFilterSelect(filter.value)}
                  onKeyDown={(e) => handleTimeFilterKeyDown(e, index)}
                  tabIndex={focusedTimeFilter === index ? 0 : -1}
                >
                  <Radio 
                    checked={selectedFilter === filter.value} 
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  {filter.label}
                </MenuItem>
              ))}
            </Box>

            <Divider sx={{ my: 1.5 }} />

            <Typography variant="subtitle1" gutterBottom>Source</Typography>
            <Box ref={sourceFilterRef} sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
              {sources.map((source, index) => (
                <MenuItem 
                  key={source}
                  selected={selectedSources.includes(source)}
                  onClick={() => handleSourceSelect(source)}
                  onKeyDown={(e) => handleSourceFilterKeyDown(e, index)}
                  tabIndex={focusedSource === index ? 0 : -1}
                >
                  <Checkbox 
                    checked={selectedSources.includes(source)} 
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  {source === 'all' ? 'All sources' : source}
                </MenuItem>
              ))}
            </Box>

            {showFeedback && (
              <>
                <Divider sx={{ my: 1.5 }} />
                
                <Typography variant="subtitle1" gutterBottom>Feedback Rating</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                  {feedbackRatings.map(rating => (
                    <MenuItem 
                      key={rating.value}
                      selected={selectedFeedbackRatings.includes(rating.value)}
                      onClick={() => handleFeedbackRatingToggle(rating.value)}
                    >
                      <Checkbox 
                        checked={selectedFeedbackRatings.includes(rating.value)} 
                        size="small"
                        sx={{ mr: 1 }}
                      />
                      {rating.label}
                    </MenuItem>
                  ))}
                </Box>

                <>
                  <Divider sx={{ my: 1.5 }} />
                  
                  <Typography variant="subtitle1" gutterBottom>Feedback Category</Typography>
                  
                  <Typography variant="subtitle2" sx={{ mt: 1, mb: 0.5, color: 'success.main' }}>Positive options</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                    {feedbackCategories.positive.map(category => (
                      <MenuItem 
                        key={category.value}
                        selected={selectedFeedbackCategories.includes(category.value)}
                        onClick={() => handleFeedbackCategoryToggle(category.value)}
                      >
                        <Checkbox 
                          checked={selectedFeedbackCategories.includes(category.value)} 
                          size="small"
                          sx={{ mr: 1 }}
                        />
                        {category.label}
                      </MenuItem>
                    ))}
                  </Box>
                  
                  <Typography variant="subtitle2" sx={{ mt: 1, mb: 0.5, color: 'error.main' }}>Negative options</Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'column', mb: 2 }}>
                    {feedbackCategories.negative.map(category => (
                      <MenuItem 
                        key={category.value}
                        selected={selectedFeedbackCategories.includes(category.value)}
                        onClick={() => handleFeedbackCategoryToggle(category.value)}
                      >
                        <Checkbox 
                          checked={selectedFeedbackCategories.includes(category.value)} 
                          size="small"
                          sx={{ mr: 1 }}
                        />
                        {category.label}
                      </MenuItem>
                    ))}
                  </Box>
                </>
              </>
            )}

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button onClick={handleFilterReset} sx={{ mr: 1 }}>Reset</Button>
              <Button onClick={handleFilterClose} variant="contained">Apply</Button>
            </Box>
          </Box>
        </Menu>

        <Box sx={{ overflowX: 'auto' }}>
          <Table sx={{ minWidth: 650 }} aria-label="conversations table">
            <TableHead>
              <TableRow>
                <TableCell width="50px"></TableCell>
                {!showFeedback && <TableCell sx={{ color: 'text.secondary' }}>Time</TableCell>}
                {!showFeedback && <TableCell>Source</TableCell>}
                {!showFeedback && <TableCell sx={{ color: 'text.secondary' }}>User identifier</TableCell>}
                <TableCell>User query</TableCell>
                <TableCell sx={{ maxWidth: '200px' }}>Assistant response</TableCell>
                {showFeedback && <TableCell>Feedback rating</TableCell>}
                {showFeedback && <TableCell>Feedback category</TableCell>}
                {showFeedback && <TableCell>Feedback comment</TableCell>}
              </TableRow>
            </TableHead>
            <TableBody>
              {visibleRows.map((conversation) => (
                <CollapsibleRow key={conversation.id} conversation={conversation} />
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={showFeedback ? 6 : 6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
        
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredConversations.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </CardContent>
    </Card>
  );
};

export default Feedbacktable2;
