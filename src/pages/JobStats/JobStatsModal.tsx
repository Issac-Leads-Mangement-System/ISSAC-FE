import { Button, MenuItem, Select } from "@mui/material";
import { useEffect } from "react";
import leadsStatusesStore from "../../store/Leads/statuses-store";
import jobsStore from "../../store/Jobs/jobs-store";
import jobStatsStore from "../../store/Jobs/job-stats-store";

export const JobStatsModal = ({updateStatus}: any) => {
  const { statuses }: any = leadsStatusesStore();
  const { new_status, setKey, activeJob }: any = jobStatsStore();
  // useEffect(() => {
  //   getStatus(0, 50);
  // }, [getStatus]);

  const changeStatus = (e: any) => {
    setKey("new_status", e.target.value);
  };

  // const updateStatus = () => {
  //   console.log('zzz here', new_status, activeJob)
  // }
  return (
    <>
      <Select
        labelId="type"
        id="role-select"
        value={new_status || ""}
        onChange={(e) => changeStatus(e)}
        sx={{
          width: "100%",
          height: "56px",
          fontSize: "1rem",
          borderRadius: "8px",
          backgroundColor: "#fff",
        }}
      >
        {statuses?.map((team: any) => (
          <MenuItem key={team.id} value={team.id}>
            {team.status_name}
          </MenuItem>
        ))}
      </Select>

      <Button
        onClick={updateStatus}
        color="primary"
        variant="contained"
        sx={{
          padding: "4px 12px",
          marginTop: '10px',
          minHeight: "32px",
          minWidth: "130px",
          fontSize: "12px",
          fontWeight: 700,
        }}
      >
        שמור
      </Button>
    </>
  );
};
