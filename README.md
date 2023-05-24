This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started Developing

1. Install the Dev Containers extension in VSCode if you don't already have it.

2. Then clone the repo and open it in VSCode.

3. Next Step! Go to the Command Palette (Ctrl/CMD + Shift + P) and click `Open Folder in Container`. This will open a preconfigured dev environment I have created for this project and give you a bash shell into the container. You may also interact with this container using Docker Desktop or Remote Connection VSCode extension.

4. Finally, run the following command to bring up the project:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Sean's Thoughts
For this showcase, I wanted to show off multiple ways to do the same thing. For example, using `fetch` synchronously and asynchrously. 

Many parts of this may seem over-engineered however I was designing for the future and wanted to make sure that this code would be easily extensible. For example, normally I wouldn't want to create a context for the orders since I am passing down only one level but since this is a food ordering service, it is likely that future work will require this information as well.

For this project, I also wanted to try to use a new framework. I decided to use `NextJS 13 with App Router` as it has grown quite popular. It has many native functionalities that make it easy to create a very fast site like prefetching data on hover over links. However this project was built around client side rendering and calls which is not what NextJS was intended for leading to some interesting situations. 

You can see the Dockerfile is in this repo but may notice that it uses the NextJS dev command instead of creating a production build. This is because of the issues alluded to above. NextJS does not like the use of `Router.push` when prerendering pages with the error:

```bash
ReferenceError: location is not defined
```

I also played around with [SWR](https://swr.vercel.app/docs/getting-started) and was pleasntly suprised with many of the features like request caching, validation, and revalidation on focus/reconnect however decided to stick to normal `useEffect + fetch` for this project.