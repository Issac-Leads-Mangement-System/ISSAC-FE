import Groups3Icon from '@mui/icons-material/Groups3';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import GroupWorkIcon from '@mui/icons-material/GroupWork';

const menus: any = [
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
];

export default menus;
