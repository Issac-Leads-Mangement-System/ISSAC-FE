import React, { useEffect, useState } from "react";
import { Box, Button, Card, CardContent } from "@mui/material";

import styled from "styled-components";

import { SearchInput } from "../../common/Input/SearchInput";
import secondToolbarStore from "../../store/SecondToolbar/second-tollbar-store";
import { JobsStyle } from "./JobsStyle";
import leadsStore from "../../store/Leads/leads-store";
import { addBtnStyle } from "../../common/utils";
import { PageContainer } from "../../common/PageContainer/page-container";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import leadsTypesStore from "../../store/Leads/types-store";

const Jobs = () => {
  const {
  }: any = leadsStore();
  const {
    setSecontToolbarMessage,
    setSecontToolbarPath,
    resetSecondToolbar,
  }: any = secondToolbarStore();
  const { getTypes }: any = leadsTypesStore();
  const navigate = useNavigate();


  useEffect(() => {
    setSecontToolbarMessage("JOBS");
    setSecontToolbarPath("List");
    getTypes(0, 50);

    return () => {
      resetSecondToolbar();
    };
  }, []);

  const handleSearchInputChange = (event: any) => {
    
  };
  
  const addNewJob = () => {
    navigate('/add-job');

  }
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
                }
              }}
            />
            <Box sx={{ display: "flex", alignItems: "center" }}>
              {/* <Button
                variant="outlined"
                onClick={() => setIsFilterOpen(true)}
                startIcon={<FilterListIcon />}
                size="small"
                sx={filterBtnStyle}
              >
                Filters
              </Button> */}

              <Button
                variant="outlined"
                onClick={() => addNewJob()}
                startIcon={<AddIcon />}
                size="small"
                sx={addBtnStyle}
              >
                Add job
              </Button>
            </Box>
          </Box>

          
        </CardContent>
      </Card>

    </PageContainer>
  );
};

export default styled(Jobs)`
  ${JobsStyle}
`;
