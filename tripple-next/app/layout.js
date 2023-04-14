import './globals.css'
import { Inter } from 'next/font/google'
const inter = Inter({ subsets: ['latin'] })
import NavbarComponent from './components/Navbar'
import Footer from './components/Footer'
import { Providers } from '@/redux/provider'

export const metadata = {
  title: 'Tripple',
  description: 'Trips made easy',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-100`}>
        <Providers>
        <NavbarComponent />
        {children}
        <Footer />
        </Providers>
      </body>
    </html>
  )
}
