import React from 'react'
import {
  DropTarget,
  DropTargetConnector,
  ConnectDropTarget,
  DropTargetMonitor
} from 'react-dnd'
import Octicon, { CloudDownload } from '@githubprimer/octicons-react'

const style: React.CSSProperties = {
  border: '1px solid gray',
  padding: '2rem',
  justifyContent: 'center',
  display: 'flex',
  alignItems: 'center'
}

export interface TargetBoxProps {
  accepts: string[]
  onDrop: (props: TargetBoxProps, monitor: DropTargetMonitor) => void
  isOver: boolean
  canDrop: boolean
  connectDropTarget: ConnectDropTarget
}

const TargetBox: React.FC<TargetBoxProps> = ({
  canDrop,
  isOver,
  connectDropTarget
}) => {
  const isActive = canDrop && isOver
  return connectDropTarget(
    <div style={style}>
      <Octicon icon={CloudDownload} />
      {isActive ? 'Release to drop' : 'Drag file here'}
    </div>
  )
}

export default DropTarget(
  (props: TargetBoxProps) => props.accepts,
  {
    drop(props: TargetBoxProps, monitor: DropTargetMonitor) {
      if (props.onDrop) {
        props.onDrop(props, monitor)
      }
    }
  },
  (connect: DropTargetConnector, monitor: DropTargetMonitor) => ({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    canDrop: monitor.canDrop()
  })
)(TargetBox)
