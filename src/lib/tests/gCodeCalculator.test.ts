import { Vector3 } from 'three'

import { getArcCurveLength, getStatistics } from '../gCodeCalculator'
import { gCode } from '../../mocks/quarter-circle'

/**
 * Radius: 5mm
 * Circumference: 2 * Math.PI * 5 = 31.41592653589793
 * Quarter: 31.41592653589793 / 4 = 7.853981633974483
 */

const QUARTER_CIRC = 7.853961447611994

describe('gCodeCalculator', () => {
  describe('getStatistics', () => {
    test('quarter circle', () => {
      const stats = getStatistics(gCode)
      expect(stats.curvesDistance.G2.toNumber()).toEqual(QUARTER_CIRC)
    })
  })

  describe('getArcCurveLength', () => {
    it('should return curve length', () => {
      const start = new Vector3(0, 5, 0)
      const end = new Vector3(5, 0, 0)
      const fixed = new Vector3(0, 0, 0)
      const clockwise = true
      expect(getArcCurveLength(start, end, fixed, clockwise)).toEqual(
        QUARTER_CIRC
      )
    })
  })
})
