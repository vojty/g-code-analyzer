import { AppState } from './reducers'

export function fileContentSelector(state: AppState) {
  return {
    fileContent: state.file.fileContent
  }
}
