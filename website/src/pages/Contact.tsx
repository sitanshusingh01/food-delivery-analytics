import { useState } from "react";
import { Mail, MapPin, Clock, CheckCircle2, Send, Github, Linkedin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] pb-24">
      <div className="bg-muted/40 border-b py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <div className="flex items-center gap-2 text-primary text-sm font-medium mb-3">
            <Mail className="w-4 h-4" /> Contact
          </div>
          <h1 className="text-4xl font-bold mb-3">Get in Touch</h1>
          <p className="text-muted-foreground max-w-xl text-sm leading-relaxed">
            I'm Sitanshu Singh, actively looking for data analyst internships and entry-level roles.
            Questions about this project, feedback on the analysis, or want to discuss a position — feel free to reach out.
          </p>
        </div>
      </div>

      <div className="container mx-auto max-w-4xl px-4 py-12 grid md:grid-cols-5 gap-12 items-start">
        {/* Left Side */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-primary/5 border border-primary/20 rounded-xl p-5">
            <p className="text-sm font-semibold text-primary mb-1">Open to Opportunities</p>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Sitanshu Singh — B.S. Computer Science & Data Analytics, IIT Patna (2027).
              Actively seeking data analyst internships and entry-level roles in e-commerce, fintech, and operations.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { icon: Mail, label: "Email", value: "sitanshu2312res644@iitp.ac.in", href: "mailto:sitanshu2312res644@iitp.ac.in" },
              { icon: Phone, label: "Phone", value: "+91 8115926935", href: "tel:+918115926935" },
              { icon: MapPin, label: "Location", value: "India — open to remote", href: null },
              { icon: Clock, label: "Response time", value: "Within 24–48 hours", href: null },
            ].map(item => (
              <div key={item.label} className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <item.icon className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{item.label}</p>
                  {item.href ? (
                    <a href={item.href} className="text-sm font-medium hover:text-primary transition-colors">
                      {item.value}
                    </a>
                  ) : (
                    <p className="text-sm font-medium">{item.value}</p>
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-2.5">
            <a
              href="https://github.com/sitanshusingh01"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 px-4 py-2.5 bg-card border rounded-lg text-sm font-medium hover:border-primary hover:text-primary transition-colors"
            >
              <Github className="w-4 h-4" /> GitHub
            </a>
            <a
              href="https://linkedin.com/in/sitanshusingh"
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-3 px-4 py-2.5 bg-card border rounded-lg text-sm font-medium hover:border-primary hover:text-primary transition-colors"
            >
              <Linkedin className="w-4 h-4" /> LinkedIn
            </a>
          </div>

          <div className="border-t pt-4 text-xs text-muted-foreground space-y-1.5">
            <p className="font-medium text-foreground text-sm">Happy to discuss:</p>
            <p>Questions about this project or the methodology</p>
            <p>Dataset and data cleaning walkthrough</p>
            <p>Feedback on the analysis or Power BI dashboard</p>
            <p>Internship or entry-level data analyst roles</p>
          </div>
        </div>

        {/* Form */}
        <div className="md:col-span-3">
          {submitted ? (
            <div className="bg-card border rounded-2xl p-8 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="font-bold text-lg">Message sent</h3>
              <p className="text-sm text-muted-foreground">
                Thanks for reaching out. I'll get back to you within 24–48 hours.
              </p>
              <button
                onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}
                className="text-sm text-primary hover:underline mt-2"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="bg-card border rounded-2xl p-8 space-y-5">
              <h2 className="text-lg font-bold mb-1">Send a Message</h2>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="name" className="text-sm">Name</Label>
                  <Input
                    id="name"
                    data-testid="input-name"
                    placeholder="Your name"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email" className="text-sm">Email</Label>
                  <Input
                    id="email"
                    data-testid="input-email"
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    required
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="subject" className="text-sm">Subject</Label>
                <Input
                  id="subject"
                  data-testid="input-subject"
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  required
                />
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="message" className="text-sm">Message</Label>
                <Textarea
                  id="message"
                  data-testid="input-message"
                  placeholder="Your message..."
                  className="min-h-32 resize-none"
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  required
                />
              </div>

              <Button type="submit" data-testid="button-submit" className="w-full h-11 text-sm font-semibold">
                <Send className="w-4 h-4 mr-2" /> Send Message
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
