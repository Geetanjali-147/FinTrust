"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, ShieldCheck, Zap, Mail, ArrowRight, Sparkles, CreditCard, TrendingUp, Globe } from "lucide-react"
import { FaqSection } from "@/components/faq-section"
import { StatsSection } from "@/components/stats-section"
import { HeroSlider } from "@/components/hero-slider"
import { motion } from "framer-motion"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      {/* Background Image */}
      <div 
        className="fixed inset-0 z-0 opacity-20"
        style={{
          backgroundImage: `url('https://media.istockphoto.com/id/1411250722/photo/credit-score-concept-on-the-screen-of-smartphone.jpg?s=612x612&w=0&k=20&c=lITVOB5j3N98doEi-tuLJGIKDpYsE-md9XRWfRa1KEc=')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
      {/* Header */}
      <header className="border-b sticky top-0 bg-background/80 backdrop-blur-lg z-50 shadow-sm">
        <div className="container flex h-18 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <div className="p-2 rounded-lg bg-linear-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent">
              <span className="text-white font-bold">LoanFlow</span>
            </div>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="#features" className="text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-accent hover:bg-opacity-50 transition-all duration-200">
              Features
            </Link>
            <Link href="#about" className="text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-accent hover:bg-opacity-50 transition-all duration-200">
              About
            </Link>
            <Link href="/login" className="text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-accent hover:bg-opacity-50 transition-all duration-200">
              Login
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button size="sm" className="btn-multicolor hover:scale-105 transition-transform duration-200 shadow-md hover:shadow-lg">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 md:py-32 lg:py-40 px-4 md:px-6 relative overflow-hidden">
          <div className="container mx-auto relative z-10 px-4 md:px-6 max-w-7xl">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4">
                <div className="inline-flex items-center rounded-full border px-3 py-1 text-sm transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/20">
                  <Sparkles className="mr-2 h-4 w-4 text-blue-500" />
                  <span className="bg-clip-text text-transparent bg-linear-to-r from-blue-500 to-purple-600">AI-Powered Loan Approval</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-6">
                Smart Loans, <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-600">Instantly Approved</span>
              </h1>
              <p className="mx-auto max-w-175 text-muted-foreground md:text-xl mb-8">
                AI-powered credit scoring and loan approval system that gets you the money you need, faster than ever.
              </p>
            </div>
            
            {/* Hero Slider */}
            <div className="mt-12">
              <div className="fancy-card bg-linear-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-200/30 dark:border-blue-700/30 p-6 rounded-2xl shadow-xl">
                <div className="flex justify-center">
                  <div className="w-full max-w-4xl">
                    <HeroSlider />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 flex justify-center space-x-4">
              <Button asChild size="lg" className="h-11 px-8 btn-multicolor">
                <Link href="/login">Apply Now</Link>
              </Button>
              <Button variant="outline" size="lg" className="h-11 px-8 border-multicolor">
                Learn More
              </Button>
            </div>
          </div>
        </section>

        <StatsSection />

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/50 relative overflow-hidden">
          <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="inline-block rounded-lg bg-linear-to-r from-blue-500 to-purple-600 px-3 py-1 text-sm text-white mb-6">Key Features</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">Why Choose LoanFlow?</h2>
              <p className="max-w-225 text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform combines cutting-edge technology with banking expertise to deliver the best loan experience.
              </p>
            </div>
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4 mt-8">
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <Card className="multicolor-card bg-linear-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 border border-blue-200/30 dark:border-blue-700/30 h-full flex flex-col">
                  <CardHeader>
                    <div className="mb-4">
                      <img 
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRS3YyO-1s4n4guR2zEFCuPEqR0lpRRr-jFzA&s" 
                        alt="Lightning Fast Processing" 
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                    <Zap className="h-10 w-10 mb-2 text-blue-500 self-center" />
                    <CardTitle className="text-blue-600 dark:text-blue-400 font-bold text-lg">Lightning Fast</CardTitle>
                  </CardHeader>
                  <CardContent className="grow">
                    <p className="text-sm text-blue-500/70 dark:text-blue-400/70 font-medium">
                      Get approved in minutes, not days. Our AI analyzes your application instantly.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <Card className="multicolor-card bg-linear-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-purple-200/30 dark:border-purple-700/30 h-full flex flex-col">
                  <CardHeader>
                    <div className="mb-4">
                      <img 
                        src="https://www.shutterstock.com/image-photo/credit-score-concept-person-use-600nw-2415754165.jpg" 
                        alt="Bank-Grade Security" 
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                    <ShieldCheck className="h-10 w-10 mb-2 text-purple-500 self-center" />
                    <CardTitle className="text-purple-600 dark:text-purple-400 font-bold text-lg">Bank-Grade Security</CardTitle>
                  </CardHeader>
                  <CardContent className="grow">
                    <p className="text-sm text-purple-500/70 dark:text-purple-400/70 font-medium">
                      Your data is protected with state-of-the-art encryption and security protocols.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <Card className="multicolor-card bg-linear-to-br from-green-50 to-teal-50 dark:from-green-950/20 dark:to-teal-950/20 border border-green-200/30 dark:border-green-700/30 h-full flex flex-col">
                  <CardHeader>
                    <div className="mb-4">
                      <img 
                        src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y3JlZGl0JTIwc2NvcmV8ZW58MHx8MHx8fDA%3D" 
                        alt="AI Insights" 
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                    <BarChart3 className="h-10 w-10 mb-2 text-green-500 self-center" />
                    <CardTitle className="text-green-600 dark:text-green-400 font-bold text-lg">AI Insights</CardTitle>
                  </CardHeader>
                  <CardContent className="grow">
                    <p className="text-sm text-green-500/70 dark:text-green-400/70 font-medium">
                      Understand your credit health with detailed analytics and improvement tips.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 50, scale: 0.8 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                viewport={{ once: true, margin: '-100px' }}
              >
                <Card className="multicolor-card bg-linear-to-br from-orange-50 to-red-50 dark:from-orange-950/20 dark:to-red-950/20 border border-orange-200/30 dark:border-orange-700/30 h-full flex flex-col">
                  <CardHeader>
                    <div className="mb-4">
                      <img 
                        src="https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600&h=300&fit=crop&crop=entropy" 
                        alt="Smart Alerts" 
                        className="w-full h-32 object-cover rounded-lg"
                      />
                    </div>
                    <Mail className="h-10 w-10 mb-2 text-orange-500 self-center" />
                    <CardTitle className="text-orange-600 dark:text-orange-400 font-bold text-lg">Smart Alerts</CardTitle>
                  </CardHeader>
                  <CardContent className="grow">
                    <p className="text-sm text-orange-500/70 dark:text-orange-400/70 font-medium">
                      Receive personalized email updates based on your credit history and loan status.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <FaqSection />
      </main>
      <footer className="w-full py-12 md:py-16 bg-background border-t">
        <div className="container mx-auto px-4 md:px-6 max-w-7xl">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-lg font-bold mb-4 text-blue-600 dark:text-blue-400">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-blue-500 transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-blue-500 transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-blue-500 transition-colors">Security</Link></li>
                <li><Link href="#" className="hover:text-blue-500 transition-colors">Enterprise</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-purple-600 dark:text-purple-400">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-purple-500 transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-purple-500 transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-purple-500 transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-purple-500 transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-green-600 dark:text-green-400">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-green-500 transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-green-500 transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-green-500 transition-colors">Guides</Link></li>
                <li><Link href="#" className="hover:text-green-500 transition-colors">API Status</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 text-orange-600 dark:text-orange-400">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-orange-500 transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-orange-500 transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-orange-500 transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} <span className="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-purple-600">LoanFlow</span> Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
