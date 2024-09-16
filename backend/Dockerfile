# AlmaLinux 9 をベースイメージとして使用
FROM almalinux:9

# 必要なパッケージをインストール
RUN dnf install -y \
    nodejs \
    npm \
    python3 \
    golang \
    rust \
    php \
    && dnf clean all

# 手動で curl をインストール
RUN dnf install -y --allowerasing curl

# Julia をインストール
RUN curl -fsSL https://julialang-s3.julialang.org/bin/linux/x64/1.9/julia-1.9.3-linux-x86_64.tar.gz -o julia.tar.gz \
    && tar -xzf julia.tar.gz -C /opt \
    && ln -s /opt/julia-1.9.3/bin/julia /usr/local/bin/julia \
    && rm julia.tar.gz

# TypeScript のインストール
RUN npm install -g typescript

# NestJS の依存関係をインストールするために作業ディレクトリを設定
WORKDIR /usr/src/app

# NestJS アプリケーションのコードをコンテナ内にコピー
COPY . .

# npm を使って依存関係をインストール
RUN npm install

# コンテナが起動したときに実行されるコマンド
# CMD ["npm", "run", "start:dev"]
