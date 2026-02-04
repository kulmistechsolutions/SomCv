import logo from "@/assets/logo.png";
import resumePreview from "@/assets/resume-preview.jpg";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  MessageCircle,
  Phone,
  FileText,
  Sparkles,
  Eye,
  Download,
  Smartphone,
  ListChecks,
  Zap,
  Shield,
  Image as ImageIcon,
  Palette,
  Brain,
  Monitor,
  FileEdit,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center justify-center gap-8 bg-gradient-to-br from-gray-50 via-white to-gray-100 px-5 py-16 text-center md:flex-row md:items-center md:justify-between md:gap-12 md:px-8 md:text-left lg:px-12">
        <div className="flex w-full flex-col items-center space-y-6 md:w-1/2 md:items-start md:space-y-8">
          <div className="flex items-center justify-center md:justify-start">
            <Image
              src={logo}
              alt="Logo"
              width={150}
              height={150}
              className="h-auto w-auto"
              priority
            />
          </div>
          <div className="space-y-4">
            <h1 className="scroll-m-20 text-4xl font-extrabold leading-tight tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
              Create the{" "}
              <span className="inline-block bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                Perfect Resume
              </span>{" "}
              in Minutes
            </h1>
            <p className="mx-auto max-w-md text-lg leading-relaxed text-gray-600 md:mx-0 md:text-xl">
              SOMCV helps you design a professional resume with AI assistance.
            </p>
          </div>
          <div className="flex w-full justify-center md:justify-start">
            <Button asChild size="lg" variant="premium" className="w-full sm:w-auto">
              <Link href="/resumes">Get started</Link>
            </Button>
          </div>
        </div>
        <div className="flex w-full items-center justify-center md:w-1/2">
          <div className="relative">
            <Image
              src={resumePreview}
              alt="Resume preview"
              width={600}
              height={800}
              className="w-full max-w-lg rounded-lg shadow-2xl transition-transform hover:scale-105 lg:rotate-[1.5deg]"
              priority
            />
          </div>
        </div>
      </main>

      {/* New Sections Below Hero */}
      <div className="bg-gradient-to-b from-white to-gray-50">
        <div className="mx-auto max-w-7xl space-y-24 px-5 py-20 md:px-8 lg:px-12">
          {/* About SomCV Section */}
          <section className="space-y-8 text-center">
            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600 shadow-xl">
              <FileText className="size-10 text-white" />
            </div>
            <div className="space-y-4">
              <h2 className="scroll-m-20 text-4xl font-bold tracking-tight md:text-5xl">
                About <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">SomCV</span>
              </h2>
              <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 md:text-xl">
                SomCV is an AI-powered resume builder designed to help users
                create professional, job-ready resumes in minutes. It simplifies
                resume creation with guided steps, smart suggestions, and modern
                templates.
              </p>
            </div>
          </section>

          {/* How SomCV Helps You Section */}
          <section className="space-y-12">
            <div className="space-y-3 text-center">
              <h2 className="scroll-m-20 text-4xl font-bold tracking-tight md:text-5xl">
                How <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">SomCV</span> Helps You
              </h2>
              <p className="text-lg text-gray-600 md:text-xl">Everything you need to create the perfect resume</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="group border-2 transition-all hover:border-green-500/50 hover:shadow-xl">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-md transition-transform group-hover:scale-110">
                    <ListChecks className="size-6" />
                  </div>
                  <CardTitle className="text-xl">Step-by-step resume builder</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Follow guided steps to create your resume with ease.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="group border-2 transition-all hover:border-green-500/50 hover:shadow-xl">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 text-white shadow-md transition-transform group-hover:scale-110">
                    <Sparkles className="size-6" />
                  </div>
                  <CardTitle className="text-xl">AI-powered professional summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Generate compelling summaries and work experience descriptions
                    using AI.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="group border-2 transition-all hover:border-green-500/50 hover:shadow-xl">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-cyan-600 text-white shadow-md transition-transform group-hover:scale-110">
                    <Eye className="size-6" />
                  </div>
                  <CardTitle className="text-xl">Easy editing and live preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    See your changes in real-time as you build your resume.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="group border-2 transition-all hover:border-green-500/50 hover:shadow-xl">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-orange-600 text-white shadow-md transition-transform group-hover:scale-110">
                    <Download className="size-6" />
                  </div>
                  <CardTitle className="text-xl">Export-ready resumes</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Print or save your resume as PDF with one click.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="group border-2 transition-all hover:border-green-500/50 hover:shadow-xl md:col-span-2 lg:col-span-1">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-pink-500 to-pink-600 text-white shadow-md transition-transform group-hover:scale-110">
                    <Smartphone className="size-6" />
                  </div>
                  <CardTitle className="text-xl">Works on desktop and mobile</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Access and edit your resume from any device, anywhere.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Key Features Section */}
          <section className="space-y-12">
            <div className="space-y-3 text-center">
              <h2 className="scroll-m-20 text-4xl font-bold tracking-tight md:text-5xl">
                Key <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">Features</span>
              </h2>
              <p className="text-lg text-gray-600 md:text-xl">Powerful tools to build your perfect resume</p>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="group border-2 transition-all hover:border-green-500/50 hover:shadow-xl">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-md transition-transform group-hover:scale-110">
                    <FileEdit className="size-6" />
                  </div>
                  <CardTitle className="text-xl">Multi-step resume form</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Organized sections for personal info, experience, education,
                    and more.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="group border-2 transition-all hover:border-green-500/50 hover:shadow-xl">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-teal-500 to-teal-600 text-white shadow-md transition-transform group-hover:scale-110">
                    <Monitor className="size-6" />
                  </div>
                  <CardTitle className="text-xl">Real-time resume preview</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Preview your resume as you build it with instant updates.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="group border-2 transition-all hover:border-green-500/50 hover:shadow-xl">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-violet-600 text-white shadow-md transition-transform group-hover:scale-110">
                    <Brain className="size-6" />
                  </div>
                  <CardTitle className="text-xl">AI auto-fill</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Let AI generate professional summaries and experience
                    descriptions for you.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="group border-2 transition-all hover:border-green-500/50 hover:shadow-xl">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-md transition-transform group-hover:scale-110">
                    <Zap className="size-6" />
                  </div>
                  <CardTitle className="text-xl">Resume management</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Create, edit, and delete multiple resumes with ease.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="group border-2 transition-all hover:border-green-500/50 hover:shadow-xl">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-rose-500 to-rose-600 text-white shadow-md transition-transform group-hover:scale-110">
                    <ImageIcon className="size-6" />
                  </div>
                  <CardTitle className="text-xl">Photo upload support</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Add your professional photo to personalize your resume.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="group border-2 transition-all hover:border-green-500/50 hover:shadow-xl">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-amber-500 to-amber-600 text-white shadow-md transition-transform group-hover:scale-110">
                    <Shield className="size-6" />
                  </div>
                  <CardTitle className="text-xl">Secure authentication</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Your data is protected with secure authentication and
                    encryption.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card className="group border-2 transition-all hover:border-green-500/50 hover:shadow-xl md:col-span-2 lg:col-span-3">
                <CardHeader>
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-green-500 to-green-600 text-white shadow-md transition-transform group-hover:scale-110">
                    <Palette className="size-6" />
                  </div>
                  <CardTitle className="text-xl">Clean, modern design</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    Choose from multiple professional templates with modern,
                    clean layouts.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Contact Us Section */}
          <section className="space-y-10">
            <div className="space-y-4 text-center">
              <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600 shadow-xl">
                <MessageCircle className="size-10 text-white" />
              </div>
              <div className="space-y-2">
                <h2 className="scroll-m-20 text-4xl font-bold tracking-tight md:text-5xl">
                  Contact <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">Us</span>
                </h2>
                <p className="text-lg text-gray-600 md:text-xl">Get in touch with us anytime</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                asChild
                size="lg"
                className="group w-full bg-gradient-to-r from-green-600 to-green-500 text-white shadow-lg transition-all hover:from-green-700 hover:to-green-600 hover:shadow-xl sm:w-auto"
              >
                <a
                  href="https://wa.me/252613609678"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <MessageCircle className="size-5 transition-transform group-hover:scale-110" />
                  Chat on WhatsApp
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="group w-full border-2 transition-all hover:border-green-500 hover:bg-green-50 sm:w-auto"
              >
                <a href="tel:+252615331712" className="flex items-center gap-2">
                  <Phone className="size-5 transition-transform group-hover:scale-110" />
                  Call Us
                </a>
              </Button>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
