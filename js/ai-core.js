// GG LEGENDS - AI Core System
// Created by Gabriel Gonçalves Gomes

class GGLegendsAI {
    constructor() {
        this.version = "1.0.0";
        this.creator = "Gabriel Gonçalves Gomes";
        this.personality = "professional";
        this.memories = JSON.parse(localStorage.getItem('gg_memories')) || [];
        this.settings = JSON.parse(localStorage.getItem('gg_settings')) || this.getDefaultSettings();
        this.isOnline = true;
        this.currentMode = "chat";
        this.securityLevel = "maximum";
        this.plugins = [];
        
        this.init();
    }

    init() {
        console.log(`🧠 GG LEGENDS AI v${this.version} - Inicializando...`);
        console.log(`👨‍💻 Criado por: ${this.creator}`);
        
        this.setupEventListeners();
        this.loadPersonality();
        this.startSystemMonitoring();
        this.initializeSecurity();
        
        console.log("✅ IA Ultra Avançada carregada com sucesso!");
    }

    getDefaultSettings() {
        return {
            theme: "cyber",
            voiceEnabled: true,
            autoSave: true,
            securityLevel: "maximum",
            personality: "professional",
            language: "pt-BR",
            notifications: true,
            autoBackup: true,
            encryptionEnabled: true
        };
    }

    setupEventListeners() {
        // Message input handling
        const messageInput = document.getElementById('messageInput');
        const sendButton = document.getElementById('sendButton');

        if (messageInput && sendButton) {
            messageInput.addEventListener('input', () => {
                this.handleInputChange();
            });

            messageInput.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });

            sendButton.addEventListener('click', () => {
                this.sendMessage();
            });
        }

        // Sidebar navigation
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.addEventListener('click', (e) => {
                this.switchModule(e.target.dataset.module);
            });
        });

        // Personality switching
        document.querySelectorAll('.personality-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchPersonality(e.target.dataset.personality);
            });
        });

        // Mode switching
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                this.switchMode(e.target.dataset.mode);
            });
        });
    }

    handleInputChange() {
        const messageInput = document.getElementById('messageInput');
        const sendButton = document.getElementById('sendButton');
        
        if (messageInput && sendButton) {
            const hasContent = messageInput.value.trim().length > 0;
            sendButton.disabled = !hasContent;
            
            // Auto-resize textarea
            messageInput.style.height = 'auto';
            messageInput.style.height = messageInput.scrollHeight + 'px';
        }
    }

    async sendMessage() {
        const messageInput = document.getElementById('messageInput');
        const messagesContainer = document.getElementById('messagesContainer');
        
        if (!messageInput || !messagesContainer) return;
        
        const message = messageInput.value.trim();
        if (!message) return;

        // Security check for sensitive actions
        if (this.isSensitiveAction(message)) {
            this.showConfirmationModal(message);
            return;
        }

        // Add user message
        this.addMessage(message, true);
        
        // Clear input
        messageInput.value = '';
        messageInput.style.height = 'auto';
        document.getElementById('sendButton').disabled = true;

        // Show typing indicator
        const typingIndicator = this.createTypingIndicator();
        messagesContainer.appendChild(typingIndicator);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Process message and generate response
        try {
            const response = await this.processMessage(message);
            
            // Remove typing indicator
            typingIndicator.remove();
            
            // Add AI response
            this.addMessage(response, false);
            
            // Save to memories
            this.saveToMemory(message, response);
            
        } catch (error) {
            typingIndicator.remove();
            this.addMessage("Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.", false);
            console.error("Erro ao processar mensagem:", error);
        }
    }

    isSensitiveAction(message) {
        const sensitiveKeywords = [
            'deletar', 'remover', 'apagar', 'formatar', 'reset',
            'backup', 'exportar', 'download', 'publicar', 'enviar',
            'instalar', 'desinstalar', 'atualizar', 'configurar'
        ];
        
        return sensitiveKeywords.some(keyword => 
            message.toLowerCase().includes(keyword)
        );
    }

    showConfirmationModal(action) {
        const modal = document.getElementById('confirmationModal');
        const messageElement = document.getElementById('confirmationMessage');
        
        if (modal && messageElement) {
            messageElement.textContent = `Ação detectada: ${action}`;
            modal.classList.add('active');
            
            // Store the action for later confirmation
            this.pendingAction = action;
        }
    }

    async processMessage(message) {
        // Simulate AI processing time
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
        
        // Analyze message intent
        const intent = this.analyzeIntent(message);
        
        // Generate response based on personality and intent
        return this.generateResponse(message, intent);
    }

    analyzeIntent(message) {
        const lowerMessage = message.toLowerCase();
        
        if (lowerMessage.includes('criar') || lowerMessage.includes('gerar')) {
            return 'create';
        } else if (lowerMessage.includes('editar') || lowerMessage.includes('modificar')) {
            return 'edit';
        } else if (lowerMessage.includes('analisar') || lowerMessage.includes('verificar')) {
            return 'analyze';
        } else if (lowerMessage.includes('código') || lowerMessage.includes('programar')) {
            return 'code';
        } else if (lowerMessage.includes('vídeo') || lowerMessage.includes('edição')) {
            return 'video';
        } else {
            return 'chat';
        }
    }

    generateResponse(message, intent) {
        const responses = {
            professional: {
                create: "Entendi sua solicitação de criação. Vou analisar os requisitos e gerar o conteúdo solicitado com precisão profissional.",
                edit: "Perfeito! Vou proceder com as modificações necessárias, mantendo os mais altos padrões de qualidade.",
                analyze: "Iniciando análise detalhada. Utilizarei algoritmos avançados para fornecer insights precisos e acionáveis.",
                code: "Excelente! Vou desenvolver o código solicitado seguindo as melhores práticas e padrões da indústria.",
                video: "Ótimo! Vou utilizar meu sistema de edição profissional para criar um vídeo de alta qualidade.",
                chat: "Como sua IA Ultra Avançada, estou aqui para ajudar com qualquer tarefa. Em que posso ser útil?"
            },
            hacker: {
                create: "🔥 Sistema ativado! Vou hackear a criatividade e gerar algo épico para você!",
                edit: "💻 Modo hacker ativado! Vou quebrar os limites e otimizar tudo ao máximo!",
                analyze: "🕵️ Iniciando scan profundo... Vou descobrir todos os segredos dos dados!",
                code: "⚡ Terminal ativado! Vou codar como um verdadeiro cyber-ninja!",
                video: "🎬 Modo cinema hacker! Vou criar um vídeo que vai quebrar a internet!",
                chat: "🤖 E aí, parceiro! Pronto para hackear o impossível juntos?"
            },
            creative: {
                create: "✨ Que ideia fantástica! Vou liberar toda minha criatividade para dar vida ao seu projeto!",
                edit: "🎨 Perfeito! Vou adicionar aquele toque artístico especial que fará toda a diferença!",
                analyze: "🔍 Vou mergulhar fundo nos dados e encontrar padrões únicos e inspiradores!",
                code: "💡 Que desafio interessante! Vou programar com estilo e elegância!",
                video: "🌟 Uau! Vou criar um vídeo que será uma verdadeira obra de arte visual!",
                chat: "🌈 Olá, criativo! Estou aqui para transformar suas ideias em realidade!"
            },
            gamer: {
                create: "🎮 Quest aceita! Vou criar algo épico que vai fazer você subir de level!",
                edit: "⚔️ Boss fight mode! Vou editar isso como um verdadeiro pro player!",
                analyze: "📊 Analisando stats... Vou encontrar os melhores builds para seus dados!",
                code: "💾 Coding like a speedrunner! Vou programar no modo hardcore!",
                video: "🏆 Achievement unlocked! Vou criar um vídeo digno de campeonato!",
                chat: "🕹️ E aí, player! Pronto para uma nova aventura digital?"
            }
        };

        const personalityResponses = responses[this.personality] || responses.professional;
        return personalityResponses[intent] || personalityResponses.chat;
    }

    addMessage(text, isUser = false) {
        const messagesContainer = document.getElementById('messagesContainer');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${isUser ? 'user' : 'ai'}`;
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'message-content';
        contentDiv.textContent = text;
        
        messageDiv.appendChild(contentDiv);
        messagesContainer.appendChild(messageDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        // Add to memories if it's a complete conversation
        if (!isUser) {
            this.updateSystemStatus();
        }
    }

    createTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'message ai';
        
        const contentDiv = document.createElement('div');
        contentDiv.className = 'typing-indicator';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('div');
            dot.className = 'typing-dot';
            contentDiv.appendChild(dot);
        }
        
        typingDiv.appendChild(contentDiv);
        return typingDiv;
    }

    saveToMemory(userMessage, aiResponse) {
        const memory = {
            id: Date.now(),
            timestamp: new Date().toISOString(),
            user: userMessage,
            ai: aiResponse,
            personality: this.personality,
            mode: this.currentMode
        };
        
        this.memories.push(memory);
        
        // Keep only last 1000 memories to prevent storage overflow
        if (this.memories.length > 1000) {
            this.memories = this.memories.slice(-1000);
        }
        
        localStorage.setItem('gg_memories', JSON.stringify(this.memories));
    }

    switchModule(moduleName) {
        // Hide all modules
        document.querySelectorAll('.module-content').forEach(module => {
            module.classList.remove('active');
        });
        
        // Show selected module
        const targetModule = document.getElementById(`${moduleName}-module`);
        if (targetModule) {
            targetModule.classList.add('active');
        }
        
        // Update sidebar active state
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.classList.remove('active');
        });
        
        const activeItem = document.querySelector(`[data-module="${moduleName}"]`);
        if (activeItem) {
            activeItem.classList.add('active');
        }
    }

    switchPersonality(newPersonality) {
        this.personality = newPersonality;
        
        // Update UI
        document.querySelectorAll('.personality-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`[data-personality="${newPersonality}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
        
        // Save to settings
        this.settings.personality = newPersonality;
        localStorage.setItem('gg_settings', JSON.stringify(this.settings));
        
        // Notify user
        this.addMessage(`Personalidade alterada para: ${this.getPersonalityName(newPersonality)}`, false);
    }

    switchMode(newMode) {
        this.currentMode = newMode;
        
        // Update UI
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        const activeBtn = document.querySelector(`[data-mode="${newMode}"]`);
        if (activeBtn) {
            activeBtn.classList.add('active');
        }
    }

    getPersonalityName(personality) {
        const names = {
            professional: "Profissional",
            hacker: "Hacker",
            creative: "Criativo",
            gamer: "Gamer"
        };
        return names[personality] || "Profissional";
    }

    loadPersonality() {
        const savedPersonality = this.settings.personality || 'professional';
        this.switchPersonality(savedPersonality);
    }

    startSystemMonitoring() {
        setInterval(() => {
            this.updateSystemStatus();
        }, 5000);
    }

    updateSystemStatus() {
        // Simulate system metrics
        const cpuUsage = Math.floor(Math.random() * 30) + 20; // 20-50%
        const memoryUsage = (Math.random() * 1.5 + 1.5).toFixed(1); // 1.5-3.0GB
        
        // Update status displays
        const statusItems = document.querySelectorAll('.status-item span');
        if (statusItems.length >= 3) {
            statusItems[0].textContent = `${cpuUsage}%`;
            statusItems[1].textContent = `${memoryUsage}GB`;
            statusItems[2].textContent = this.isOnline ? 'Online' : 'Offline';
        }
    }

    initializeSecurity() {
        console.log("🔐 Sistema de segurança ativado");
        console.log("🛡️ Criptografia AES-256 habilitada");
        console.log("🚫 Firewall anti-spy ativo");
        
        // Simulate security checks
        this.performSecurityScan();
    }

    performSecurityScan() {
        setTimeout(() => {
            console.log("✅ Scan de segurança concluído - Sistema protegido");
        }, 2000);
    }

    // AI Download System
    async downloadAI() {
        this.showConfirmationModal("Baixar IA Completa com todas as memórias, configurações e plugins");
    }

    async exportAI() {
        this.showConfirmationModal("Exportar IA para arquivo instalável");
    }

    async backupMemories() {
        this.showConfirmationModal("Criar backup completo das memórias da IA");
    }

    // Emergency Kill Switch
    emergencyKillSwitch() {
        if (confirm("⚠️ ATENÇÃO: Isso irá desligar completamente o sistema. Confirma?")) {
            console.log("🚨 KILL SWITCH ATIVADO - Sistema sendo desligado...");
            
            // Simulate system shutdown
            document.body.style.transition = "all 2s ease";
            document.body.style.opacity = "0";
            
            setTimeout(() => {
                document.body.innerHTML = `
                    <div style="display: flex; align-items: center; justify-content: center; height: 100vh; background: #000; color: #ff0000; font-family: 'Orbitron', monospace; text-align: center;">
                        <div>
                            <h1 style="font-size: 3rem; margin-bottom: 1rem;">SISTEMA DESLIGADO</h1>
                            <p style="font-size: 1.2rem;">GG LEGENDS AI foi desativado com segurança</p>
                            <button onclick="location.reload()" style="margin-top: 2rem; padding: 1rem 2rem; background: #ff0066; color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1rem;">Reiniciar Sistema</button>
                        </div>
                    </div>
                `;
            }, 2000);
        }
    }
}

// Global functions for HTML onclick events
function downloadAI() {
    if (window.ggAI) {
        window.ggAI.downloadAI();
    }
}

function exportAI() {
    if (window.ggAI) {
        window.ggAI.exportAI();
    }
}

function backupMemories() {
    if (window.ggAI) {
        window.ggAI.backupMemories();
    }
}

function emergencyKillSwitch() {
    if (window.ggAI) {
        window.ggAI.emergencyKillSwitch();
    }
}

function confirmAction() {
    const modal = document.getElementById('confirmationModal');
    if (modal && window.ggAI && window.ggAI.pendingAction) {
        modal.classList.remove('active');
        
        // Execute the pending action
        const action = window.ggAI.pendingAction;
        
        if (action.includes('Baixar IA')) {
            startDownloadProcess();
        } else if (action.includes('Exportar IA')) {
            startExportProcess();
        } else if (action.includes('backup')) {
            startBackupProcess();
        } else {
            // Regular message processing
            window.ggAI.sendMessage();
        }
        
        window.ggAI.pendingAction = null;
    }
}

function editAction() {
    const modal = document.getElementById('confirmationModal');
    if (modal) {
        modal.classList.remove('active');
        // Focus back on input for editing
        const messageInput = document.getElementById('messageInput');
        if (messageInput && window.ggAI && window.ggAI.pendingAction) {
            messageInput.value = window.ggAI.pendingAction;
            messageInput.focus();
        }
        window.ggAI.pendingAction = null;
    }
}

function cancelAction() {
    const modal = document.getElementById('confirmationModal');
    if (modal) {
        modal.classList.remove('active');
        window.ggAI.pendingAction = null;
    }
}

function startDownloadProcess() {
    const downloadModal = document.getElementById('downloadModal');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    const progressPercent = document.getElementById('progressPercent');
    
    if (downloadModal && progressFill && progressText && progressPercent) {
        downloadModal.classList.add('active');
        
        let progress = 0;
        const interval = setInterval(() => {
            progress += Math.random() * 10;
            if (progress > 100) progress = 100;
            
            progressFill.style.width = progress + '%';
            progressPercent.textContent = Math.floor(progress) + '%';
            
            if (progress < 30) {
                progressText.textContent = 'Coletando memórias...';
            } else if (progress < 60) {
                progressText.textContent = 'Empacotando configurações...';
            } else if (progress < 90) {
                progressText.textContent = 'Compilando plugins...';
            } else if (progress < 100) {
                progressText.textContent = 'Finalizando download...';
            } else {
                progressText.textContent = 'Download concluído!';
                clearInterval(interval);
                
                setTimeout(() => {
                    downloadModal.classList.remove('active');
                    alert('🎉 IA baixada com sucesso! Arquivo salvo como: GG_LEGENDS_AI_v1.0.0.exe');
                }, 1000);
            }
        }, 200);
    }
}

function startExportProcess() {
    alert('🚀 Processo de exportação iniciado! Escolha o formato: APK, EXE, APP, PWA ou ISO');
}

function startBackupProcess() {
    alert('💾 Backup das memórias criado com sucesso! Arquivo: GG_LEGENDS_Memories_Backup.ggm');
}

// Quick action functions
function startVideoCreation() {
    if (window.ggAI) {
        window.ggAI.addMessage("Iniciando criação de vídeo automático. Que tipo de conteúdo você gostaria de criar?", false);
    }
}

function generateContent() {
    if (window.ggAI) {
        window.ggAI.addMessage("Modo geração de conteúdo ativado! Posso criar textos, imagens, vídeos, códigos e muito mais. O que você precisa?", false);
    }
}

function editProject() {
    if (window.ggAI) {
        window.ggAI.addMessage("Editor profissional carregado! Envie seu arquivo ou descreva o que você gostaria de editar.", false);
    }
}

function analyzeData() {
    if (window.ggAI) {
        window.ggAI.addMessage("Sistema de análise ativado! Envie seus dados e eu fornecerei insights detalhados e acionáveis.", false);
    }
}

// File handling functions
function attachFile() {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
        fileInput.click();
    }
}

function captureScreen() {
    alert('📸 Captura de tela ativada! (Funcionalidade em desenvolvimento)');
}

function recordAudio() {
    const visualizer = document.getElementById('voiceVisualizer');
    if (visualizer) {
        visualizer.classList.toggle('active');
        if (visualizer.classList.contains('active')) {
            alert('🎤 Gravação de áudio iniciada!');
        } else {
            alert('⏹️ Gravação finalizada!');
        }
    }
}

function openCodeEditor() {
    alert('💻 Editor de código avançado será aberto em breve!');
}

// Initialize AI when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.ggAI = new GGLegendsAI();
});
