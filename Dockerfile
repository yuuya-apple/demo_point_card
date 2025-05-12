# 開発用途に Node.js の軽量イメージを使用
FROM node:20-alpine

# Git をインストール
RUN apk add --no-cache git

# 作業ディレクトリを作成
WORKDIR /app

# 依存ファイルをコピー
COPY package.json package-lock.json* ./

# パッケージをインストール
RUN npm install

# アプリ全体をコピー
COPY . .
  
# ポート開放（開発用: 3000）
EXPOSE 3000

# ホットリロード付きで起動
CMD ["npm", "start"]
