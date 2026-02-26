import { ArrowLeft, FileText, AlertTriangle, Compass, Users, Shield, DollarSign, Clock, Target, Lightbulb, CheckCircle2, TrendingUp, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const BusinessCase = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Accent bar */}
      <div className="h-1.5 flex">
        <div className="flex-1 bg-bce-cyan" />
        <div className="flex-1 bg-bce-purple" />
        <div className="flex-1 bg-bce-green" />
        <div className="flex-1 bg-bce-coral" />
        <div className="flex-1 bg-bce-yellow" />
      </div>

      <main className="container mx-auto px-4 py-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to app
          </button>

          {/* Title */}
          <div className="text-center space-y-2 animate-fade-up">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-2">
              <FileText className="w-4 h-4" />
              Internal Business Case
            </div>
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary">
              SMART Goal Assistant
            </h1>
            <p className="text-muted-foreground text-lg">
              AI-Powered Goal Setting & Quality Assurance Tool
            </p>
          </div>

          {/* Executive Summary */}
          <Section
            icon={<FileText className="w-6 h-6 text-bce-cyan" />}
            title="Executive Summary"
            color="border-bce-cyan"
          >
            <p>
              The <strong>SMART Goal Assistant</strong> is an AI-powered internal tool designed to improve the quality, consistency, and effectiveness of employee goal-setting across the organisation. 
              It provides real-time feedback on goals against SMART criteria (Specific, Measurable, Achievable, Relevant, Time-bound), and can generate tailored goal ideas for both performance and development contexts.
            </p>
            <p>
              By equipping employees and managers with instant, structured guidance, the tool reduces the time spent on goal-setting cycles, improves alignment with strategic priorities, 
              and ensures goals are actionable and measurable — leading to better performance outcomes and a stronger culture of accountability.
            </p>
          </Section>

          {/* Problem Statement */}
          <Section
            icon={<AlertTriangle className="w-6 h-6 text-bce-coral" />}
            title="Problem Statement & Work Request"
            color="border-bce-coral"
          >
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-foreground mb-1">The Problem</h3>
                <p>
                  Goal-setting is a critical part of performance management, yet many employees struggle to write effective goals. 
                  Common issues include goals that are too vague, unmeasurable, unrealistic, or lack clear timelines. 
                  This results in misaligned priorities, reduced accountability, and difficulty evaluating performance fairly at review time.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Current State</h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>Managers spend significant time coaching on goal quality during review cycles</li>
                  <li>Inconsistent goal quality across teams and departments</li>
                  <li>No scalable mechanism to provide instant feedback on goal quality</li>
                  <li>Employees often lack confidence or clarity when writing goals</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Work Request</h3>
                <p>
                  Approval is sought to develop and deploy the SMART Goal Assistant as an internal tool accessible to all employees. 
                  The tool leverages AI to analyse and score goals in real-time, provide actionable improvement suggestions, and generate context-appropriate goal ideas.
                </p>
              </div>
            </div>
          </Section>

          {/* POACB */}
          <Section
            icon={<Compass className="w-6 h-6 text-bce-purple" />}
            title="POACB Analysis"
            color="border-bce-purple"
          >
            <div className="grid gap-4">
              <POACBItem
                letter="P"
                label="Problem"
                content="Employees across the organisation write goals that are often vague, unmeasurable, or misaligned with strategic priorities. This undermines performance management effectiveness and creates inconsistency in evaluation."
              />
              <POACBItem
                letter="O"
                label="Opportunity"
                content="AI technology now enables instant, scalable feedback on written goals. By deploying an AI assistant, we can democratise access to high-quality goal-setting support — previously only available through 1:1 coaching — to every employee at any time."
              />
              <POACBItem
                letter="A"
                label="Approach"
                content="Build a web-based tool that allows employees to (1) paste in a goal and receive an instant SMART analysis with scores and suggestions, or (2) generate tailored performance/development goal ideas based on their role context. The tool uses large language models for analysis and runs as a lightweight web application."
              />
              <POACBItem
                letter="C"
                label="Constraints"
                content="The tool must not store sensitive or personally identifiable data. AI outputs are advisory only — employees retain full ownership of their goals. The tool requires an active internet connection. AI model costs scale with usage volume."
              />
              <POACBItem
                letter="B"
                label="Benefits"
                content="Improved goal quality and consistency across the organisation. Reduced manager coaching burden during review cycles. Faster goal-setting cycles. Greater employee confidence and autonomy. Better strategic alignment of individual goals."
              />
            </div>
          </Section>

          {/* Beneficiaries */}
          <Section
            icon={<Users className="w-6 h-6 text-bce-green" />}
            title="Beneficiaries & Benefit Types"
            color="border-bce-green"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-3 pr-4 font-semibold text-foreground">Beneficiary</th>
                    <th className="text-left py-3 pr-4 font-semibold text-foreground">Benefit Type</th>
                    <th className="text-left py-3 font-semibold text-foreground">Description</th>
                  </tr>
                </thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium text-foreground">Employees</td>
                    <td className="py-3 pr-4"><span className="bg-bce-green/15 text-bce-green px-2 py-0.5 rounded text-xs font-medium">Productivity</span></td>
                    <td className="py-3">Faster, more confident goal-writing with real-time AI guidance. Less back-and-forth with managers.</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium text-foreground">Managers</td>
                    <td className="py-3 pr-4"><span className="bg-bce-cyan/15 text-bce-cyan px-2 py-0.5 rounded text-xs font-medium">Efficiency</span></td>
                    <td className="py-3">Reduced time spent reviewing and coaching on goal quality. Goals arrive pre-validated against SMART criteria.</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium text-foreground">HR / People Team</td>
                    <td className="py-3 pr-4"><span className="bg-bce-purple/15 text-bce-purple px-2 py-0.5 rounded text-xs font-medium">Quality</span></td>
                    <td className="py-3">Consistent goal quality across the organisation. Scalable support without additional headcount.</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-3 pr-4 font-medium text-foreground">Senior Leadership</td>
                    <td className="py-3 pr-4"><span className="bg-bce-coral/15 text-bce-coral px-2 py-0.5 rounded text-xs font-medium">Strategic</span></td>
                    <td className="py-3">Better alignment of individual goals to organisational strategy. Improved performance culture.</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-medium text-foreground">Organisation</td>
                    <td className="py-3 pr-4"><span className="bg-bce-yellow/15 text-bce-yellow px-2 py-0.5 rounded text-xs font-medium">Cultural</span></td>
                    <td className="py-3">Reinforces a culture of clarity, accountability, and continuous improvement.</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </Section>

          {/* Strategic Pillar Alignment */}
          <Section
            icon={<Building2 className="w-6 h-6 text-bce-yellow" />}
            title="Strategic Pillar Alignment"
            color="border-bce-yellow"
          >
            <p className="mb-4">The SMART Goal Assistant directly supports the following strategic pillars:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <PillarCard
                icon={<TrendingUp className="w-5 h-5 text-bce-cyan" />}
                title="Performance Excellence"
                description="Drives higher quality goals that translate into measurable outcomes, lifting individual and team performance."
              />
              <PillarCard
                icon={<Users className="w-5 h-5 text-bce-green" />}
                title="People & Capability"
                description="Empowers employees with self-service tools for professional growth. Supports development goal-setting alongside performance goals."
              />
              <PillarCard
                icon={<Lightbulb className="w-5 h-5 text-bce-purple" />}
                title="Innovation & Digital Transformation"
                description="Demonstrates responsible AI adoption for internal productivity. A practical example of technology enhancing everyday work processes."
              />
              <PillarCard
                icon={<Target className="w-5 h-5 text-bce-coral" />}
                title="Operational Efficiency"
                description="Reduces time and effort in goal-setting cycles. Scales coaching capability without additional resourcing."
              />
            </div>
          </Section>

          {/* Compliance, Funding, Timeline */}
          <Section
            icon={<Shield className="w-6 h-6 text-bce-cyan" />}
            title="Compliance, Funding & Timeline"
            color="border-bce-cyan"
          >
            <div className="space-y-6">
              <div>
                <h3 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-bce-green" /> Compliance & Data Privacy
                </h3>
                <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                  <li>No personally identifiable information (PII) is stored or processed</li>
                  <li>Goal text is sent to AI models for analysis only — not retained after the session</li>
                  <li>The tool includes a clear prototype disclaimer advising against entering sensitive data</li>
                  <li>AI outputs are advisory; final goal content remains under employee control</li>
                  <li>Compliant with internal data handling and acceptable use policies</li>
                </ul>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                  <DollarSign className="w-4 h-4 text-bce-yellow" /> Funding & Cost Estimate
                </h3>
                <div className="bg-muted/50 rounded-lg p-4 space-y-2 text-sm">
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Development (internal)</span>
                    <span className="text-foreground font-medium">Minimal — built using low-code/AI tooling</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Hosting</span>
                    <span className="text-foreground font-medium">Cloud-hosted (low cost, scalable)</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">AI API costs</span>
                    <span className="text-foreground font-medium">Usage-based; estimated $X–$X/month at scale</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    <span className="text-muted-foreground">Maintenance</span>
                    <span className="text-foreground font-medium">Low — minimal ongoing support required</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground mt-2 italic">
                  * Exact costs depend on user volume and AI model selection. Detailed costings available on request.
                </p>
              </div>

              <Separator />

              <div>
                <h3 className="font-semibold text-foreground flex items-center gap-2 mb-2">
                  <Clock className="w-4 h-4 text-bce-coral" /> Timeline
                </h3>
                <div className="space-y-3">
                  <TimelineItem phase="Phase 1" title="Prototype & Validation" duration="Completed" status="done" />
                  <TimelineItem phase="Phase 2" title="Pilot with selected teams" duration="4–6 weeks" status="next" />
                  <TimelineItem phase="Phase 3" title="Feedback integration & refinement" duration="2–4 weeks" status="future" />
                  <TimelineItem phase="Phase 4" title="Organisation-wide rollout" duration="2–4 weeks" status="future" />
                </div>
              </div>
            </div>
          </Section>

          {/* Disclaimer */}
          <div className="bg-muted/50 border border-border rounded-xl p-5 text-sm text-muted-foreground space-y-2">
            <p className="font-semibold text-foreground">📋 Document Status</p>
            <p>
              This business case is a living document and will be updated as the project progresses through pilot and rollout phases.
              For questions or feedback, please contact the project sponsor.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

/* ── Sub-components ── */

const Section = ({
  icon, title, color, children,
}: {
  icon: React.ReactNode; title: string; color: string; children: React.ReactNode;
}) => (
  <div className={`bg-card rounded-2xl p-6 md:p-8 card-shadow border-l-4 ${color} space-y-4`}>
    <div className="flex items-center gap-3">
      {icon}
      <h2 className="text-xl font-serif font-bold text-foreground">{title}</h2>
    </div>
    <div className="text-muted-foreground space-y-3 leading-relaxed">{children}</div>
  </div>
);

const POACBItem = ({ letter, label, content }: { letter: string; label: string; content: string }) => (
  <div className="flex gap-4 items-start">
    <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
      <span className="text-primary font-bold text-lg">{letter}</span>
    </div>
    <div>
      <span className="font-semibold text-foreground">{label}</span>
      <p className="text-muted-foreground mt-0.5">{content}</p>
    </div>
  </div>
);

const PillarCard = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="bg-muted/30 rounded-xl p-4 space-y-2 border border-border/50">
    <div className="flex items-center gap-2">
      {icon}
      <h3 className="font-semibold text-foreground text-sm">{title}</h3>
    </div>
    <p className="text-muted-foreground text-sm">{description}</p>
  </div>
);

const TimelineItem = ({ phase, title, duration, status }: { phase: string; title: string; duration: string; status: "done" | "next" | "future" }) => {
  const colors = {
    done: "bg-bce-green/15 text-bce-green border-bce-green/30",
    next: "bg-bce-cyan/15 text-bce-cyan border-bce-cyan/30",
    future: "bg-muted text-muted-foreground border-border",
  };
  return (
    <div className={`flex items-center gap-4 rounded-lg border p-3 ${colors[status]}`}>
      <div className="flex-shrink-0">
        {status === "done" ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
      </div>
      <div className="flex-1">
        <span className="font-semibold text-sm">{phase}:</span>{" "}
        <span className="text-sm">{title}</span>
      </div>
      <span className="text-xs font-medium">{duration}</span>
    </div>
  );
};

export default BusinessCase;
