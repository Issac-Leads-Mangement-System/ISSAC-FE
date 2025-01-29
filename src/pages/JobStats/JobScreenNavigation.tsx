import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  IconButton,
  Tooltip,
  LinearProgress,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import UserChipsExample from "./JobScreenNavigationUserInfo";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomModal from "../../common/Modal/CustomModal/CustomModal";
import { GenericAddEditForm } from "../../common/forms-generic-ad-edit/GenericAdEditForm";
import {
  ICreateOrderModalSchema,
  initialValues,
} from "../../forms/createOrderSchema";
import { JobStatsCreateOrderModal } from "./JobStatsCreateOrderModal";
import { submitBtnStyle } from "../../common/constants";
import leadsStatusesStore from "../../store/Leads/statuses-store";
import { ConfirmationModal } from "../../common/Modal/ConfirmationDialog/ConfirmationDialog";
import jobStatsStore from "../../store/Jobs/job-stats-store";
import { customValidation } from "../../common/utils";

const ScreenNavigationWithGrid = ({
  jobLeadsById,
  leadJobId,
  handleSubmitModal,
  activeJob,
}: any) => {
  const {
    updateJobLead,
    resetPagination,
    resetJobLeadsById,
    resetFilters,
    getJobById,
  }: any = jobStatsStore();
  const { statuses }: any = leadsStatusesStore();
  const [tooltipText, setTooltipText] = useState("Copy to clipboard");
  const [isButtonClick, setIsButtonClick]: any = useState(false);
  const [orderType, setOrderType]: any = useState("");
  const [isConfirmModal, setIsConfirmModal]: any = useState(false);
  const [initialFormValues, setInitialFormValues] =
    useState<ICreateOrderModalSchema>({
      ...initialValues,
    });
  const [jobDetailsById, setJobDetailsById]: any = useState();
  const [changeJobIdStatus, setChangeJobIdStatus]: any = useState();
  const [step, setStep]: any = useState(1);

  useEffect(() => {
    if (!leadJobId) {
      setJobDetailsById(jobLeadsById[0]);
      setInitialFormValues({
        ...initialFormValues,
        order_basic_info: {
          ...initialFormValues.order_basic_info,
          lead_id: jobLeadsById?.[0]?.lead_id || null,
          lead_job_id: jobLeadsById?.[0]?.id || null,
        },
      });
      setStep(1);
    } else {
      const jobDetails = jobLeadsById.find((job: any) => job.id === leadJobId);
      setJobDetailsById(jobDetails);
      setStep(jobLeadsById.findIndex((job: any) => job.id === leadJobId) + 1);
    }
  }, [jobLeadsById]);

  useEffect(() => {
    return () => {
      resetPagination();
      resetFilters();
    };
  }, []);

  const handleNext = () => {
    const findIndexCurrentJob = jobLeadsById.findIndex(
      (job: any) => job.lead_id === jobDetailsById.lead_id
    );
    setStep(step + 1);
    if (jobLeadsById[findIndexCurrentJob + 1]) {
      setJobDetailsById(jobLeadsById[findIndexCurrentJob + 1]);
    }
  };

  const handleNextAlert = () => {
    setIsConfirmModal({
      open: true,
      title: `לפני שאתה ממשיך, האם הצעת גם עסקת מובייל?`,
      type: "next_button",
    });
  };

  const isPreviousButtonDisabled = (() => {
    if (jobDetailsById) {
      const findIndexCurrentJob = jobLeadsById.findIndex(
        (job: any) => job.lead_id === jobDetailsById.lead_id
      );
      if (jobLeadsById[findIndexCurrentJob - 1]) {
        return false;
      } else {
        return true;
      }
    }
    return true;
  })();

  const isNextButtonDisabled = (() => {
    if (jobDetailsById) {
      const findIndexCurrentJob = jobLeadsById.findIndex(
        (job: any) => job.lead_id === jobDetailsById.lead_id
      );
      if (jobLeadsById[findIndexCurrentJob + 1]) {
        return false;
      } else {
        return true;
      }
    }

    return true;
  })();

  const handlePrevious = () => {
    const findIndexCurrentJob = jobLeadsById.findIndex(
      (job: any) => job.lead_id === jobDetailsById.lead_id
    );
    setStep(step - 1);
    if (jobLeadsById[findIndexCurrentJob - 1]) {
      setJobDetailsById(jobLeadsById[findIndexCurrentJob - 1]);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jobLeadsById[0].lead_id).then(() => {
      setTooltipText("Copied!");
      setTimeout(() => setTooltipText("Copy to clipboard"), 2000);
    });
  };

  const handleButtonClick = (order: string) => {
    setIsButtonClick(true);
    setOrderType(order);
  };

  const onCloseCreateOrder = () => {
    setIsButtonClick(false);
  };

  const onButtonSectionClick = (jobLead: any) => {
    setIsConfirmModal({
      open: true,
      title: `האם אתה בטוח שברצונך לשנות את הסטטוס ל${jobLead.status_name}?`,
      type: "status_change",
    });
    setChangeJobIdStatus(jobLead.id);
  };

  const handleCloseConfirmationModal = () => {
    setIsConfirmModal({ open: false });
  };

  const handleSaveConfirmationModal = async () => {
    if (isConfirmModal.type === "status_change") {
      const response = await updateJobLead(activeJob, jobDetailsById.id, changeJobIdStatus);
      setJobDetailsById(response);
      await getJobById(activeJob);
    }
    if (isConfirmModal.type === "next_button") {
      handleNext();
    }
    setIsConfirmModal({ open: false });
  };

  return (
    <Box
      dir="ltr"
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        backgroundColor: "#f9fafc",
        maxWidth: "1282px",
        margin: "auto",
      }}
    >
      {jobDetailsById && (
        <>
          <LinearProgress
            variant="determinate"
            value={(step / jobLeadsById.length) * 100}
            color="primary"
            sx={{
              height: "12px",
              borderRadius: "6px",
              marginBottom: "16px",
              boxShadow: "0 2px 6px rgba(0, 0, 0, 0.1)",
            }}
          />
          <UserChipsExample
            jobDetailsById={jobDetailsById}
            jobLeadsByIdLength={jobLeadsById.length}
            step={step}
          />
          {/* Header cu butoanele Previous și Next */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              // maxWidth: "600px",
              marginBottom: "15px",
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={handlePrevious}
              disabled={isPreviousButtonDisabled}
              sx={{ minWidth: "120px" }}
            >
              <ArrowBackIcon />
            </Button>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "8px 12px",
                border: "1px solid #ddd",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
                width: "fit-content",
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  fontWeight: "bold",
                  color: "#333",
                }}
              >
                {jobDetailsById?.lead_id || "No lead available"}
              </Typography>
              {jobDetailsById && (
                <Tooltip title={tooltipText} arrow>
                  <IconButton
                    onClick={handleCopy}
                    size="small"
                    sx={{
                      marginLeft: "8px",
                      color: "#555",
                    }}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </IconButton>
                </Tooltip>
              )}
            </Box>

            <Button
              variant="outlined"
              color="primary"
              onClick={
                jobDetailsById.mobile_deal_success
                  ? handleNext
                  : handleNextAlert
              }
              disabled={isNextButtonDisabled}
              sx={{ minWidth: "120px" }}
            >
              <ArrowForwardIcon />
            </Button>
          </Box>

          {/* Grila de butoane */}

          <Box
            sx={{
              width: "100%",
              maxWidth: "800px", // Adaptează după nevoie
              backgroundColor: "#fff",
              borderRadius: "16px",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.15)",
              padding: "32px",
              margin: "auto", // Centrare
            }}
          >
            <Grid container spacing={4}>
              {/* Left section - Create order buttons */}
              <Grid
                item
                xs={6}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <Button
                  variant="contained"
                  fullWidth
                  disabled={[4, 5].includes(
                    jobDetailsById.lead_status.lead_status_id
                  )}
                  onClick={() => handleButtonClick("TV")}
                  sx={{
                    fontWeight: "bold",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    backgroundColor: "#1976d2",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#155a9c",
                    },
                    "&:disabled": {
                      backgroundColor: "#e0e0e0",
                      color: "#9e9e9e",
                    },
                  }}
                >
                  צור הזמנה
                </Button>

                <Button
                  variant="contained"
                  fullWidth
                  disabled={jobDetailsById.mobile_deal_success}
                  onClick={() => handleButtonClick("mobile")}
                  sx={{
                    fontWeight: "bold",
                    borderRadius: "8px",
                    padding: "12px 16px",
                    backgroundColor: "#1976d2",
                    color: "#fff",
                    "&:hover": {
                      backgroundColor: "#155a9c",
                    },
                    "&:disabled": {
                      backgroundColor: "#e0e0e0",
                      color: "#9e9e9e",
                    },
                  }}
                >
                  צור הזמנה מובייל
                </Button>
              </Grid>

              {/* Right section - Status buttons */}
              <Grid
                item
                xs={6}
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
                  gap: "16px",
                }}
              >
                {statuses.map((status: any, index: number) => (
                  <Button
                    key={index}
                    variant="outlined"
                    disabled={[4, 5].includes(
                      jobDetailsById.lead_status.lead_status_id
                    )}
                    onClick={() => onButtonSectionClick(status)}
                    sx={{
                      fontWeight: "bold",
                      borderRadius: "8px",
                      padding: "12px 16px",
                      borderColor: "#0288d1",
                      color: "#0288d1",
                      "&:hover": {
                        backgroundColor: "#e3f2fd",
                        borderColor: "#0288d1",
                      },
                    }}
                  >
                    {status.status_name}
                  </Button>
                ))}
              </Grid>
            </Grid>

            {isButtonClick && (
              <CustomModal
                dir="rtl"
                isOpen={isButtonClick}
                onClose={onCloseCreateOrder}
                title={`${
                  orderType === "TV" ? "צור הזמנה טלוויזיה" : "צור הזמנה מובייל"
                }`}
                minWidth="1200px"
              >
                <GenericAddEditForm
                  initialValues={initialFormValues}
                  validationSchema={customValidation}
                  apiRequest={(values: any) =>
                    handleSubmitModal(values, orderType)
                  }
                  hasSubmitButton={true}
                  submitBtnName={"שמור"}
                  form={(formProps: any) => (
                    <JobStatsCreateOrderModal
                      formProps={formProps}
                      createOrderType={orderType}
                    />
                  )}
                  btnStyle={{
                    fontWeight: "bold",
                    borderRadius: "8px",
                  }}
                />
              </CustomModal>
            )}
          </Box>
        </>
      )}

      {isConfirmModal.open && (
        <ConfirmationModal
          open={isConfirmModal.open}
          onClose={handleCloseConfirmationModal}
          onConfirm={handleSaveConfirmationModal}
          message={isConfirmModal.title || ""}
          btnName="כן"
          btnCancel="לא"
        />
      )}
    </Box>
  );
};

export default ScreenNavigationWithGrid;
