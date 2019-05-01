import React from 'react'
import { connect } from 'react-redux'
import { Table } from 'reactstrap'
import Decimal from 'decimal.js'

import { getStatistics, MotionDistanceMap } from '../lib/gCodeCalculator'
import { fileContentSelector } from '../redux/fileSelectors'

type Props = {
  fileContent: string
}

const MM_DISPLAY_PRECISION = 2

function formatDistance(distance: Decimal) {
  return distance.toNumber().toLocaleString(undefined, {
    maximumFractionDigits: MM_DISPLAY_PRECISION,
    minimumFractionDigits: MM_DISPLAY_PRECISION
  })
}

const infos: { [motion: string]: string } = {
  G0: 'Rapid positioning - move mode',
  G1: 'Linear interpolation - work mode',
  G2: 'Circular interpolation, clockwis - work mode',
  G3: 'Circular interpolation, counterclockwise - work mode'
}

function renderDistances(distances: MotionDistanceMap) {
  return Object.keys(distances).map(motion => {
    const info = infos[motion]
    return (
      <tr key={motion}>
        <td>{info ? <abbr title={info}>{motion}</abbr> : motion}</td>
        <td className="text-right">{formatDistance(distances[motion])}</td>
      </tr>
    )
  })
}

export class Statistics extends React.Component<Props> {
  render() {
    const { fileContent } = this.props
    const statistics = getStatistics(fileContent)
    return (
      <>
        <Table striped bordered size="sm">
          <thead>
            <tr>
              <th>Motion</th>
              <th className="text-right">Distance (mm)</th>
            </tr>
          </thead>
          <tbody>
            {renderDistances(statistics.linesDistance)}
            {renderDistances(statistics.curvesDistance)}
            <tr className="font-weight-bold">
              <td>Total</td>
              <td className="text-right">
                {formatDistance(statistics.totalDistance)}
              </td>
            </tr>
          </tbody>
        </Table>
        <p>
          More info about G code here:&nbsp;
          <a
            rel="noopener noreferrer"
            target="_blank"
            href="https://en.wikipedia.org/wiki/G-code#List_of_G-codes_commonly_found_on_FANUC_and_similarly_designed_controls_for_milling_and_turning"
          >
            https://en.wikipedia.org/wiki/G-code#List_of_G-codes_commonly_found_on_FANUC_and_similarly_designed_controls_for_milling_and_turning
          </a>
        </p>
      </>
    )
  }
}

export default connect(fileContentSelector)(Statistics)
