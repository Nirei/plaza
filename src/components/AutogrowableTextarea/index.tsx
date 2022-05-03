import { useCallback, useRef } from 'react'

interface AutogrowingTextareaProps {
  value: string | undefined
  onChange?: (value: string | undefined) => void
  placeholder?: string
}

function AutogrowingTextarea({
  placeholder,
  value,
  onChange,
}: AutogrowingTextareaProps) {
  const inputDivRef = useRef<HTMLDivElement>(null)

  const handleInput = useCallback(
    (event: React.FormEvent<HTMLDivElement>) => {
      const value = event.currentTarget.textContent
      if (inputDivRef.current) inputDivRef.current.textContent = value
      onChange && onChange(value || undefined)
    },
    [onChange],
  )

  return (
    <div className="position-relative fs-5 text-break">
      <div
        className="textarea-autogrow w-100"
        ref={inputDivRef}
        contentEditable
        onInput={handleInput}
      />
      <div
        className="position-absolute text-secondary"
        style={{ zIndex: -1, top: 0, bottom: 0 }}
      >
        <span>{value ? null : placeholder}</span>
      </div>
    </div>
  )
}

export default AutogrowingTextarea
