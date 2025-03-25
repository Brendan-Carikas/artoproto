#!/bin/bash

# Remove unnecessary dashboard files
rm -f src/views/dashboards/AdminDashboard.js
rm -f src/views/dashboards/ConvoDashboard.js
rm -f src/views/dashboards/Dashboard1.js
rm -f src/views/dashboards/ConvoDashboard2.js # We have the TypeScript version

# Remove unnecessary dashboard components
rm -f src/views/dashboards/dashboard-components/SupportQueriesCard.js
rm -f src/views/dashboards/dashboard-components/FeedbackTable.js
rm -f src/views/dashboards/dashboard-components/WhatsappCard.js
rm -f src/views/dashboards/dashboard-components/Feedbacktable2.js # We have the TypeScript version
rm -f src/views/dashboards/dashboard-components/CreditCard.js
rm -f src/views/dashboards/dashboard-components/ConversationsTable.js
rm -f src/views/dashboards/dashboard-components/PlanCard.js

# Remove unnecessary layouts
rm -f src/layouts/ConversationLayout/ConversationLayout.js

# Remove unnecessary views
rm -rf src/views/FormElements
rm -rf src/views/FormLayouts
rm -rf src/views/Settings
rm -rf src/views/tables
rm -rf src/views/admin

echo "Cleanup completed successfully!"
