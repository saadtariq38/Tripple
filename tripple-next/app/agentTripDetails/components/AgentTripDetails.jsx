'use client'
import { useState } from "react";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

import registerForTrip from "@/lib/registerForTrip";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
} from "@material-tailwind/react";
import {
  BanknotesIcon,
  StarIcon,
  HeartIcon,
  UsersIcon,
  ClockIcon,
  ChevronDoubleRightIcon,
  GlobeAsiaAustraliaIcon,

} from "@heroicons/react/24/solid";




export default function AgentTripDetail( props ) {
  //const [progress, setProgress] = useState()

  // const onEditClick = async () => {
   
  //       // toast.error("Please login before registering!", {
  //       //   position: "bottom-center",
  //       //   autoClose: 5000,
  //       //   hideProgressBar: false,
  //       //   closeOnClick: true,
  //       //   pauseOnHover: true,
  //       //   draggable: true,
  //       //   progress: undefined,
  //       //   theme: "light",
  //       // });
       
  //   //   toast.success('Registered Successfully!', {
  //   //     position: "bottom-center",
  //   //     autoClose: 5000,
  //   //     hideProgressBar: false,
  //   //     closeOnClick: true,
  //   //     pauseOnHover: true,
  //   //     draggable: true,
  //   //     progress: undefined,
  //   //     theme: "light",
  //   //   });

    
  // }
  return (
    <div className="flex justify-center items-center my-5" style={{ backgroundImage: "url('/alt.jpg')", backgroundSize: 'cover', backgroundPosition: 'center', backgroundColor: "#4a5568", backgroundBlendMode: "multiply"}}>
      <div className="mx-20">
      <Card className="w-full max-w-[26rem] shadow-lg">
      <CardHeader floated={false} color="blue-gray">
        <img
          src="/trip1.jpg"
          alt="img here"
        />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
        <IconButton
          size="sm"
          color="red"
          variant="text"
          className="!absolute top-4 right-4 rounded-full"
        >
          <HeartIcon className="h-6 w-6" />
        </IconButton>
      </CardHeader>
      <CardBody>
        <div className="mb-3 flex items-center justify-between">
          <Typography variant="h5" color="blue-gray" className="font-medium">
            {props.name}
          </Typography>
          <Typography
            color="blue-gray"
            className="flex items-center gap-1.5 font-normal"
          >
            <StarIcon className="-mt-0.5 h-5 w-5 text-yellow-700" />
            {`${props.rating}(${props.numOfRatings})`}
          </Typography>
        </div>
        <Typography color="gray">
          {props.description}
        </Typography>
        <div className="group mt-8 inline-flex flex-wrap items-center gap-8">
          <Tooltip content={`PKR ${props.cost} / head`}>
            <span className="cursor-pointer rounded-full border border-blue-500/5 bg-blue-500/5 p-3 text-blue-500 transition-colors hover:border-blue-500/10 hover:bg-blue-500/10 hover:!opacity-100 group-hover:opacity-70">
              <BanknotesIcon className="h-5 w-5" />
            </span>
          </Tooltip>
          <Tooltip content={`${props.availableSeats} available slot(s)`}>
            <span className={`cursor-pointer rounded-full border ${props.availableSeats > 0 ? 'border-blue-500/5 bg-blue-500/5 p-3 text-blue-500 transition-colors hover:border-blue-500/10 hover:bg-blue-500/10 hover:!opacity-100 group-hover:opacity-70' : 'border-red-500/5 bg-red-500/5  p-3 text-red-500 transition-colors hover:border-red-500/10 hover:bg-red-500/10 hover:!opacity-100 group-hover:opacity-70'}`}>
              <UsersIcon className="h-5 w-5" />
            </span>
          </Tooltip>
          <Tooltip content={`${props.duration} days`}>
            <span className="cursor-pointer rounded-full border border-blue-500/5 bg-blue-500/5 p-3 text-blue-500 transition-colors hover:border-blue-500/10 hover:bg-blue-500/10 hover:!opacity-100 group-hover:opacity-70">
              <ClockIcon className="h-5 w-5" />
            </span>
          </Tooltip>
          <Tooltip content={`Starting Location: ${props.startingLocation}`}>
            <span className="cursor-pointer rounded-full border border-blue-500/5 bg-blue-500/5 p-3 text-blue-500 transition-colors hover:border-blue-500/10 hover:bg-blue-500/10 hover:!opacity-100 group-hover:opacity-70">
              <ChevronDoubleRightIcon className="h-5 w-5" />
            </span>
          </Tooltip>
          <Tooltip content={`Destination: ${props.destination}`}>
            <span className="cursor-pointer rounded-full border border-blue-500/5 bg-blue-500/5 p-3 text-blue-500 transition-colors hover:border-blue-500/10 hover:bg-blue-500/10 hover:!opacity-100 group-hover:opacity-70">
              <GlobeAsiaAustraliaIcon className="h-5 w-5" />
            </span>
          </Tooltip>
          
        </div>
      </CardBody>
      <CardFooter className="pt-3">
        <Link href="/editTrip">
        <Button size="lg" fullWidth={true} className="bg-yellow-400 hover:bg-yellow-500">
          Edit trip!
        </Button>
        </Link>
      </CardFooter>
    </Card>
      </div>
      <div className=" flex justify-center items-center">



        <div className="max-w-lg mb-5 mt-2 border-4 rounded-lg p-5 border-indigo-400">

          <p className="max-w-lg text-2xl font-semibold leading-normal text-white dark:text-white">Registered Users</p>
          <div className="overflow-y-scroll h-96 w-60">
            {props.registeredUsers.map((user) => {

              return (
                <div className="my-4 pr-80 mr-8" >
                  <p className="font-semibold text-white">{`User: ${props.usernames[user].name}`}</p>
                  <p className="text-white">{`Phone: ${props.usernames[user].phone_number}`}</p>
                </div>
              );
            })}
          </div>
        </div>


        <div className="max-w-lg text-3xl font-semibold leading-normal text-white dark:text-white mb-20 mx-16">{props.itinerary}</div>


        <div><ToastContainer position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light" /></div>
      </div>


    </div>

    
    
  );
}