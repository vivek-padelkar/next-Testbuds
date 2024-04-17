'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { signinUser } from '@/app/_utils/globalApi'
import { useRouter } from 'next/navigation'

const Signin = () => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [userData, setUserData] = useState({
    email: '',
    password: '',
  })

  useEffect(() => {
    const token = sessionStorage.getItem('jwt')
    if (token) {
      router.push('/')
    }
  }, [])

  const handleChange = (e) => {
    setUserData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }

  const handleSubmit = async (e) => {
    try {
      e.preventDefault()
      setLoading(true)
      const { user, token } = await signinUser(userData)

      sessionStorage.setItem('user', JSON.stringify(user))
      sessionStorage.setItem('jwt', token)
      setLoading(false)
      setUserData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
      toast('User logged in successfully !')
      router.push('/')
    } catch (error) {
      setLoading(false)
      setUserData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
      })
      
      toast(error.response?.data?.error?.message || error.message)
    }
  }
  return (
    <div className="bg-[url('/bgauth.png')] bg-cover bg-no-repeat bg-center h-[100vh] w-[100vw]">
      <div className="flex justify-center items-center h-screen">
        <div
          className="flex items-center justify-center gap-3 p-10 
        flex-col text-[#191C15]"
        >
          <h2 className="text-4xl font-bold">TastyBuds</h2>
          {/* <p className="italic">Buy your own tasty treat</p> */}
          <h2 className="font-semibold text-2xl">Sign in</h2>
          <form
            onSubmit={handleSubmit}
            className="w-full flex flex-col gap-5 mt-7"
          >
            <Input
              placeholder="name@example.com"
              type="email"
              id="email"
              required
              value={userData.email}
              onChange={handleChange}
            />
            <Input
              placeholder="password"
              type="password"
              required
              id="password"
              minLength="6"
              maxLength="12"
              value={userData.password}
              onChange={handleChange}
            />

            <Button disable={loading}>
              {loading ? (
                <>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 200 200"
                    width={38}
                    height={38}
                  >
                    <radialGradient
                      id="a12"
                      cx=".66"
                      fx=".66"
                      cy=".3125"
                      fy=".3125"
                      gradientTransform="scale(1.5)"
                    >
                      <stop offset="0" stopColor="#FFFFFF"></stop>
                      <stop
                        offset=".3"
                        stopColor="#FFFFFF"
                        stop-opacity=".9"
                      ></stop>
                      <stop
                        offset=".6"
                        stopColor="#FFFFFF"
                        stop-opacity=".6"
                      ></stop>
                      <stop
                        offset=".8"
                        stopColor="#FFFFFF"
                        stop-opacity=".3"
                      ></stop>
                      <stop
                        offset="1"
                        stopColor="#FFFFFF"
                        stop-opacity="0"
                      ></stop>
                    </radialGradient>
                    <circle
                      transform-origin="center"
                      fill="none"
                      stroke="url(#a12)"
                      stroke-width="15"
                      stroke-linecap="round"
                      stroke-dasharray="200 1000"
                      stroke-dashoffset="0"
                      cx="100"
                      cy="100"
                      r="70"
                    >
                      <animateTransform
                        type="rotate"
                        attributeName="transform"
                        calcMode="spline"
                        dur="2"
                        values="360;0"
                        keyTimes="0;1"
                        keySplines="0 0 1 1"
                        repeatCount="indefinite"
                      ></animateTransform>
                    </circle>
                    <circle
                      transform-origin="center"
                      fill="none"
                      opacity=".2"
                      stroke="#FFFFFF"
                      stroke-width="15"
                      stroke-linecap="round"
                      cx="100"
                      cy="100"
                      r="70"
                    ></circle>
                  </svg>
                </>
              ) : (
                'Sign in'
              )}
            </Button>
            <p>
              Dont have an account?{' '}
              <Link
                className="font-semibold hover:underline"
                href="/create-account"
              >
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signin
