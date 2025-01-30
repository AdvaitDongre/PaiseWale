"use client"

import { useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "react-intersection-observer"
import { Calculator, BarChart3, PieChart } from "lucide-react"; // Import predefined icons


export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#121212] text-white overflow-hidden">
      <AnimatedHeader />
      <main>
        <HeroSection />
        <FeaturesSection />
        <TestimonialsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

function AnimatedHeader() {
  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto py-6 flex justify-between items-center"
    >
      <motion.div whileHover={{ scale: 1.1 }} className="flex items-center space-x-2">
        {/* <Image src="/logo.jpg" alt="VirtualCA Logo" width={40} height={40} /> */}
        <span className="text-2xl font-bold">PaiseWale</span>
      </motion.div>
      <nav>
        <ul className="flex space-x-6">
          <NavItem href="#features">Features</NavItem>
          <NavItem href="#testimonials">Testimonials</NavItem>
          <NavItem href="#contact">Contact</NavItem>
          <NavItem href="/auth">Login / Sign Up</NavItem>
        </ul>
      </nav>
    </motion.header>
  )
}

function NavItem({ href, children }: { href: string; children: React.ReactNode }) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    if (href.startsWith("#")) {
      const target = document.querySelector(href)
      if (target) {
        target.scrollIntoView({ behavior: "smooth" })
      }
    }
  }

  return (
    <motion.li whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
      {href.startsWith("#") ? (
        <a href={href} onClick={handleClick} className="hover:text-[#00ADB5] transition-colors">
          {children}
        </a>
      ) : (
        <Link href={href} className="hover:text-[#00ADB5] transition-colors">
          {children}
        </Link>
      )}
    </motion.li>
  )
}

function HeroSection() {
  return (
    <section className="container mx-auto py-20 text-center relative">
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-5xl font-bold mb-6"
      >
        Welcome to PaiseWale
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-xl mb-8 max-w-2xl mx-auto"
      >
        Your personal finance management solution. Simplify your taxes, track investments, and manage expenses all in
        one place.
      </motion.p>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Link href="/auth">
          <Button className="bg-[#00ADB5] hover:bg-[#00BEC8] text-white text-lg py-2 px-6">Get Started</Button>
        </Link>
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 -z-10"
      >
        <Image src="/hero-bg.svg" alt="Background" width={800} height={800} className="opacity-10" />
      </motion.div>
    </section>
  )
}

function FeaturesSection() {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <section id="features" className="bg-[#1E1E1E] py-20 relative overflow-hidden">
      <div className="container mx-auto">
        <motion.h2
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-10 text-center"
        >
          Key Features
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          icon={Calculator} // Pass Lucide icon as a prop
          title="Easy Tax Calculation"
          description="Streamline your tax filing process with our intuitive interface and expert guidance."
        />
        <FeatureCard
          icon={BarChart3} // Another predefined Lucide icon
          title="Investment Tracking"
          description="Monitor and analyze your investments in real-time to make informed decisions."
        />
        <FeatureCard
          icon={PieChart} // Another predefined Lucide icon
          title="Expense Management"
          description="Keep track of your expenses and gain insights into your spending habits."
        />
        </div>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        className="absolute top-0 right-0 w-96 h-96 bg-[#00ADB5] rounded-full filter blur-3xl"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse", delay: 5 }}
        className="absolute bottom-0 left-0 w-96 h-96 bg-[#00ADB5] rounded-full filter blur-3xl"
      />
    </section>
  )
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 50 },
        visible: { opacity: 1, y: 0 },
      }}
      transition={{ duration: 0.5 }}
      className="bg-[#2A2A2A] p-6 rounded-lg text-center"
    >
      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
        <Image src={icon || "/placeholder.svg"} alt={title} width={60} height={60} className="mx-auto mb-4" />
      </motion.div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </motion.div>
  )
}

function TestimonialsSection() {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <section id="testimonials" className="py-20 relative overflow-hidden">
      <div className="container mx-auto">
        <motion.h2
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-10 text-center"
        >
          What Our Users Say
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <TestimonialCard
            quote="PaiseWale has made managing my finances a breeze. I can't imagine going back to my old methods!"
            author="Priya S., Small Business Owner"
            delay={0.2}
          />
          <TestimonialCard
            quote="The tax filing feature saved me hours of work and stress. Highly recommended!"
            author="Rahul M., Freelance Developer"
            delay={0.4}
          />
        </div>
      </div>
      <motion.img
        src="/testimonial-bg.svg"
        alt="Background"
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 opacity-5 w-full h-full object-cover"
        initial={{ opacity: 0, scale: 1.1 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 1 }}
      />
    </section>
  )
}

function TestimonialCard({ quote, author, delay }: { quote: string; author: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="bg-[#2A2A2A] p-6 rounded-lg"
    >
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.2 }}
        className="text-lg mb-4"
      >
        "{quote}"
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 0.4 }}
        className="text-gray-400"
      >
        - {author}
      </motion.p>
    </motion.div>
  )
}

function ContactSection() {
  const controls = useAnimation()
  const [ref, inView] = useInView()

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <section id="contact" className="bg-[#1E1E1E] py-20 relative overflow-hidden">
      <div className="container mx-auto text-center">
        <motion.h2
          ref={ref}
          initial="hidden"
          animate={controls}
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold mb-6"
        >
          Get in Touch
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          Have questions? Our team is here to help!
        </motion.p>
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-md mx-auto space-y-4"
        >
          <Input type="text" placeholder="Your Name" className="bg-[#2A2A2A] border-gray-700 text-white" />
          <Input type="email" placeholder="Your Email" className="bg-[#2A2A2A] border-gray-700 text-white" />
          <Textarea placeholder="Your Message" className="bg-[#2A2A2A] border-gray-700 text-white" rows={4} />
          <Button type="submit" className="bg-[#00ADB5] hover:bg-[#00BEC8] text-white text-lg py-2 px-6 w-full">
            Send Message
          </Button>
        </motion.form>
      </div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 0.05, scale: 1 }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
        className="absolute top-0 left-0 w-96 h-96 bg-[#00ADB5] rounded-full filter blur-3xl"
      />
    </section>
  )
}

function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-[#121212] py-6"
    >
      <div className="container mx-auto text-center text-gray-400">
        <p>&copy; 2023 PaiseWale. All rights reserved.</p>
      </div>
    </motion.footer>
  )
}

