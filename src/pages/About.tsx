import { ArrowLeft, Target, Lightbulb, Brain, Users, CheckCircle2, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";

const About = () => {
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
        <div className="max-w-3xl mx-auto space-y-10">
          <button
            onClick={() => navigate("/")}
            className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to app
          </button>

          {/* Hero */}
          <div className="text-center space-y-3 animate-fade-up">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary">
              About SMART Goal Assistant
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Helping you create better goals and set yourself up for success.
            </p>
          </div>

          {/* Why */}
          <Section
            icon={<Lightbulb className="w-6 h-6 text-bce-yellow" />}
            title="Why does this exist?"
            color="border-bce-yellow"
          >
            <p>
              Setting effective goals is one of the most impactful things you can do for your career — but it's also one of the hardest. 
              Vague or unrealistic goals lead to frustration, while well-crafted SMART goals drive focus, motivation, and measurable progress.
            </p>
            <p>
              This tool was built to bridge the gap between <em>wanting</em> to set great goals and <em>knowing how</em>. 
              It provides instant, AI-powered feedback so you can refine your goals before committing to them.
            </p>
          </Section>

          {/* What */}
          <Section
            icon={<Target className="w-6 h-6 text-bce-cyan" />}
            title="What does it do?"
            color="border-bce-cyan"
          >
            <p>The SMART Goal Assistant has two core tools:</p>
            <ul className="list-none space-y-3 mt-3">
              <FeatureItem
                icon={<CheckCircle2 className="w-5 h-5 text-bce-green" />}
                title="Goal Assistant"
                description="Paste in a goal you've already written and get an instant SMART analysis. The AI evaluates each criterion — Specific, Measurable, Achievable, Relevant, and Time-bound — and gives you actionable suggestions to improve it."
              />
              <FeatureItem
                icon={<Sparkles className="w-5 h-5 text-bce-purple" />}
                title="Goal Ideas"
                description="Not sure where to start? Choose between Performance goals (role-specific success and alignment) or Development goals (building skills, leadership, and capability), and the AI will generate tailored suggestions you can use as a starting point."
              />
            </ul>
          </Section>

          {/* How */}
          <Section
            icon={<Brain className="w-6 h-6 text-bce-purple" />}
            title="How does it work?"
            color="border-bce-purple"
          >
            <ol className="list-decimal list-inside space-y-2">
              <li><strong>Enter or generate a goal</strong> — type your own or use AI-generated ideas as inspiration.</li>
              <li><strong>AI analysis</strong> — the assistant evaluates your goal against each SMART criterion using a large language model.</li>
              <li><strong>Review feedback</strong> — see a colour-coded breakdown with a score and specific improvement suggestions for each criterion.</li>
              <li><strong>Iterate and refine</strong> — edit your goal based on the feedback, re-analyze, and repeat until you're confident.</li>
              <li><strong>Submit</strong> — once satisfied, submit your polished goal.</li>
            </ol>
          </Section>

          {/* Who */}
          <Section
            icon={<Users className="w-6 h-6 text-bce-coral" />}
            title="Who is it for?"
            color="border-bce-coral"
          >
            <p>
              This tool is designed for <strong>anyone</strong> who sets goals as part of their work — whether during annual reviews, quarterly planning, or personal development. 
              It's especially useful for:
            </p>
            <ul className="list-disc list-inside space-y-1 mt-2 text-muted-foreground">
              <li>Employees writing performance or development goals</li>
              <li>Managers coaching team members on goal-setting</li>
              <li>HR and People teams looking for scalable goal-setting support</li>
              <li>Anyone who wants to move beyond vague intentions to clear, actionable plans</li>
            </ul>
          </Section>

          {/* Disclaimer */}
          <div className="bg-muted/50 border border-border rounded-xl p-5 text-sm text-muted-foreground space-y-2">
            <p className="font-semibold text-foreground">⚠️ Prototype Notice</p>
            <p>
              This is a prototype tool. Please do not enter sensitive data or company-private information. 
              AI-generated suggestions are meant as guidance — always apply your own judgement before finalising goals.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

const Section = ({
  icon,
  title,
  color,
  children,
}: {
  icon: React.ReactNode;
  title: string;
  color: string;
  children: React.ReactNode;
}) => (
  <div className={`bg-card rounded-2xl p-6 md:p-8 card-shadow border-l-4 ${color} space-y-4`}>
    <div className="flex items-center gap-3">
      {icon}
      <h2 className="text-xl font-serif font-bold text-foreground">{title}</h2>
    </div>
    <div className="text-muted-foreground space-y-3 leading-relaxed">{children}</div>
  </div>
);

const FeatureItem = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => (
  <li className="flex gap-3">
    <span className="mt-0.5 flex-shrink-0">{icon}</span>
    <div>
      <span className="font-semibold text-foreground">{title}</span>
      <span className="text-muted-foreground"> — {description}</span>
    </div>
  </li>
);

export default About;
