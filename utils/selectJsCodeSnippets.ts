export const selectJsCodeSnippets = (content: string) => {
  const regex = /```js[\s\S]*?```/g;
  const codeSnippets = content.match(regex);
  return codeSnippets;
};
