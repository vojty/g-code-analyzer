import React from 'react'
import { connect } from 'react-redux'
import { NativeTypes } from 'react-dnd-html5-backend'
import { DropTargetMonitor } from 'react-dnd'

import { updateFileContent, resetFile } from '../redux/fileActions'
import TargetBox from './TargetBox'
import { Button } from 'reactstrap'

type Props = {
  resetFile: typeof resetFile
  updateFileContent: typeof updateFileContent
}

const inputStyle: React.CSSProperties = {
  display: 'none'
}

export class FileUploader extends React.Component<Props> {
  fileInputRef: React.RefObject<HTMLInputElement> = React.createRef()

  onFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = event.currentTarget
    this.storeContent(files)
  }

  onButtonClick = () => {
    if (this.fileInputRef.current) {
      this.fileInputRef.current.click()
    }
  }

  onResetClick = () => {
    this.props.resetFile()
  }

  handleFileDrop = (_item: any, monitor: DropTargetMonitor) => {
    if (monitor) {
      this.storeContent(monitor.getItem().files)
    }
  }

  storeContent(files: FileList | null) {
    if (files && files[0]) {
      const file = files[0]
      const fileReader = new FileReader()
      fileReader.readAsText(file)
      fileReader.onload = () => {
        this.props.updateFileContent(
          fileReader.result ? fileReader.result.toString() : ''
        )
      }
    }
  }

  render() {
    return (
      <div className="file-uploader">
        <input
          style={inputStyle}
          ref={this.fileInputRef}
          type="file"
          onChange={this.onFileChange}
        />
        <TargetBox onDrop={this.handleFileDrop} accepts={[NativeTypes.FILE]} />
        <div className="buttons d-flex justify-content-between">
          <Button color="warning" onClick={this.onResetClick}>
            Reset
          </Button>
          <Button color="primary" onClick={this.onButtonClick}>
            Select file
          </Button>
        </div>
      </div>
    )
  }
}

export default connect(
  null,
  {
    updateFileContent,
    resetFile
  }
)(FileUploader)
