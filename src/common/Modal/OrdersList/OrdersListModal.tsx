import { Box, Grid2, Paper, Typography } from "@mui/material";

import { generateFormikInputFieldProps } from "../../../forms/formikHelper";
import Input from "../../Input/Input";
import { INPUTS, ROLE } from "../../constants";
import { GridColDef } from "@mui/x-data-grid";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ordersListStore from "../../../store/Orders/orders-list.store";
import { CustomDataGrid } from "../../CustomDataGrid/custom-data-grid";
import dayjs from "dayjs";

export const OrderListModal = () => {
  const { order }: any = ordersListStore();
  const columnsBasicInfo: GridColDef<(typeof order)[number]>[] = [
    {
      field: "customer_id",
      headerName: "תעודת זהות",
      flex: 1,
      minWidth: 170,
      headerAlign: "center", align: "center",
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>{row.order_customer_info.customer_id}</Typography>
        );
      },
    },
    {
      field: "customer_full_name",
      headerName: "שם מלא",
      flex: 1,
      minWidth: 170,
      headerAlign: "center", align: "center",
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>{row.order_customer_info.customer_full_name}</Typography>
        );
      },
    },
    {
      field: "customer_phone",
      headerName: "נייד",
      flex: 1,
      minWidth: 170,
      headerAlign: "center", align: "center",
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>{row.order_customer_info.customer_phone}</Typography>
        );
      },
    },
    {
      field: "customer_phone_2",
      headerName: "נייד נוסף",
      flex: 1,
      minWidth: 170,
      headerAlign: "center", align: "center",
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>{row.order_customer_info.customer_phone_2}</Typography>
        );
      },
    },
    {
      field: "customer_phone_home",
      headerName: "טלפון נייח",
      flex: 1,
      minWidth: 170,
      headerAlign: "center", align: "center",
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>{row.order_customer_info.customer_phone_home}</Typography>
        );
      },
    },
    {
      field: "customer_city",
      headerName: "עיר",
      flex: 1,
      minWidth: 170,
      headerAlign: "center", align: "center",
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>{row.order_customer_info.customer_city}</Typography>
        );
      },
    },
    
    {
      field: "customer_street",
      headerName: "רחוב",
      flex: 1,
      minWidth: 170,
      headerAlign: "center", align: "center",
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>{row.order_customer_info.customer_street}</Typography>
        );
      },
    },
    {
      field: "customer_home_number",
      headerName: "בית",
      flex: 1,
      minWidth: 170,
      headerAlign: "center", align: "center",
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>
            {row.order_customer_info.customer_home_number}
          </Typography>
        );
      },
    },
    {
      field: "customer_apartment_number",
      headerName: "דירה",
      flex: 1,
      minWidth: 170,
      headerAlign: "center", align: "center",
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>
            {row.order_customer_info.customer_apartment_number}
          </Typography>
        );
      },
    },

  ];

  const columnsPayments: GridColDef<(typeof order)[number]>[] = [
    {
      field: "order_card_cvv",
      headerName: "CVV",
            flex: 1,
      minWidth: 170,
      headerAlign: "center", align: "center",
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>{row.order_customer_payment.order_card_cvv}</Typography>
        );
      },
    },
    {
      field: "order_card_expired_date",
      headerName: "תוקף",
            flex: 1,
      minWidth: 170,
      headerAlign: "center", align: "center",
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>
            {dayjs(row.order_customer_payment.order_card_expired_date).format(
              "MM/YY"
            )}
          </Typography>
        );
      },
    },
    {
      field: "order_card_number",
      headerName: "מספר כרטיס",
            flex: 1,
      minWidth: 170,
      headerAlign: "center", align: "center",
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>
            {row.order_customer_payment.order_card_number}
          </Typography>
        );
      },
    },
  ];

  const columnsPropertiesTV: GridColDef<(typeof order)[number]>[] = [
    {
      field: "order_package_name",
      headerName: "חבילה",
      flex: 1,
      minWidth: 170,
      headerAlign: "center", align: "center",
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>{row.order_properties.order_package_name}</Typography>
        );
      },
    },
    {
      field: "order_installation_payments",
      headerName: "תשלומים להתקנה",
      flex: 1,
      minWidth: 170,
      headerAlign: "center", align: "center",
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>
            {row.order_properties.order_installation_payments}
          </Typography>
        );
      },
    },
    {
      field: "order_installation_price",
      headerName: "מחיר התקנה",
      flex: 1,
      minWidth: 170,
      headerAlign: "center", align: "center",
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>
            {row.order_properties.order_installation_price}
          </Typography>
        );
      },
    },
    {
      field: "order_monthly_price",
      headerName: "מחיר חודשי",
      flex: 1,
      minWidth: 170,
      headerAlign: "center", align: "center",
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>{row.order_properties.order_monthly_price}</Typography>
        );
      },
    },
    {
      field: "orders_tv_properties_comment",
      headerName: "הערות",
      flex: 1,
      minWidth: 300,
      headerAlign: "center", align: "center",
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>
            {row.order_properties.orders_tv_properties_comment}
          </Typography>
        );
      },
    },
    {
      field: "tv_streamers",
      headerName: "סטרימרים",
      flex: 1,
      minWidth: 170,
      headerAlign: "center", align: "center",
      renderCell: (params: any) => {
        const { row } = params;
        return <Typography>{row.order_properties.tv_streamers}</Typography>;
      },
    },
    {
      field: "tv_users",
      headerName: "משתמשים",
      flex: 1,
      minWidth: 170,
      headerAlign: "center", align: "center",
      renderCell: (params: any) => {
        const { row } = params;
        return <Typography>{row.order_properties.tv_users}</Typography>;
      },
    },
    {
      field: "wifi_extenders",
      headerName: "מגדילי טווח",
      flex: 1,
      minWidth: 170,
      headerAlign: "center", align: "center",
      renderCell: (params: any) => {
        const { row } = params;
        return <Typography>{row.order_properties.wifi_extenders}</Typography>;
      },
    },
  ];

  const columnsPropertiesMobile: GridColDef<(typeof order)[number]>[] = [
    {
      field: "order_package_name",
      headerName: "חבילה",
      flex: 1,
      minWidth: 170,
      headerAlign: "center", align: "center",
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>{row.order_properties.order_package_name}</Typography>
        );
      },
    },
    {
      field: "order_phone_numbers",
      headerName: "מספרי טלפון",
      flex: 1,
      minWidth: 800,
      headerAlign: "center", align: "center",
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>
            {Array.isArray(row.order_properties.order_phone_numbers) ? row.order_properties.order_phone_numbers.join(" | ") : ""}
          </Typography>
        );
      },
    },
    {
      field: "orders_mobile_properties_comment",
      headerName: "הערות",
      width: 500,
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>
            {row.order_properties.orders_mobile_properties_comment}
          </Typography>
        );
      },
    },
  ];

  const columnsSchedule: GridColDef<(typeof order)[number]>[] = [
    {
      field: "order_supply_comment",
      headerName: "הערות מיוחדות",
            flex: 1,
      minWidth: 170,
      headerAlign: "center", align: "center",
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>{row.order_schedule.order_supply_comment}</Typography>
        );
      },
    },
    {
      field: "order_supply_date",
      headerName: "תאריך התקנה",
            flex: 1,
      minWidth: 170,
      headerAlign: "center", align: "center",
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>
            {dayjs(row.order_schedule.order_supply_date).format("YYYY-MM-DD")}
          </Typography>
        );
      },
    },
    {
      field: "order_supply_time_range",
      headerName: "שעת התקנה",
            flex: 1,
      minWidth: 170,
      headerAlign: "center", align: "center",
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>{row.order_schedule.order_supply_time_range}</Typography>
        );
      },
    },
  ];

  return (
    <Box sx={{ height: "60vh", overflowY: "auto", width: "100%" }}>
      {order.order_customer_info && (
        <Paper elevation={4} sx={{ p: 3, m: 2, borderRadius: 2 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            מידע על הלקוח
          </Typography>
          <CustomDataGrid
            rows={[order]}
            columns={columnsBasicInfo}
            disableRowSelectionOnClick
            disableVirtualization
            hideFooterPagination={true}
          />
        </Paper>
      )}

      {order.order_customer_payment && (
        <Paper elevation={4} sx={{ p: 3, m: 2, borderRadius: 2 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            פרטי תשלום
          </Typography>
          <CustomDataGrid
            rows={[order]}
            columns={columnsPayments}
            disableRowSelectionOnClick
            disableVirtualization
            hideFooterPagination={true}
          />
        </Paper>
      )}

      {order.order_properties && (
        <Paper elevation={4} sx={{ p: 3, m: 2, borderRadius: 2 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            פרטי חבילה
          </Typography>
          <CustomDataGrid
            rows={[order]}
            columns={order.order_type === 'TV' ? columnsPropertiesTV : columnsPropertiesMobile}
            disableRowSelectionOnClick
            disableVirtualization
            hideFooterPagination={true}
          />
        </Paper>
      )}
      {order.order_schedule && (
        <Paper elevation={4} sx={{ p: 3, m: 2, borderRadius: 2 }}>
          <Typography
            variant="h6"
            component="div"
            sx={{ fontWeight: "bold", mb: 2 }}
          >
            מועד התקנה
          </Typography>
          <CustomDataGrid
            rows={[order]}
            columns={columnsSchedule}
            disableRowSelectionOnClick
            disableVirtualization
            hideFooterPagination={true}
          />
        </Paper>
      )}
    </Box>
  );
};
