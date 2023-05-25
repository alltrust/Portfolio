import MarkdownComponent from "../markdown-content"

interface ICodeSnippet {
    selectedSnippet: string
}

const CodeSnippet = ({selectedSnippet}:ICodeSnippet)=>{
    return(
        <>
        <MarkdownComponent content={selectedSnippet}/>
        </>
    )
}

export default CodeSnippet;
