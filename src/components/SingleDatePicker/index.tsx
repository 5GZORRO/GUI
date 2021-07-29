import React, { useState } from 'react'

import 'react-dates/initialize'
import 'react-dates/lib/css/_datepicker.css'
import { SingleDatePicker } from 'react-dates'
import * as moment from 'moment'

interface DateProps {
  date: moment.Moment | null; // momentPropTypes.momentObj or null,
  onDateChange: (date: moment.Moment) => void; // PropTypes.func.isRequired,
  ref: object | null;
}

const CustomDatePicker = React.forwardRef((props?: DateProps, ref) => {
  const [focused, setFocused] = useState(false)
  return (
    <SingleDatePicker
      {...props}
      focused={focused} // PropTypes.bool
      onFocusChange={({ focused }) => setFocused(focused)} // PropTypes.func.isRequired
      id="datesinglepicker" // PropTypes.string.isRequired,
    />
  )
})

CustomDatePicker.displayName = 'SingleDatePicker'

export default CustomDatePicker
