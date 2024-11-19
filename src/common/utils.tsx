import {
  CSSObject,
  ListItem,
  TableCell,
  TableRow,
  Theme,
  styled,
  tableCellClasses,
} from "@mui/material";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import MuiDrawer from "@mui/material/Drawer";
import { Severity } from "../store/Notification/notification-store";

const drawerWidth = 220;

const openedMixin = (theme: Theme): CSSObject => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(10)} + 1px)`,
  },
});

export const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

export const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop: any) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export const StyledTableCell = styled(TableCell)(({ theme }): any => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#38454a",
    paddingTop: "8px",
    paddingBottom: "8px",
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
  "&:th": {
    borderRight: "2px solid rgb(9, 9, 9)",
  },
}));

export const StyledTableRow = styled(TableRow)((): any => ({
  "&:nth-of-type(even)": {},
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

export const List = styled(ListItem)({
  // selected and (selected + hover) states
  "&& .MuiListItemButton-root, && .MuiListItemButton-root:hover": {
    backgroundColor: "red",
    "&, & .MuiListItemIcon-root": {
      color: "pink",
    },
  },
  // hover states
  "& .MuiListItemButton-root:hover": {
    backgroundColor: "orange",
    "&, & .MuiListItemIcon-root": {
      color: "yellow",
    },
  },
});

export const getSeverityLevel = (statusCode: number): Severity => {
  if (typeof statusCode === "string") {
    return "error";
  }

  if (statusCode >= 200 && statusCode <= 299) {
    return "success";
  } else if (
    (statusCode >= 100 && statusCode <= 199) ||
    (statusCode >= 300 && statusCode <= 399)
  ) {
    return "info";
  } else if (statusCode >= 400 && statusCode <= 499) {
    return "warning";
  } else if (statusCode >= 500 && statusCode <= 599) {
    return "error";
  } else {
    return "error";
  }
};

export const addBtnStyle = {
  bgcolor: "#2bb89b",
  color: "#fff",
  border: "none",
  textTransform: "none",
  "&:hover": {
    bgcolor: "#2bb89b",
  },
};
