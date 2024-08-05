import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import MySwiper from '@/components/swiper';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Zismail Shop</title>
        <meta name="description" content="Zismail Shop: Minecraft and FiveM server setups, website development, and bug fixing services." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MySwiper />

      <div className="mx-auto max-w-7xl p-5 text-left sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 shadow-2xl sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
          <svg
            viewBox="0 0 2024 2024"
            className="absolute left-1/2 top-1/2 -z-10 h-[64rem] w-[64rem] -translate-y-1/2 [mask-image:radial-gradient(closest-side,white,transparent)] sm:left-full sm:-ml-80 lg:left-1/2 lg:ml-0 lg:-translate-x-1/2 lg:translate-y-0"
            aria-hidden="true"
          >
            <circle
              cx={512}
              cy={512}
              r={512}
              fill="url(#759c1415-0410-454c-8f7c-9a820de03641)"
              fillOpacity="0.7"
            />
            <defs>
              <radialGradient id="759c1415-0410-454c-8f7c-9a820de03641">
                <stop stopColor="#7775D6" />
                <stop offset={1} stopColor="#E935C1" />
              </radialGradient>
            </defs>
          </svg>
          <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Zismail Shop
            </h2>
            <p
              className="mt-6 text-lg leading-8 text-gray-300"
              style={{ textIndent: "2em" }}
            >
              This website was created to present My abilities and work by
              using Nextjs, Next UI Framework combined with Vercel to make this website
              accessible. And this website has been developed to accommodate all
              screen sizes. with visitors on all devices
            </p>
          </div>
          <div className="relative mt-16 h-80 lg:mt-8">
            <Image
              className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10"
              src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="App screenshot"
              width={1824}
              height={1080}
            />
          </div>
        </section>
      </div>

      {/* Services Section */}
      <section className="py-16 bg-gray-100">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold mb-12">Our Services</h2>

          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold mb-4">Minecraft Server Setup</h3>
              <p className="text-lg text-gray-700">
                Custom configurations, mod installations, and performance optimization for a seamless Minecraft experience.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold mb-4">FiveM Server Setup</h3>
              <p className="text-lg text-gray-700">
                Tailored configurations and script integrations for a unique GTA V multiplayer experience.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold mb-4">Website Development</h3>
              <p className="text-lg text-gray-700">
                Responsive and high-performing websites built with Next.js to ensure optimal user experiences.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <h3 className="text-2xl font-semibold mb-4">Bug Fixing</h3>
              <p className="text-lg text-gray-700">
                Quick and efficient bug fixing to keep your websites and servers running smoothly.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="relative py-16">
        <div className="absolute inset-0">
          <div className="relative h-80">
            <Image
              className="object-cover w-full h-full rounded-lg shadow-lg"
              src="https://images.unsplash.com/photo-1542831371-29b0f74f9713?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Gallery image"
              layout="fill"
            />
          </div>
        </div>
        <div className="relative z-10 mx-auto max-w-7xl px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Gallery</h2>
          <p className="text-lg text-gray-700">
            Browse through some of our recent projects and services to get a better understanding of our work.
          </p>
        </div>
      </section>
    </div>
  );
}
