import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import EditNoteIcon from "@mui/icons-material/EditNote";

const menus: any = [
  {
    name: "Users",
    icon: <PersonIcon />,
    route: "/users",
  },
  {
    name: "Jobs",
    icon: <EditNoteIcon />,
    route: "/admin",
  },
  {
    name: "Leads",
    icon: <DescriptionIcon />,
    route: "/admin",
  },
];

export default menus;
