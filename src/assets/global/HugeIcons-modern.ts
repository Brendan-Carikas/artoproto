// Replace HugeIcons with Material-UI icons
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { SvgIconProps } from '@mui/material';

// Define the icon type for Material-UI icons
type IconType = React.ComponentType<SvgIconProps>;

// Define the interface for the icon collection
interface IconCollection {
  [key: string]: IconType;
}

// Icon collection for Modern theme using Material-UI icons
export const ModernHugeIcons: IconCollection = {
  Home: HomeOutlinedIcon,
  Person: PersonOutlineOutlinedIcon,
  Settings: SettingsOutlinedIcon,
  Dashboard: DashboardOutlinedIcon,
  Wallet: AccountBalanceWalletOutlinedIcon,
  Cart: ShoppingCartOutlinedIcon,
  Document: DescriptionOutlinedIcon,
  Chart: InsertChartOutlinedIcon,
  Email: EmailOutlinedIcon,
  Notifications: NotificationsNoneOutlinedIcon,
  Logout: ExitToAppOutlinedIcon,
  Menu: MenuOutlinedIcon,
  Search: SearchOutlinedIcon,
  Add: AddOutlinedIcon,
  Delete: DeleteOutlineOutlinedIcon,
  Edit: EditOutlinedIcon,
};

export default ModernHugeIcons;
