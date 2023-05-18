import MarkdownComponent from "../markdown-content"

interface ICodeSnippet {
    selectedSnippet: string
}

const CodeSnippet = ({selectedSnippet}:ICodeSnippet)=>{
    //run a fn to select the code snippet from content to display
    return(
        <>
        <MarkdownComponent content={selectedSnippet}/>
        </>
    )
}

export default CodeSnippet;
