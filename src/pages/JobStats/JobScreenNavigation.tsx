import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Typography,
  Grid,
  IconButton,
  Tooltip,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import UserChipsExample from "./JobScreenNavigationUserInfo";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CustomModal from "../../common/Modal/CustomModal/CustomModal";
import { GenericAddEditForm } from "../../common/forms-generic-ad-edit/GenericAdEditForm";
import { ICreateOrderModalSchema, initialValues, validationCreateOrderSchema } from "../../forms/createOrderSchema";
import { JobStatsCreateOrderModal } from "./JobStatsCreateOrderModal";
import { submitBtnStyle } from "../../common/constants";

const ScreenNavigationWithGrid = ({
  jobLeadsById,
  idLeadIdPlayButton,
  handleSubmitModal,
}: any) => {
  const [tooltipText, setTooltipText] = useState("Copy to clipboard");
  const [idLeadJobConfirmation, setIdLeadJobConfirmation]: any =
      useState(undefined);
  const [isButtonClick, setIsButtonClick]: any = useState(false);
  const [orderType, setOrderType]: any = useState('');
  const [initialFormValues, setInitialFormValues] =
      useState<ICreateOrderModalSchema>({
        ...initialValues,
      });

  useEffect(() => {
    if(jobLeadsById.length > 0) {
      setIdLeadJobConfirmation(jobLeadsById[0].lead_id)
    }
    if(idLeadIdPlayButton) {
      setIdLeadJobConfirmation(idLeadIdPlayButton)
    }
  }, [])

  const handleNext = () => {
    const filteredJobs = jobLeadsById.filter((job: any) => job.isCurrentUser);

    const findIndexCurrentJob = filteredJobs.findIndex(
      (job: any) => job.lead_id === idLeadJobConfirmation
    );
    if (filteredJobs[findIndexCurrentJob + 1]) {
      setIdLeadJobConfirmation(filteredJobs[findIndexCurrentJob + 1].lead_id);
    }
  };

  const isPreviousButtonDisabled = (() => {
    const findIndexCurrentJob = jobLeadsById.findIndex(
      (job: any) => job.lead_id === idLeadJobConfirmation
    );
    if (jobLeadsById[findIndexCurrentJob - 1]) {
      return false;
    } else {
      return true;
    }
  })();

  const isNextButtonDisabled = (() => {
    const findIndexCurrentJob = jobLeadsById.findIndex(
      (job: any) => job.lead_id === idLeadJobConfirmation
    );
    if (jobLeadsById[findIndexCurrentJob + 1]) {
      return false;
    } else {
      return true;
    }
  })();

  const handlePrevious = () => {
    const findIndexCurrentJob = jobLeadsById.findIndex(
      (job: any) => job.lead_id === idLeadJobConfirmation
    );
    if (jobLeadsById[findIndexCurrentJob - 1]) {
      setIdLeadJobConfirmation(jobLeadsById[findIndexCurrentJob - 1].lead_id);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jobLeadsById[0].lead_id).then(() => {
      setTooltipText("Copied!");
      setTimeout(() => setTooltipText("Copy to clipboard"), 2000);
    });
  };

  const handleButtonClick = (order: string) => {
    setIsButtonClick(true)
    setOrderType(order);
    // setCurrentId(id);
  };

  const onCloseCreateOrder = () => {
    setIsButtonClick(false)
  }

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        // alignItems: "center",
        // justifyContent: "center",
        // height: "100vh",
        padding: "16px",
        backgroundColor: "#f9fafc",
      }}
    >
      <UserChipsExample />
      {/* Header cu butoanele Previous și Next */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          // maxWidth: "600px",
          marginBottom: "32px",
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
        {/* <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            color: "#333",
          }}
        >
          ID: {currentId}
        </Typography> */}
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
            {idLeadJobConfirmation || 'No lead available'}
          </Typography>
          {idLeadJobConfirmation && (
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
          onClick={handleNext}
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
          maxWidth: "600px",
          backgroundColor: "#ffffff",
          borderRadius: "12px",
          boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
          padding: "16px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            fontWeight: "medium",
            color: "#555",
            marginBottom: "16px",
          }}
        >
          Select an Option
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Button
              variant="contained"
              color={"primary"}
              fullWidth
              onClick={() => handleButtonClick('TV')}
              sx={{
                fontWeight: "bold",
                borderRadius: "8px",
              }}
            >
              Create TV order
            </Button>

            <Button
              variant="contained"
              color={"primary"}
              fullWidth
              onClick={() => handleButtonClick('mobile')}
              sx={{
                fontWeight: "bold",
                borderRadius: "8px",
              }}
            >
              Create mobile order
            </Button>
          </Grid>
          {/* {Array.from({ length: totalButtons }).map((_, index) => (
            <Grid item xs={4} key={index}>
              <Button
                variant="contained"
                color={index + 1 === currentId ? "secondary" : "primary"}
                fullWidth
                onClick={() => onButtonClick(index + 1)}
                sx={{
                  fontWeight: "bold",
                  borderRadius: "8px",
                }}
              >
                Button {index + 1}
              </Button>
            </Grid>
          ))} */}
        </Grid>

        {isButtonClick && (
        <CustomModal
          isOpen={isButtonClick}
          onClose={onCloseCreateOrder}
          title={`Create order ${orderType}`}
          minWidth="1200px"
        >
          <GenericAddEditForm
            initialValues={initialFormValues}
            validationSchema={validationCreateOrderSchema}
            apiRequest={(values: any) => handleSubmitModal(values, orderType)}
            hasSubmitButton={true}
            submitBtnName={"save"}
            form={(formProps: any) => (
              <JobStatsCreateOrderModal formProps={formProps} createOrderType={orderType}/>
            )}
            btnStyle={submitBtnStyle}
          />
        </CustomModal>
      )}


      </Box>
    </Box>
  );
};

export default ScreenNavigationWithGrid;
