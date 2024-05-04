import React from "react";
import TeamCard from "./TeamCard";
import MIT from '../../assets/MIT.jpg'
import JALAY from '../../assets/JALAY.jpg'
import Cricket from '../../assets/Cricket.jpeg'
import BBall from '../../assets/BBall.jpeg'
import foot from '../../assets/foot.jpeg'

const AboutUs = () => {
  return (
    <>
      <section className="overflow-hidden p-20 bg-white dark:bg-dark">
        <div className="container mx-auto">
          <div className="flex flex-wrap items-center justify-between -mx-4">
            <div className="w-full px-4 lg:w-6/12">
              <div className="flex items-center -mx-3 sm:-mx-4">
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                  <div className="py-3 sm:py-4">
                    <img
                      src={Cricket}
                      alt=""
                      className="w-full rounded-2xl drop-shadow-md"
                    />
                  </div>
                  <div className="py-3 sm:py-4">
                    <img
                      src={foot}
                      alt=""
                      className="w-full rounded-2xl drop-shadow-md"
                    />
                  </div>
                </div>
                <div className="w-full px-3 sm:px-4 xl:w-1/2">
                  <div className="relative z-10 my-4">
                    <img
                      src={BBall}
                      alt=""
                      className="w-full rounded-2xl drop-shadow-md"
                    />

                  </div>
                </div>
              </div>
            </div>

            <div className="w-full px-4 lg:w-1/2 xl:w-5/12">
              <div className="mt-10 lg:mt-0">
                <span className="block mb-4 text-lg font-semibold font-Rubik text-primary">
                  Why Choose Us
                </span>
                <h2 className="mb-5 text-3xl font-bold text-dark font-Jost sm:text-[40px]/[48px]">
                  Sports bring people together and inspire teamwork.
                </h2>
                <p className="mb-5 text-base text-body-color dark:text-dark-6">

                  Sports bring people together and foster a sense of community. Whether it's cricket, football, volleyball, or kabaddi, these games offer an outlet for physical activity and friendly competition.
                </p>
                <p className="mb-8 text-base text-body-color dark:text-dark-6">
                  These sports provide entertainment and promote a healthy lifestyle, contributing to the cultural richness of societies around the world.
                </p>
                <button className=' text-white bg-primary-color text-lg font-Outfit items-center flex  justify-center p-2 rounded-lg w-32 font-semibold '>
                  Get Started
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="p-5">
        <div className="container mx-auto">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto mb-[60px] max-w-[510px] text-center">
                <span className="mb-2 block text-lg font-semibold text-primary">
                  Our Team
                </span>
                <h2 className="mb-3 text-3xl font-bold leading-[1.2] text-dark dark:text-white sm:text-4xl md:text-[40px]">
                  Our Awesome Team
                </h2>
                <p className="text-base text-body-color dark:text-dark-6">
                  There are many variations of passages of Lorem Ipsum available
                  but the majority have suffered alteration in some form.
                </p>
              </div>
            </div>
          </div>

          <div className="-mx-4 flex flex-wrap justify-center">
            <TeamCard
              name="Jalay Movaliya"
              profession="Web Developer"
              imageSrc={JALAY}
            />
            <TeamCard
              name="Mit Monpara"
              profession="Web Developer"
              imageSrc={MIT}
            />===
          </div>
        </div>
      </section>
    </>
  )
}

export default AboutUs
