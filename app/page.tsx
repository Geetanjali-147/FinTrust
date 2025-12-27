import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, ShieldCheck, Zap, Mail, ArrowRight } from "lucide-react"
import { Hero3D } from "@/components/hero-3d"
import { Features3D } from "@/components/features-3d"
import { FaqSection } from "@/components/faq-section"
import { StatsSection } from "@/components/stats-section"
import { CoinsBackground } from "@/components/coins-background"

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background relative overflow-hidden">
      <CoinsBackground />
      {/* Header */}
      <header className="border-b border-border/50 sticky top-0 glass-strong z-50">
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2 font-bold text-xl">
            <span className="gradient-text">LoanFlow</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
            <Link href="#features" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105">
              Features
            </Link>
            <Link href="#about" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105">
              About
            </Link>
            <Link href="/login" className="text-muted-foreground hover:text-primary transition-all duration-300 hover:scale-105">
              Login
            </Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button size="sm" className="glow-cyan hover-lift shimmer">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="py-24 md:py-32 lg:py-40 px-4 md:px-6 relative overflow-hidden">
          <Hero3D />
          <div className="container mx-auto relative z-10 px-4 md:px-6 max-w-7xl">
            <div className="flex flex-col items-center text-center">
              <div>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none mb-6">
                  Smart Loans, <span className="gradient-text">Instantly Approved</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mb-8">
                  AI-powered credit scoring and loan approval system that gets you the money you need, faster than ever.
                </p>
              </div>
              <div className="flex gap-4">
                <Button asChild size="lg" className="h-11 px-8 glow-cyan hover-lift animated-gradient">
                  <Link href="/login">Apply Now</Link>
                </Button>
                <Button variant="outline" size="lg" className="h-11 px-8 glass hover-lift border-primary/50">
                  Learn More
                </Button>
              </div>
            </div>
          </div>
        </section>




        <StatsSection />

        {/* Features Section */}
        <section id="features" className="w-full py-12 md:py-24 lg:py-32 bg-secondary/30 relative overflow-hidden">
          <Features3D />
          <div className="container mx-auto px-4 md:px-6 max-w-7xl relative z-10">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="inline-block rounded-full glass px-4 py-2 text-sm gradient-text font-semibold mb-6">Key Features</div>
              <h2 className="text-3xl font-bold tracking-tighter md:text-4xl mb-4">Why Choose <span className="gradient-text">LoanFlow</span>?</h2>
              <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Our platform combines cutting-edge technology with banking expertise to deliver the best loan experience.
              </p>
            </div>
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 py-12 md:grid-cols-2 lg:grid-cols-4 mt-8">
              <Card className="glass-strong hover-lift border-primary/20 group">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:glow-cyan transition-all duration-300">
                    <Zap className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="group-hover:gradient-text transition-all duration-300">Lightning Fast</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Get approved in minutes, not days. Our AI analyzes your application instantly.
                  </p>
                </CardContent>
              </Card>
              <Card className="glass-strong hover-lift border-accent/20 group">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:glow-purple transition-all duration-300">
                    <ShieldCheck className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="group-hover:gradient-text transition-all duration-300">Bank-Grade Security</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Your data is protected with state-of-the-art encryption and security protocols.
                  </p>
                </CardContent>
              </Card>
              <Card className="glass-strong hover-lift border-primary/20 group">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:glow-cyan transition-all duration-300">
                    <BarChart3 className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle className="group-hover:gradient-text transition-all duration-300">AI Insights</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Understand your credit health with detailed analytics and improvement tips.
                  </p>
                </CardContent>
              </Card>
              <Card className="glass-strong hover-lift border-accent/20 group">
                <CardHeader>
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4 group-hover:glow-purple transition-all duration-300">
                    <Mail className="h-6 w-6 text-accent" />
                  </div>
                  <CardTitle className="group-hover:gradient-text transition-all duration-300">Smart Alerts</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Receive personalized email updates based on your credit history and loan status.
                  </p>
                </CardContent>
              </Card>
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
              <h3 className="text-lg font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">Features</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Pricing</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Security</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Enterprise</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Careers</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Blog</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Resources</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">Documentation</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Help Center</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Guides</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">API Status</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><Link href="#" className="hover:text-primary transition-colors">Privacy Policy</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Terms of Service</Link></li>
                <li><Link href="#" className="hover:text-primary transition-colors">Cookie Policy</Link></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} LoanFlow Inc. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
