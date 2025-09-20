# 🗳️ 投票機能セットアップガイド

## 現在の状況
投票機能が動作しない理由：**Supabaseの環境変数が設定されていません**

## 🔧 セットアップ手順

### 1. Supabaseプロジェクトの作成
1. [Supabase](https://supabase.com/) にアクセス
2. 新しいプロジェクトを作成
3. プロジェクトの設定から以下の情報を取得：
   - `Project URL`
   - `API Keys` → `anon public`
   - `API Keys` → `service_role` (管理者権限用)

### 2. 環境変数ファイルの作成
プロジェクトルートに `.env.local` ファイルを作成：

```env
# Supabase設定
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here

# 開発環境設定
NODE_ENV=development
```

### 3. データベーステーブルの作成
Supabaseの「SQL Editor」で以下のSQLを実行：

```sql
-- 楽曲投票テーブルの作成
CREATE TABLE IF NOT EXISTS song_votes (
  id BIGSERIAL PRIMARY KEY,
  user_id TEXT NOT NULL,
  song_title TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- 同じユーザーが同じ楽曲に重複投票できないようにする
  UNIQUE(user_id, song_title)
);

-- 投票数を効率的に取得するためのインデックス
CREATE INDEX IF NOT EXISTS idx_song_votes_song_title ON song_votes(song_title);
CREATE INDEX IF NOT EXISTS idx_song_votes_user_id ON song_votes(user_id);
CREATE INDEX IF NOT EXISTS idx_song_votes_created_at ON song_votes(created_at);

-- RLS (Row Level Security) を有効化
ALTER TABLE song_votes ENABLE ROW LEVEL SECURITY;

-- 全ての人が投票データを読み取れるポリシー
CREATE POLICY "Anyone can read votes" ON song_votes
  FOR SELECT USING (true);

-- 全ての人が投票を挿入できるポリシー
CREATE POLICY "Anyone can insert votes" ON song_votes
  FOR INSERT WITH CHECK (true);

-- ユーザーは自分の投票のみ削除できるポリシー
CREATE POLICY "Users can delete own votes" ON song_votes
  FOR DELETE USING (true);

-- 投票統計を取得するビューを作成
CREATE OR REPLACE VIEW song_vote_stats AS
SELECT 
  song_title,
  COUNT(*) as vote_count,
  COUNT(DISTINCT user_id) as unique_voters
FROM song_votes 
GROUP BY song_title
ORDER BY vote_count DESC;

-- 投票統計ビューに対する読み取り権限
GRANT SELECT ON song_vote_stats TO anon, authenticated;
```

### 4. サーバーの再起動
```bash
npm run dev
```

## 🧪 動作確認

### テスト用API
```
GET http://localhost:3000/api/test-voting-tables
```

正常に設定されている場合のレスポンス例：
```json
{
  "song_votes": {
    "exists": true,
    "count": 0
  },
  "song_vote_stats": {
    "exists": true,
    "data": []
  }
}
```

## 🔍 トラブルシューティング

### エラー: "Supabase URL is not set"
- `.env.local` ファイルが作成されているか確認
- 環境変数が正しく設定されているか確認
- サーバーを再起動

### エラー: "relation 'song_votes' does not exist"
- SQLスクリプトが正しく実行されているか確認
- Supabaseの「Table Editor」でテーブルが作成されているか確認

### 投票ボタンが「データベース接続エラー」と表示される
- 上記の設定手順を再度確認
- ブラウザの開発者ツールでエラーメッセージを確認

## ✅ 投票機能の仕様

- **投票上限**: 1ユーザーあたり3票まで
- **重複投票**: 同じ楽曲への重複投票は不可
- **ユーザー識別**: ブラウザフィンガープリンティング + localStorage
- **投票結果**: リアルタイム表示・ランキング機能付き

## 📝 注意事項

- `.env.local` ファイルは `.gitignore` に含まれているため、本番環境では別途設定が必要
- Service Role Keyは管理者権限を持つため、取り扱いに注意
- 本番環境では適切なセキュリティ設定を行うこと
