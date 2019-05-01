import { FileAction } from './fileActions'
import { gCode } from '../mocks/quarter-circle'

export type State = {
  fileContent: string
}

const initialState: State = {
  fileContent: gCode
}

export function fileReducer(
  state: State = initialState,
  action: FileAction
): State {
  switch (action.type) {
    case 'UPDATE_FILE_CONTENT':
      const { fileContent } = action.payload
      return {
        fileContent
      }

    case 'RESET_FILE': {
      return {
        fileContent: ''
      }
    }

    default:
      return state
  }
}
