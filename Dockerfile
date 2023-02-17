FROM node:12.21.0-alpine3.11 as build

WORKDIR /hls-streaming
COPY . /hls-streaming
RUN  npm i -g react-script --silent \
  && npm i \
  && npm run build


FROM nginx:stable-alpine

COPY --from=build /hls-streaming/build /usr/share/nginx/html
COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
