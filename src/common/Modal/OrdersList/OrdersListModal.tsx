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
      field: "customer_full_name",
      headerName: "Customer name",
      width: 350,
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>{row.order_customer_info.customer_full_name}</Typography>
        );
      },
    },
    {
      field: "customer_home_number",
      headerName: "Customer home number",
      width: 350,
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
      field: "customer_phone",
      headerName: "Customer phone",
      width: 350,
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>{row.order_customer_info.customer_phone}</Typography>
        );
      },
    },
    {
      field: "customer_phone_2",
      headerName: "Customer phone 2",
      width: 350,
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>{row.order_customer_info.customer_phone_2}</Typography>
        );
      },
    },
    {
      field: "customer_phone_home",
      headerName: "Customer phone home",
      width: 350,
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>{row.order_customer_info.customer_phone_home}</Typography>
        );
      },
    },

    {
      field: "customer_street",
      headerName: "Customer street",
      width: 350,
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>{row.order_customer_info.customer_street}</Typography>
        );
      },
    },
  ];

  const columnsPayments: GridColDef<(typeof order)[number]>[] = [
    {
      field: "order_card_cvv",
      headerName: "CVV",
      width: 350,
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>{row.order_customer_payment.order_card_cvv}</Typography>
        );
      },
    },
    {
      field: "order_card_expired_date",
      headerName: "Customer home number",
      width: 350,
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
      headerName: "Card number",
      width: 350,
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
      headerName: "Package name",
      width: 350,
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>{row.order_properties.order_package_name}</Typography>
        );
      },
    },
    {
      field: "order_installation_payments",
      headerName: "Installation payments",
      width: 200,
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
      headerName: "Installation price",
      width: 200,
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
      headerName: "Monthly price",
      width: 200,
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>{row.order_properties.order_monthly_price}</Typography>
        );
      },
    },
    {
      field: "orders_tv_properties_comment",
      headerName: "Orders TV comment",
      width: 350,
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
      headerName: "TV streamers",
      width: 200,
      renderCell: (params: any) => {
        const { row } = params;
        return <Typography>{row.order_properties.tv_streamers}</Typography>;
      },
    },
    {
      field: "tv_users",
      headerName: "TV users",
      width: 200,
      renderCell: (params: any) => {
        const { row } = params;
        return <Typography>{row.order_properties.tv_users}</Typography>;
      },
    },
    {
      field: "wifi_extenders",
      headerName: "WIFI extenders",
      width: 200,
      renderCell: (params: any) => {
        const { row } = params;
        return <Typography>{row.order_properties.wifi_extenders}</Typography>;
      },
    },
  ];

  const columnsPropertiesMobile: GridColDef<(typeof order)[number]>[] = [
    {
      field: "order_package_name",
      headerName: "Package name",
      width: 350,
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>{row.order_properties.order_package_name}</Typography>
        );
      },
    },
    {
      field: "order_phone_numbers",
      headerName: "Phone numbers",
      width: 800,
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>
            {Array.isArray(row.order_properties.order_phone_numbers) ? row.order_properties.order_phone_numbers.join(", ") : ""}
          </Typography>
        );
      },
    },
    {
      field: "orders_mobile_properties_comment",
      headerName: "Mobile properties comment",
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
      headerName: "Supply comment",
      width: 350,
      renderCell: (params: any) => {
        const { row } = params;
        return (
          <Typography>{row.order_schedule.order_supply_comment}</Typography>
        );
      },
    },
    {
      field: "order_supply_date",
      headerName: "Supply date",
      width: 350,
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
      headerName: "Time range",
      width: 350,
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
            Basic Info
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
            Payments
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
            Properties
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
            Schedule
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
