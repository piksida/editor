import React from 'react';
import { TextField, Grid, InputAdornment, IconButton } from '@material-ui/core';

//import Visibility from '@mui/icons-material';
//import VisibilityOff from '@mui/icons-material';

const Input = ({ name, handleChange, label, half, autoFocus, type, handleShowPassword }) => (
  <Grid item xs={12} sm={half ? 6 : 12}>
    <TextField
      onChange={handleChange}
      name={name}
      variant="outlined"
      required
      fullWidth
      label={label}
      autoFocus={autoFocus}
      type={type}
      InputProps={name === 'password' ? {
        endAdornment: (
          <InputAdornment position="end">
            <IconButton onClick={handleShowPassword}>
              Показать пароль
            </IconButton>
          </InputAdornment>
        ),
      } : null}
    />
  </Grid>
);

/*{type === 'password' ? <Visibility /> : <VisibilityOff />}*/

export default Input;