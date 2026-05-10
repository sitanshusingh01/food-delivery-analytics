import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { ArrowRight, Database, Github, PieChart, TrendingUp, BarChart, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect(); } },
      { threshold: 0.3 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [started, end, duration]);

  return { count, ref };
}

function StatCounter({ end, suffix = "", prefix = "", label }: { end: number; suffix?: string; prefix?: string; label: string }) {
  const { count, ref } = useCountUp(end);
  return (
    <div ref={ref} className="flex flex-col items-center p-6 bg-card rounded-xl border shadow-sm text-center">
      <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
        {prefix}{count.toLocaleString()}{suffix}
      </div>
      <div className="text-xs text-muted-foreground font-medium uppercase tracking-wider">{label}</div>
    </div>
  );
}

const workflowSteps = [
  { step: "Data Collection", desc: "Downloaded and merged two Kaggle datasets — Zomato restaurant data + a food delivery orders dataset" },
  { step: "Data Cleaning", desc: "Fixed nulls, standardized city names, corrected time formats, removed bad records using Pandas" },
  { step: "EDA", desc: "Exploratory analysis to find customer patterns, peak hours, cuisine trends, and delivery delay causes" },
  { step: "SQL Analysis", desc: "Window functions, CTEs, aggregations — monthly revenue breakdowns, city rankings, customer cohorts" },
  { step: "Power BI Dashboard", desc: "4 dashboards: city operations, customer insights, restaurant performance, delivery SLA" },
  { step: "Web Deployment", desc: "Documented everything on this site with interactive charts summarizing the key findings" },
];

const techStack = {
  "Data Processing": ["Python 3.11", "Pandas", "NumPy", "SQL", "SQLAlchemy"],
  "Visualization": ["Matplotlib", "Seaborn", "Power BI", "Excel"],
  "Deployment": ["GitHub Pages", "Power BI Service", "Google Drive"],
};

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-4rem)] pb-24">
      {/* Hero */}
      <section className="pt-20 pb-16 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 border border-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
            </span>
            Data Analytics Case Study by Sitanshu Singh
          </div>

          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight mb-6 leading-tight">
            Decoding{" "}
            <span className="text-primary">Food Delivery</span>
            <br />
            Operations
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-4 leading-relaxed">
            I got curious about how platforms like Swiggy and Zomato actually work — so I spent a few months analyzing
            real order data. This covers customer behavior, delivery efficiency, restaurant performance, and city demand trends.
          </p>
          <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-10">
            50,000+ orders across 8 Indian cities. Cleaned in Python, analyzed in SQL, visualized in Power BI.
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="h-12 px-8 text-base font-semibold">
              <Link href="/overview">
                Read the Case Study <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base bg-background">
              <a href="https://github.com/sitanshusingh01" target="_blank" rel="noreferrer">
                <Github className="mr-2 w-4 h-4" /> View on GitHub
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* KPI Stats */}
      <section className="py-12 px-4 bg-muted/50 border-y">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <StatCounter end={50247} suffix="+" label="Orders Analyzed" />
            <StatCounter end={8} label="Cities Covered" />
            <StatCounter end={847} label="Restaurants" />
            <StatCounter end={98} suffix="%" label="Delivery Success" />
            <StatCounter end={32} suffix=" min" label="Avg Delivery Time" />
          </div>
        </div>
      </section>

      {/* Workflow + Tech Stack */}
      <section className="py-20 px-4">
        <div className="container mx-auto max-w-5xl grid md:grid-cols-2 gap-16 items-start">
          <div>
            <h2 className="text-3xl font-bold mb-3">How the Project Was Built</h2>
            <p className="text-muted-foreground mb-8 text-sm">
              A realistic analytics lifecycle — from messy raw CSVs to a deployed site.
              Each step took longer than expected, which is pretty normal.
            </p>
            <div className="space-y-0">
              {workflowSteps.map((item, i) => (
                <div key={i} className="flex gap-4 items-start">
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-8 h-8 rounded-full bg-primary/15 text-primary flex items-center justify-center font-bold text-sm border border-primary/25">
                      {i + 1}
                    </div>
                    {i !== workflowSteps.length - 1 && <div className="w-px h-10 bg-border mt-1" />}
                  </div>
                  <div className="pt-1 pb-5">
                    <h4 className="font-semibold text-foreground text-sm">{item.step}</h4>
                    <p className="text-xs text-muted-foreground mt-0.5 leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-card p-8 rounded-2xl border shadow-sm sticky top-24">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Database className="w-4 h-4 text-primary" /> Tools Used
            </h3>
            <div className="space-y-5">
              {Object.entries(techStack).map(([category, items]) => (
                <div key={category}>
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2.5">{category}</h4>
                  <div className="flex flex-wrap gap-2">
                    {items.map(tech => (
                      <span key={tech} className="px-2.5 py-1 bg-muted text-foreground rounded-md text-xs font-medium border">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 pt-6 border-t">
              <p className="text-xs text-muted-foreground mb-3 font-medium uppercase tracking-wider">Author</p>
              <p className="text-sm font-semibold">Sitanshu Singh</p>
              <p className="text-xs text-muted-foreground mt-0.5">Data Analytics Student, India</p>
              <div className="mt-3 space-y-1.5">
                {["Self-initiated learning project", "3 months of work", "GitHub + Pages deployed"].map(item => (
                  <div key={item} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <CheckCircle2 className="w-3.5 h-3.5 text-green-500 shrink-0" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 px-4 bg-muted/30 border-t">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-xl font-bold mb-6 text-center">Explore the Project</h2>
          <div className="grid sm:grid-cols-3 gap-4">
            {[
              { href: "/dashboard", icon: PieChart, title: "Interactive Dashboard", desc: "Charts and KPIs from the final Power BI analysis" },
              { href: "/insights", icon: TrendingUp, title: "Key Findings", desc: "What the EDA and SQL analysis actually revealed" },
              { href: "/dataset", icon: BarChart, title: "The Dataset", desc: "Schema, data quality notes, and how it was cleaned" },
            ].map(card => (
              <Link key={card.href} href={card.href} className="group block p-5 bg-card border rounded-xl hover:border-primary hover:shadow-md transition-all">
                <card.icon className="w-7 h-7 text-primary mb-3" />
                <h3 className="text-sm font-bold mb-1 group-hover:text-primary transition-colors">{card.title}</h3>
                <p className="text-xs text-muted-foreground leading-relaxed">{card.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
