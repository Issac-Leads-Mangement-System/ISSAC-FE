import { useState } from "react";

import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  SxProps,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

type Props = {
  sx?: SxProps;
};

export const SearchInput = ({ sx }: Props) => {
  const [searchValue, setSearchValue] = useState("");

  const handleClickSearch = () => {
    // add functionality for search
    console.log(searchValue);
  };

  return (
    <FormControl
      sx={{
        m: 1,
        width: "250px",
        ...sx,
        position: "absolute",
        top: "85px",
        right: "32px",
        "&.Mui-focused": {
          color: "black",
        },
      }}
      variant="standard"
    >
      <InputLabel
        htmlFor="standard-adornment-search"
        sx={{
          fontSize: "12px",
          top: "12px",
          "&.Mui-focused": {
            color: "black",
          },
        }}
      >
        Search for ...
      </InputLabel>
      <Input
        id="standard-adornment-search"
        type="text"
        onChange={(event) => setSearchValue(event.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton onClick={handleClickSearch}>
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        sx={{
          "&::after": {
            borderBottom: "2px solid black",
          },
        }}
      />
    </FormControl>
  );
};
