import DashboardIcon from '@mui/icons-material/Dashboard';
import SettingsIcon from '@mui/icons-material/Settings';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { SvgIconComponent } from '@mui/icons-material';

interface MenuItem {
  title: string;
  icon: SvgIconComponent;
  href: string;
}

const Menuitems: MenuItem[] = [
  {
    title: "Dashboard",
    icon: DashboardIcon,
    href: "/app/dashboards/dashboard1",
  },
  {
    title: "Settings",
    icon: SettingsIcon,
    href: "/app/settings",
  },
  {
    title: "Admin",
    icon: AdminPanelSettingsIcon,
    href: "/app/admin",
  },
];

export default Menuitems;
