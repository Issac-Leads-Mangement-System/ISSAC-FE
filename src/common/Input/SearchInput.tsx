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
  onChange: any;
  onKeyDown: any;
};

export const SearchInput = ({ sx, onChange, onKeyDown }: Props) => {
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
        onChange={onChange}
        onKeyDown={onKeyDown}
        endAdornment={
          <InputAdornment position="end">
            <IconButton>
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
