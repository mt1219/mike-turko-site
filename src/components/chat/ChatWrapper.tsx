// src/components/chat/ChatWrapper.tsx
'use client';

import { useState } from 'react';
import { FloatingButton, ChatPanel } from './';

export default function ChatWrapper() {
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <>
            <FloatingButton isOpen={isChatOpen} onClick={() => setIsChatOpen(!isChatOpen)} />
            {isChatOpen && <ChatPanel onClose={() => setIsChatOpen(false)} />}
        </>
    );
}