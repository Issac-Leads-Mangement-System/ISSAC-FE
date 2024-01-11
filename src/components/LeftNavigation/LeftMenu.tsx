import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo_new.png";
import menus from "./constants";
import { LeftMenuStyle } from "./LeftMenuStyle";

const LeftMenu = ({ className, open }: any) => {
  const navigate = useNavigate();
  return (
    <div className={`${className} issac-container`}>
      <div className="issac-logo-leftbar">
        {open && <img className="issac-img-leftbar" src={Logo} alt="logo" />}
      </div>
      <List>
        {menus.map((menu: any, index: any) => (
          <ListItem
            onClick={() => {
              navigate(menu.route);
            }}
            key={menu.name}
            disablePadding
            sx={{ display: "block" }}
          >
            <ListItemButton
              sx={{
                minHeight: 48,
                justifyContent: "center",
                px: 2.0,
                color: "white",
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 2 : "auto",
                  justifyContent: "center",
                  color: "white",
                }}
              >
                {menu.icon}
              </ListItemIcon>
              <ListItemText
                primary={menu.name}
                sx={{ opacity: open ? 1 : 0 }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default styled(LeftMenu)`
  ${LeftMenuStyle}
`;
