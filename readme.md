# Quokka

## 설치

### dependencies
* nvm (0.39)
* pnpm (9.9.0)
* node (22.8.0) (as in .nvmrc)
* sqlite3 (3.43.2) -- for test purpose, not required

```bash
nvm use
pnpm install
```

## 실행

```bash
pnpm dev
```

## 테스트

```bash
pnpm test
```

## 빌드

```bash
pnpm build
```

## 도커 실행
do not use for production  
pm2 is recommended

```bash
pnpm docker
```