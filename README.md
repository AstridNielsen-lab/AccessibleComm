# AccessibleComm: AI-Assisted Communication for Accessibility

AccessibleComm é uma solução inovadora que combina inteligência artificial e reconhecimento de gestos para facilitar a comunicação inclusiva. Este projeto tem como objetivo principal criar um tradutor de LIBRAS (Língua Brasileira de Sinais) que detecta gestos e os converte em texto, permitindo conversas fluidas com a IA **Gemini**.

---

## 📋 Descrição do Projeto

O AccessibleComm utiliza aprendizado de máquina e tecnologias de visão computacional para reconhecer sinais de LIBRAS em tempo real. Os gestos detectados são traduzidos para texto e podem ser enviados diretamente para o chat com a IA, promovendo acessibilidade em ambientes digitais e integração social para a comunidade surda.

---

## ✨ Funcionalidades

- **Reconhecimento de Gestos:** Detecta e interpreta sinais de LIBRAS utilizando uma câmera e modelos de visão computacional.
- **Tradução de Texto:** Mapeia os sinais detectados para palavras correspondentes em português.
- **Chat com IA:** Permite conversas diretas com a IA **Gemini** através de texto traduzido ou digitado manualmente.
- **Feedback de Voz:** Oferece opção de síntese de fala para tornar a comunicação bidirecional.

---

## 🚀 Tecnologias Utilizadas

- **Frontend:**
  - React.js
  - TailwindCSS
- **Backend:**
  - Node.js
  - TensorFlow.js
- **Modelos de IA:**
  - MediaPipe Hands (para reconhecimento de gestos)
  - Gemini API (para interações com a IA)
- **API Externa:**
  - Google Generative Language API (Gemini)
  
---

## 📂 Estrutura do Projeto

```plaintext
AccessibleComm/
├── src/
│   ├── components/
│   │   ├── LibrasTranslation.tsx
│   │   ├── ChatInterface.tsx
│   │   └── VideoFeed.tsx
│   ├── hooks/
│   │   └── useHandDetection.ts
│   └── App.tsx
├── public/
│   ├── index.html
│   └── assets/
├── package.json
└── README.md
```

## 🛠️ Como Rodar o Projeto

### Pré-requisitos

- Node.js instalado
- Yarn ou npm para gerenciar pacotes
- Câmera funcional para a detecção de gestos

### Passos

1. Clone o repositório:
   ```bash
   git clone https://github.com/AstridNielsen-lab/AccessibleComm-AI-Assistant-Julio.git
   ```
2. Acesse o diretório do projeto:
   ```bash
   cd AccessibleComm-AI-Assistant-Julio
   ```
3. Instale as dependências:
   ```bash
   npm install
   ```
4. Inicie o servidor de desenvolvimento:
   ```bash
   npm start
   ```
5. Abra o navegador e acesse:
   ```
   http://localhost:3000
   ```

---

## 📚 Documentação

Para mais detalhes sobre o uso da API da Gemini, consulte a [Documentação Oficial](https://generativelanguage.googleapis.com/).

---

## 📦 Roadmap

- [x] Implementação do reconhecimento de gestos
- [x] Integração com a API da Gemini
- [ ] Suporte a múltiplos idiomas
- [ ] Expansão do vocabulário de LIBRAS
- [ ] Versão mobile para Android e iOS

---

## 🤝 Contribuições

Contribuições são bem-vindas! Siga os passos abaixo para colaborar:

1. Faça um fork do projeto
2. Crie uma nova branch:
   ```bash
   git checkout -b feature/nova-funcionalidade
   ```
3. Commit suas mudanças:
   ```bash
   git commit -m "Adicionando nova funcionalidade"
   ```
4. Faça um push para a branch:
   ```bash
   git push origin feature/nova-funcionalidade
   ```
5. Abra um Pull Request

---

## 📧 Contato

Desenvolvido por Julio Campos Machado.  
Email: juliocamposmachado@gmail.com  
GitHub: [AstridNielsen-lab](https://github.com/AstridNielsen-lab)

---

## 📜 Licença

Este projeto está licenciado sob a [MIT License](LICENSE).

```

