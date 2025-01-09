import { useEffect, useState } from "react";
import { Box, Card, CardContent } from "@mui/material";
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

const OrdersList = ({ className }: any) => {
  const {
    getOrders,
    orders,
    orderCount,
    setSearchValue,
    order,
    getOrderById,
    updateOrder,
    deleteOrder,
    isLoading,
    pagination,
    setRowsPerPage,
    setPage,
  }: any = ordersListStore();
  const {
    setSecontToolbarMessage,
    setSecontToolbarPath,
    resetSecondToolbar,
  }: any = secondToolbarStore();

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);

  useEffect(() => {
    setSecontToolbarMessage("ORDERS");
    setSecontToolbarPath("LIST");
    getOrders();

    return () => {
      resetSecondToolbar();
    };
  }, [getOrders]);

  const handleSearchInputChange = (e: any) => {
    setSearchValue(e?.target.value);
    if (!e?.target.value) {
      getOrders(0, 10);
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
    // setIsConfirmationOpen(true);
  };

  const handleEditClick = async (id: number) => {
    await getOrderById(id);
    // setIdOrder(id);
    // setIsAddOpenModal(true);
  };

  const handleChangePage = async (model: any) => {
    setPage(model.page);
    await getOrders();
  };

  const handleUpdateOrderStatusClick = (id: number) => {
    // console.log("click here", id);
    setIsConfirmationOpen(true);
    // setKey("activeJob", id);
  };

  const columns: GridColDef<(typeof orders)[number]>[] = [
    {
      field: "lead_id",
      headerName: "Lead id",
      width: 350,
    },
    {
      field: "order_status",
      headerName: "Order Status",
      width: 150,
      cellClassName: (params) => {
        if (params.value === "close") return "row-closed";
        if (params.value === "open") return "row-open";
        if (params.value === "in progress") return "row-in-progress";
        return "";
      },
    },
    { field: "order_type", headerName: " Order Type", width: 250 },
    { field: "user_name", headerName: "User", width: 250 },
    { field: "former_company", headerName: "Former", width: 250 },
    {
      field: "mobility",
      headerName: "Mobility",
      width: 250,
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
      width: 150,
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
              onClick={() => handleEditClick(id)}
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
            />,

            <GridActionsCellItem
              icon={<TaskAltIcon />}
              label="Close job"
              title="Close job"
              key={id}
              disabled={row.job_status === "close"}
              className="textPrimary"
              onClick={() => handleUpdateOrderStatusClick(id)}
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
                    //   getOrders();
                  }
                }}
              />
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
            />
          </CardContent>
        </Card>
      </div>

      {/* {isAddOpenModal && (
        <CustomModal
          isOpen={isAddOpenModal}
          onClose={onCloseFct}
          title="Package type"
        >
          <PackageTypeModal savePackage={savePackage} />
        </CustomModal>
      )} */}

      {/* {isConfirmationOpen && (
        <ConfirmationModal
          open={isConfirmationOpen}
          onClose={handleCloseConfirmationModal}
          onConfirm={handleSubmitConfirmationModal}
          message="Are you sure you want to delete this package?"
          btnName="Yes"
        />
      )} */}

      {isLoading && <Loader />}
    </PageContainer>
  );
};
export default styled(OrdersList)`
  ${ListStyle}
`;
