import styled from "styled-components";
import { PageContainer } from "../../../common/PageContainer/page-container";
import { PackageTypeStyle } from "./PackageTypeStyle";
import ordersStore from "../../../store/Orders/orders-store";
import { useEffect, useState } from "react";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import { CustomDataGrid } from "../../../common/CustomDataGrid/custom-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import secondToolbarStore from "../../../store/SecondToolbar/second-tollbar-store";
import { Box, Button, Card, CardContent } from "@mui/material";
import { SearchInput } from "../../../common/Input/SearchInput";
import AddIcon from "@mui/icons-material/Add";
import { addBtnStyle } from "../../../common/utils";
import CustomModal from "../../../common/Modal/CustomModal/CustomModal";
import { PackageTypeModal } from "./PackageTypeModal";
import { ConfirmationModal } from "../../../common/Modal/ConfirmationDialog/ConfirmationDialog";
import { Loader } from "../../../common/Loader/Loader";

const PackageType = () => {
  const {
    getOrders,
    orders,
    orderCount,
    setSearchValue,
    order,
    addOrderType,
    getOrderById,
    updateOrder,
    deleteOrder,
    isLoading,
    pagination,
    setRowsPerPage,
    setPage,
  }: any = ordersStore();
  const [idOrder, setIdOrder] = useState<number | null>(null);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const {
    setSecontToolbarMessage,
    setSecontToolbarPath,
    resetSecondToolbar,
  }: any = secondToolbarStore();
  const [isAddOpenModal, setIsAddOpenModal] = useState(false);

  useEffect(() => {
    setSecontToolbarMessage("PACKAGE TYPES");
    setSecontToolbarPath("ORDERS");
    getOrders();

    return () => {
      resetSecondToolbar();
    };
  }, [getOrders]);

  const handleEditClick = async (id: number) => {
    await getOrderById(id);
    setIdOrder(id);
    setIsAddOpenModal(true);
  };

  const handleDeleteClick = (id: number) => {
    setIdOrder(id);
    setIsConfirmationOpen(true);
  };

  const handleSearchInputChange = (e: any) => {
    setSearchValue(e?.target.value);
    if (!e?.target.value) {
      getOrders(0, 10);
    }
  };

  const addNewPackage = () => {
    setIsAddOpenModal(true);
  };

  const onCloseFct = () => {
    setIsAddOpenModal(false);
  };

  const savePackage = async () => {
    if (idOrder) {
      await updateOrder(idOrder);
    } else {
      await addOrderType();
    }
    setIsAddOpenModal(false);
    await getOrders(0, 10);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmationOpen(false);
  }

  const handleSubmitConfirmationModal = async () => {
    await deleteOrder(idOrder);
    await getOrders(0, 10);
    setIsConfirmationOpen(false);
  }

  const handleChangeRowsPerPage = async (model: any) => {
    try {
      setRowsPerPage(model.pageSize);
      setPage(model.page);
      await getOrders();
    } catch (error) {
      console.error(error);
    }
  };

  const handleChangePage = async (model: any) => {
    setPage(model.page);
    await getOrders();
  };

  const columns: GridColDef<(typeof orders)[number]>[] = [
    {
      field: "package_name",
      headerName: "Package name",
      width: 350,
    },
    { field: "order_type", headerName: "Type", width: 250 },

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
        const { id } = params;
        if (id) {
          return [
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
              icon={<DeleteForeverIcon />}
              label="Delete"
              title="Delete"
              key={id}
              sx={{
                color: "red",
              }}
              className="textPrimary"
              onClick={() => handleDeleteClick(id)}
            />,
          ];
        }
        return [];
      },
    },
  ];

  return (
    <PageContainer>
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

            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Button
                variant="outlined"
                onClick={() => addNewPackage()}
                startIcon={<AddIcon />}
                size="small"
                sx={addBtnStyle}
              >
                Add package
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
          />
        </CardContent>
      </Card>

      {isAddOpenModal && (
        <CustomModal
          isOpen={isAddOpenModal}
          onClose={onCloseFct}
          title="Package type"
        >
          <PackageTypeModal savePackage={savePackage} />
          {/* <JobStatsModal updateStatus={updateStatus}/> */}
        </CustomModal>
      )}

      {isConfirmationOpen && (
        <ConfirmationModal
          open={isConfirmationOpen}
          onClose={handleCloseConfirmationModal}
          onConfirm={handleSubmitConfirmationModal}
          message="Are you sure you want to delete this package?"
          btnName="Yes"
        />
      )}

      {isLoading && <Loader />}
    </PageContainer>
  );
};

export default styled(PackageType)`
  ${PackageTypeStyle}
`;