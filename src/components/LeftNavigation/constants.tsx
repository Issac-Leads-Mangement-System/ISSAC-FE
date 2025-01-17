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
    route: "/home",
  },

  {
    name: "עבודות ",
    icon: <WorkIcon />,
    route: "/jobs",
  },

  {
    name: "לידים ",
    icon: <InterpreterModeIcon />,
    children: [
      {
        name: "רשימה ",
        icon: <ListAltIcon />,
        route: "/leads",
      },
      {
        name: "סוגים ",
        icon: <BorderColorIcon />,
        route: "/leads-types",
      },
      {
        name: "סטטוס ",
        icon: <SignalWifiStatusbar4BarIcon />,
        route: "/leads-status",
      },
    ],
  },

  {
    name: "הזמנות ",
    icon: <GradingIcon />,
    children: [
      {
        name: "רשימה ",
        icon: <ListAltIcon />,
        route: "/orders/list",
      },
      {
        name: "סוגים ",
        icon: <InventoryIcon />,
        route: "/orders/package-type",
      },
    ],
  },

  {
    name: "משתמשים ",
    icon: <Groups3Icon />,
    children: [
      {
        name: "רשימה ",
        icon: <ManageAccountsIcon />,
        route: "/users",
      },
      {
        name: "צוותים ",
        icon: <GroupWorkIcon />,
        route: "/team",
      },
    ],
  },
];

export default menus;
