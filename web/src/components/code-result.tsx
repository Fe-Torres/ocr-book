type CodeResultProps = {
  code: string
}

export const CodeResult = ({ code }: CodeResultProps) => {
  return (
    <div className="flex items-center flex-col mt-11">
      <strong>Code result:</strong>
      <p>{code}</p>
    </div>
  )
}
