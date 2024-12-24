import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardBody, CardFooter, Typography, Button, Tooltip, IconButton, } from "@material-tailwind/react";
import { FaArrowRightLong } from "react-icons/fa6";
import Cricket from '../../assets/Cricket.jpg'
import Basket from '../../assets/Basket.jpg'
import VollyBall from '../../assets/VollyBall.jpg'
import Kabbadi from '../../assets/Kabbadi.jpg'
import FootBall from '../../assets/FootBall.jpg'
import Charusat from '../../assets/Charusat.jpg'
// import CU from '../../assets/CU.jpg'
// import CSPIT from '../../assets/CSPIT.jpeg'
// import CMPICA from '../../assets/CMPICA.jpeg'
import AOS from "aos";
import "aos/dist/aos.css";
import './Home.css';
const Home = () => {

  useEffect(() => {
    AOS.init();
    AOS.refresh();
  }, []);
  return (
    <>
      <div className='overflow-hidden -z-50'>
        <div className=" bg-white  p-16 h-full">
          <div className="container">
            <div className="-mx-4 flex flex-wrap">
              <div className="w-full px-4 lg:w-5/12">
                <div className="hero-content">
                  <h1 className="mb-5 text-4xl font-bold font-Outfit !leading-[1.208] text-dark dark:text-white sm:text-[42px] lg:text-[40px] xl:text-6xl">
                    Spoural Event Management
                  </h1>
                  <p className="mb-8 max-w-[480px] text-body-color text-3xl font-Rubik">
                    Charusat University
                  </p>
                  <ul className="flex flex-wrap items-center">
                    <li>
                      <button className=' text-white bg-primary-color text-lg font-Outfit items-center flex gap-x-1  justify-center p-2 rounded-lg w-36 font-semibold '
                      >
                        View event
                        <FaArrowRightLong className='mt-1' />
                      </button>
                    </li>
                  </ul>
                  <div className="clients pt-16">
                    <h6 className="mb-6 flex items-center text-xs font-normal text-body-color dark:text-dark-6">
                      <span className="ml-3 inline-block h-px w-8 bg-body-color"></span>
                    </h6>
                    <div className="flex items-center space-x-4">
                      {/* <img
                                                src={CU}
                                                className='h-20 w-20'
                                            />
                                            <img
                                                src={CSPIT}
                                                className='h-16 w-16'
                                            />
                                            <img
                                                src={CMPICA}
                                                className='h-16 w-16'
                                            /> */}
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden px-4 lg:block lg:w-1/12"></div>
              <div className="w-full px-4 lg:w-6/12">
                <div className="lg:ml-auto lg:text-right">
                  <div data-aos="zoom-in" data-aos-duration="3000">
                    <div className="relative z-10 inline-block pt-11 lg:pt-0">
                      <img
                        src={Charusat}
                        alt="hero"
                        className="max-w-full lg:ml-auto rounded-b-xl rounded-tl-xl rounded-tr-xl"
                      />
                      <span className="absolute -bottom-8 -left-8 z-[-1]">
                        <svg
                          width="93"
                          height="93"
                          viewBox="0 0 93 93"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="2.5" cy="2.5" r="2.5" fill="#3056D3" />
                          <circle cx="2.5" cy="24.5" r="2.5" fill="#3056D3" />
                          <circle cx="2.5" cy="46.5" r="2.5" fill="#3056D3" />
                          <circle cx="2.5" cy="68.5" r="2.5" fill="#3056D3" />
                          <circle cx="2.5" cy="90.5" r="2.5" fill="#3056D3" />
                          <circle cx="24.5" cy="2.5" r="2.5" fill="#3056D3" />
                          <circle cx="24.5" cy="24.5" r="2.5" fill="#3056D3" />
                          <circle cx="24.5" cy="46.5" r="2.5" fill="#3056D3" />
                          <circle cx="24.5" cy="68.5" r="2.5" fill="#3056D3" />
                          <circle cx="24.5" cy="90.5" r="2.5" fill="#3056D3" />
                          <circle cx="46.5" cy="2.5" r="2.5" fill="#3056D3" />
                          <circle cx="46.5" cy="24.5" r="2.5" fill="#3056D3" />
                          <circle cx="46.5" cy="46.5" r="2.5" fill="#3056D3" />
                          <circle cx="46.5" cy="68.5" r="2.5" fill="#3056D3" />
                          <circle cx="46.5" cy="90.5" r="2.5" fill="#3056D3" />
                          <circle cx="68.5" cy="2.5" r="2.5" fill="#3056D3" />
                          <circle cx="68.5" cy="24.5" r="2.5" fill="#3056D3" />
                          <circle cx="68.5" cy="46.5" r="2.5" fill="#3056D3" />
                          <circle cx="68.5" cy="68.5" r="2.5" fill="#3056D3" />
                          <circle cx="68.5" cy="90.5" r="2.5" fill="#3056D3" />
                          <circle cx="90.5" cy="2.5" r="2.5" fill="#3056D3" />
                          <circle cx="90.5" cy="24.5" r="2.5" fill="#3056D3" />
                          <circle cx="90.5" cy="46.5" r="2.5" fill="#3056D3" />
                          <circle cx="90.5" cy="68.5" r="2.5" fill="#3056D3" />
                          <circle cx="90.5" cy="90.5" r="2.5" fill="#3056D3" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section className="p-5">
          <div className="container mx-auto">
            <div className="-mx-4 flex flex-wrap">
              <div className="w-full px-4 ">
                <div className="w-full flex justify-center items-center h-14 bg-slate-300 rounded-md">
                  <h2 className=" text-3xl font-bold leading-[1.2] text-dark font-Outfit sm:text-4xl md:text-[40px]">
                    Live event
                  </h2>
                </div>
              </div>
            </div>
            <div className='home1 w-full p-14 flex flex-row justify-evenly'>
              <div data-aos="fade-up-right" data-aos-duration="3000" className='event1 bg-primary-color h-32 ml-4 mr-4 rounded-lg w-[35%]'>
                <Link>
                  <div className='text-white flex flex-row justify-between w-full h-9 items-center text-xs font-poppins font-semibold'>
                    <div className='ml-5'>
                      Spoural 2k24
                    </div>
                    <div className='mr-5'>
                      01:24
                    </div>
                  </div>
                  <div className='ml-4 h-[1px] mr-4 bg-black'></div>
                  <div className='h-12 flex flex-row justify-around items-center font-poppins'>
                    <div className='text-white font-semibold '>
                      CSPIT-CE
                    </div>
                    <div className=' text-blue-600 text-xl'>
                      vs
                    </div>
                    <div className='text-white font-semibold '>
                      CSPIT-IT
                    </div>

                  </div>
                  <div className='ml-4 h-[0.5px] mr-4 bg-black'></div>
                  <div className='text-white flex flex-row justify-between w-full h-9 items-center text-xs font-poppins font-semibold'>
                    <div className='ml-5'>
                      23/01
                    </div>
                    <div className='mr-5'>
                      CHARUSAT
                    </div>
                  </div>
                </Link>
              </div>

              <div data-aos="fade-up-left" data-aos-duration="3000" className='event2 bg-primary-color h-32 ml-4 mr-4 rounded-lg w-[35%]'>
                <Link>
                  <div className='text-white flex flex-row justify-between w-full h-9 items-center text-xs font-poppins font-semibold'>
                    <div className='ml-5'>
                      Spoural 2k24
                    </div>
                    <div className='mr-5'>
                      01:24
                    </div>
                  </div>
                  <div className='ml-4 h-[1px] mr-4 bg-black'></div>
                  <div className='h-12 flex flex-row justify-around items-center font-poppins'>
                    <div className='text-white font-semibold '>
                      CSPIT-CE
                    </div>
                    <div className=' text-blue-600 text-xl'>
                      vs
                    </div>
                    <div className='text-white font-semibold '>
                      CSPIT-IT
                    </div>

                  </div>
                  <div className='ml-4 h-[0.5px] mr-4 bg-black'></div>
                  <div className='text-white flex flex-row justify-between w-full h-9 items-center text-xs font-poppins font-semibold'>
                    <div className='ml-5'>
                      23/01
                    </div>
                    <div className='mr-5'>
                      CHARUSAT
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section >
        <div className="w-full px-4">
          <div className="w-full flex justify-center items-center h-14 bg-slate-300 rounded-md">
            <h2 className=" text-3xl font-bold leading-[1.2] text-dark font-Outfit sm:text-4xl md:text-[40px]">
              Charusat event
            </h2>
          </div>
        </div>
        <div className='home2 p-8 grid grid-cols-3 gap-x-3 gap-y-3'>
          <div data-aos="fade-right">
            <Card className="card2 w-full max-w-[26rem] shadow-lg h-[23rem]">
              <CardHeader floated={false} color="blue-gray" className='h-54 mb-2'>
                <img
                  src={Cricket}
                  alt="ui/ux review check"
                  className='h-[226px]'
                />
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
              </CardHeader>
              <CardBody className='p-2 flex justify-center'>
                <div className="flex items-center justify-between p-0">
                  <Typography className="font-medium font-Outfit text-xl">
                    Cricket
                  </Typography>
                </div>
              </CardBody>
              <CardFooter className="p-3">
                <Link to='/matches'>
                  <Button className='w-full bg-primary-color font-poppins text-sm '>
                    View Schedule
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
          <div data-aos="fade-up">
            <Card className="card2 w-full max-w-[26rem] shadow-lg h-[23rem]">

              <CardHeader floated={false} color="blue-gray" className='h-54 mb-2'>
                <img
                  src={FootBall}
                  alt="ui/ux review check"
                  className='h-[226px]'
                />
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
              </CardHeader>
              <CardBody className='p-2 flex justify-center'>
                <div className="flex items-center justify-between p-0">
                  <Typography className="font-medium font-Outfit text-xl">
                    Football
                  </Typography>
                </div>
              </CardBody>
              <CardFooter className="p-3">
                <Button className='w-full bg-primary-color font-poppins text-sm'>
                  View Schedule
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div data-aos="fade-left">

            <Card className="card3 w-full max-w-[26rem] shadow-lg h-[23rem]">
              <CardHeader floated={false} color="blue-gray" className='h-54 mb-2'>
                <img
                  src={VollyBall}
                  alt="ui/ux review check"
                  className='h-[226px] w-full'

                />
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
              </CardHeader>
              <CardBody className='p-2 flex justify-center'>
                <div className="flex items-center justify-between p-0">
                  <Typography className="font-medium font-Outfit text-xl">
                    Volleyball
                  </Typography>
                </div>
              </CardBody>
              <CardFooter className="p-3">
                <Button className='w-full bg-primary-color font-poppins text-sm'>
                  View Schedule
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div data-aos="fade-right">

            <Card className="card4 w-full max-w-[26rem] shadow-lg h-[23rem]">
              <CardHeader floated={false} color="blue-gray" className='h-54 mb-2'>
                <img
                  src={Basket}
                  alt="ui/ux review check"
                  className='h-[226px] w-full'

                />
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
              </CardHeader>
              <CardBody className='p-2 flex justify-center'>
                <div className="flex items-center justify-between p-0">
                  <Typography className="font-medium font-Outfit text-xl">
                    Basketball
                  </Typography>
                </div>
              </CardBody>
              <CardFooter className="p-3">
                <Button className='w-full bg-primary-color font-poppins text-sm'>
                  View Schedule
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div data-aos="fade-up">

            <Card className="card5 w-full max-w-[26rem] shadow-lg h-[23rem]">
              <CardHeader floated={false} color="blue-gray" className='h-54 mb-2'>
                <img
                  src={Kabbadi}
                  alt="ui/ux review check"
                  className='h-[226px] w-full'

                />
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
              </CardHeader>
              <CardBody className='p-2 flex justify-center'>
                <div className="flex items-center justify-between p-0">
                  <Typography className="font-medium font-Outfit text-xl">
                    Kabbadi
                  </Typography>
                </div>
              </CardBody>
              <CardFooter className="p-3">
                <Button className='w-full bg-primary-color font-poppins text-sm'>
                  View Schedule
                </Button>
              </CardFooter>
            </Card>
          </div>
          <div data-aos="fade-left">

            <Card className="card6 w-full max-w-[26rem] shadow-lg h-[23rem]">
              <CardHeader floated={false} color="blue-gray" className='h-54 mb-2'>
                <img
                  src={FootBall}
                  alt="ui/ux review check"
                  className='h-[226px] w-full'

                />
                <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
              </CardHeader>
              <CardBody className='p-2 flex justify-center'>
                <div className="flex items-center justify-between p-0">
                  <Typography className="font-medium font-Outfit text-xl">
                    Tugofwar
                  </Typography>
                </div>
              </CardBody>
              <CardFooter className="p-3">
                <Button className='w-full bg-primary-color font-poppins text-sm'>
                  View Schedule
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
        <footer className="bg-white p-3 border-t-[1px]">
          <div className="container px-6 py-8 mx-auto">
            <div className="flex flex-col items-center text-center">
              <div className='flex gap-2 font-MateSC ml-3'>
                <h1 className='logo-text text-blue-900 text-2xl first-letter:text-blue-500 first-letter:text-3xl '><Link to={"/"}>Field</Link></h1>
                <h1 className='logo-text text-blue-900  text-2xl first-letter:text-blue-500 first-letter:text-3xl'><Link to={"/"}>And</Link></h1>
                <h1 className='logo-text text-blue-900  text-2xl first-letter:text-blue-500 first-letter:text-3xl '><Link to={"/"}>Play</Link></h1>
              </div>

              <div className="flex flex-wrap justify-center mt-6 text-lg font-semibold font-Rubik">
                <Link to="/home" className="mx-4  text-gray-600 transition-colors duration-300 hover:text-blue-500 " aria-label="Reddit"> Home </Link>

                <Link to="/aboutus" className="mx-4  text-gray-600 transition-colors duration-300 hover:text-blue-500" aria-label="Reddit"> About </Link>

                <Link to="/teams" className="mx-4  text-gray-600 transition-colors duration-300 hover:text-blue-500 " aria-label="Reddit"> Teams </Link>

                <Link to="/matches" className="mx-4  text-gray-600 transition-colors duration-300 hover:text-blue-500 " aria-label="Reddit"> Matches</Link>
                <Link to="/contact" className="mx-4  text-gray-600 transition-colors duration-300 hover:text-blue-500 " aria-label="Reddit">Contact us</Link>
              </div>
            </div>
            <hr className="my-6 border-gray-200 md:my-10 dark:border-gray-700" />

            <div className="flex flex-col items-center sm:flex-row sm:justify-between">
              <p className="text-sm text-gray-500 dark:text-gray-300">© Copyright 2024. All Rights Reserved.</p>

              <div className="flex -mx-2">
                <a href="#" className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Reddit">
                  {/* <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C21.9939 17.5203 17.5203 21.9939 12 22ZM6.807 10.543C6.20862 10.5433 5.67102 10.9088 5.45054 11.465C5.23006 12.0213 5.37133 12.6558 5.807 13.066C5.92217 13.1751 6.05463 13.2643 6.199 13.33C6.18644 13.4761 6.18644 13.6229 6.199 13.769C6.199 16.009 8.814 17.831 12.028 17.831C15.242 17.831 17.858 16.009 17.858 13.769C17.8696 13.6229 17.8696 13.4761 17.858 13.33C18.4649 13.0351 18.786 12.3585 18.6305 11.7019C18.475 11.0453 17.8847 10.5844 17.21 10.593H17.157C16.7988 10.6062 16.458 10.7512 16.2 11C15.0625 10.2265 13.7252 9.79927 12.35 9.77L13 6.65L15.138 7.1C15.1931 7.60706 15.621 7.99141 16.131 7.992C16.1674 7.99196 16.2038 7.98995 16.24 7.986C16.7702 7.93278 17.1655 7.47314 17.1389 6.94094C17.1122 6.40873 16.6729 5.991 16.14 5.991C16.1022 5.99191 16.0645 5.99491 16.027 6C15.71 6.03367 15.4281 6.21641 15.268 6.492L12.82 6C12.7983 5.99535 12.7762 5.993 12.754 5.993C12.6094 5.99472 12.4851 6.09583 12.454 6.237L11.706 9.71C10.3138 9.7297 8.95795 10.157 7.806 10.939C7.53601 10.6839 7.17843 10.5422 6.807 10.543ZM12.18 16.524C12.124 16.524 12.067 16.524 12.011 16.524C11.955 16.524 11.898 16.524 11.842 16.524C11.0121 16.5208 10.2054 16.2497 9.542 15.751C9.49626 15.6958 9.47445 15.6246 9.4814 15.5533C9.48834 15.482 9.52348 15.4163 9.579 15.371C9.62737 15.3318 9.68771 15.3102 9.75 15.31C9.81233 15.31 9.87275 15.3315 9.921 15.371C10.4816 15.7818 11.159 16.0022 11.854 16C11.9027 16 11.9513 16 12 16C12.059 16 12.119 16 12.178 16C12.864 16.0011 13.5329 15.7863 14.09 15.386C14.1427 15.3322 14.2147 15.302 14.29 15.302C14.3653 15.302 14.4373 15.3322 14.49 15.386C14.5985 15.4981 14.5962 15.6767 14.485 15.786V15.746C13.8213 16.2481 13.0123 16.5208 12.18 16.523V16.524ZM14.307 14.08H14.291L14.299 14.041C13.8591 14.011 13.4994 13.6789 13.4343 13.2429C13.3691 12.8068 13.6162 12.3842 14.028 12.2269C14.4399 12.0697 14.9058 12.2202 15.1478 12.5887C15.3899 12.9572 15.3429 13.4445 15.035 13.76C14.856 13.9554 14.6059 14.0707 14.341 14.08H14.306H14.307ZM9.67 14C9.11772 14 8.67 13.5523 8.67 13C8.67 12.4477 9.11772 12 9.67 12C10.2223 12 10.67 12.4477 10.67 13C10.67 13.5523 10.2223 14 9.67 14Z">
            </path>
        </svg> */}
                </a>

                <a href="#" className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Facebook">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M2.00195 12.002C2.00312 16.9214 5.58036 21.1101 10.439 21.881V14.892H7.90195V12.002H10.442V9.80204C10.3284 8.75958 10.6845 7.72064 11.4136 6.96698C12.1427 6.21332 13.1693 5.82306 14.215 5.90204C14.9655 5.91417 15.7141 5.98101 16.455 6.10205V8.56104H15.191C14.7558 8.50405 14.3183 8.64777 14.0017 8.95171C13.6851 9.25566 13.5237 9.68693 13.563 10.124V12.002H16.334L15.891 14.893H13.563V21.881C18.8174 21.0506 22.502 16.2518 21.9475 10.9611C21.3929 5.67041 16.7932 1.73997 11.4808 2.01722C6.16831 2.29447 2.0028 6.68235 2.00195 12.002Z">
                    </path>
                  </svg>
                </a>
                <a href="#" className="mx-2 text-gray-600 transition-colors duration-300 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400" aria-label="Github">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M12.026 2C7.13295 1.99937 2.96183 5.54799 2.17842 10.3779C1.395 15.2079 4.23061 19.893 8.87302 21.439C9.37302 21.529 9.55202 21.222 9.55202 20.958C9.55202 20.721 9.54402 20.093 9.54102 19.258C6.76602 19.858 6.18002 17.92 6.18002 17.92C5.99733 17.317 5.60459 16.7993 5.07302 16.461C4.17302 15.842 5.14202 15.856 5.14202 15.856C5.78269 15.9438 6.34657 16.3235 6.66902 16.884C6.94195 17.3803 7.40177 17.747 7.94632 17.9026C8.49087 18.0583 9.07503 17.99 9.56902 17.713C9.61544 17.207 9.84055 16.7341 10.204 16.379C7.99002 16.128 5.66202 15.272 5.66202 11.449C5.64973 10.4602 6.01691 9.5043 6.68802 8.778C6.38437 7.91731 6.42013 6.97325 6.78802 6.138C6.78802 6.138 7.62502 5.869 9.53002 7.159C11.1639 6.71101 12.8882 6.71101 14.522 7.159C16.428 5.868 17.264 6.138 17.264 6.138C17.6336 6.97286 17.6694 7.91757 17.364 8.778C18.0376 9.50423 18.4045 10.4626 18.388 11.453C18.388 15.286 16.058 16.128 13.836 16.375C14.3153 16.8651 14.5612 17.5373 14.511 18.221C14.511 19.555 14.499 20.631 14.499 20.958C14.499 21.225 14.677 21.535 15.186 21.437C19.8265 19.8884 22.6591 15.203 21.874 10.3743C21.089 5.54565 16.9181 1.99888 12.026 2Z">
                    </path>
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </footer>
      </div >
    </>
  );
};

export default Home;