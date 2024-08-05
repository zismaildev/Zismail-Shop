import { promises as fs } from "fs";

const packageJson = JSON.parse(await fs.readFile("./package.json", "utf-8"));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  publicRuntimeConfig: {
    appVersion: {
      project: packageJson.version,
      client: {
        version: packageJson.version,
        nextjs: packageJson.dependencies["next"],
        nextui: packageJson.dependencies["@nextui-org/react"],
        tailwind: packageJson.dependencies["tailwindcss"],
      },
    },
  },
  images: {
    domains: [
      "images.unsplash.com",
      "plus.unsplash.com",
      "fastly.picsum.photos",
      "picsum.photos",
    ],
  },
};

export default nextConfig;
