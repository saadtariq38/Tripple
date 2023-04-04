import Image from 'next/image'
import { Inter } from 'next/font/google'
import Link from 'next/link';
import styles from './page.module.css'


const inter = Inter({ subsets: ['latin'] })

export default function Home() {
 
  return (


    <main>
      
      
<div className="grid grid-cols-2 md:grid-cols-6 gap-4 mt-4" style={{ marginLeft: "21rem" }}>
    <div className="grid gap-4">
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://source.unsplash.com/1600x1600/?lakes" alt=""/>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://source.unsplash.com/1600x1300/?mountains" alt=""/>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://source.unsplash.com/1600x1900/?trips" alt=""/>
        </div>
    </div>
    <div className="grid gap-4">
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://source.unsplash.com/1600x1100/?trips" alt=""/>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://source.unsplash.com/1600x1900/?scenery" alt=""/>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://source.unsplash.com/1600x1800/?beach" alt=""/>
        </div>
    </div>
    <div className="grid gap-4">
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://source.unsplash.com/1600x1850/?exploration" alt=""/>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://source.unsplash.com/1600x1600/?roads" alt=""/>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://source.unsplash.com/1600x1350/?hiking" alt=""/>
        </div>
    </div>
    <div className="grid gap-4">
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://source.unsplash.com/1600x1750/?lahore" alt=""/>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://source.unsplash.com/1600x1650/?islamabad" alt=""/>
        </div>
        <div>
            <img className="h-auto max-w-full rounded-lg" src="https://source.unsplash.com/1600x1400/?dubai" alt=""/>
        </div>
    </div>
</div>

      <Link href="/educational">Educational</Link>;
      <Link href="/recreational">Recreational</Link>;
      <Link href="/entertainment">Entertainment</Link>;
      <Link href="/all">All trips</Link>;
      

    </main >
  )
}




