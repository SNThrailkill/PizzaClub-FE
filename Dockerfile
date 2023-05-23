FROM node:20-alpine
ENV NODE_ENV=production

WORKDIR /app
COPY . .
RUN npm install --production
EXPOSE 3000
# Have to run as Dev since we are using Router and location is not defined during server side builds
CMD ["npm", "run", "dev"]