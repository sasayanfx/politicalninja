# Vercel環境変数設定

## 🔑 設定が必要な環境変数

### **Production Environment Variables**

| Variable | Value |
|----------|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://wxtmgtmekxifaaisrspg.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Ind4dG1ndG1la3hpZmFhaXNyc3BnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY5Njc1NTIsImV4cCI6MjA2MjU0MzU1Mn0.Q0kzW94RZycPO6WominXAgaPlQHkU_L0FmcVssPlfwU` |
| `NODE_ENV` | `production` |

## 📝 Vercelでの設定手順

### Web UI での設定:
1. Vercelダッシュボードでプロジェクトを選択
2. **Settings** → **Environment Variables** をクリック
3. 上記の環境変数を1つずつ追加
4. **Environment** は「Production」を選択

### CLI での設定:
```bash
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY  
vercel env add NODE_ENV
```

## ⚠️ セキュリティ注意事項

- `NEXT_PUBLIC_` プレフィックスの変数はクライアントサイドで公開される
- `SUPABASE_SERVICE_ROLE_KEY` は管理機能で必要になった際に追加
- 本番環境では適切なSupabaseのRLSポリシーを設定すること
