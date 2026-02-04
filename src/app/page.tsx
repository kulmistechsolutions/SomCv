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
      <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-100 px-5 py-12 text-center text-gray-900 md:flex-row md:text-start lg:gap-12">
        <div className="max-w-prose space-y-3">
          <Image
            src={logo}
            alt="Logo"
            width={150}
            height={150}
            className="mx-auto md:ms-0"
          />
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Create the{" "}
            <span className="inline-block bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
              Perfect Resume
            </span>{" "}
            in Minutes
          </h1>
          <p className="text-lg text-gray-500">
            SOMCV helps you
            design a professional resume with AI assistance.
          </p>
          <Button asChild size="lg" variant="premium">
            <Link href="/resumes">Get started</Link>
          </Button>
        </div>
        <div>
          <Image
            src={resumePreview}
            alt="Resume preview"
            width={600}
            className="shadow-md lg:rotate-[1.5deg]"
          />
        </div>
      </main>

      {/* New Sections Below Hero */}
      <div className="bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-7xl space-y-20 px-5 py-16">
          {/* About SomCV Section */}
          <section className="space-y-6 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
              <FileText className="size-8 text-white" />
            </div>
            <h2 className="scroll-m-20 text-4xl font-bold tracking-tight">
              About <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">SomCV</span>
            </h2>
            <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600">
              SomCV is an AI-powered resume builder designed to help users
              create professional, job-ready resumes in minutes. It simplifies
              resume creation with guided steps, smart suggestions, and modern
              templates.
            </p>
          </section>

          {/* How SomCV Helps You Section */}
          <section className="space-y-10">
            <div className="text-center">
              <h2 className="scroll-m-20 text-4xl font-bold tracking-tight">
                How <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">SomCV</span> Helps You
              </h2>
              <p className="mt-2 text-gray-600">Everything you need to create the perfect resume</p>
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
          <section className="space-y-10">
            <div className="text-center">
              <h2 className="scroll-m-20 text-4xl font-bold tracking-tight">
                Key <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">Features</span>
              </h2>
              <p className="mt-2 text-gray-600">Powerful tools to build your perfect resume</p>
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
          <section className="space-y-8">
            <div className="text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-green-500 to-green-600 shadow-lg">
                <MessageCircle className="size-8 text-white" />
              </div>
              <h2 className="mt-4 scroll-m-20 text-4xl font-bold tracking-tight">
                Contact <span className="bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">Us</span>
              </h2>
              <p className="mt-2 text-gray-600">Get in touch with us anytime</p>
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
