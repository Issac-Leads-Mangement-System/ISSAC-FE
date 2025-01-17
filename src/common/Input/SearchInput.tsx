import {
  SxProps,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from '@mui/system';
import { InputBase, Box } from '@mui/material';

type Props = {
  sx?: SxProps;
  onChange: any;
  onKeyDown: any;
};

const StyledSearchInput = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  border: '1px solid #d3d3d3',
  borderRadius: theme.shape.borderRadius,
  padding: '5px 0 0 5px', 
  width: '30%',
  backgroundColor: '#fafafa', 
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  marginLeft: theme.spacing(1),
  flex: 1,
  color: '#666', 
  '&::placeholder': {
    color: '#aaa',
  },
}));

export const SearchInput = ({ sx, onChange, onKeyDown }: Props) => {
  return (
    <StyledSearchInput>
      <SearchIcon color="action" />
      <StyledInputBase
        placeholder="חפש את..."
        size="small"
        onChange={onChange}
        onKeyDown={onKeyDown}
        inputProps={{ 'aria-label': 'search' }}
      />
    </StyledSearchInput>
  );
};
