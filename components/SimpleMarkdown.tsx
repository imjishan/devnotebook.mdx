import React from 'react';

interface Props {
  content: string;
}

// NOTE: In a real Next.js/Contentlayer app, this would be handled by a robust MDX provider.
// This is a lightweight renderer for the client-side SPA demonstration to avoid complex peer dependencies.
export const SimpleMarkdown: React.FC<Props> = ({ content }) => {
  const lines = content.split('\n');
  const renderedElements: React.ReactNode[] = [];

  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let keyCounter = 0;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Handle Code Blocks
    if (line.trim().startsWith('```')) {
      if (inCodeBlock) {
        // End of block
        renderedElements.push(
          <div key={`code-${keyCounter++}`} className="my-6 rounded-md bg-gray-100 p-4 font-mono text-sm overflow-x-auto border border-gray-200">
            <pre>{codeBlockContent.join('\n')}</pre>
          </div>
        );
        codeBlockContent = [];
        inCodeBlock = false;
      } else {
        // Start of block
        inCodeBlock = true;
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Handle Headers
    if (line.startsWith('# ')) {
      renderedElements.push(<h1 key={i} className="text-3xl font-bold mt-8 mb-4 tracking-tight">{line.replace('# ', '')}</h1>);
    } else if (line.startsWith('## ')) {
      renderedElements.push(<h2 key={i} className="text-2xl font-bold mt-8 mb-3 tracking-tight">{line.replace('## ', '')}</h2>);
    } else if (line.startsWith('### ')) {
      renderedElements.push(<h3 key={i} className="text-xl font-semibold mt-6 mb-2">{line.replace('### ', '')}</h3>);
    } 
    // Handle Blockquotes
    else if (line.startsWith('> ')) {
        renderedElements.push(
            <blockquote key={i} className="border-l-4 border-gray-300 pl-4 italic text-gray-600 my-6">
                {line.replace('> ', '')}
            </blockquote>
        );
    }
    // Handle Lists
    else if (line.trim().startsWith('- ')) {
        renderedElements.push(<li key={i} className="ml-6 list-disc mb-1">{line.replace('- ', '')}</li>);
    }
    // Handle Empty Lines
    else if (line.trim() === '') {
        // renderedElements.push(<div key={i} className="h-4" />); 
    }
    // Handle Paragraphs
    else {
      // Basic inline formatting regex (bold, italic, code)
      const parseInline = (text: string) => {
          const parts = text.split(/(\*\*.*?\*\*|`.*?`)/g);
          return parts.map((part, idx) => {
              if (part.startsWith('**') && part.endsWith('**')) {
                  return <strong key={idx}>{part.slice(2, -2)}</strong>;
              }
              if (part.startsWith('`') && part.endsWith('`')) {
                  return <code key={idx} className="bg-gray-100 px-1 py-0.5 rounded font-mono text-sm border border-gray-200">{part.slice(1, -1)}</code>;
              }
              return part;
          });
      };

      renderedElements.push(
        <p key={i} className="mb-4 leading-relaxed text-gray-800 text-lg">
            {parseInline(line)}
        </p>
      );
    }
  }

  return <div>{renderedElements}</div>;
};
