import React from 'react'
import { useCopyTextHandler } from 'actionsack'

import { COLORS } from '../lib/constants'
import { Controls, ControlsBW, ControlsBoxy } from './svg/Controls'
import CopySVG from './svg/Copy'
import CheckMark from './svg/Checkmark'

const size = 24

const CopyButton = React.memo(function CopyButton({ text }) {
  const { onClick, copied } = useCopyTextHandler(text)

  return (
    <button onClick={onClick} aria-label="Copy Button">
      {copied ? (
        <CheckMark color={COLORS.GRAY} width={size} height={size} />
      ) : (
        <CopySVG size={size} color={COLORS.GRAY} />
      )}
      <style jsx>
        {`
          button {
            border: none;
            cursor: pointer;
            color: ${COLORS.SECONDARY};
            background: transparent;
          }

          &:active {
            outline: none;
          }
        `}
      </style>
    </button>
  )
})

const WINDOW_THEMES_MAP = { bw: <ControlsBW />, boxy: <ControlsBoxy /> }
export default ({ theme, copyable, code, light }) => (
  <div className="window-controls">
    {WINDOW_THEMES_MAP[theme] || <Controls />}
    <div className="window-title-container">
      <input aria-label="Image Title" type="text" spellCheck="false" />
    </div>
    {copyable && (
      <div className="copy-button">
        <CopyButton text={code} />
      </div>
    )}
    <style jsx>
      {`
        .window-controls {
          margin-top: -24px;
          position: relative;
          top: ${theme === 'bw' ? 36 : 34}px;
          margin-left: ${theme === 'bw' ? 16 : 14}px;
          margin-right: ${theme === 'boxy' ? 16 : 0}px;
          z-index: 2;
          text-align: ${theme === 'boxy' ? 'right' : 'initial'};
        }

        .window-title-container {
          position: absolute;
          margin: 0px;
          top: -3px;
          left: -9px;
          width: 100%;
          text-align: center;
        }

        input {
          width: 250px;
          max-width: calc(100% - ${theme === 'boxy' ? 110 : 140}px);
          background: none;
          outline: none;
          border: none;
          text-align: center;
          font-size: 14px;
          color: ${light ? COLORS.BLACK : COLORS.SECONDARY};
        }

        .copy-button {
          cursor: pointer;
          position: absolute;
          top: 0px;
          right: 16px;
        }
      `}
    </style>
  </div>
)
