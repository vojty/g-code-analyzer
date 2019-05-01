// @ts-ignore no typings
import Toolpath from 'gcode-toolpath'
import Decimal from 'decimal.js'
import { Line3, Vector3, ArcCurve } from 'three'

import { Modal, Point, Line, Curve } from './gCodeTypes'
import { unitsAreInches, isClockwise } from './gCodeHelpers'
import { sum } from './mathUtils'

const INCH_TO_MM = 25.4

function sanitizeCoordinate(val: number) {
  return new Decimal(val).mul(INCH_TO_MM).toNumber()
}

function sanitizePoint(modal: Modal, point: Point) {
  if (!unitsAreInches(modal.units)) {
    return point
  }
  return {
    x: sanitizeCoordinate(point.x),
    y: sanitizeCoordinate(point.y),
    z: sanitizeCoordinate(point.z)
  }
}

function getPaths(gCode: string) {
  const lines: Array<Line> = []
  const curves: Array<Curve> = []
  const toolpath = new Toolpath({
    addLine: (modal: Modal, start: Point, end: Point) => {
      lines.push({
        modal,
        startPoint: sanitizePoint(modal, start),
        endPoint: sanitizePoint(modal, end)
      })
    },
    addArcCurve: (modal: Modal, start: Point, end: Point, fixed: Point) => {
      curves.push({
        modal,
        startPoint: sanitizePoint(modal, start),
        endPoint: sanitizePoint(modal, end),
        fixedPoint: sanitizePoint(modal, fixed)
      })
    }
  })
  toolpath.loadFromStringSync(gCode)
  return { lines, curves }
}

export type MotionDistanceMap = {
  [motion: string]: Decimal
}

export type Statistics = {
  linesDistance: MotionDistanceMap
  curvesDistance: MotionDistanceMap
  totalDistance: Decimal
}

export function getArcCurveLength(
  startVector: Vector3,
  endVector: Vector3,
  fixedVector: Vector3,
  clockwise: boolean
) {
  const radius = new Line3(startVector, fixedVector).distance()
  const startAngle = Math.atan2(
    startVector.y - fixedVector.y,
    startVector.x - fixedVector.x
  )
  const endAngle = Math.atan2(
    endVector.y - fixedVector.y,
    endVector.x - fixedVector.x
  )
  return new ArcCurve(
    fixedVector.x,
    fixedVector.y,
    radius,
    startAngle,
    endAngle,
    clockwise
  ).getLength()
}

export function getLineLength(startVector: Vector3, endVector: Vector3) {
  return new Line3(startVector, endVector).distance()
}

function groupByMotion(
  distances: Array<{ modal: Modal; length: number }>
): { [motion: string]: Decimal } {
  return distances.reduce((acc: MotionDistanceMap, line) => {
    const previous = acc[line.modal.motion] || new Decimal(0)
    return {
      ...acc,
      [line.modal.motion]: previous.add(line.length)
    }
  }, {})
}

export function getStatistics(gCode: string): Statistics {
  const { lines, curves } = getPaths(gCode)

  const linesDistances = lines.map(line => {
    const { startPoint, endPoint, modal } = line
    const startVector = new Vector3(startPoint.x, startPoint.y, startPoint.z)
    const endVector = new Vector3(endPoint.x, endPoint.y, endPoint.z)
    return {
      modal,
      length: getLineLength(startVector, endVector)
    }
  })

  const curvesDistances = curves.map(curve => {
    const { startPoint, endPoint, fixedPoint, modal } = curve
    const fixedVector = new Vector3(fixedPoint.x, fixedPoint.y, fixedPoint.z)
    const startVector = new Vector3(startPoint.x, startPoint.y, startPoint.z)
    const endVector = new Vector3(endPoint.x, endPoint.y, endPoint.z)

    const clockwise = isClockwise(curve.modal.motion)
    return {
      modal,
      length: getArcCurveLength(startVector, endVector, fixedVector, clockwise)
    }
  })
  return {
    linesDistance: groupByMotion(linesDistances),
    curvesDistance: groupByMotion(curvesDistances),
    totalDistance: sum([
      ...linesDistances.map(line => line.length),
      ...curvesDistances.map(curve => curve.length)
    ])
  }
}
