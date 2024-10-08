FROM node:20.9.0-slim

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

RUN apt-get update -y && apt-get install -y openssl

RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app

WORKDIR /home/node/app

COPY package.json pnpm-lock.yam[l] ./

RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install

COPY prisma ./prisma

RUN pnpm generate

RUN chown -R node:node /home/node/app/node_modules/.pnpm

COPY . .

COPY --chown=node:node . .

USER node

EXPOSE 3001

CMD [ "pnpm", "dev" ]

# para a documentação seguida para construção desse arquivo, vá para o step 3 do link:
# https://www.digitalocean.com/community/tutorials/como-construir-uma-aplicacao-node-js-com-o-docker-pt
