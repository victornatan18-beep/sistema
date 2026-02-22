# ⚡ ShopifyBridge

Sistema de integração e contingência entre duas lojas Shopify. Permite redirecionar o checkout da Loja A para a Loja B automaticamente, mantendo os produtos do carrinho via mapeamento de SKU.

---

## 🚀 Como instalar (passo a passo)

### PARTE 1 — Configurar o Firebase

1. Acesse [console.firebase.google.com](https://console.firebase.google.com)
2. Clique em **"Criar projeto"** → dê um nome → clique em Continuar
3. Desative o Google Analytics (opcional) → Criar projeto
4. Na tela do projeto, clique em **"Web"** (ícone `</>`)
5. Registre o app com qualquer nome (ex: `shopifybridge`)
6. Copie as credenciais que aparecem (apiKey, authDomain, etc.)
7. Abra o arquivo **`js/firebase-config.js`** e cole as credenciais

**Ativar Authentication:**
- No Firebase Console → menu lateral → **Authentication** → **Primeiros passos**
- Clique em **Email/senha** → Ativar → Salvar

**Ativar Firestore:**
- Menu lateral → **Firestore Database** → **Criar banco de dados**
- Selecione **"Iniciar no modo de teste"** → Próximo → Concluir

**Configurar regras do Firestore (segurança):**
- Firestore → aba **Regras** → substituir por:
```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null && request.auth.uid == resource.data.userId;
    }
    match /stores/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /products/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /settings/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```
- Clique em **Publicar**

---

### PARTE 2 — Publicar no GitHub Pages

1. Crie uma conta em [github.com](https://github.com) (se não tiver)
2. Clique em **"+"** → **New repository**
3. Nome: `shopifybridge` → **Public** → **Create repository**
4. Faça upload de todos os arquivos desta pasta para o repositório
5. Vá em **Settings** → **Pages** → Source: **main** → **/(root)** → **Save**
6. Aguarde 1-2 minutos e acesse: `https://seuusuario.github.io/shopifybridge`

---

### PARTE 3 — Usar o sistema

1. Acesse a URL do GitHub Pages
2. **Crie uma conta** com email e senha
3. Vá em **Lojas** e configure a Loja A e Loja B com os tokens do Shopify
4. Vá em **Produtos** e clique em **Sincronizar Agora**
5. Vá em **Gerar Script**, copie o código e cole no `theme.liquid` da Loja A
6. Ative o redirecionamento no Dashboard

---

## 📁 Estrutura de arquivos

```
shopifybridge/
├── index.html              ← Página de login
├── js/
│   ├── firebase-config.js  ← ⚠️ CONFIGURE AQUI
│   └── auth.js             ← Autenticação compartilhada
├── css/
│   ├── global.css          ← Estilos globais
│   └── login.css           ← Estilos da tela de login
└── pages/
    ├── dashboard.html      ← Painel principal
    ├── stores.html         ← Configuração das lojas
    ├── products.html       ← Sincronização de produtos
    └── script.html         ← Gerador de script
```

---

## ❓ Dúvidas frequentes

**O teste de conexão não funciona?**
O Shopify bloqueia chamadas diretas do navegador (CORS) para a API Admin. Isso é normal — salve as credenciais e use a sincronização de produtos para verificar se estão corretas.

**Os produtos não aparecem na Loja B?**
Certifique-se que os SKUs são **exatamente iguais** nas duas lojas (case-insensitive).

**O script não redireciona?**
Verifique se colou o script antes do `</body>` no `theme.liquid`. Abra o console do navegador (F12) e veja se aparece `[ShopifyBridge] Ativo`.
