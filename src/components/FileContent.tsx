import React from 'react'
import { connect } from 'react-redux'
import { Input } from 'reactstrap'

import { fileContentSelector } from '../redux/fileSelectors'

type Props = {
  fileContent: string
}

export class FileContent extends React.Component<Props> {
  onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // TODO
  }

  render() {
    return (
      <Input
        rows={20}
        value={this.props.fileContent.trim()}
        type="textarea"
        name="text"
        id="file-content"
        onChange={this.onChange}
      />
    )
  }
}

export default connect(
  fileContentSelector,
  {}
)(FileContent)
