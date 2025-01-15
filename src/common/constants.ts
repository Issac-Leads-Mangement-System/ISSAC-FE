export const INPUTS = {
  EMAIL: {
    NAME: "email",
    PLACEHOLDER: "Email address",
  },
  PASSWORD: {
    NAME: "password",
    PLACEHOLDER: "Enter password",
  },
  PASSWORD_UER: {
    NAME: "user_password",
    PLACEHOLDER: "Enter password",
  },
  FIRST_NAME: {
    NAME: "first_name",
    PLACEHOLDER: "First name",
  },
  LAST_NAME: {
    NAME: "last_name",
    PLACEHOLDER: "Last name",
  },
  PHONE: {
    NAME: "phone_number",
  },
  ROLE: {
    NAME: "user_role",
  },
  TEAM: {
    NAME: "team_name",
  },
  TEAM_ID: {
    NAME: "team_id",
  },
  LEADS: {
    STATUS: "status_name",
  },
  TYPES: {
    NAME: "type_name",
  },
};

export const FILTER_STATUSES = {
  STATUS_NAME: {
    NAME: "status_name",
    PLACEHOLDER: "Status name",
  },
};

export const ROLE = ["admin", "manager", "employee"];

export const USER_STATUS = ['active', 'inactive'];

export const DUMMY_TEAMS = ["team_barak", "team_issac"];

export const filterBtnStyle = {
  bgcolor: "#17a2b8", // teal color for background
  color: "#fff", // white text
  textTransform: "none",
  "&:hover": {
    bgcolor: "#138496", // slightly darker teal on hover
  },
  marginRight: "5px",
};

export const submitBtnStyle = {
  background: "black",
  color: "white",
  fontSize: "12px",
  fontWeight: 700,
  padding: "6px 15px",
  minHeight: "32px",
  minWidth: "130px",
  border: "none",
  textTransform: "uppercase",
};

export const ORDERS_TYPE = ['TV', 'mobile'];
export const MOBILITY = [{label: "Yes", value: true}, {label: "No", value: false}];

export const STATUSES = [
  { id: "close", name: "close" },
  { id: "open", name: "open" },
];
