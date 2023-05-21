import Link from "next/link"


export default function RegisterSelect() {
    return (
        <div style={{ display: 'flex', alignItems: 'stretch', height: '100vh' }}>

            <div className="w-1/2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{ display: 'flex', flexFlow: 'column', justifyContent: 'center', alignItems: 'center', backgroundImage: "url('/traveller.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <a href="#">
                    <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                </a>
                <div className="p-5" style={{ textAlign: 'center' }}>
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">Register as a Traveller</h5>
                    </a>
                    <p className="mb-3 font-normal text-white dark:text-gray-400">Gain access to approved trips by certified agencies and travel the world!</p>
                    <Link href='/TravellerSignUp'>
                        <h5 className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{ fontSize: '1.2rem' }}>
                            Register Now!
                            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                            </svg>
                        </h5>
                    </Link>
                </div>
            </div>





            <div className="w-1/2 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" style={{ display: 'flex', flexFlow: 'column', justifyContent: 'center', alignItems: 'center', backgroundImage: "url('/agency.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <a href="#">
                    <img className="rounded-t-lg" src="/docs/images/blog/image-1.jpg" alt="" />
                </a>
                <div className="p-5" style={{ textAlign: 'center' }}>
                    <a href="#">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-white dark:text-white">Register as an Agent</h5>
                    </a>
                    <p className="mb-3 font-normal text-white dark:text-gray-400">Set up your travel business easily and advertise to loyal travellers!</p>
                    <Link href='/AgentSignUp'>
                        <h5 className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" style={{ fontSize: '1.2rem' }}>
                            Register Now!
                            <svg aria-hidden="true" className="w-4 h-4 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                            </svg>
                        </h5>
                    </Link>
                </div>
            </div>

        </div>


    )
}
