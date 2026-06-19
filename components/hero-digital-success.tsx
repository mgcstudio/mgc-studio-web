'use client'
import React, { Suspense, useEffect, useRef, useState } from 'react'
import { ShaderGradient, ShaderGradientCanvas } from '@shadergradient/react'
import { TimelineAnimation } from '@/components/ui/timeline-animation'
import { useMediaQuery } from '@/components/use-media-query'
import { Component, Layout, Wallet } from 'lucide-react'
import MotionDrawer from '@/components/ui/motion-drawer'
import CalEmbed from '@/components/cal-embed'
import { getCalApi } from '@calcom/embed-react'

export const HeroDigitalSuccess = () => {
  const timelineRef = useRef<HTMLDivElement>(null)
  const isMobile = useMediaQuery('(max-width: 768px)')
  const [shaderLoaded, setShaderLoaded] = useState(false)

  useEffect(() => {
    // Give shader time to initialize before showing elements
    const timer = setTimeout(() => {
      setShaderLoaded(true)
    }, 1000)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    (async function() {
      const cal = await getCalApi({ namespace: process.env.NEXT_PUBLIC_CAL_BOOK_A_CALL || '' })
      cal('ui', { hideEventTypeDetails: false, layout: 'month_view' })
    })()
  }, [])

  return (
    <section
      ref={timelineRef}
      className="relative min-h-screen bg-black text-white overflow-hidden flex flex-col"
    >
      <Suspense>
        <ShaderGradientCanvas
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
          }}
          lazyLoad={false}
          pixelDensity={isMobile ? 0.7 : 1}
          pointerEvents="none"
        >
          <ShaderGradient
            animate="on"
            type="sphere"
            wireframe={false}
            shader="defaults"
            uTime={0}
            uSpeed={0.3}
            uStrength={0.3}
            uDensity={0.8}
            uFrequency={5.5}
            uAmplitude={3.2}
            positionX={-0.1}
            positionY={0}
            positionZ={0}
            rotationX={0}
            rotationY={130}
            rotationZ={70}
            color1="#92dbe0"
            color2="#0b7bff"
            color3="#3865cf"
            reflection={0.4}
            // View (camera) props
            cAzimuthAngle={270}
            cPolarAngle={180}
            cDistance={0.5}
            cameraZoom={15.1}
            // Effect props
            lightType="env"
            brightness={0.8}
            envPreset="city"
            grain="on"
            // Tool props
            toggleAxis={false}
            zoomOut={false}
            hoverState=""
            // Optional - if using transition features
            enableTransition={false}
          />
        </ShaderGradientCanvas>
      </Suspense>

      {/* All content wrapper - hidden until shader loads */}
      <div
        className={`relative z-10 flex flex-col min-h-screen transition-opacity duration-500 ${shaderLoaded ? 'opacity-100' : 'opacity-0'}`}
      >
        {isMobile && (
          <header className="flex gap-4 justify-between items-center px-4 pt-4">
            <MotionDrawer
              direction="left"
              width={260}
              backgroundColor={'#000000'}
              clsBtnClassName="bg-neutral-800 border-r border-neutral-900 text-white"
              contentClassName="bg-black border-r border-neutral-900 text-white"
              btnClassName="bg-white text-black relative w-fit p-2 left-0 top-0"
            >
              <nav className="space-y-4 ">
                <div className="flex items-center gap-2 text-white">
                  <svg
                    className="fill-white w-8 h-8"
                    width="97"
                    height="108"
                    viewBox="0 0 97 108"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M55.5 0C61.0005 0.00109895 64.5005 2.50586 64.5 7.5V17C64.5 24.5059 68.5005 27.5 81 27.5H88C94.0005 27.5059 96.5 29.5059 96.5 37.5V98.5C96.5 106.006 95.0005 107.5 88 107.5H41.5C36.5005 107.5 32 104.506 32 98.5V88C32 84.5 28.5 80 20.5 80H8.5C3 80 0 76.5 0 71.5V6.5C0.00048844 1.50586 2.50049 0.00585937 8.5 0H55.5ZM31 20C28.7909 20 27 21.7909 27 24V74C27 76.2091 28.7909 78 31 78H58C60.2091 78 62 76.2091 62 74V24C62 21.7909 60.2091 20 58 20H31Z" />
                  </svg>
                  <span>UI-Layouts</span>
                </div>
                <a
                  href="#"
                  className="block p-2 hover:bg-neutral-100 hover:text-black rounded-sm"
                >
                  Our Service
                </a>
                <a
                  href="#"
                  className="block p-2 hover:bg-neutral-100 hover:text-black rounded-sm"
                >
                  About Us
                </a>
                <a
                  href="#"
                  className="block p-2 hover:bg-neutral-100 hover:text-black rounded-sm"
                >
                  Contact
                </a>
              </nav>
            </MotionDrawer>
            <CalEmbed
              calLink={process.env.NEXT_PUBLIC_CAL_BOOK_A_CALL || ''}
              className="flex items-center gap-2 w-fit px-5 py-2.5 rounded-full font-bold text-sm bg-neutral-800 text-white cursor-pointer hover:bg-neutral-700 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span className="text-xs font-medium">Book a call</span>
            </CalEmbed>
          </header>
        )}
        {/* Header */}
        {!isMobile && (
          <header className="relative flex items-center justify-between px-10 p-4">
            <div className="flex items-center gap-2">
              <svg
                className="fill-white w-8 h-8"
                width="97"
                height="108"
                viewBox="0 0 97 108"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M55.5 0C61.0005 0.00109895 64.5005 2.50586 64.5 7.5V17C64.5 24.5059 68.5005 27.5 81 27.5H88C94.0005 27.5059 96.5 29.5059 96.5 37.5V98.5C96.5 106.006 95.0005 107.5 88 107.5H41.5C36.5005 107.5 32 104.506 32 98.5V88C32 84.5 28.5 80 20.5 80H8.5C3 80 0 76.5 0 71.5V6.5C0.00048844 1.50586 2.50049 0.00585937 8.5 0H55.5ZM31 20C28.7909 20 27 21.7909 27 24V74C27 76.2091 28.7909 78 31 78H58C60.2091 78 62 76.2091 62 74V24C62 21.7909 60.2091 20 58 20H31Z" />
              </svg>
            </div>

            <nav className="hidden md:flex items-center gap-12 text-sm text-white font-medium">
              <a href="#" className="hover:text-white transition">
                Our Services
              </a>
              <a href="#" className="hover:text-white transition">
                About Us
              </a>
              <a href="#" className="hover:text-white transition">
                Contact
              </a>
            </nav>
            <CalEmbed
              calLink={process.env.NEXT_PUBLIC_CAL_BOOK_A_CALL || ''}
              className="flex items-center gap-2 w-fit px-8 py-4 rounded-full font-bold text-lg bg-neutral-800 text-white cursor-pointer hover:bg-neutral-700 transition-colors"
            >
              <span className="w-2 h-2 rounded-full bg-red-500"></span>
              <span className="text-sm font-medium">Book a call</span>
            </CalEmbed>
          </header>
        )}

        {/* Main Hero Content */}
        <div className="grow flex flex-col justify-center px-5 md:px-12 lg:px-24">
          <h1 className="flex flex-col xl:flex-row text-[8vw] sm:text-[10vw] xl:text-[6.5vw] font-medium leading-[100%] items-baseline gap-x-8 gap-y-2 pb-6 md:pb-10">
            Unlocking
            <span className="bg-clip-text text-transparent bg-linear-to-r from-white via-red-500 to-red-500 pb-8 xl:inline-block block">
              Digital Success
            </span>
          </h1>

          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-10">
            <div className="flex flex-wrap justify-start gap-4">
              <CalEmbed
                calLink={process.env.NEXT_PUBLIC_CAL_BOOK_CONSULTATION || ''}
                className="cursor-pointer relative group overflow-hidden bg-white text-black px-5 py-3 md:px-8 md:py-4 rounded-full font-medium text-base md:text-lg flex items-center gap-3 shadow-[0_0_20px_rgba(255,60,60,0.4)] hover:shadow-[0_0_30px_rgba(255,60,60,0.6)] transition-shadow"
              >
                <img
                  src="https://picsum.photos/seed/ds/50"
                  className="w-5 h-5 md:w-6 md:h-6 rounded-full"
                  alt=""
                />
                Book a Consultation
              </CalEmbed>
              <button className="cursor-pointer border border-white/20 bg-white/5 backdrop-blur-md px-5 py-3 md:px-8 md:py-4 rounded-full font-medium text-base md:text-lg">
                More about us
              </button>
            </div>
            <p className="max-w-md text-neutral-100 text-base md:text-xl font-light leading-relaxed">
              We are a full-stack agency creating captivating web experiences,
              driving e-commerce growth, and maximizing digital impact.
            </p>
          </div>
        </div>

        {/* Footer Info */}
        <div className="p-4 md:p-8 lg:p-12 flex flex-wrap justify-end items-end">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 md:gap-x-12 gap-y-4 bg-black/20 backdrop-blur-lg p-4 rounded-lg">
            <div>
              <p className="text-white text-sm mb-1">Web Design</p>
              <p className="text-neutral-300 text-xs">Ecommerce Design</p>
            </div>
            <div>
              <p className="text-white text-sm mb-1">Social Media Marketing</p>
              <p className="text-neutral-300 text-xs">Email Marketing</p>
            </div>
            <div>
              <p className="text-white text-sm mb-1">
                Conversion Rate Optimization
              </p>
              <p className="text-neutral-300 text-xs">Paid Traffic & Ad</p>
            </div>
            <div>
              <p className="text-white text-sm mb-1">User Generated Content</p>
              <p className="text-neutral-300 text-xs">and more</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
