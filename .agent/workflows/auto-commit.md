---
description: Commit e push automáticos para GitHub
---

# Workflow de Commits Automáticos

Este workflow automatiza o processo de commit e push de alterações para o GitHub.

## Como usar

Sempre que você fizer alterações no código e quiser salvá-las automaticamente no GitHub, execute:

```bash
git add .
git commit -m "Auto-save: <descrição breve da alteração>"
git push
```

## Passos automáticos

// turbo-all

1. **Adicionar arquivos alterados**
```bash
git add .
```

2. **Fazer commit com mensagem automática**
```bash
git commit -m "Auto-save: updates $(Get-Date -Format 'yyyy-MM-dd HH:mm')"
```

3. **Push para GitHub**
```bash
git push
```

## Notas importantes

- Certifique-se de que sua chave SSH está configurada no GitHub
- Todos os arquivos alterados serão incluídos automaticamente (exceto os listados no .gitignore)
- As mensagens de commit incluirão timestamp automático
- O push será feito para a branch atual (normalmente `main`)

## Configuração da Chave SSH

Se você ainda não configurou a chave SSH, siga estes passos:

1. **Gerar uma nova chave SSH** (se ainda não tiver):
```bash
ssh-keygen -t ed25519 -C "seu_email@example.com"
```

2. **Copiar a chave pública**:
```bash
Get-Content ~/.ssh/id_ed25519.pub | Set-Clipboard
```

3. **Adicionar no GitHub**:
   - Vá para GitHub → Settings → SSH and GPG keys → New SSH key
   - Cole a chave copiada
   - Salve

4. **Testar a conexão**:
```bash
ssh -T git@github.com
```
