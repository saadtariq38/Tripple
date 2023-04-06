import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link';
import styles from './page.module.css'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
 
  return (


      <main>
          <section class="bg-center bg-no-repeat bg-[url('https://source.unsplash.com/1600x1600/?travelling')] bg-gray-700 bg-blend-multiply">
              <div class="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-30">
                  <h1 class="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Travelling made easy</h1>
                  <p class="mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48">Choose from a wide selection of verified trips, according to your trip preference.</p>
                  <div class="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                      <a class="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
                        <Link href="/recreational">Recreational</Link>
                      </a>
                      <a class="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
                        <Link href="/educational">Educational</Link>
                      </a>
                      <a class="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
                      <Link href="/entertainment">Entertainment</Link>
                      </a>
                  </div>
                  <a class="inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 mt-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400">
                    <Link href="/all">All trips</Link>
                  </a>
              </div>
          </section>

          <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mt-24 flex justify-center">
              <div className="grid gap-4">
                  <div>
                      <img className="h-auto max-w-full rounded-lg" src="https://source.unsplash.com/1600x1600/?lakes" alt="" />
                  </div>
                  <div>
                      <img className="h-auto max-w-full rounded-lg" src="https://source.unsplash.com/1600x1300/?mountains" alt="" />
                  </div>
                  <div>
                      <img className="h-auto max-w-full rounded-lg" src="https://source.unsplash.com/1600x1900/?trips" alt="" />
                  </div>
              </div>
              <div className="grid gap-4">
                  <div>
                      <img className="h-auto max-w-full rounded-lg" src="https://source.unsplash.com/1600x1100/?trips" alt="" />
                  </div>
                  <div>
                      <img className="h-auto max-w-full rounded-lg" src="https://source.unsplash.com/1600x1900/?scenery" alt="" />
                  </div>
                  <div>
                      <img className="h-auto max-w-full rounded-lg" src="https://source.unsplash.com/1600x1800/?beach" alt="" />
                  </div>
              </div>
              <div className="grid gap-4">
                  <div>
                      <img className="h-auto max-w-full rounded-lg" src="https://source.unsplash.com/1600x1850/?exploration" alt="" />
                  </div>
                  <div>
                      <img className="h-auto max-w-full rounded-lg" src="https://source.unsplash.com/1600x1600/?roads" alt="" />
                  </div>
                  <div>
                      <img className="h-auto max-w-full rounded-lg" src="https://source.unsplash.com/1600x1350/?hiking" alt="" />
                  </div>
              </div>
              <div className="grid gap-4">
                  <div>
                      <img className="h-auto max-w-full rounded-lg" src="https://source.unsplash.com/1600x1750/?lahore" alt="" />
                  </div>
                  <div>
                      <img className="h-auto max-w-full rounded-lg" src="https://source.unsplash.com/1600x1650/?islamabad" alt="" />
                  </div>
                  <div>
                      <img className="h-auto max-w-full rounded-lg" src="https://source.unsplash.com/1600x1400/?dubai" alt="" />
                  </div>
              </div>
          </div>

      </main >
  )
}




