import React, { useCallback, useEffect, useState } from "react";
import { Box, Button, Card, CardContent, MenuItem } from "@mui/material";
import { GridActionsCellItem, GridColDef } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import FilterListIcon from "@mui/icons-material/FilterList";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

import styled from "styled-components";

import CustomModal from "../../common/Modal/CustomModal/CustomModal";
import { GenericAddEditForm } from "../../common/forms-generic-ad-edit/GenericAdEditForm";
import {
  ILeadsModalSchema,
  initialValues,
  validationLeadsSchema,
} from "../../forms/leadsModalSchema";
import { filterBtnStyle, submitBtnStyle } from "../../common/constants";
import { ConfirmationModal } from "../../common/Modal/ConfirmationDialog/ConfirmationDialog";
import { SearchInput } from "../../common/Input/SearchInput";
import secondToolbarStore from "../../store/SecondToolbar/second-tollbar-store";
import { LeadsStyle } from "./LeadsStyle";
import leadsStore from "../../store/Leads/leads-store";
import { LeadsForm } from "../../common/Modal/Leads/LeadsForm";
import leadsTypesStore from "../../store/Leads/types-store";
import leadsStatusesStore from "../../store/Leads/statuses-store";
import Filters from "../../components/Filters/filters";
import { FilterLeads } from "../../common/forms-filters/FilterLeads";
import { addBtnStyle, customLeads } from "../../common/utils";
import { CustomDataGrid } from "../../common/CustomDataGrid/custom-data-grid";
import { StyledMenu } from "../../common/CustomMenu/custom-menu";
import { PageContainer } from "../../common/PageContainer/page-container";
import HistoryToggleOffIcon from "@mui/icons-material/HistoryToggleOff";
import { LeadsHistory } from "../../common/Modal/LeadsHistory/LeadsHistory";
import { Loader } from "../../common/Loader/Loader";

const Leads = () => {
  const [open, setOpen] = useState(false);
  const [id, setId] = useState<null | number>(null);
  const {
    leads,
    lead,
    getLeads,
    setSearchValue,
    getLeadById,
    saveLeads,
    updateLeads,
    count,
    setRowsPerPage,
    pagination,
    setPage,
    deleteLeads,
    resetFilters,
    resetPagination,
    isLoading,
  }: any = leadsStore();
  const {
    setSecontToolbarMessage,
    setSecontToolbarPath,
    resetSecondToolbar,
  }: any = secondToolbarStore();
  const { getTypes }: any = leadsTypesStore();
  const { getStatus }: any = leadsStatusesStore();
  const [initialFormValues, setInitialFormValues] = useState<ILeadsModalSchema>(
    {
      ...initialValues,
    }
  );

  const modalTitle = id ? "Edit Leads" : "Add New Lead";
  const submitBtnName = id ? "Update" : "Add Lead";

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [typeOfAdd, setTypeOfAdd] = useState(false);
  const [idHistory, setIdHistory] = useState(null);
  const [checkboxSelection, setCheckboxSelection] = useState(true);
  const [disableMultipleRowSelection, setDisableMultipleRowSelection] =
    useState(false);
  const [idsRowSelection, setIdsRowSelection] = useState<string[]>([]);
  const openOption = Boolean(anchorEl);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDeleteClick = (id: any) => {
    // setId(id);
    setIdsRowSelection([id]);
    setIsModalOpen(true);
  };

  
  // Handle delete
  const handleDelete = async () => {
    setIdsRowSelection(idsRowSelection)
    setIsModalOpen(true)
    // await deleteLeads(idsRowSelection);
    // await getLeads();
  };

  const handleConfirmDelete = async () => {
    await deleteLeads(idsRowSelection);
    await getLeads();
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleEditClick = useCallback(
    async (id: number) => {
      setTypeOfAdd(false);

      try {
        await getLeadById(id);
        const { lead } = leadsStore.getState();
        lead.type_id = lead.lead_type.lead_type_id;
        lead.lead_status_id = lead.lead_status.lead_status_id;
        setInitialFormValues(lead);
        await new Promise((resolve) => setTimeout(resolve, 0));
        setId(id);
        setOpen(true);
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    },
    [lead]
  );

  useEffect(() => {
    setSecontToolbarMessage("לידים");
    setSecontToolbarPath("רשימת לידים");
    getLeads();
    getTypes(0, 50);
    getStatus(0, 50);

    return () => {
      resetSecondToolbar();
      resetFilter();
      resetPagination();
    };
  }, []);

  const handleChangePage = async (model: any) => {
    setPage(model.page);
    await getLeads();
  };

  const addLead = (typeAdd: boolean) => {
    setOpen(true);
    setId(null);
    setTypeOfAdd(typeAdd);
  };

  const handleChangeRowsPerPage = async (model: any) => {
    try {
      setRowsPerPage(model.pageSize);
      setPage(model.page);
      await getLeads();
    } catch (error) {
      console.error(error);
    }
  };

  const handleSubmitModal = async (values: any) => {
    if (id) {
      await updateLeads(values);
    } else {
      await saveLeads(values, typeOfAdd);
    }
    await getLeads();
    setOpen(false);
  };

  const handleSearchInputChange = (event: any) => {
    setSearchValue(event?.target.value);
    if (!event?.target.value) {
      getLeads();
    }
  };

  const handleFiltersClose = () => {
    setIsFilterOpen(false);
  };

  const handleFilter = async () => {
    await getLeads();
    setIsFilterOpen(false);
  };

  const resetFilter = () => {
    resetFilters();
  };

  const handleHistoryLeadById = (id: any) => {
    setIdHistory(id);
    setIsHistoryOpen(true);
  };


  const handleRowSelection = (rows: any) => {
    setIdsRowSelection(rows);
  };

  const columns: GridColDef<(typeof leads)[number]>[] = [
    { field: "id", headerName: "ליד",
      flex: 1,
      minWidth: 200,
      headerAlign: "center", align: "center",},
    { field: "lead_message", headerName: "הערה",      
      flex: 1,
      minWidth: 400,
      headerAlign: "center", align: "center", },
    {
      field: "status_name",
      headerName: "סטטוס",
      flex: 1,
      minWidth: 200,
      headerAlign: "center", align: "center",
      valueGetter: (_, row: any) => {
        return `${row.lead_status.status_name}`;
      },
    },
    {
      field: "type_name",
      headerName: "סוג",
      flex: 1,
      minWidth: 200,
      headerAlign: "center", align: "center",
      valueGetter: (_, row: any) => {
        return `${row.lead_type.type_name}`;
      },
    },
    { field: "created_date", headerName: "תאריך יצירה",       
      flex: 1,
      minWidth: 150,
      headerAlign: "center", align: "center", },
    { field: "updated_date", headerName: "עודכן לאחרונה", 
      flex: 1,
      minWidth: 150,
      headerAlign: "center", align: "center",
    },
    {
      field: "actions",
      type: "actions",
      flex: 1,
      minWidth: 200,
      headerAlign: "center", align: "center",
      editable: false,
      renderHeader: () => <strong>{"פעולות "}</strong>,
      filterable: false,
      cellClassName: "pinned-column",
      headerClassName: "MuiDataGrid-columnHeader--pinned",
      getActions: (params: any) => {
        const { id } = params;
        if (id) {
          return [
            <GridActionsCellItem
              icon={<HistoryToggleOffIcon />}
              label="History"
              title="History"
              key={id}
              sx={{
                color: "#003366",
              }}
              className="textPrimary"
              onClick={() => handleHistoryLeadById(id)}
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
                  getLeads(0, 10);
                }
              }}
            />

            <Box dir="ltr" sx={{ display: "flex", alignItems: "center" }}>
              {idsRowSelection.length > 0 && (
                <Button
                  variant="contained"
                  color="error"
                  onClick={handleDelete}
                  // disabled={selectedRows.length === 0}
                  style={{
                    marginRight: "5px",
                    textTransform: "capitalize",
                    height: "32px",
                  }}
                >
                  מחק פריטים נבחרים
                </Button>
              )}

              <Button
                variant="outlined"
                onClick={() => setIsFilterOpen(true)}
                startIcon={<FilterListIcon />}
                size="small"
                sx={filterBtnStyle}
              >
                מסננים
              </Button>

              <Button
                size="small"
                id="demo-customized-button"
                aria-controls={openOption ? "demo-customized-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={openOption ? "true" : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                startIcon={<KeyboardArrowDownIcon />}
                sx={addBtnStyle}
              >
                הוסף לידים
              </Button>
              <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                  "aria-labelledby": "demo-customized-button",
                }}
                anchorEl={anchorEl}
                open={openOption}
                onClose={handleClose}
              >
                <MenuItem onClick={() => addLead(false)} disableRipple>
                  <PersonAddAltIcon  sx={{marginLeft:"10px"}}/> הוסף ידנית
                </MenuItem>
                <MenuItem onClick={() => addLead(true)} disableRipple>
                  <UploadFileIcon sx={{marginLeft:"10px"}}/> העלה קובץ
                </MenuItem>
              </StyledMenu>
            </Box>
          </Box>

          {leads?.length > 0 && (
            <CustomDataGrid
              rows={leads}
              columns={[...columns]}
              initialState={{
                pagination: {
                  paginationModel: {
                    pageSize: 10,
                  },
                },
              }}
              onPaginationModelChange={(model: any) => {
                if (model.pageSize !== pagination.pageSize) {
                  handleChangeRowsPerPage(model);
                }
                if (model.page !== pagination.page) {
                  handleChangePage(model);
                }
              }}
              rowCount={count}
              pageSizeOptions={[5, 10, 25, 50]}
              disableRowSelectionOnClick
              disableVirtualization
              paginationMode="server"
              checkboxSelection={checkboxSelection}
              disableMultipleRowSelection={disableMultipleRowSelection}
              onRowSelectionModelChange={(selectionModel: any) => {
                handleRowSelection(selectionModel);
              }}
              style={{
                maxHeight: "75vh",
                overflow: "auto",
              }}
            />
          )}
        </CardContent>
      </Card>

      {open && (
        <CustomModal
          dir="rtl"
          isOpen={open}
          onClose={() => {
            setOpen(false);
            setInitialFormValues(initialValues);
          }}
          title={modalTitle}
          width="900px"
        >
          <GenericAddEditForm
            initialValues={initialFormValues}
            validationSchema={customLeads}
            apiRequest={handleSubmitModal}
            hasSubmitButton={true}
            submitBtnName={submitBtnName}
            form={(formProps: any) => (
              <LeadsForm formProps={formProps} typeOfAdd={typeOfAdd} id={id} />
            )}
            btnStyle={submitBtnStyle}
          />
        </CustomModal>
      )}

      {isModalOpen && (
        <ConfirmationModal
          open={isModalOpen}
          onClose={handleCloseModal}
          onConfirm={handleConfirmDelete}
          message=" האם אתה בטוח שברצונך למחוק ליד זה? לא ניתן לבטל פעולה זו."
          btnName="Delete"
        />
      )}

      {isFilterOpen && (
        <Filters
          open={isFilterOpen}
          onClose={handleFiltersClose}
          handleFilter={handleFilter}
          resetFilter={resetFilter}
        >
          <FilterLeads />
        </Filters>
      )}

      {isHistoryOpen && (
        <CustomModal
          isOpen={isHistoryOpen}
          onClose={() => {
            setIsHistoryOpen(false);
            setInitialFormValues(initialValues);
          }}
          title={"History"}
        >
          <LeadsHistory id={idHistory} />
        </CustomModal>
      )}
      {isLoading && <Loader />}

    </PageContainer>
  );
};

export default styled(Leads)`
  ${LeadsStyle}
`;
