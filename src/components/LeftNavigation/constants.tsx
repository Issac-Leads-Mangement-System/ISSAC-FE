import Groups3Icon from "@mui/icons-material/Groups3";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import InterpreterModeIcon from "@mui/icons-material/InterpreterMode";
import ListAltIcon from "@mui/icons-material/ListAlt";
import SignalWifiStatusbar4BarIcon from "@mui/icons-material/SignalWifiStatusbar4Bar";
import BorderColorIcon from "@mui/icons-material/BorderColor";
import WorkIcon from "@mui/icons-material/Work";
import FeaturedPlayListIcon from "@mui/icons-material/FeaturedPlayList";

const menus = [
  {
    name: "Users",
    icon: <Groups3Icon />,
    children: [
      {
        name: "List",
        icon: <ManageAccountsIcon />,
        route: "/users",
      },
      {
        name: "Teams",
        icon: <GroupWorkIcon />,
        route: "/team",
      },
    ],
  },
  {
    name: "Leads",
    icon: <InterpreterModeIcon />,
    children: [
      {
        name: "List",
        icon: <ListAltIcon />,
        route: "/leads",
      },
      {
        name: "Types",
        icon: <BorderColorIcon />,
        route: "/leads-types",
      },
      {
        name: "Status",
        icon: <SignalWifiStatusbar4BarIcon />,
        route: "/leads-status",
      },
    ],
  },
  {
    name: "Jobs",
    icon: <WorkIcon />,
    route: "/jobs",
    // children: [
    //   {
    //     name: "Job",
    //     icon: <FeaturedPlayListIcon />,
    //     route: "/jobs",
    //   },
    // ],
  },
];

export default menus;
