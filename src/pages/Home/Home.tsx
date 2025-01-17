import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import { PageContainer } from "../../common/PageContainer/page-container";

import { HomeStyle } from "./HomeStyle";
import { DATA_RECHARTS_MOCK } from "../../common/constants";
import { Box, Grid2, Typography } from "@mui/material";
import { Bar, BarChart, CartesianGrid, Legend, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { HomeCards } from "./HomeCards";

const Home = ({ className }: any) => {
  const navigate = useNavigate();

  return (
    <PageContainer>
      <Grid2
          container
          spacing={2}
          justifyContent="center"
          sx={{ background: "#f2f2f7", width: "100%" }}
        >
      <HomeCards />

      <Typography>This is DEMO!</Typography>
      <Box sx={{width: "100%", height: '50vh', backgroundColor: "white"}}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            width={500}
            height={300}
            data={DATA_RECHARTS_MOCK}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="pv" stackId="a" fill="#fdecea" />
            <Bar dataKey="amt" stackId="a" fill="#82ca9d" />
            <Bar dataKey="uv" fill="#ffc658" />
          </BarChart>
        </ResponsiveContainer>
      </Box>
        </Grid2>
     
    </PageContainer>
  );
};

export default styled(Home)`
  ${HomeStyle}
`;
