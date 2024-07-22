import React from "react"
import {FaArrowRight} from "react-icons/fa"
import {Link} from "react-router-dom"
import CTAButton from "../components/core/HomePage/Button"
import HighlightText from "../components/core/HomePage/HighlightText"
import Banner from "../assets/Images/banner1.mp4"
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection"
import TimelineSection from "../components/core/HomePage/TimelineSection"
import CodeBlock from "../components/core/HomePage/CodeBlock"
import InstructorSection from "../components/core/HomePage/InstructorSection"
import ReviewSlider from "../components/core/Ratings/RatingSlider"
import ExploreMore from "../components/core/HomePage/ExploreMore"
const Home=()=>{
    return(
        <div>

            {/* Section 1*/} 

            <div className="relative mx-auto flex flex-col w-11/12 items-center text-white justify-between">

                <Link to={"/signup"}>
                    <div className=" group mt-16 p-1 mx-auto rounded-full bg-[#d62626] 
                              font-bold text-richblack-100 transition-all duration-200 
                              group-hover:scale-95 w-fit max-w-maxContent">

                        <div className=" rounded-full flex flex-row items-center gap-rounded-full
                         p-3 transition-all duration-200 group-hover:bg-[#f20808] hover:scale-95">
                            
                            <p>Become an Instructor</p>

                            <FaArrowRight/> 

                        </div>
                    </div>

                </Link>

                <div className="text-center text-3xl md:text-4xl font-semibold mt-7">
                    Empower Your Future with
                    <HighlightText text={"Coding Skills"}/>
                </div>

                <div className="mt-4 w-[90%] md:text-center text-left text-sm md:text-lg font-bold text-richblack-300">
                    
                    With our online coding courses, you can learn from experts and improve your coding skills
                    from anywhere in the world, and get access to a wealth of resources, including hands-on projects, 
                    quizzes, and personalized feedback from instructors. 

                </div>

                <div className="flex flex-row gap-7 mt-8">
                    <CTAButton active={true} linkto={"/signup"}>
                        Learn More
                    </CTAButton>

                    <CTAButton active={false} linkto={"/signup"}>
                        Book a Demo
                    </CTAButton>
                </div>

                <div data-aos="flip-right" className="mx-6 my-16 shadow-[10px_-5px_50px_-5px] shadow-[#d62626a9] ">
               
                    <video 
                    muted
                    loop
                    autoPlay>

                    <source src={Banner} type="video/mp4"/>
                    </video>

                </div>

                {/* Code Section 1*/}
                <div className="">
                    <CodeBlock
                    position={"lg:flex:row"}
                    heading={
                    <div className=' font-semibold text-2xl lg:text-4xl sm:w-full'>
                        Unlock Your
                        <HighlightText text={"coding potential "}/>
                        with our online courses
                    </div>
                    }
                    subheading = {
                    "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                }

                   ctabtn1={
                    {
                        btnText: "Try it yourself",
                        linkto: "/signup",
                        active: true,
                    }
                }
                ctabtn2={
                    {
                        btnText: "learn more",
                        linkto: "/login",
                        active: false,
                    }
                }
                codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
                codeColor={"white"}
                backgroundGradient={"grad"}
                />

                </div>

                <div className="">
                    <CodeBlock
                    position={"lg:flex-row-reverse"}
                    heading={
                    <div className=' font-semibold text-2xl lg:text-4xl sm:w-full'>
                        Start
                        <HighlightText text={"coding in seconds "}/>
                        with our online courses
                    </div>
                    }
                    subheading = {
                    "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                }

                   ctabtn1={
                    {
                        btnText: "Try it yourself",
                        linkto: "/signup",
                        active: true,
                    }
                }
                ctabtn2={
                    {
                        btnText: "learn more",
                        linkto: "/login",
                        active: false,
                    }
                }
                codeblock={`<<!DOCTYPE html>\n<html>\n<head><title>Example</title>\n</head>\n<body>\n<h1><ahref="/">Header</a>\n</h1>\n<nav><ahref="one/">One</a><ahref="two/">Two</a><ahref="three/">Three</a>\n</nav>`}
                codeColor={"white"}
                backgroundGradient={"grad2"}
                />

                </div>

                <ExploreMore/>

            </div>

            {/* Section 2 */}
            <div className="bg-black-1 text-white">
                <div className="homepage_bg h-[310px]">
                    <div className="w-11/12 max-w-maxContent flex flex-col items-center
                    justify-between gap-5 mx-auto">

                        <div className="h-[150px]"></div>
                        <div className="flex flex-row gap-7 text-white">
                            <CTAButton active={true} linkto={"/signup"}>
                                <div className="flex items-center gap-3">
                                    Explore full catalog
                                    <FaArrowRight/>
                                </div>
                            </CTAButton>
                            <CTAButton active={true} linkto={"/signup"}> 
                                <div>
                                    Learn More
                                </div>
                            </CTAButton>

                        </div>
                    </div>
                </div>

                <div className="mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-8">
                    <div className="flex flex-col justify-between gap-7 mt-[-100px] lg:flex-row lg:gap-0 mb-10 lg:mt-20">
                        <div className="text-4xl font-semibold lg:w-[45%]">
                        Get the skills you need for a 
                        <HighlightText text={"Job that is in Demand"}/>

                    </div>

                    <div className="flex flex-col items-start gap-10 lg:w-[40%]">
                        <div className="text-[16px]">
                            The modern EduTube is dictates its own terms. Today, to be a competituve specialist requires more than professonal skkills.

                        </div>
                        <CTAButton active={true} linkto={"/signup"}>
                            <div>
                                Learn more
                            </div>
                        </CTAButton>
                    </div>
                    </div>

                    {/* Timeline Section - Section 2 */}
                    <TimelineSection />

                    {/* Learning Language Section - Section 3 */}
                    <LearningLanguageSection />

                </div>
            </div>
            {/* Section 3 */}
            
            <div className="relative mx-auto my-20 flex w-11/12 max-w-maxContent flex-col items-center justify-between gap-8 bg-grey-1 text-white">
               {/* Become a instructor section */}
               <InstructorSection />
            </div>
                {/* Reviews from Other Learner */}
            
            <div className=' mb-16 mt-3'>
               <h2 className='text-center text-2xl md:text-4xl font-semibold mt-8 text-richblack-5 mb-5'>
                Reviews from other learners</h2>
               <ReviewSlider />
            </div>
      

            {/*Footer 4*/}
        </div>
        
        
    )
}
export default Home