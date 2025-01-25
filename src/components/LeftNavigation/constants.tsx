import Groups3Icon from "@mui/icons-material/Groups3";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import InterpreterModeIcon from "@mui/icons-material/InterpreterMode";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SignalWifiStatusbar4BarIcon from "@mui/icons-material/SignalWifiStatusbar4Bar";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import WorkIcon from "@mui/icons-material/Work";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";
import GradingIcon from "@mui/icons-material/Grading";
import InventoryIcon from "@mui/icons-material/Inventory";
import HomeIcon from "@mui/icons-material/Home";

const menus = [
  {
    name: "בית",
    icon: <HomeIcon />,
    permissions: ['admin', 'manager'],
    route: "/home",
  },

  {
    name: "עבודות ",
    icon: <WorkIcon />,
    permissions: ['admin', 'manager', 'employee'],
    route: "/jobs",
  },

  {
    name: "לידים ",
    icon: <InterpreterModeIcon />,
    permissions: ['admin'],
    children: [
      {
        permissions: ['admin'],
        name: "רשימת לידים",
        icon: "-",
        route: "/leads",
      },
      {
        permissions: ['admin'],
        name: "סוגי לידים",
        icon: "-",
        route: "/leads-types",
      },
      {
        permissions: ['admin'],
        name: "סטטוסים ",
        icon: "-",
        route: "/leads-status",
      },
    ],
  },

  {
    name: "הזמנות ",
    icon: <GradingIcon />,
    permissions: ['admin'],
    children: [
      {
        permissions: ['admin'],
        name: "רשימת הזמנות ",
        icon: "-",
        route: "/orders/list",
      },
      {
        permissions: ['admin'],
        name: "רשימת חבילות",
        icon: "-",
        route: "/orders/package-type",
      },
    ],
  },

  {
    name: "משתמשים ",
    icon: <Groups3Icon />,
    permissions: ['admin', 'manager'],
    children: [
      {
        permissions: ['admin', 'manager'],
        name: "רשימת משתמשים ",
        icon: "-",
        route: "/users",
      },
      {
        permissions: ['admin'],
        name: "רשימת צוותים ",
        icon: "-",
        route: "/team",
      },
    ],
  },
];

export default menus;
