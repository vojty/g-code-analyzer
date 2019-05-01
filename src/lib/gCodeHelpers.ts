import { Units, Motion } from './gCodeTypes'

export function unitsAreInches(units: Units) {
  return units === 'G20'
}

export function isClockwise(motion: Motion) {
  return motion === 'G2'
}
