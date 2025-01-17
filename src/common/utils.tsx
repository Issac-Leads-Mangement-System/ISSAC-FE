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

export const customValidation = (values: any) => {
  if (values.order_basic_info === "mobile") {
    delete values.order_schedule;
  }
  const errors: any = {};

  // Validare pentru order_basic_info
  if (!values.order_basic_info?.former_company) {
    errors.order_basic_info = {
      former_company: "Please add a former company",
    };
  }

  // Validare pentru order_customer_info
  if (!values.order_customer_info?.customer_full_name) {
    errors.order_customer_info = {
      ...errors.order_customer_info,
      customer_full_name: "Please add a customer name",
    };
  }
  if (!values.order_customer_info?.customer_phone) {
    errors.order_customer_info = {
      ...errors.order_customer_info,
      customer_phone: "Please add a customer phone",
    };
  }
  if (!values.order_customer_info?.customer_city) {
    errors.order_customer_info = {
      ...errors.order_customer_info,
      customer_city: "Please add city",
    };
  }
  if (!values.order_customer_info?.customer_street) {
    errors.order_customer_info = {
      ...errors.order_customer_info,
      customer_street: "Please add street",
    };
  }
  if (!values.order_customer_info?.customer_home_number) {
    errors.order_customer_info = {
      ...errors.order_customer_info,
      customer_home_number: "Please add home number",
    };
  }
  if (!values.order_customer_info?.customer_apartment_number) {
    errors.order_customer_info = {
      ...errors.order_customer_info,
      customer_apartment_number: "Please add apartment number",
    };
  }

  // Validare pentru order_schedule
  if (values.order_basic_info?.order_type === "TV") {
    if (!values.order_schedule?.order_supply_date) {
      errors.order_schedule = {
        ...errors.order_schedule,
        order_supply_date: "Please insert date",
      };
    } else if (!new Date(values.order_schedule.order_supply_date)) {
      errors.order_schedule = {
        ...errors.order_schedule,
        order_supply_date: "Invalid date format",
      };
    }

    if (!values.order_schedule?.order_supply_time_range) {
      errors.order_schedule = {
        ...errors.order_schedule,
        order_supply_time_range: "Please select time range",
      };
    }
  }

  // Validare pentru order_customer_payment
  if (!values.order_customer_payment?.order_card_number) {
    errors.order_customer_payment = {
      ...errors.order_customer_payment,
      order_card_number: "Please add a card number",
    };
  }
  if (!values.order_customer_payment?.order_card_expired_date) {
    errors.order_customer_payment = {
      ...errors.order_customer_payment,
      order_card_expired_date: "Please select expired date",
    };
  } else if (!new Date(values.order_customer_payment.order_card_expired_date)) {
    errors.order_customer_payment = {
      ...errors.order_customer_payment,
      order_card_expired_date: "Invalid date format",
    };
  }
  if (!values.order_customer_payment?.order_card_cvv) {
    errors.order_customer_payment = {
      ...errors.order_customer_payment,
      order_card_cvv: "Please add CVV",
    };
  }

  // Validare pentru order_properties
  const properties = values.order_properties || {};
  if (!properties.order_package_id) {
    errors.order_properties = {
      ...errors.order_properties,
      order_package_id: "Please select package offer",
    };
  }
  if (values.order_basic_info?.order_type === "TV") {
    if (!properties.order_monthly_price) {
      errors.order_properties = {
        ...errors.order_properties,
        order_monthly_price: "Please introduce monthly price",
      };
    } else if (isNaN(properties.order_monthly_price)) {
      errors.order_properties = {
        ...errors.order_properties,
        order_monthly_price: "Please introduce a valid number",
      };
    }
    if (!properties.order_installation_price) {
      errors.order_properties = {
        ...errors.order_properties,
        order_installation_price: "Please add price for installation",
      };
    }
    if (!properties.order_installation_payments) {
      errors.order_properties = {
        ...errors.order_properties,
        order_installation_payments: "Please select installation payments",
      };
    }
    if (!properties.tv_streamers) {
      errors.order_properties = {
        ...errors.order_properties,
        tv_streamers: "Please add TV streamers",
      };
    }
    if (!properties.tv_users) {
      errors.order_properties = {
        ...errors.order_properties,
        tv_users: "Please add TV users",
      };
    }
    if (!properties.wifi_extenders) {
      errors.order_properties = {
        ...errors.order_properties,
        wifi_extenders: "Please add WIFI extenders",
      };
    }
  }

  return errors;
};

export const customLoginValidation = (values: any) => {
  const errors: any = {};

  // Validare pentru order_basic_info
  if (!values.email) {
    errors.email = "Email is a required field";
  }

  if (!values.password) {
    errors.password = "Password is a required field";
  }

  return errors;
};

export const customUsersValidation = (values: any) => {
  const errors: any = {};
  if (!values.first_name) {
    errors.first_name = "First name is a required field";
  }

  if (!values.last_name) {
    errors.last_name = "Last name is a required field";
  }

  if (!values.email) {
    errors.email = "Email is a required field";
  }

  if (!values.user_password) {
    errors.user_password = "Password is a required field";
  }

  if (!values.user_role) {
    errors.user_role = "Role is a required field";
  }

  if (!values.team_id) {
    errors.team_id = "Team is a required field";
  }

  return errors;
};
