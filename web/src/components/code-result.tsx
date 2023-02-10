type CodeResultProps = {
  code: string
}

export const CodeResult = ({ code }: CodeResultProps) => {
  return (
    <div className="w-1/3 flex test-justify items-center flex-col mt-11">
      <strong className="text-2xl">Code result:</strong>
      <p className="text-xl mt-4">{code}</p>
    </div>
  )
}
