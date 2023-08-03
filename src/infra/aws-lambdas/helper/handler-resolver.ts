export const handlerPath = (context: string) => {
  // eslint-disable-next-line no-undef
  return `${context.split(process.cwd())[1].substring(1).replace(/\\/g, "/")}`;
};
