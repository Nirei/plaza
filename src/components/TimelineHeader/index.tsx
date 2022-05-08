import React from 'react'
import TimelineRow from '../TimelineRow'

const TimelineHeader = ({ children }: { children: React.ReactNode }) => {
  return <TimelineRow>{children}</TimelineRow>
}

export default TimelineHeader
