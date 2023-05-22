import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link';
import styles from './page.module.css'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {

    return (


        <main>
            <section className="bg-center bg-no-repeat bg-cover" style={{ backgroundImage: "url('/main.jpg')", backgroundColor: "#4a5568", backgroundBlendMode: "multiply",}}>
                <div className="px-4 mx-auto max-w-screen-xl text-center py-24 lg:py-30">
                    <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-white md:text-5xl lg:text-6xl">Travelling made easy</h1>
                    <p className="mb-8 text-lg font-normal text-white lg:text-xl sm:px-16 lg:px-48">Choose from a wide selection of verified trips, according to your trip preference.</p>
                    <div className="flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
                        <Link href="/trips/recreational" className='inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400'>Recreational</Link>

                        <Link href="/trips/educational" className='inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400'>Educational</Link>

                        <Link href="/trips/entertainment" className='inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400'>Entertainment</Link>

                    </div>
                    <Link href="/trips/all" className='inline-flex justify-center hover:text-gray-900 items-center py-3 px-5 mt-4 text-base font-medium text-center text-white rounded-lg border border-white hover:bg-gray-100 focus:ring-4 focus:ring-gray-400'>All trips</Link>

                </div>
            </section>

            <div className="grid grid-cols-4 md:grid-cols-4 gap-4 mt-24 flex justify-center">
                <div className="grid gap-4">
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="/4.jpg" alt="" />
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="/11.jpg" alt="" />
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="/3.jpg" alt="" />
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="/1.jpg" alt="" />
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="/5.jpg" alt="" />
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="/6.jpg" alt="" />
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="/9.jpg" alt="" />
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="/8.jpg" alt="" />
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="/7.jpg" alt="" />
                    </div>
                </div>
                <div className="grid gap-4">
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="/10.jpg" alt="" />
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="/2.jpg" alt="" />
                    </div>
                    <div>
                        <img className="h-auto max-w-full rounded-lg" src="/12.jpg" alt="" />
                    </div>
                </div>
            </div>

        </main >
    )
}




