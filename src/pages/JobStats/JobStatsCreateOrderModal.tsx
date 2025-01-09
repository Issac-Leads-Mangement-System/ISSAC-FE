import React from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  TextField,
  Typography,
  Paper,
  Grid2,
} from "@mui/material";
import { BasicInfoSection } from "./Sections/Basic";
import { InformationSection } from "./Sections/Information";
import { ScheduleSection } from "./Sections/Schedule";
import { PaymentSection } from "./Sections/Payment";
import { PropertiesSection } from "./Sections/Properties";
import jobStatsStore from "../../store/Jobs/job-stats-store";
import { debounce } from "lodash";

export const JobStatsCreateOrderModal = ({formProps}: any) => {
  const { setCreateOrder }: any = jobStatsStore();



  return (
    <>
      <Box sx={{ height: "60vh", overflowY: "auto", width: "100%" }}>
        {/* Basic Info */}
        <BasicInfoSection formProps={formProps}/>

        {/* Customer Information */}
        <InformationSection formProps={formProps}/>

        {/* Schedule */}
        <ScheduleSection formProps={formProps}/>

        {/* Customer Payment */}
        <PaymentSection formProps={formProps}/>

        {/* Properties */}
        <PropertiesSection formProps={formProps}/>
      </Box>
    </>
  );
};
