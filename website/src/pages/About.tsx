import { Github, Linkedin, Mail, Phone, ExternalLink, Trophy, Award, GraduationCap, Briefcase } from "lucide-react";

const skills = [
  { name: "Python (Pandas, NumPy)", pct: 85 },
  { name: "SQL (MySQL, PostgreSQL)", pct: 80 },
  { name: "Power BI & Excel", pct: 78 },
  { name: "Exploratory Data Analysis", pct: 82 },
  { name: "Machine Learning Basics", pct: 65 },
  { name: "Data Visualization (Matplotlib)", pct: 75 },
];

const certifications = [
  "IBM Data Analytics",
  "Deloitte Australia Data Analytics",
  "Tata GenAI Powered Data Analytics",
];

const achievements = [
  { icon: Trophy, text: "Selected for McKinsey Solve Assessment" },
  { icon: Award, text: "Media and PR Coordinator, TEDx IIT Patna" },
  { icon: Award, text: "NSS Coordinator, IIT Patna" },
];

const learnings = [
  "Data is almost never clean. Real datasets have inconsistencies that no tutorial prepares you for — city name variants, negative delivery times, broken joins. The cleaning step took longer than the analysis itself.",
  "SQL window functions are genuinely powerful once you actually need them. Writing the customer cohort and ranking queries pushed me to finally understand RANK(), LAG(), and CTEs properly.",
  "The insights you find are only useful if you can communicate them. Building the dashboard forced me to think about what actually matters vs. what just looks interesting.",
  "Power BI is much more capable than I expected. The DAX language has a steep learning curve but the time intelligence functions are worth it.",
  "Version control for data projects is underrated. I lost two days of work early on because I accidentally overwrote a cleaned dataset. After that, every file got a version suffix.",
  "Building the website at the end was a surprisingly good exercise — having to explain things simply helped me understand the findings better too.",
];

const socials = [
  { icon: Github, label: "GitHub", href: "https://github.com/sitanshusingh01", display: "GitHub" },
  { icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com/in/sitanshusingh", display: "LinkedIn" },
  { icon: Mail, label: "Email", href: "mailto:sitanshu2312res644@iitp.ac.in", display: "sitanshu2312res644@iitp.ac.in" },
  { icon: Phone, label: "Phone", href: "tel:+918115926935", display: "+91 8115926935" },
];

export default function About() {
  return (
    <div className="min-h-[calc(100vh-4rem)] pb-24">
      <div className="bg-muted/40 border-b py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-4xl font-bold mb-1">Sitanshu Singh</h1>
          <p className="text-muted-foreground text-sm mt-1">
            B.S. Computer Science & Data Analytics — IIT Patna &nbsp;|&nbsp; CPI 9.06/10
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-12 space-y-14">
        {/* Bio + Card */}
        <section className="grid md:grid-cols-3 gap-10 items-start">
          <div className="md:col-span-2 space-y-4 text-sm leading-relaxed text-muted-foreground">
            <p>
              I'm Sitanshu Singh, a data analytics student at IIT Patna (Class of 2027), with a strong interest in
              how data-driven decisions actually get made inside tech and e-commerce companies.
              I use food delivery apps almost every day, so at some point I just started wondering —
              what does the operational side of these platforms actually look like at scale? That question turned into this project.
            </p>
            <p>
              I worked on this over roughly three months alongside my coursework and research internship at IIT Bhilai.
              It started as a simple SQL practice exercise and kept growing — by the end I'd cleaned 50,000+ order records,
              written about 15 SQL queries, built four Power BI dashboards, and put together this site to document everything.
              There are rough edges — I'd do certain parts differently now — but it's the most complete end-to-end analytics
              project I've built so far.
            </p>
            <p>
              Currently looking for data analyst internships or entry-level roles in e-commerce, fintech, or operations.
              Based in India, open to remote.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              {socials.map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") || s.href.startsWith("tel") ? undefined : "_blank"}
                  rel="noreferrer"
                  className="flex items-center gap-2 px-4 py-2 bg-card border rounded-lg text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
                >
                  <s.icon className="w-4 h-4" />
                  {s.display}
                  {!s.href.startsWith("mailto") && !s.href.startsWith("tel") && (
                    <ExternalLink className="w-3 h-3 text-muted-foreground" />
                  )}
                </a>
              ))}
            </div>
          </div>

          <div className="bg-card border rounded-2xl p-5 space-y-1.5 text-xs text-muted-foreground">
            <div className="w-14 h-14 rounded-full bg-primary/15 flex items-center justify-center mb-3">
              <span className="text-xl font-bold text-primary">SS</span>
            </div>
            <p className="font-semibold text-sm text-foreground">Sitanshu Singh</p>
            <p className="text-xs text-muted-foreground">IIT Patna &mdash; 2023–2027</p>

            <div className="pt-3 border-t space-y-1">
              <p className="font-medium text-foreground text-xs mb-1.5">Interests:</p>
              {["Product analytics", "Operations data", "SQL + Python", "Dashboard design", "ML for insight"].map(i => (
                <p key={i}>{i}</p>
              ))}
            </div>
            <div className="pt-3 border-t space-y-1">
              <p className="font-medium text-foreground text-xs mb-1.5">Open to:</p>
              {["Data Analyst Internship", "Business Analyst roles", "Analytics Engineering (entry)"].map(i => (
                <p key={i}>{i}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Education */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <GraduationCap className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Education</h2>
          </div>
          <div className="bg-card border rounded-xl p-5">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1">
              <div>
                <p className="font-semibold text-base">Indian Institute of Technology Patna</p>
                <p className="text-sm text-muted-foreground mt-0.5">Bachelor of Science in Computer Science and Data Analytics</p>
                <p className="text-xs text-muted-foreground mt-2">
                  Relevant Coursework: Data Structures, DBMS, Statistics, Data Analytics
                </p>
              </div>
              <div className="text-right shrink-0">
                <span className="text-xs font-medium bg-primary/10 text-primary px-2.5 py-1 rounded-full border border-primary/20">
                  2023 – 2027
                </span>
                <p className="text-sm font-bold text-primary mt-2">CPI: 9.06 / 10</p>
              </div>
            </div>
          </div>
        </section>

        {/* Experience */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-primary" />
            </div>
            <h2 className="text-2xl font-bold">Experience</h2>
          </div>
          <div className="bg-card border rounded-xl p-5">
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-1 mb-3">
              <div>
                <p className="font-semibold text-base">Data Analytics Research Intern</p>
                <p className="text-sm text-muted-foreground">IIT Bhilai</p>
              </div>
              <span className="text-xs font-medium bg-muted text-muted-foreground px-2.5 py-1 rounded-full border shrink-0 h-fit">
                Jan 2026 – Apr 2026
              </span>
            </div>
            <ul className="space-y-1.5 text-sm text-muted-foreground">
              {[
                "Performed data preprocessing and cleaning on structured datasets using Python",
                "Conducted exploratory data analysis to identify patterns and trends",
                "Applied machine learning techniques to generate actionable insights",
                "Solved analytical problems using statistical approaches",
                "Developed visualizations to communicate insights effectively",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="text-primary mt-1">›</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Skills */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Technical Skills</h2>
          <div className="grid sm:grid-cols-2 gap-x-12 gap-y-5 mb-6">
            {skills.map(skill => (
              <div key={skill.name}>
                <div className="flex justify-between mb-1.5">
                  <span className="text-sm font-medium">{skill.name}</span>
                  <span className="text-sm text-muted-foreground">{skill.pct}%</span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${skill.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {["Python", "SQL", "Java", "Pandas", "NumPy", "MySQL", "Git", "GitHub", "VS Code", "Power BI", "Excel", "Matplotlib"].map(tool => (
              <span key={tool} className="px-2.5 py-1 bg-muted text-foreground rounded-md text-xs font-medium border">{tool}</span>
            ))}
          </div>
        </section>

        {/* Certifications + Achievements */}
        <section className="grid sm:grid-cols-2 gap-6">
          <div>
            <h2 className="text-xl font-bold mb-4">Certifications</h2>
            <div className="space-y-2.5">
              {certifications.map((cert, i) => (
                <div key={i} className="flex items-center gap-3 p-3.5 bg-card border rounded-lg">
                  <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                    <Award className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <p className="text-sm font-medium">{cert}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-xl font-bold mb-4">Achievements</h2>
            <div className="space-y-2.5">
              {achievements.map((ach, i) => (
                <div key={i} className="flex items-center gap-3 p-3.5 bg-card border rounded-lg">
                  <div className="w-7 h-7 rounded-full bg-primary/15 flex items-center justify-center shrink-0">
                    <ach.icon className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <p className="text-sm font-medium">{ach.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Learnings */}
        <section>
          <h2 className="text-2xl font-bold mb-2">What I Actually Learned from This Project</h2>
          <p className="text-sm text-muted-foreground mb-5">Not the generic version.</p>
          <div className="space-y-3">
            {learnings.map((lesson, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-card border rounded-xl">
                <span className="w-6 h-6 rounded-full bg-primary/15 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed">{lesson}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-muted/40 border rounded-xl p-6">
          <h3 className="font-bold mb-1">What's Next</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Working on a customer churn analysis project next — e-commerce dataset, using Python and scikit-learn for the first time.
            Will link it here once it's in a shareable state.
          </p>
          <a href="https://github.com/sitanshusingh01" target="_blank" rel="noreferrer" className="text-sm text-primary font-medium hover:underline">
            See all projects on GitHub →
          </a>
        </section>
      </div>
    </div>
  );
}
