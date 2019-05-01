type UpdateFileContentAction = {
  type: 'UPDATE_FILE_CONTENT'
  payload: {
    fileContent: string
  }
}

type ResetFileAction = {
  type: 'RESET_FILE'
}

export function updateFileContent(
  fileContent: string
): UpdateFileContentAction {
  return {
    type: 'UPDATE_FILE_CONTENT',
    payload: {
      fileContent
    }
  }
}

export function resetFile(): ResetFileAction {
  return {
    type: 'RESET_FILE'
  }
}

export type FileAction = UpdateFileContentAction | ResetFileAction
