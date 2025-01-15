import React, { useEffect } from "react";
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
import ordersStore from "../../store/Orders/orders-store";

export const JobStatsCreateOrderModal = ({
  formProps,
  createOrderType,
}: any) => {
  const { setCreateOrder }: any = jobStatsStore();
  const { getOrders }: any = ordersStore();
  useEffect(() => {
    getOrders(createOrderType);
  }, []);

  return (
    <>
      <Box sx={{ height: "60vh", overflowY: "auto", width: "100%" }}>
        {/* Basic Info */}
        <BasicInfoSection formProps={formProps} />

        {/* Customer Information */}
        <InformationSection formProps={formProps} />

        {/* Schedule */}
        {createOrderType === "TV" && <ScheduleSection formProps={formProps} />}

        {/* Customer Payment */}
        <PaymentSection formProps={formProps} />

        {/* Properties */}
        <PropertiesSection
          formProps={formProps}
          createOrderType={createOrderType}
        />
      </Box>
    </>
  );
};
