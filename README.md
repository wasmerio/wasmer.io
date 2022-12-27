# wasmer.io

## How to develop

- fetch sources
- run `yarn install` to install dependencies
- run `yarn dev` to run development environment
- open http://localhost:3000

## Requirements

- NodeJS >= 12

## How to deploy

- Set env variable `GITHUB_API_ACTIVE`
- Run `yarn build`

## Run Locally with Cloudflare

Clone the project

```bash
  git clone https://github.com/smiletondi/wasmer.io
```

Make sure you have Node.js versions v14.21.1 and v16.18.1 installed

- In the terminal, switch to Node 14 and run the command 
```bash
npx @cloudflare/next-on-pages --experimental-minify 
```
- Open a new terminal and switch to Node 16. Run the command 
```bash 
npx wrangler pages dev .vercel/output/static --compatibility-flags=streams_enable_constructors --compatibility-flags=no_global_navigator
```
- Visit the site at localhost:8788
