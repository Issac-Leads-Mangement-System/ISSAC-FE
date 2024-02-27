import PersonIcon from "@mui/icons-material/Person";
import DescriptionIcon from "@mui/icons-material/Description";
import EditNoteIcon from "@mui/icons-material/EditNote";
import GroupsIcon from "@mui/icons-material/Groups";

const menus: any = [
  {
    name: "Users",
    icon: <PersonIcon />,
    children: [
      {
        name: "Users list",
        icon: <PersonIcon />,
        route: "/users",
      },
      {
        name: "Team list",
        icon: <GroupsIcon />,
        route: "/team",
      },
    ],
  },
  // {
  //   name: "Jobs",
  //   icon: <EditNoteIcon />,
  //   route: "/admin",
  // },
  // {
  //   name: "Leads",
  //   icon: <DescriptionIcon />,
  //   children: [
  //     {
  //       name: "submenu 1",
  //       icon: <EditNoteIcon />,
  //       route: "/admin",
  //     },
  //   ],
  // },
];

export default menus;
