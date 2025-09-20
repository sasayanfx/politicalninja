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
