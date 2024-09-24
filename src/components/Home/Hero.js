import React from 'react';
import { useRouter } from 'next/router';

const Hero = () => {
  const router = useRouter()
  return (
    <div class="w-full bg-center bg-cover h-[38rem]" style={{backgroundImage: "url('https://scontent.facc5-2.fna.fbcdn.net/v/t1.6435-9/69823797_106246164094931_2728583209796239360_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=833d8c&_nc_ohc=VAeSoHsOJIwQ7kNvgFpXGGB&_nc_ht=scontent.facc5-2.fna&_nc_gid=A536Do3aKZbs7k5tFdxr3EH&oh=00_AYDxCyPYiNVBC7xPPUh924RMif0E2RF5to1ZLLDhk2Is5g&oe=6714B2C4')"}}>
        <div class="flex items-center justify-center w-full h-full bg-gray-900/40">
        <div class="container px-6 py-16 mx-auto text-center">
        <div class="max-w-lg mx-auto">
            <h1 class="text-3xl font-semibold text-white dark:text-white lg:text-6xl">Welcome to Your Gateway for Visiting Ghana!</h1>
            <p class="mt-6 text-white dark:text-gray-300 md:text-xl">Explore the beauty of Ghana effortlessly with our easy and efficient visa application process!</p>
            <button onClick={() => router.push(`/signup`)} class="px-5 py-2 mt-6 text-sm font-medium leading-5 text-center text-white capitalize bg-blue-600 rounded-lg hover:bg-blue-500 lg:mx-0 lg:w-auto focus:outline-none">
                Get Started
            </button>
            <p class="mt-3 text-sm text-white ">Visit Ghana Today!</p>
        </div>

        
    </div>
        </div>
    </div>
  )
}

export default Hero