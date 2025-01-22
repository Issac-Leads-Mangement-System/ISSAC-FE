import { useCallback, useEffect, useState } from "react";
import { Box, Button, Card, CardContent } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import TaskAltIcon from "@mui/icons-material/TaskAlt";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import styled from "styled-components";

import { PageContainer } from "../../../common/PageContainer/page-container";
import { SearchInput } from "../../../common/Input/SearchInput";

import { CustomDataGrid } from "../../../common/CustomDataGrid/custom-data-grid";
import CustomModal from "../../../common/Modal/CustomModal/CustomModal";
import { Loader } from "../../../common/Loader/Loader";

import secondToolbarStore from "../../../store/SecondToolbar/second-tollbar-store";
import ordersListStore from "../../../store/Orders/orders-list.store";

import { ListStyle } from "./ListStyle";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { ConfirmationModal } from "../../../common/Modal/ConfirmationDialog/ConfirmationDialog";
import { JobStatsCreateOrderModal } from "../../JobStats/JobStatsCreateOrderModal";
import { GenericAddEditForm } from "../../../common/forms-generic-ad-edit/GenericAdEditForm";
import {
  ICreateOrderModalSchema,
  initialValues,
} from "../../../forms/createOrderSchema";
import { filterBtnStyle, submitBtnStyle } from "../../../common/constants";
import dayjs from "dayjs";
import { OrderListModal } from "../../../common/Modal/OrdersList/OrdersListModal";
import FilterListIcon from "@mui/icons-material/FilterList";
import Filters from "../../../components/Filters/filters";
import { FilterOrders } from "../../../common/forms-filters/FilterOrders";
import usersStore from "../../../store/Users/users-store";
import jobsStore from "../../../store/Jobs/jobs-store";
import { customValidation } from "../../../common/utils";

const OrdersList = ({ className }: any) => {
  const {
    getOrders,
    orders,
    orderCount,
    setSearchValue,
    getOrderById,
    updateOrder,
    closeOrder,
    isLoading,
    pagination,
    setRowsPerPage,
    setPage,
    resetFilters,
  }: any = ordersListStore();
  const {
    setSecontToolbarMessage,
    setSecontToolbarPath,
    resetSecondToolbar,
  }: any = secondToolbarStore();
  const { getUserTeam }: any = jobsStore();
  const { getUsers } :any = usersStore();

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [idOrder, setIdOrder] = useState<number | null>(null);
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [isViewDetails, setIsViewDetails] = useState<boolean>(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [initialFormValues, setInitialFormValues] =
    useState<ICreateOrderModalSchema>({
      ...initialValues,
    });

  useEffect(() => {
    setSecontToolbarMessage("ORDERS");
    setSecontToolbarPath("LIST");
    getOrders();
    getUsers(0, 50);

    return () => {
      resetSecondToolbar();
    };
  }, [getOrders]);

  const handleSearchInputChange = (e: any) => {
    setSearchValue(e?.target.value);
    if (!e?.target.value) {
      getOrders();
    }
  };

  const handleChangeRowsPerPage = async (model: any) => {
    try {
      setRowsPerPage(model.pageSize);
      setPage(model.page);
      await getOrders();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = (id: number) => {
    // setIdOrder(id);
  };

  const handleEditClick = useCallback(
    async (id: number) => {
      // Fetch user data by ID
      setIsEdit(true);
      await getOrderById(id);
      const order = ordersListStore.getState().order;
      setInitialFormValues(order);
    },
    [getOrderById]
  );

  // const handleEditClick = async (id: number) => {
  //   setIsEdit(true);
  //   await getOrderById(id);
  //   setInitialFormValues(order);
  //   // setIdOrder(id);
  //   // setIsAddOpenModal(true);
  // };

  const handleChangePage = async (model: any) => {
    setPage(model.page);
    await getOrders();
  };

  const handleUpdateOrderStatusClick = (id: number) => {
    setIsConfirmationOpen(true);
    setIdOrder(id);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationOpen(false);
  };

  const handleSubmitConfirmationModal = async () => {
    await closeOrder(idOrder);
    await getOrders();
    setIsConfirmationOpen(false);
  };

  const onCloseFct = () => {
    setIsEdit(false);
    setIsViewDetails(false);
  };

  const handleViewDetails = async (id: any) => {
    await getOrderById(id);
    setIsViewDetails(true);
  };

  const handleSubmitModal = async (values: any) => {
    // delete unecessarly values
    delete values.created_time;
    delete values.former_company;
    delete values.lead_id;
    delete values.lead_job_id;
    delete values.mobility;
    delete values.order_status;
    delete values.order_type;
    delete values.user_id;
    delete values.user_name;
    const idOrder = values.id;
    delete values.id;
    values.order_customer_payment.order_card_expired_date = dayjs(
      values.order_customer_payment.order_card_expired_date
    ).format("MM/YY");
    values.order_schedule.order_supply_date = dayjs(
      values.order_schedule.order_supply_date
    ).format("YYYY-MM-DD");
    await updateOrder(idOrder, values);
    await getOrders();
    setIsEdit(false);
  };

  const handleFiltersClose = () => {
    setIsFilterOpen(false);
  };

  const handleFilter = async () => {
    await getOrders();
    setIsFilterOpen(false);
  };

  const resetFilter = () => {
    resetFilters();
  };

  const columns: GridColDef<(typeof orders)[number]>[] = [
    {
      field: "lead_id",
      headerName: "Lead id",
      flex: 1,
      minWidth: 200,
      headerAlign: "center", align: "center",
    },
    { field: "created_time", headerName: "Created time",  flex: 1,
      minWidth: 200,
      headerAlign: "center", align: "center", },
    {
      field: "order_status",
      headerName: "Order Status",
      flex: 1,
      minWidth: 200,
      headerAlign: "center", align: "center",
      cellClassName: (params) => {
        if (params.value === "close") return "row-closed";
        if (params.value === "open") return "row-open";
        if (params.value === "in progress") return "row-in-progress";
        return "";
      },
    },
    { field: "order_type", headerName: " Order Type",  flex: 1,
      minWidth: 200,
      headerAlign: "center", align: "center", },
    { field: "user_name", headerName: "User",  flex: 1,
      minWidth: 200,
      headerAlign: "center", align: "center", },
    { field: "former_company", headerName: "Former",  flex: 1,
      minWidth: 200,
      headerAlign: "center", align: "center", },
    {
      field: "mobility",
      headerName: "Mobility",
      flex: 1,
      minWidth: 200,
      headerAlign: "center", align: "center",
      renderCell: (params: any) => {
        const { row } = params;
        return [
          row.mobility ? (
            <CheckIcon color="success" />
          ) : (
            <CloseIcon color="error" />
          ),
        ];
      },
    },
    {
      field: "actions",
      type: "actions",
      flex: 1,
      minWidth: 200,
      headerAlign: "center", align: "center",
      editable: false,
      renderHeader: () => <strong>{"Actions "}</strong>,
      filterable: false,
      cellClassName: "pinned-column",
      headerClassName: "MuiDataGrid-columnHeader--pinned",
      getActions: (params: any) => {
        const { id, row } = params;
        if (id) {
          return [
            <GridActionsCellItem
              icon={<VisibilityIcon />}
              label="View more columns"
              title="View more columns"
              key={id}
              sx={{
                color: "black",
              }}
              className="textPrimary"
              onClick={() => handleViewDetails(id)}
            />,

            <GridActionsCellItem
              icon={<ManageAccountsIcon />}
              label="Edit"
              title="Edit"
              key={id}
              sx={{
                color: "black",
              }}
              className="textPrimary"
              onClick={() => handleEditClick(id)}
              disabled={row.order_status === "close"}
            />,
            <GridActionsCellItem
              icon={<TaskAltIcon />}
              label="Close job"
              title="Close job"
              key={id}
              sx={{
                color: "#6ac250",
              }}
              className="textPrimary"
              onClick={() => handleUpdateOrderStatusClick(id)}
              disabled={row.order_status === "close"}
            />,
          ];
        }
        return [];
      },
    },
  ];

  return (
    <PageContainer>
      <div className={`${className}`}>
        <Card>
          <CardContent>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingBottom: 2,
              }}
            >
              <SearchInput
                onChange={(event: any) => {
                  handleSearchInputChange(event);
                }}
                onKeyDown={(event: React.KeyboardEvent<HTMLInputElement>) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    getOrders();
                  }
                }}
              />

              <Box dir="ltr" sx={{ display: "flex", alignItems: "center" }}>
                <Button
                  variant="outlined"
                  onClick={() => setIsFilterOpen(true)}
                  startIcon={<FilterListIcon />}
                  size="small"
                  sx={filterBtnStyle}
                >
                מסננים
                </Button>
              </Box>
            </Box>

            <CustomDataGrid
              rows={orders}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              rowCount={orderCount}
              pageSizeOptions={[5, 10, 25, 50]}
              disableRowSelectionOnClick
              disableVirtualization
              paginationMode="server"
              onPaginationModelChange={(model: any) => {
                if (model.pageSize !== pagination.pageSize) {
                  handleChangeRowsPerPage(model);
                }
                if (model.page !== pagination.page) {
                  handleChangePage(model);
                }
              }}
              style={{
                maxHeight: "75vh",
                overflow: "auto",
              }}
            />
          </CardContent>
        </Card>
      </div>

      {isEdit && (
        <CustomModal isOpen={isEdit} onClose={onCloseFct} title="Edit order">
          <GenericAddEditForm
            initialValues={initialFormValues}
            validationSchema={customValidation}
            apiRequest={handleSubmitModal}
            hasSubmitButton={true}
            submitBtnName={"save"}
            form={(formProps: any) => (
              <JobStatsCreateOrderModal
                formProps={formProps}
                createOrderType={"TV"}
              />
            )}
            btnStyle={submitBtnStyle}
          />
        </CustomModal>
      )}

      {isConfirmationOpen && (
        <ConfirmationModal
          open={isConfirmationOpen}
          onClose={handleCloseConfirmationModal}
          onConfirm={handleSubmitConfirmationModal}
          message="Are you sure you want to close this order?"
          btnName="Yes"
        />
      )}

      {isLoading && <Loader />}

      {isViewDetails && (
        <CustomModal
          isOpen={isViewDetails}
          onClose={onCloseFct}
          title="View details"
          minWidth="300px"
        >
          <OrderListModal />
        </CustomModal>
      )}

      {isFilterOpen && (
        <Filters
          open={isFilterOpen}
          onClose={handleFiltersClose}
          handleFilter={handleFilter}
          resetFilter={resetFilter}
        >
          <FilterOrders />
        </Filters>
      )}
    </PageContainer>
  );
};
export default styled(OrdersList)`
  ${ListStyle}
`;
