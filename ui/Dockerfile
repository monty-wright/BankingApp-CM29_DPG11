FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./
RUN npm i
ARG BACKEND_APP_HOST_IP_ADDRESS
ENV BACKEND_APP_HOST_IP_ADDRESS $BACKEND_APP_HOST_IP_ADDRESS
CMD ["npm", "run", "start"]
EXPOSE 3000