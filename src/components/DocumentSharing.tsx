// src/components/DocumentSharing.tsx
import React, { useState } from 'react';

const DocumentSharing: React.FC = () => {
    const [email, setEmail] = useState('');
    const [documentId, setDocumentId] = useState('');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleDocumentIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDocumentId(event.target.value);
    };

    const handleShare = () => {
        if (email && documentId) {
            // Implement the document sharing logic here
            console.log(`Sharing document ${documentId} with ${email}`);
            // Example: Replace with your sharing URL
            fetch('/share-document', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, documentId }),
            })
                .then(response => response.json())
                .then(data => {
                    console.log('Document shared successfully:', data);
                })
                .catch(error => {
                    console.error('Error sharing document:', error);
                });
        } else {
            console.log('Email and document ID are required');
        }
    };

    return (
        <div>
            <h1>Share Document</h1>
            <input
                type="email"
                placeholder="Recipient's email"
                value={email}
                onChange={handleEmailChange}
            />
            <input
                type="text"
                placeholder="Document ID"
                value={documentId}
                onChange={handleDocumentIdChange}
            />
            <button onClick={handleShare}>Share</button>
        </div>
    );
};

export default DocumentSharing;