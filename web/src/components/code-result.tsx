type CodeResultProps = {
  code: string
}

export const CodeResult = ({ code }: CodeResultProps) => {
  return (
    <div>
      <p>{code}</p>
    </div>
  )
}
