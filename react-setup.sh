# React 项目初始化脚本

# 1. 创建 React 项目
npm create vite@latest clamber-react-admin -- --template react-ts

# 2. 进入项目目录
cd clamber-react-admin

# 3. 安装依赖
npm install

# 4. 安装额外依赖
npm install @types/react @types/react-dom
npm install react-router-dom
npm install zustand
npm install antd
npm install @ant-design/icons
npm install axios
npm install echarts echarts-for-react
npm install react-hook-form
npm install @unocss/vite
npm install sass

# 5. 开发依赖
npm install -D @types/node
npm install -D eslint @typescript-eslint/eslint-plugin @typescript-eslint/parser
npm install -D prettier eslint-config-prettier eslint-plugin-prettier
npm install -D autoprefixer
npm install -D @unocss/preset-uno @unocss/transformer-directives

# 6. 启动项目
npm run dev