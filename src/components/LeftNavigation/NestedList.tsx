import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import menus from "./constants";
import { useNavigate } from "react-router-dom";
import usersStore from "../../store/Users/users-store";

interface MenuItem {
  name: string;
  icon: React.ReactNode;
  route?: string;
  children?: MenuItem[];
  permissions?: any;
}
export default function NestedList({ open }: { open: boolean }) {
  const navigate = useNavigate();
  const { user }: any = usersStore();

  const [openItems, setOpenItems] = React.useState<Record<string, boolean>>({});
  const [selectedItem, setSelectedItem] = React.useState<string | null>(null);

  const handleClick = (item: MenuItem) => {
    if (item.route) {
      navigate(item.route);
    }
    if (item.route) {
      setSelectedItem(item.route);
    }
    if (item.children) {
      setOpenItems((prevOpenItems) => ({
        ...prevOpenItems,
        [item.name]: !prevOpenItems[item.name],
      }));
    }
  };

  const renderListItems = (list: MenuItem[]) => {
    return list.map((item) => {
      return (
        <React.Fragment key={item.name}>
          {item.permissions?.includes(user.user_role) && (
            <>
              <ListItemButton
                sx={{
                  textAlign: "right",
                  minHeight: 48,
                  justifyContent: "center",
                  px: 2.0,
                  color: "white",
                }}
                onClick={() => handleClick(item)}
                selected={selectedItem === item.route}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    ml: open ? 2 : "auto",
                    justifyContent: "center",
                    color: "white",
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.name}
                  sx={{ opacity: open ? 1 : 0 }}
                />
                {item.children ? (
                  openItems[item.name] ? (
                    <ExpandLess />
                  ) : (
                    <ExpandMore />
                  )
                ) : null}
              </ListItemButton>

              {item.children && (
                <Collapse
                  in={openItems[item.name]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding sx={{ pr: 4 }}>
                    {renderListItems(item.children)}
                  </List>
                </Collapse>
              )}
            </>
          )}
        </React.Fragment>
      );
    });
  };
  return (
    <List component="nav" aria-labelledby="nested-list-subheader">
      {renderListItems(menus)}
    </List>
  );
}
