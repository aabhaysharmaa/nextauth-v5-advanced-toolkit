import LoginButton from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { Poppins } from "next/font/google";


const font = Poppins({
  subsets: ['latin'],
  weight: ["600"]
})


const Home = () => {
  return (
    <main className='w-full h-full flex items-center justify-center bg-gradient'>
      <div className="w-100  flex flex-col space-y-6 items-center justify-center">
        <h1 className={`text-6xl text-white font-bold flex flex-row  ${font.className}`}>🔐Auth</h1>
        <p className="text-white text-lg">A advance authentication service</p>
        <LoginButton>
          <Button className="cursor-pointer" variant="secondary" size="lg">Sign In</Button>
        </LoginButton>
      </div>
    </main>
  )
}

export default Home;