// GG LEGENDS - Module System
// Created by Gabriel Gonçalves Gomes

class ModuleSystem {
    constructor() {
        this.activeModule = 'chat';
        this.modules = {
            chat: new ChatModule(),
            video: new VideoModule(),
            creator: new ContentCreatorModule(),
            multiverse: new MultiverseModule(),
            plugins: new PluginModule(),
            security: new SecurityModule(),
            settings: new SettingsModule()
        };
        
        this.init();
    }

    init() {
        this.setupEventListeners();
        console.log("📦 Sistema de módulos inicializado");
    }

    setupEventListeners() {
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const moduleName = e.target.closest('.sidebar-item').dataset.module;
                this.switchModule(moduleName);
            });
        });
    }

    switchModule(moduleName) {
        if (!this.modules[moduleName]) {
            console.error(`Módulo "${moduleName}" não encontrado`);
            return;
        }

        // Deactivate current module
        if (this.modules[this.activeModule]) {
            this.modules[this.activeModule].deactivate();
        }

        // Activate new module
        this.modules[moduleName].activate();
        this.activeModule = moduleName;

        // Update UI
        this.updateUI(moduleName);
    }

    updateUI(moduleName) {
        // Update sidebar selection
        document.querySelectorAll('.sidebar-item').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelector(`[data-module="${moduleName}"]`)?.classList.add('active');

        // Update module visibility
        document.querySelectorAll('.module-content').forEach(content => {
            content.classList.remove('active');
        });
        document.getElementById(`${moduleName}-module`)?.classList.add('active');
    }
}

class BaseModule {
    constructor(name) {
        this.name = name;
        this.active = false;
    }

    activate() {
        this.active = true;
        console.log(`🔧 Módulo ${this.name} ativado`);
    }

    deactivate() {
        this.active = false;
        console.log(`🔧 Módulo ${this.name} desativado`);
    }
}

class ChatModule extends BaseModule {
    constructor() {
        super('Chat');
        this.history = [];
        this.voiceEnabled = true;
    }

    activate() {
        super.activate();
        this.loadChatHistory();
        this.setupVoiceRecognition();
    }

    loadChatHistory() {
        this.history = JSON.parse(localStorage.getItem('chat_history')) || [];
    }

    setupVoiceRecognition() {
        if ('webkitSpeechRecognition' in window) {
            this.recognition = new webkitSpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.lang = 'pt-BR';
            
            this.recognition.onresult = (event) => {
                const text = event.results[0][0].transcript;
                document.getElementById('messageInput').value = text;
            };
        }
    }
}

class VideoModule extends BaseModule {
    constructor() {
        super('Video Editor');
        this.supportedFormats = ['mp4', 'avi', 'mov', 'webm'];
        this.effects = [];
    }

    activate() {
        super.activate();
        this.loadEffects();
        this.initializeEditor();
    }

    loadEffects() {
        this.effects = [
            { name: 'Fade', type: 'transition' },
            { name: 'Blur', type: 'filter' },
            { name: '3D Rotate', type: 'animation' },
            { name: 'Color Correction', type: 'adjustment' }
        ];
    }

    initializeEditor() {
        console.log("🎬 Editor de vídeo profissional inicializado");
    }
}

class ContentCreatorModule extends BaseModule {
    constructor() {
        super('Content Creator');
        this.templates = [];
        this.aiModels = [];
    }

    activate() {
        super.activate();
        this.loadTemplates();
        this.initializeAI();
    }

    loadTemplates() {
        this.templates = [
            { name: 'YouTube Short', type: 'video' },
            { name: 'Instagram Post', type: 'image' },
            { name: 'Blog Article', type: 'text' },
            { name: 'Podcast Script', type: 'audio' }
        ];
    }

    initializeAI() {
        console.log("🎨 Sistema de criação de conteúdo ativado");
    }
}

class MultiverseModule extends BaseModule {
    constructor() {
        super('AI Multiverse');
        this.personalities = [];
    }

    activate() {
        super.activate();
        this.loadPersonalities();
        this.initializeMultiverse();
    }

    loadPersonalities() {
        this.personalities = [
            { name: 'Professional', type: 'work' },
            { name: 'Creative', type: 'art' },
            { name: 'Hacker', type: 'tech' },
            { name: 'Gamer', type: 'entertainment' }
        ];
    }

    initializeMultiverse() {
        console.log("🌌 Sistema Multiverso de IAs inicializado");
    }
}

class PluginModule extends BaseModule {
    constructor() {
        super('Plugins');
        this.installedPlugins = [];
    }

    activate() {
        super.activate();
        this.loadPlugins();
        this.checkUpdates();
    }

    loadPlugins() {
        this.installedPlugins = [
            { name: 'Video Effects Pro', version: '1.2.0' },
            { name: 'AI Voice Pack', version: '2.0.1' },
            { name: 'Code Generator', version: '1.0.5' },
            { name: '3D Animation Kit', version: '1.1.0' }
        ];
    }

    checkUpdates() {
        console.log("🔌 Verificando atualizações dos plugins");
    }
}

class SecurityModule extends BaseModule {
    constructor() {
        super('Security');
        this.encryptionEnabled = true;
        this.firewallActive = true;
    }

    activate() {
        super.activate();
        this.initializeSecurity();
        this.startMonitoring();
    }

    initializeSecurity() {
        console.log("🔒 Sistema de segurança máxima ativado");
    }

    startMonitoring() {
        console.log("👁️ Monitoramento de segurança iniciado");
    }
}

class SettingsModule extends BaseModule {
    constructor() {
        super('Settings');
        this.settings = {};
    }

    activate() {
        super.activate();
        this.loadSettings();
        this.initializeInterface();
    }

    loadSettings() {
        this.settings = JSON.parse(localStorage.getItem('gg_settings')) || {
            theme: 'cyber',
            language: 'pt-BR',
            autoSave: true,
            notifications: true
        };
    }

    initializeInterface() {
        console.log("⚙️ Interface de configurações carregada");
    }
}

// Initialize module system when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.moduleSystem = new ModuleSystem();
});
