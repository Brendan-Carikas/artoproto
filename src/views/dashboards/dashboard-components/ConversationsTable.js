import React, { useState, useRef, useEffect } from 'react';
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
  IconButton,
  TextField,
  Menu,
  MenuItem,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Collapse,
  Divider,
  InputAdornment,
  Tooltip,
  Radio,
  Checkbox
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import ChatIcon from '@mui/icons-material/Chat';
import FilterListIcon from '@mui/icons-material/FilterList';
import SearchIcon from '@mui/icons-material/Search';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import CloseIcon from '@mui/icons-material/Close';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import { useNavigate } from 'react-router-dom';

const ConversationsTable = ({ sx }) => {
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [selectedSources, setSelectedSources] = useState(['all']);
  const [filterAnchorEl, setFilterAnchorEl] = useState(null);
  const [customDateDialog, setCustomDateDialog] = useState(false);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [orderBy, setOrderBy] = useState('time');
  const [order, setOrder] = useState('desc');
  const [expandedRows, setExpandedRows] = useState(new Set());
  const [lastFocusedButtonId, setLastFocusedButtonId] = useState(null);

  const conversations = [
    { 
      id: 'conv-001-1', 
      time: '29-01-25 10:15', 
      source: 'WhatsApp', 
      identifier: '+44 7700 900123',
      query: "Hi, I need to check my order status for #ORD-456789",
      response: "Hello! I'll help you check that order. I can see that order #ORD-456789 is currently scheduled for delivery tomorrow between 2-4 PM. Would you like me to send you the tracking details?"
    },
    { 
      id: 'conv-002-1', 
      time: '29-01-25 10:16', 
      source: 'Teams', 
      identifier: 'sarah.jones@company.com',
      query: "I'm getting an error when trying to access the CRM system. It says 'Authentication Failed' but I'm sure my password is correct.",
      response: "Hi Sarah, I'll help you troubleshoot this. First, could you confirm when you last successfully accessed the CRM? Also, have you recently changed your password or received any password reset emails?"
    },
    { 
      id: 'conv-003-1', 
      time: '29-01-25 10:17', 
      source: 'Website Chatbot', 
      identifier: 'customer_29jan_1017',
      query: "Hello, I'm trying to find the sizing guide for your winter collection.",
      response: "I'll help you find our sizing guide. Are you looking for men's, women's, or children's sizing information?"
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
      response: "Thank you for confirming. I can see there were multiple failed login attempts from a different IP address this morning, which triggered our security protocol. Your account was temporarily locked as a precaution. I can help you unlock it and set up a new password. Would you like to proceed with that?"
    },
    { 
      id: 'conv-004-1', 
      time: '29-01-25 10:21', 
      source: 'WhatsApp', 
      identifier: '+44 7700 900456',
      query: "Hi, my package was supposed to arrive yesterday but it's still not here. Order #DEF-789",
      response: "I apologize for the delay. Let me check the status of your order #DEF-789. I can see there was a delay at our distribution center. Would you like me to expedite the delivery?"
    },
    { 
      id: 'conv-001-3', 
      time: '29-01-25 10:22', 
      source: 'WhatsApp', 
      identifier: '+44 7700 900123',
      query: "Thursday 9-11 AM would be perfect.",
      response: "Great! I've rescheduled your delivery for Thursday between 9-11 AM. You'll receive a confirmation email shortly with the updated tracking information. Is there anything else you need help with?"
    },
    { 
      id: 'conv-003-3', 
      time: '29-01-25 10:23', 
      source: 'Website Chatbot', 
      identifier: 'customer_29jan_1017',
      query: "Yes, could you explain the difference between your regular and relaxed fit?",
      response: "Our regular fit is tailored to be slightly fitted while maintaining comfort, with measurements of [measurements]. The relaxed fit is more generous, designed for a looser feel, with measurements of [measurements]. Which style are you interested in?"
    },
    { 
      id: 'conv-004-2', 
      time: '29-01-25 10:24', 
      source: 'WhatsApp', 
      identifier: '+44 7700 900456',
      query: "Yes please, I really need it by tomorrow.",
      response: "I've arranged for expedited delivery. Your package will be delivered tomorrow before noon. I've also added a £10 credit to your account for the inconvenience. You'll receive a text with the new tracking details shortly."
    },
    { 
      id: 'conv-002-3', 
      time: '29-01-25 10:25', 
      source: 'Teams', 
      identifier: 'sarah.jones@company.com',
      query: "Yes, please. Should I also enable two-factor authentication?",
      response: "That's a great idea! I'll guide you through both processes. First, click the reset link I'm sending now to set your new password. Once that's done, I'll help you set up 2FA using our authenticator app."
    },
    { 
      id: 'conv-003-4', 
      time: '29-01-25 10:26', 
      source: 'Website Chatbot', 
      identifier: 'customer_29jan_1017',
      query: "I think I'll go with the regular fit. Do you have the black wool sweater in stock in size M?",
      response: "Let me check our inventory. Yes, we have the black wool sweater in regular fit, size M in stock! Would you like me to add it to your cart or do you have any other questions about the item?"
    },
    {
      id: 'conv-005-1',
      time: '29-01-25 10:27',
      source: 'Teams',
      identifier: 'mark.wilson@company.com',
      query: "Hi, I need to schedule an urgent meeting with the development team for tomorrow.",
      response: "I'll help you schedule that meeting. What time would work best for you tomorrow, and how long should I block for the meeting?"
    },
    { 
      id: 'conv-002-4', 
      time: '29-01-25 10:28', 
      source: 'Teams', 
      identifier: 'sarah.jones@company.com',
      query: "I've reset my password. What's next for setting up 2FA?",
      response: "Great! Now let's set up 2FA. First, download our authenticator app from the app store. Once installed, open it and click 'Add Account'. I'll send you a QR code to scan in my next message. Let me know when you're ready."
    },
    { 
      id: 'conv-006-1', 
      time: '29-01-25 10:29', 
      source: 'WhatsApp', 
      identifier: '+44 7700 900789',
      query: "Do you have any appointments available for a hair consultation this week?",
      response: "I'll check our salon's availability. We have openings on Wednesday at 2 PM, Thursday at 11 AM, and Friday at 3 PM. Would any of these times work for you?"
    },
    { 
      id: 'conv-003-5', 
      time: '29-01-25 10:30', 
      source: 'Website Chatbot', 
      identifier: 'customer_29jan_1017',
      query: "Yes, please add it to my cart. Can you also check if you have matching wool gloves?",
      response: "I've added the black wool sweater to your cart. For matching gloves, we have wool-blend gloves in black available in S/M and L/XL sizes. Would you like to see the details?"
    },
    { 
      id: 'conv-005-2', 
      time: '29-01-25 10:31', 
      source: 'Teams', 
      identifier: 'mark.wilson@company.com',
      query: "10 AM would be ideal, and we'll need about 90 minutes to cover everything.",
      response: "I've checked the team's calendar. Most developers are available at 10 AM, but Alex has a conflict. Would 11 AM work instead? I can block 90 minutes from 11 AM to 12:30 PM."
    },
    { 
      id: 'conv-006-2', 
      time: '29-01-25 10:32', 
      source: 'WhatsApp', 
      identifier: '+44 7700 900789',
      query: "Thursday at 11 AM would be perfect. What information do you need from me?",
      response: "Great! I'll book that for you. I just need your full name and whether you've visited our salon before. Also, do you have any specific hair concerns you'd like to discuss during the consultation?"
    },
    { 
      id: 'conv-002-5', 
      time: '29-01-25 10:33', 
      source: 'Teams', 
      identifier: 'sarah.jones@company.com',
      query: "I've downloaded the app and I'm ready for the QR code.",
      response: "Perfect! Here's your unique QR code: [QR Code Image]. Once you've scanned it, enter the 6-digit code from the app to complete the setup. This will ensure your account is secure with 2FA."
    },
    { 
      id: 'conv-003-6', 
      time: '29-01-25 10:34', 
      source: 'Website Chatbot', 
      identifier: 'customer_29jan_1017',
      query: "Yes, please show me the gloves in S/M.",
      response: "Here are the details for our black wool-blend gloves in S/M: [Product Details]. They're priced at £25 and feature touchscreen-compatible fingertips. Would you like me to add these to your cart as well?"
    },
    { 
      id: 'conv-005-3', 
      time: '29-01-25 10:35', 
      source: 'Teams', 
      identifier: 'mark.wilson@company.com',
      query: "11 AM works. Could you send the meeting invite to the whole development team?",
      response: "I'll send out the calendar invite right away for tomorrow from 11 AM to 12:30 PM. I'll include all development team members and add the meeting link. Would you like me to add a specific agenda or meeting description?"
    },
    { 
      id: 'conv-006-3', 
      time: '29-01-25 10:36', 
      source: 'WhatsApp', 
      identifier: '+44 7700 900789',
      query: "I'm Emma Thompson, first-time visitor. I'm interested in discussing hair coloring options.",
      response: "Thanks, Emma! I've booked your consultation for Thursday at 11 AM. Our color specialist, Sarah, will be available to discuss various coloring options with you. Would you like me to send you our pre-consultation questionnaire to help us better understand your hair history?"
    },
    { 
      id: 'conv-002-6', 
      time: '29-01-25 10:37', 
      source: 'Teams', 
      identifier: 'sarah.jones@company.com',
      query: "Done! I've entered the code and 2FA is now set up.",
      response: "Excellent! Your account is now secured with 2FA. You'll need to enter a code from the authenticator app each time you log in. Remember to keep your backup codes safe - would you like me to send them to you now?"
    },
    { 
      id: 'conv-003-7', 
      time: '29-01-25 10:38', 
      source: 'Website Chatbot', 
      identifier: 'customer_29jan_1017',
      query: "Yes, please add the gloves too. That should be everything.",
      response: "I've added both the black wool sweater (M) and matching gloves (S/M) to your cart. Your total comes to £125. Would you like to proceed to checkout now, or do you have any questions about shipping or returns?"
    },
  ];

  const sources = ['all', 'Teams', 'Website Chatbot', 'WhatsApp'];

  const timeFilters = [
    { value: 'all', label: 'All time' },
    { value: '30d', label: 'Last 30 days' },
    { value: '7d', label: 'Last 7 days' },
    { value: 'today', label: 'Today' },
    { value: 'custom', label: 'Custom range' },
  ];

  const handleFilterClick = (event) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleFilterClose = () => {
    setFilterAnchorEl(null);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    if (filter === 'custom') {
      setCustomDateDialog(true);
    }
  };

  const handleSourceSelect = (source) => {
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

  const handleCustomDateConfirm = () => {
    setCustomDateDialog(false);
  };

  const handleCustomDateCancel = () => {
    setCustomDateDialog(false);
    setSelectedFilter('all');
    setStartDate(null);
    setEndDate(null);
    setPage(0);
  };

  const getFilteredConversations = () => {
    let filtered = [...conversations];

    // Apply date filter
    if (selectedFilter === 'custom' && startDate && endDate) {
      filtered = filtered.filter(conv => {
        const convDate = new Date(conv.time);
        return convDate >= startDate && convDate <= endDate;
      });
    }

    // Apply source filter
    if (!selectedSources.includes('all')) {
      filtered = filtered.filter(conv => selectedSources.includes(conv.source));
    }

    // Apply search filter
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      filtered = filtered.filter(conv =>
        conv.identifier.toLowerCase().includes(searchTermLower) ||
        conv.query.toLowerCase().includes(searchTermLower) ||
        conv.response.toLowerCase().includes(searchTermLower)
      );
    }

    return filtered;
  };

  const getConversationGroups = (conversations) => {
    const groups = {};
    conversations.forEach(conv => {
      const baseId = conv.id.split('-').slice(0, -1).join('-');
      if (!groups[baseId]) {
        groups[baseId] = [];
      }
      groups[baseId].push(conv);
    });
    return Object.values(groups);
  };

  const sortedConversations = [...getFilteredConversations()].sort((a, b) => {
    const timeA = new Date(a.time.replace(/(\d{2})-(\d{2})-(\d{2})/, '20$3-$2-$1'));
    const timeB = new Date(b.time.replace(/(\d{2})-(\d{2})-(\d{2})/, '20$3-$2-$1'));
    return order === 'asc' ? timeA - timeB : timeB - timeA;
  });

  const handleRowClick = (id) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const handleSortRequest = () => {
    setOrder(order === 'asc' ? 'desc' : 'asc');
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (selectedFilter !== 'all') count++;
    if (!selectedSources.includes('all')) count++;
    return count;
  };

  const handleFilterReset = () => {
    setSelectedFilter('all');
    setSelectedSources(['all']);
    setStartDate(null);
    setEndDate(null);
  };

  const CollapsibleRow = ({ conversation }) => {
    const isExpanded = expandedRows.has(conversation.id);
    const buttonRef = useRef(null);

    useEffect(() => {
      // Restore focus to the last focused button if its ID matches
      if (buttonRef.current && buttonRef.current.id === lastFocusedButtonId) {
        buttonRef.current.focus();
      }
    }, [lastFocusedButtonId]);

    return (
      <TableRow 
        hover 
        onClick={() => handleRowClick(conversation.id)}
        sx={{ 
          cursor: 'pointer',
          '&:hover': {
            backgroundColor: 'action.hover',
          }
        }}
      >
        <TableCell padding="none" sx={{ width: '48px', verticalAlign: 'middle' }}>
          <IconButton
            ref={buttonRef}
            id={`expand-btn-${conversation.id}`}
            size="small"
            onClick={(e) => {
              e.stopPropagation();
              handleRowClick(conversation.id);
              // Store the ID of the currently focused button
              setLastFocusedButtonId(`expand-btn-${conversation.id}`);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                handleRowClick(conversation.id);
                // Store the ID of the currently focused button
                setLastFocusedButtonId(`expand-btn-${conversation.id}`);
              }
            }}
            aria-label={isExpanded ? 'Collapse conversation details' : 'Expand conversation details'}
          >
            {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell sx={{ color: 'text.secondary', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
            {conversation.time}
          </Typography>
        </TableCell>
        <TableCell sx={{ color: 'text.secondary', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
            {conversation.source}
          </Typography>
        </TableCell>
        <TableCell sx={{ color: 'text.secondary', whiteSpace: 'nowrap', verticalAlign: 'middle' }}>
          <Typography sx={{ fontSize: '0.875rem', fontWeight: 500 }}>
            {conversation.identifier}
          </Typography>
        </TableCell>
        <TableCell 
          sx={{ 
            color: 'text.primary',
            width: '30%',
            transition: 'none',
            verticalAlign: 'middle'
          }}
        >
          <Typography 
            sx={{ 
              display: '-webkit-box',
              WebkitLineClamp: {
                xs: isExpanded ? 'unset' : 3,
                sm: isExpanded ? 'unset' : 2
              },
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              fontSize: '0.875rem',
              fontWeight: 500,
              ...((!isExpanded && conversation.query.length > 180) && {
                '&::after': {
                  content: '"..."',
                  display: 'inline',
                }
              })
            }}
          >
            {conversation.query}
          </Typography>
        </TableCell>
        <TableCell 
          sx={{ 
            color: 'text.primary',
            width: '30%',
            transition: 'none',
            verticalAlign: 'middle'
          }}
        >
          <Typography 
            sx={{ 
              display: '-webkit-box',
              WebkitLineClamp: {
                xs: isExpanded ? 'unset' : 3,
                sm: isExpanded ? 'unset' : 2
              },
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              fontSize: '0.875rem',
              fontWeight: 500,
              ...((!isExpanded && conversation.response.length > 180) && {
                '&::after': {
                  content: '"..."',
                  display: 'inline',
                }
              })
            }}
          >
            {conversation.response}
          </Typography>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Card sx={sx}>
      <CardContent>
        <Box sx={{ mt: 2 }}>
          <Box sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <TextField
                size="small"
                placeholder="Search by identifier, query or response..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setPage(0);
                }}
                inputProps={{
                  'aria-label': 'Search conversations'
                }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                  endAdornment: searchTerm && (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="clear search"
                        onClick={() => {
                          setSearchTerm('');
                          setPage(0);
                        }}
                        edge="end"
                        size="small"
                      >
                        <CloseIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{ flexGrow: 1 }}
              />
              <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                <Button
                  variant="outlined"
                  onClick={handleFilterClick}
                  startIcon={<FilterListIcon />}
                >
                  Filter{getActiveFilterCount() > 0 ? ` (${getActiveFilterCount()})` : ''}
                </Button>
              </Box>
              <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
                <IconButton
                  onClick={handleFilterClick}
                  size="small"
                  aria-label="Open filters"
                  sx={{ 
                    border: '1px solid rgba(0, 0, 0, 0.23)', 
                    borderRadius: 1,
                    position: 'relative'
                  }}
                >
                  <FilterListIcon />
                  {getActiveFilterCount() > 0 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: -8,
                        right: -8,
                        backgroundColor: 'primary.main',
                        color: 'primary.contrastText',
                        borderRadius: '50%',
                        width: 20,
                        height: 20,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.75rem',
                      }}
                    >
                      {getActiveFilterCount()}
                    </Box>
                  )}
                </IconButton>
              </Box>
            </Box>
          </Box>

          <Box sx={{ overflowX: 'auto', width: '100%', WebkitOverflowScrolling: 'touch' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell component="td" padding="none" sx={{ width: '48px', verticalAlign: 'middle' }} />
                  <TableCell 
                    component="th"
                    sx={{ 
                      color: 'text.primary', 
                      fontWeight: 600, 
                      whiteSpace: 'nowrap',
                      cursor: 'pointer',
                      '&:hover': {
                        backgroundColor: 'action.hover',
                      },
                      '&:focus': {
                        backgroundColor: 'action.hover',
                        outline: '2px solid',
                        outlineColor: 'primary.main',
                        outlineOffset: '-2px'
                      },
                      verticalAlign: 'middle'
                    }}
                    onClick={handleSortRequest}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault();
                        handleSortRequest();
                      }
                    }}
                    role="button"
                    tabIndex={0}
                    aria-label={`Sort by timeframe, currently sorted ${order === 'asc' ? 'ascending' : 'descending'}`}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', color: 'text.secondary' }}>
                      Timeframe
                      {order === 'asc' ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </Box>
                  </TableCell>
                  <TableCell component="th" sx={{ color: 'text.secondary', fontWeight: 600, whiteSpace: 'nowrap', verticalAlign: 'middle' }}>Source</TableCell>
                  <TableCell component="th" sx={{ color: 'text.secondary', fontWeight: 600, whiteSpace: 'nowrap', verticalAlign: 'middle' }}>User identifier</TableCell>
                  <TableCell component="th" sx={{ color: 'text.primary', fontWeight: 600, verticalAlign: 'middle' }}>User query</TableCell>
                  <TableCell component="th" sx={{ color: 'text.primary', fontWeight: 600, verticalAlign: 'middle' }}>Assistant response</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {sortedConversations
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((conversation) => (
                    <CollapsibleRow key={conversation.id} conversation={conversation} />
                  ))}
              </TableBody>
            </Table>
            <Box sx={{ 
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
              borderTop: '1px solid rgba(0, 0, 0, 0.12)',
            }}>
              <TablePagination
                rowsPerPageOptions={[10, 25, 50, 100]}
                component="div"
                count={sortedConversations.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                  setRowsPerPage(parseInt(event.target.value, 10));
                  setPage(0);
                }}
                sx={{
                  '.MuiTablePagination-select': {
                    backgroundColor: 'background.paper'
                  },
                  '.MuiInputBase-root': {
                    backgroundColor: 'background.paper'
                  },
                  '.MuiSelect-select': {
                    backgroundColor: 'background.paper'
                  }
                }}
              />
            </Box>
          </Box>
        </Box>
      </CardContent>

      {/* Filter Menu */}
      <Menu
        anchorEl={filterAnchorEl}
        open={Boolean(filterAnchorEl)}
        onClose={handleFilterClose}
        onKeyDown={(event) => {
          if (event.key === 'Escape') {
            handleFilterClose();
          }

          // Custom tab handling to focus first item or reset button
          if (event.key === 'Tab') {
            event.preventDefault();
            
            // Check for reset button first
            const resetButton = event.currentTarget.querySelector(
              '.MuiButton-root:not([disabled])'
            );
            
            if (resetButton) {
              resetButton.focus();
              return;
            }

            // If no reset button, focus first menu item
            const menuItems = event.currentTarget.querySelectorAll('.MuiMenuItem-root');
            if (menuItems.length > 0) {
              menuItems[0].focus();
            }
          }
        }}
        MenuListProps={{
          sx: {
            '& .MuiMenuItem-root:focus': {
              backgroundColor: 'action.hover',
              outline: '2px solid',
              outlineColor: 'primary.main',
              outlineOffset: '-2px'
            }
          },
          onKeyDown: (event) => {
            // Custom keyboard navigation
            const menuItems = event.currentTarget.querySelectorAll('.MuiMenuItem-root, .MuiRadio-root');
            const currentIndex = Array.from(menuItems).findIndex(
              item => item === document.activeElement
            );

            if (event.key === 'ArrowDown') {
              event.preventDefault();
              const nextIndex = (currentIndex + 1) % menuItems.length;
              menuItems[nextIndex].focus();
            } else if (event.key === 'ArrowUp') {
              event.preventDefault();
              const prevIndex = (currentIndex - 1 + menuItems.length) % menuItems.length;
              menuItems[prevIndex].focus();
            }
          }
        }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ 
          minWidth: 200, 
          maxHeight: {
            xs: 'calc(100vh - 100px)',
            sm: '400px'
          },
          overflowY: 'auto'
        }}>
          <Box sx={{ p: 1.5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
              <Typography variant="h2" sx={{ mb: 0.5, fontSize: '1rem' }}>
                Time Range
              </Typography>
              <Button
                size="small"
                onClick={handleFilterReset}
                disabled={selectedFilter === 'all' && selectedSources.includes('all') && !startDate && !endDate}
              >
                Reset
              </Button>
            </Box>
            <Stack spacing={0}>
              {timeFilters.map((filter) => (
                <MenuItem
                  key={filter.value}
                  onClick={() => handleFilterSelect(filter.value)}
                  selected={selectedFilter === filter.value}
                  dense
                  sx={{ minHeight: '32px', py: 0.5, '&.Mui-selected': { backgroundColor: 'transparent' }, '&.Mui-selected:hover': { backgroundColor: 'action.hover' } }}
                >
                  <Radio 
                    checked={selectedFilter === filter.value}
                    size="small"
                    sx={{ mr: 1, p: 0.5 }}
                  />
                  {filter.label}
                </MenuItem>
              ))}
            </Stack>
            <Divider 
              aria-hidden="true" 
              role="presentation"
              sx={{ 
                my: 1, 
                borderColor: 'divider' 
              }} 
            />
            <Typography variant="h2" sx={{ mb: 0.5, fontSize: '1rem' }}>
              Source
            </Typography>
            <Typography variant="body1" sx={{ mb: 1, fontSize: '0.875rem' }}>
              Select one or more sources to filter conversations
            </Typography>
            <Stack spacing={0}>
              {sources.map((source) => (
                <MenuItem
                  key={source}
                  onClick={() => handleSourceSelect(source)}
                  selected={selectedSources.includes(source)}
                  dense
                  sx={{ minHeight: '32px', py: 0.5, '&.Mui-selected': { backgroundColor: 'transparent' }, '&.Mui-selected:hover': { backgroundColor: 'action.hover' } }}
                >
                  <Checkbox 
                    checked={selectedSources.includes(source)}
                    size="small"
                    sx={{ mr: 1, p: 0.5 }}
                  />
                  {source === 'all' ? 'All Sources' : source}
                </MenuItem>
              ))}
            </Stack>
          </Box>
        </Box>
      </Menu>

      {/* Custom Date Range Dialog */}
      <Dialog open={customDateDialog} onClose={handleCustomDateCancel}>
        <DialogTitle>
          <Typography variant="h2" sx={{ fontSize: '1.25rem' }}>
            Select Date Range
          </Typography>
        </DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Stack spacing={3} sx={{ mt: 2, minWidth: 300 }}>
              <DatePicker
                label="Start Date"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue)}
                inputFormat="dd/MM/yyyy"
                mask="__/__/____"
                renderInput={(params) => (
                  <TextField {...params} fullWidth size="small" />
                )}
              />
              <DatePicker
                label="End Date"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue)}
                inputFormat="dd/MM/yyyy"
                mask="__/__/____"
                renderInput={(params) => (
                  <TextField {...params} fullWidth size="small" />
                )}
              />
            </Stack>
          </LocalizationProvider>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCustomDateCancel}>Cancel</Button>
          <Button onClick={handleCustomDateConfirm} variant="contained" color="primary">
            Apply
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ConversationsTable;
