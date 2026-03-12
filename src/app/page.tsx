import Link from "next/link";
import {
  GraduationCap,
  BookOpen,
  Upload,
  Star,
  FileText,
  Users,
  TrendingUp,
  ArrowRight,
  Sparkles,
  Library,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GlobalSearch } from "@/components/search/global-search";

const features = [
  {
    icon: Library,
    title: "Organized Library",
    description:
      "Resources neatly organized by department, semester, and subject. Find what you need in seconds.",
    gradient: "from-blue-500 to-cyan-500",
    bgGlow: "bg-blue-500/10",
  },
  {
    icon: Upload,
    title: "Easy Uploads",
    description:
      "Share your notes, assignments, and lab manuals with your peers. Help build the knowledge base.",
    gradient: "from-emerald-500 to-teal-500",
    bgGlow: "bg-emerald-500/10",
  },
  {
    icon: Star,
    title: "Community Rated",
    description:
      "Rate and review resources to help others find the best study materials available.",
    gradient: "from-amber-500 to-orange-500",
    bgGlow: "bg-amber-500/10",
  },
  {
    icon: FileText,
    title: "PDF Preview",
    description:
      "Preview documents right in your browser without downloading. Study anywhere, anytime.",
    gradient: "from-purple-500 to-pink-500",
    bgGlow: "bg-purple-500/10",
  },
];

const stats = [
  { value: "500+", label: "Resources", icon: FileText },
  { value: "6", label: "Departments", icon: BookOpen },
  { value: "50+", label: "Subjects", icon: Library },
  { value: "200+", label: "Contributors", icon: Users },
];

const departments = [
  { code: "CSE", name: "Computer Science", count: 42, color: "from-blue-500 to-indigo-600" },
  { code: "ECE", name: "Electronics & Comm.", count: 28, color: "from-cyan-500 to-blue-600" },
  { code: "ME", name: "Mechanical", count: 24, color: "from-orange-500 to-red-600" },
  { code: "CE", name: "Civil", count: 18, color: "from-emerald-500 to-green-600" },
  { code: "EE", name: "Electrical", count: 22, color: "from-yellow-500 to-amber-600" },
  { code: "IT", name: "Information Tech.", count: 35, color: "from-purple-500 to-pink-600" },
];

export default function LandingPage() {
  return (
    <div className="relative">
      {/* ==================== HERO ==================== */}
      <section className="relative overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 grid-pattern opacity-60" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-to-b from-primary/8 via-primary/3 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-20 right-[10%] w-72 h-72 bg-blue-500/5 rounded-full blur-3xl animate-pulse-subtle" />
        <div className="absolute top-40 left-[10%] w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl animate-pulse-subtle" style={{ animationDelay: "1.5s" }} />

        <div className="relative px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 lg:pt-32 pb-20 sm:pb-28">
          <div className="max-w-4xl mx-auto text-center">
            {/* Pill badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 mb-6 sm:mb-8">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span className="text-xs sm:text-sm font-medium text-primary">
                Your Academic Companion
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] mb-6">
              All Your{" "}
              <span className="gradient-text">College Resources</span>
              <br />
              In One Place
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 sm:mb-12 leading-relaxed">
              Browse notes, previous year questions, assignments, and lab
              manuals — organized by department and semester. Built by
              students, for students.
            </p>

            {/* Search */}
            <div className="max-w-2xl mx-auto mb-8">
              <GlobalSearch variant="hero" />
            </div>

            {/* Quick tags */}
            <div className="flex flex-wrap items-center justify-center gap-2">
              <span className="text-xs text-muted-foreground mr-1">
                Popular:
              </span>
              {[
                "Data Structures",
                "DBMS Notes",
                "OS PYQ",
                "ML Lab Manual",
              ].map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="rounded-full px-3 py-1 text-xs cursor-pointer hover:bg-primary/10 hover:text-primary transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ==================== STATS ==================== */}
      <section className="px-4 sm:px-6 lg:px-8 -mt-4">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
            {stats.map((stat) => (
              <Card
                key={stat.label}
                className="border-border/40 bg-card/60 backdrop-blur-sm hover:bg-card/80 transition-all duration-300"
              >
                <CardContent className="flex items-center gap-3 p-4 sm:p-5">
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl sm:text-3xl font-bold tracking-tight">
                      {stat.value}
                    </p>
                    <p className="text-xs text-muted-foreground font-medium">
                      {stat.label}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== DEPARTMENTS QUICK NAV ==================== */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge
              variant="secondary"
              className="rounded-full px-3 py-1 text-xs mb-4"
            >
              Browse
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Explore by Department
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Select your department to browse semester-wise resources
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
            {departments.map((dept) => (
              <Link key={dept.code} href="/dashboard">
                <Card className="group border-border/40 bg-card/60 hover:bg-card hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 cursor-pointer overflow-hidden h-full">
                  <CardContent className="p-5 sm:p-6">
                    <div
                      className={`inline-flex items-center justify-center w-11 h-11 rounded-xl bg-gradient-to-br ${dept.color} shadow-lg mb-4`}
                    >
                      <span className="text-white font-bold text-sm">
                        {dept.code}
                      </span>
                    </div>
                    <h3 className="font-semibold text-sm sm:text-base mb-1 group-hover:text-primary transition-colors">
                      {dept.name}
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      {dept.count} resources
                    </p>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          <div className="flex justify-center mt-8">
            <Link href="/dashboard">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full px-8 gap-2 group"
              >
                View All Departments
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* ==================== FEATURES ==================== */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <Badge
              variant="secondary"
              className="rounded-full px-3 py-1 text-xs mb-4"
            >
              Features
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Everything You Need to Ace Your Exams
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              A comprehensive platform designed for college students to access
              and share academic resources
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="group border-border/40 bg-card/60 hover:bg-card hover:shadow-xl hover:shadow-primary/5 transition-all duration-300"
              >
                <CardContent className="p-6 sm:p-8">
                  <div
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-2xl ${feature.bgGlow} mb-5`}
                  >
                    <feature.icon
                      className={`h-6 w-6 bg-gradient-to-br ${feature.gradient} bg-clip-text`}
                      style={{
                        color: feature.gradient.includes("blue")
                          ? "#3b82f6"
                          : feature.gradient.includes("emerald")
                            ? "#10b981"
                            : feature.gradient.includes("amber")
                              ? "#f59e0b"
                              : "#a855f7",
                      }}
                    />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== CTA ==================== */}
      <section className="px-4 sm:px-6 lg:px-8 py-20 sm:py-28">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-3xl blur-3xl" />
            <Card className="relative border-border/40 bg-card/60 backdrop-blur-sm overflow-hidden">
              <CardContent className="p-8 sm:p-12 lg:p-16">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6">
                  <Upload className="h-8 w-8 text-primary" />
                </div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
                  Got Notes? Share Them!
                </h2>
                <p className="text-muted-foreground max-w-lg mx-auto mb-8 text-sm sm:text-base">
                  Help your fellow students by uploading your study materials.
                  Every contribution makes a difference.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Link href="/upload">
                    <Button
                      size="lg"
                      className="rounded-full px-8 gap-2 shadow-lg shadow-primary/25"
                    >
                      <Upload className="h-4 w-4" />
                      Upload Resources
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button
                      variant="outline"
                      size="lg"
                      className="rounded-full px-8 gap-2"
                    >
                      Browse Resources
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* ==================== FOOTER ==================== */}
      <footer className="px-4 sm:px-6 lg:px-8 py-8 border-t border-border/50">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600">
              <GraduationCap className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="text-sm font-semibold">CollegeHub</span>
          </div>
          <p className="text-xs text-muted-foreground">
            Built with ❤️ for students, by students. © {new Date().getFullYear()}
          </p>
        </div>
      </footer>
    </div>
  );
}
