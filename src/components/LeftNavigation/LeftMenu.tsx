import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/images/logo_new.png";
import { LeftMenuStyle } from "./LeftMenuStyle";

import { useState } from "react";
import NestedList from "./LeftMenu1";

const LeftMenu = ({ className, open }: any) => {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState("");
  const [openChildren, setOpenChildren] = useState(false);

  const openMenu = (open: any) => {
    setOpenChildren(!open);
  };

  return (
    <div className={`${className} issac-container`}>
      <div className="issac-logo-leftbar">
        {open && <img className="issac-img-leftbar" src={Logo} alt="logo" />}
      </div>
      {/* <List>
        {menus.map((menu: any, index: any) => (
          <ListItem
            onClick={() => {
              if (menu.children) {
                openMenu(openChildren);
              } else {
                navigate(menu.route);
                setActiveItem(menu.name);
              }
            }}
            key={menu.name}
            disablePadding
            sx={{ display: "block" }}
            // selected={activeItem === menu.name}
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
              {!openChildren && menu.children && (
                <KeyboardArrowDownIcon onClick={() => openMenu(openChildren)} />
              )}
              {openChildren && menu.children && (
                <KeyboardArrowUpIcon onClick={() => openMenu(openChildren)} />
              )}
            </ListItemButton>
            {openChildren &&
              menu?.children?.map((menu: any) => (
                <ListItem
                  onClick={() => {
                    navigate(menu.route);
                    setActiveItem(menu.name);
                  }}
                  key={menu.name}
                  disablePadding
                  sx={{ display: "block", paddingLeft: "20px" }}
                  // selected={activeItem === menu.name}
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
          </ListItem>
        ))}
      </List> */}
      <NestedList open={open} />
    </div>
  );
};

export default styled(LeftMenu)`
  ${LeftMenuStyle}
`;
