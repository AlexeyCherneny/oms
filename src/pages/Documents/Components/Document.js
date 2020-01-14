import React from 'react'
import ReactQuill from 'react-quill'
import { Button, Typography } from "antd"

import 'react-quill/dist/quill.snow.css'

import * as styles from './Document.module.scss'

export const Document = ({ document, history, updateListRequest }) => {
  if (!document) {
    history.push('/app/cabinet/documents')
    return null
  }

  const { content, title } = document

  const quillRef = React.useRef(null)
  const [value, setValue] = React.useState(content)
  const [editable, setEditable] = React.useState(true)

  const handleEditable = () => {
    setEditable(!editable)
    quillRef.current.editor.enable(editable)
    if (!editable) {
      updateListRequest({ document, content: value })
    }
  }

  React.useEffect(() => { quillRef.current.editor.enable(false) }, [])
  React.useEffect(() => { if (content !== value) { setValue(content) } }, [content])

  return (
    <>
    <div className={styles.header}>
      <Typography.Title>{title}</Typography.Title>
      <Button type="primary" size="large" onClick={handleEditable}>
        {editable ? 'change' : 'save'}
      </Button>
    </div>
      <ReactQuill value={value} onChange={setValue} enable={false} ref={quillRef} />
    </>
  )
}
