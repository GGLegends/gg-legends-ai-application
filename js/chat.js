// GG LEGENDS - Chat System
document.addEventListener('DOMContentLoaded', () => {
    // Initialize DOM elements
    const messageInput = document.getElementById('messageInput');
    const sendButton = document.getElementById('sendButton');
    const messagesContainer = document.getElementById('messagesContainer');

    if (!messageInput || !sendButton || !messagesContainer) {
        console.error('Required elements not found');
        return;
    }

    // Initially disable send button
    sendButton.disabled = true;

    // Message handling
    function addMessage(text, isUser) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'ai'}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = text;
        
        messageDiv.appendChild(contentDiv);
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
            <div class="typing-dot"></div>
        `;
        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return typingDiv;
    }

    // Event Listeners
    messageInput.addEventListener('input', function() {
        // Auto-resize textarea
        this.style.height = 'auto';
        this.style.height = this.scrollHeight + 'px';
        
        // Enable/disable send button
        sendButton.disabled = !this.value.trim();
    });

    sendButton.addEventListener('click', async function() {
        const messageText = messageInput.value.trim();
        if (!messageText) return;

        // Disable send button
        this.disabled = true;
        
        // Add user message
        addMessage(messageText, true);
        
        // Clear input
        messageInput.value = '';
        messageInput.style.height = 'auto';
        
        // Show typing indicator
        const typingIndicator = showTypingIndicator();

        // Simulate AI response
        setTimeout(() => {
            typingIndicator.remove();
            
            // Generate response based on message content
            let response;
            if (messageText.toLowerCase().includes('vídeo')) {
                response = "Claro! Posso ajudar você a criar um vídeo profissional. Vou ativar o módulo de edição de vídeo. Que tipo de vídeo você gostaria de criar?";
            } else if (messageText.toLowerCase().includes('criar')) {
                response = "Ótimo! Vou ativar o modo criativo para ajudar você. Que tipo de conteúdo você gostaria de criar?";
            } else {
                response = "Entendi! Como posso ajudar você com sua solicitação?";
            }
            
            addMessage(response, false);
            
            // Re-enable send button
            this.disabled = false;
        }, 1500);
    });

    // Enter key handler
    messageInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!sendButton.disabled) {
                sendButton.click();
            }
        }
    });
});
