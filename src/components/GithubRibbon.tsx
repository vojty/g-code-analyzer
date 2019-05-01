import React from 'react'

const style: React.CSSProperties = {
  position: 'absolute',
  top: 0,
  right: 0,
  border: 0
}

export function GithubRibbon() {
  return (
    <a href="a">
      <img
        style={style}
        src="https://s3.amazonaws.com/github/ribbons/forkme_right_green_007200.png"
        alt="Fork me on GitHub"
      />
    </a>
  )
}
