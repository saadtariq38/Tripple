'use client'
import { useState } from "react";


import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';
import rateTrip from "@/lib/rateTrip";
import rateTripOnlyRating from "@/lib/rateTripOnlyRating";



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
  XMarkIcon

} from "@heroicons/react/24/solid";




export default function TripDetail(props) {

  console.log(props.usernames)
  console.log("heh")

  const [progress, setProgress] = useState()

  const [showRatingModal, setShowRatingModal] = useState(false)

  const [selectedRating, setSelectedRating] = useState(null);

  const [review, setReview] = useState("")

  const handleSubmit = async (event) => {
    event.preventDefault();
    const accessToken = localStorage.getItem('accessToken')
    console.log("clicked")
    
    if(!accessToken) {
      toast.error("Please login or create a traveller account", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      window.location.href = '/login'
    }
    else if(selectedRating === 0 || selectedRating === null) {
      console.log("mewo")
      toast.error("Please add a rating to submit a review", {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      //window.location.href = '/'
    } else {

      try {
        
        if(!review) {
          console.log("here")
          await rateTripOnlyRating(selectedRating, props._id, accessToken)
         // dispatch(setTrip(props))
         
          toast.success('Trip rating added successfully', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        } else {
          console.log("hereEEE")
          await rateTrip(selectedRating, review, props._id, accessToken)
          
          toast.success('Trip review with comment added successfully', {
            position: "bottom-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          // window.location.href = '/'
        }
      } catch (error) {
        toast.error("Could not add review", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
  
        //window.location.href = '/'
  
      }
    }

    


  const handleChange = (event) => {
    setSelectedRating(event.target.value);
  };


  const handleButtonClick = () => {
    setShowRatingModal(true);
  };

  const handleCloseModal = () => {
    setShowRatingModal(false);
  };

  const onRegisterClick = async (tripId) => {
    try {
      const accessToken = localStorage.getItem('accessToken');

      if (!accessToken) {
        toast.error("Please login before registering!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setTimeout(() => {
          window.location.href = '/login';
          return
        }, 1500)
      }
      await registerForTrip(tripId, accessToken)
      setProgress("Registered successfully")
      toast.success('Registered Successfully!', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    } catch (error) {
      if (error.message === "Unauthorized-only traveller can register for trips") {
        setProgress("Only travellers can register for trips")
        toast.error("Only Travellers can register for trips!", {
          position: "bottom-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }
    }
  }
  return (
    <div className="flex justify-center items-center my-20">
      <div className="mr-20">
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
                {`${props.rating.toFixed(1)}(${props.numOfRatings})`}
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
            <Button onClick={() => onRegisterClick(props._id)} size="lg" fullWidth={true}>
              Book a seat!
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div className="flex-col flex justify-center items-center">



        {showRatingModal && (
          <div
            className="fixed top-0 left-0 right-0 z-50 w-full h-screen overflow-x-hidden overflow-y-auto bg-opacity-75 bg-gray-500 flex items-center justify-center"

          >
            <div className="relative w-full max-w-md max-h-full bg-white rounded-md p-4">
              <button onClick={handleCloseModal} className="absolute top-0 right-0 m-4">
                <XMarkIcon className="h-7 w-7" />
              </button>
              <h2 className="text-lg font-medium text-gray-900 mb-4">
                Rate this trip
              </h2>
              <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                <div>
                  {[1, 2, 3, 4, 5].map((value) => (
                    <label
                      key={value}
                      htmlFor={`rating-${value}`}
                      className={`text-gray-700 cursor-pointer ${selectedRating !== null && selectedRating >= value
                          ? "text-yellow-500"
                          : ""
                        } text-2xl`}
                    >
                      <input
                        type="radio"
                        id={`rating-${value}`}
                        name="rating"
                        value={value}
                        className="sr-only"
                        onChange={handleChange}
                      />
                      <span className="sr-only">{value} star</span>
                      &#9733;
                    </label>
                  ))}

                </div>
                <div>
                  <label
                    htmlFor="review"
                    className="text-gray-700 font-medium mb-2 block"
                  >
                    Review
                  </label>
                  <textarea
                    id="review"
                    name="review"
                    rows="3"
                    className="shadow-sm focus:ring-blue-300 focus:border-blue-300 block w-full sm:text-sm border-gray-300 rounded-md"
                    placeholder="Write your review here"
                    onChange={(event) => setReview(event.target.value)}
                  ></textarea>
                </div>

                <div>
                  <button
                    type="submit"
                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}






        <div className="relative ">

          <div className="max-w-lg mb-5 mt-2 border-4 rounded-lg p-5 border-indigo-400">
            <p className="text-2xl font-semibold leading-normal text-gray-900 dark:text-white mb-6">
              Comments
            </p>

            <div className="overflow-y-scroll overflow-x-scroll h-96 w-64">
              {props.comments.map((comment) => {
                return (
                  <div className="my-4">
                    <p className="font-semibold">{`User: ${props.usernames[comment.user]}`}</p>
                    <p className="">{comment.text}</p>
                  </div>
                );
              })}
            </div>




          </div>
          <button
            className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-17"
            onClick={handleButtonClick}
          >
            Rate this trip
          </button>
        </div>


      </div>

      <div className="max-w-lg text-2xl font-semibold leading-normal text-gray-900 dark:text-white mb-20 ml-12">{props.itinerary}</div>



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



  );
}

