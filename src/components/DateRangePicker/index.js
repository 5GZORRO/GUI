import React, { useState } from 'react'

import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { DateRangePicker } from 'react-dates'
import * as moment from 'moment'

interface DateProps {
  startDate: moment.Moment | null; // momentPropTypes.momentObj or null,
  endDate: moment.Moment | null; // momentPropTypes.momentObj or null,
  onDatesChange: (data: { startDate: moment.Moment, endDate: moment.Moment }) => void; // PropTypes.func.isRequired,
  ref: object | null;
}

const CustomDateRangePicker = React.forwardRef((props?: DateProps, ref) => {
  const [focusedInput, setFocusedInput] = useState(null)
  return (
    <DateRangePicker
      {...props}
      startDateId={'daterangepickerStart'}
      endDateId={'daterangepickerEnd'}
      focusedInput={focusedInput}
      onFocusChange={(newFocus) => setFocusedInput(() => newFocus)}
      ref={ref}
    />
  )
})

CustomDateRangePicker.displayName = 'DateRangePicker'

export default CustomDateRangePicker
