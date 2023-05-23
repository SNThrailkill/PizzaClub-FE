This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, install the Dev Containers extension in VSCode if you don't already have it.

Second, clone the repo and open it in VSCode.

Third, go to the Command Palette and click `Open Folder in Container`. This will open a preconfigured dev environment I have created for this project and give you a bash shell into the container. You may also interact with this container using Docker Desktop or Remote Connection VSCode extension.

Fianlly, run the following command to bring up the project:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Sean's Thoughts

Normally I wouldn't want to create a context for the orders since I am passing down only one level but since this is a food odering service, it is likely that future work will require this information as well.




