// src/components/DocSummarization.tsx
import React, { useState } from 'react';

const DocSummarization: React.FC = () => {
    const [documentText, setDocumentText] = useState('');
    const [summary, setSummary] = useState('');

    const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setDocumentText(event.target.value);
    };

    const handleSummarize = () => {
        if (documentText) {
            // Implement the document summarization logic here
            console.log('Summarizing document:', documentText);
            // Example: Replace with your summarization URL
            fetch('/summarize-document', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ text: documentText }),
            })
                .then(response => response.json())
                .then(data => {
                    setSummary(data.summary);
                    console.log('Document summarized successfully:', data);
                })
                .catch(error => {
                    console.error('Error summarizing document:', error);
                });
        } else {
            console.log('Document text is required');
        }
    };

    return (
        <div>
            <h1>Document Summarization</h1>
            <textarea
                placeholder="Paste your document text here"
                value={documentText}
                onChange={handleTextChange}
                rows={10}
                cols={50}
            />
            <button onClick={handleSummarize}>Summarize</button>
            {summary && (
                <div>
                    <h2>Summary</h2>
                    <p>{summary}</p>
                </div>
            )}
        </div>
    );
};

export default DocSummarization;