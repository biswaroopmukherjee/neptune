import React, { useState } from 'react';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { createMuiTheme, ThemeProvider } from '@material-ui/core';


const materialTheme = createMuiTheme({
  palette: {
    type: 'dark',
  },

  overrides: {
    MuiPickersToolbar: {
      toolbar: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      },
    },
    MuiPickersDay: {
      daySelected: {
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
      },
      current: {
        color: 'white',
      },
    },

  },
});


const StaticDatePicker = () => {
  const [date, changeDate] = useState(new Date());

  return (

    <MuiPickersUtilsProvider utils={DateFnsUtils}>

      <ThemeProvider theme={materialTheme}>
        <DatePicker
          autoOk
        // orientation="landscape"
          variant="static"
          openTo="date"
          value={date}
          onChange={changeDate}
        />

      </ThemeProvider>
    </MuiPickersUtilsProvider>
  );
};

export default StaticDatePicker;
