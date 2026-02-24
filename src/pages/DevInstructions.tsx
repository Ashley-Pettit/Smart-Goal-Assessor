const DevInstructions = () => {
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
          <div className="text-center space-y-3">
            <h1 className="text-3xl md:text-4xl font-serif font-bold text-primary">
              Developer Instructions
            </h1>
            <p className="text-muted-foreground text-lg max-w-xl mx-auto">
              Rebuild guide for the SMART Goal Assistant using BCE's standard tech stack.
            </p>
          </div>

          {/* Overview */}
          <Section title="Overview">
            <p>
              This document provides instructions for rebuilding the SMART Goal Assistant
              application using BCE's enterprise technology stack. The application should call
              <strong> BCE's Copilot AI</strong> for all AI-powered prompt analysis and goal generation.
            </p>
          </Section>

          {/* Architecture */}
          <Section title="Target Architecture">
            <Architecture />
          </Section>

          {/* Backend */}
          <Section title="Backend — .NET / .NET Core (C#)">
            <ul className="list-disc pl-6 space-y-2">
              <li>Create an <strong>ASP.NET Core Web API</strong> project targeting .NET 8+.</li>
              <li>
                Implement two API endpoints to replace the current Supabase Edge Functions:
                <ul className="list-disc pl-6 mt-1 space-y-1">
                  <li><code className="bg-muted px-1.5 py-0.5 rounded text-sm">POST /api/goals/analyze</code> — Accepts a goal string, calls BCE Copilot AI, returns SMART analysis.</li>
                  <li><code className="bg-muted px-1.5 py-0.5 rounded text-sm">POST /api/goals/generate</code> — Accepts a role/category, calls BCE Copilot AI, returns goal ideas.</li>
                </ul>
              </li>
              <li>Use <strong>HttpClient</strong> / <strong>IHttpClientFactory</strong> to call BCE's Copilot AI API.</li>
              <li>Store the Copilot AI endpoint URL and API key in <strong>Azure Key Vault</strong> — never hard-code secrets.</li>
              <li>Use dependency injection, structured logging (Serilog or Microsoft.Extensions.Logging), and the Options pattern for configuration.</li>
              <li>Add health check endpoints (<code className="bg-muted px-1.5 py-0.5 rounded text-sm">/health</code>).</li>
            </ul>
          </Section>

          {/* Frontend */}
          <Section title="Frontend — React + TypeScript">
            <ul className="list-disc pl-6 space-y-2">
              <li>
                The current React/TypeScript frontend can be reused largely as-is. Key changes:
              </li>
              <li>Replace Supabase client calls with standard <strong>fetch</strong> or <strong>axios</strong> calls to the .NET API.</li>
              <li>If deploying within SharePoint, wrap the app as an <strong>SPFx Web Part</strong> using the SharePoint Framework toolchain.</li>
              <li>If standalone, deploy as a static React app to <strong>Azure Storage</strong> with an <strong>Azure CDN</strong> front.</li>
              <li>Use <strong>MSAL.js</strong> (@azure/msal-browser) for authentication against Azure AD / Entra ID.</li>
            </ul>
          </Section>

          {/* Database */}
          <Section title="Database — Azure SQL">
            <ul className="list-disc pl-6 space-y-2">
              <li>Create an <strong>Azure SQL Database</strong> for persisting submitted goals, user history, and analytics.</li>
              <li>
                Suggested tables:
                <ul className="list-disc pl-6 mt-1 space-y-1">
                  <li><code className="bg-muted px-1.5 py-0.5 rounded text-sm">Goals</code> — Id, UserId, GoalText, SmartScore, CreatedAt, Status</li>
                  <li><code className="bg-muted px-1.5 py-0.5 rounded text-sm">GoalAnalysis</code> — Id, GoalId, Criterion, Score, Feedback, Suggestion</li>
                </ul>
              </li>
              <li>Use <strong>Entity Framework Core</strong> with code-first migrations.</li>
              <li>Connection string stored in <strong>Azure Key Vault</strong>, referenced via App Service configuration.</li>
            </ul>
          </Section>

          {/* Identity & Auth */}
          <Section title="Identity & Auth — Azure AD (Entra ID)">
            <ul className="list-disc pl-6 space-y-2">
              <li>Register the app in <strong>Azure AD (Entra ID)</strong> with separate registrations for the API and the SPA.</li>
              <li>Backend: Use <strong>Microsoft.Identity.Web</strong> to validate JWT bearer tokens.</li>
              <li>Frontend: Use <strong>MSAL.js</strong> for login, token acquisition, and silent refresh.</li>
              <li>Scope the API with a custom scope (e.g., <code className="bg-muted px-1.5 py-0.5 rounded text-sm">api://smart-goal-assistant/Goals.ReadWrite</code>).</li>
              <li>Enforce <strong>RBAC</strong> if different user roles are needed (e.g., admin vs. standard user).</li>
            </ul>
          </Section>

          {/* AI Integration */}
          <Section title="AI Integration — BCE Copilot AI">
            <ul className="list-disc pl-6 space-y-2">
              <li>All AI prompts must be routed through <strong>BCE's Copilot AI</strong> endpoint.</li>
              <li>
                The .NET API should construct prompts that mirror the current edge function logic:
                <ul className="list-disc pl-6 mt-1 space-y-1">
                  <li><strong>Analyze:</strong> Send the user's goal text with a system prompt requesting SMART criteria scoring (1–10) plus feedback and suggestions per criterion.</li>
                  <li><strong>Generate:</strong> Send the user's role/category with a system prompt requesting 3–5 goal ideas with titles and descriptions.</li>
                </ul>
              </li>
              <li>Store the Copilot AI base URL and API key in <strong>Azure Key Vault</strong>.</li>
              <li>Implement retry logic with exponential backoff (Polly library recommended).</li>
              <li>Log all AI requests/responses for auditing (redact sensitive data).</li>
            </ul>
          </Section>

          {/* Hosting */}
          <Section title="Hosting — Microsoft Azure">
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>API:</strong> Deploy to an <strong>Azure App Service</strong> (Linux, .NET 8 runtime).</li>
              <li><strong>Frontend:</strong> Deploy to <strong>Azure Storage static website</strong> + <strong>Azure CDN</strong>, or as an SPFx package to SharePoint App Catalog.</li>
              <li>Use deployment slots (staging → production swap) for zero-downtime releases.</li>
              <li>Enable <strong>Application Insights</strong> for monitoring and telemetry.</li>
            </ul>
          </Section>

          {/* DevOps */}
          <Section title="DevOps — Azure DevOps">
            <ul className="list-disc pl-6 space-y-2">
              <li>Host source code in <strong>Azure DevOps Repos</strong> (Git).</li>
              <li>
                Create <strong>YAML pipelines</strong> for CI/CD:
                <ul className="list-disc pl-6 mt-1 space-y-1">
                  <li><strong>CI:</strong> Build, run unit tests, run linting, publish artifacts.</li>
                  <li><strong>CD:</strong> Deploy to staging slot, run smoke tests, swap to production.</li>
                </ul>
              </li>
              <li>Use separate pipelines for the API and the frontend.</li>
              <li>Gate production deployments with approval workflows.</li>
            </ul>
          </Section>

          {/* Security */}
          <Section title="Security">
            <ul className="list-disc pl-6 space-y-2">
              <li>All secrets in <strong>Azure Key Vault</strong> — never in code, config files, or environment variables directly.</li>
              <li>Enable <strong>Microsoft Defender for App Service</strong> and <strong>Defender for SQL</strong>.</li>
              <li>Enforce HTTPS everywhere; use managed certificates.</li>
              <li>Enable <strong>WAF</strong> (Web Application Firewall) on the CDN/Application Gateway.</li>
              <li>Follow OWASP Top 10 guidelines; validate and sanitize all inputs.</li>
              <li>Implement rate limiting on AI endpoints to prevent abuse.</li>
            </ul>
          </Section>

          {/* Migration Steps */}
          <Section title="Migration Checklist">
            <ol className="list-decimal pl-6 space-y-2">
              <li>Set up Azure resource group and provision Azure SQL, App Service, Key Vault, and Storage Account.</li>
              <li>Register app in Azure AD (Entra ID) — API and SPA registrations.</li>
              <li>Create .NET Core Web API project with the two endpoints.</li>
              <li>Integrate BCE Copilot AI with Key Vault–sourced credentials.</li>
              <li>Set up Entity Framework Core models and run initial migration.</li>
              <li>Update React frontend to call .NET API instead of Supabase functions.</li>
              <li>Add MSAL.js authentication to the frontend.</li>
              <li>Create Azure DevOps repo and YAML CI/CD pipelines.</li>
              <li>Deploy to staging, test end-to-end, swap to production.</li>
              <li>Enable Application Insights, Defender, and WAF.</li>
            </ol>
          </Section>
        </div>
      </main>
    </div>
  );
};

/* Reusable section wrapper */
const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-card rounded-2xl p-6 md:p-8 shadow-sm border border-border space-y-4">
    <h2 className="text-xl font-semibold text-foreground">{title}</h2>
    <div className="text-muted-foreground leading-relaxed">{children}</div>
  </div>
);

/* Architecture diagram as a simple visual */
const Architecture = () => (
  <div className="grid md:grid-cols-3 gap-4 text-sm">
    {[
      { label: "Frontend", items: ["React + TypeScript", "SPFx (optional)", "MSAL.js Auth", "Azure CDN / Storage"] },
      { label: "Backend API", items: [".NET 8 Web API", "BCE Copilot AI integration", "Entity Framework Core", "Azure App Service"] },
      { label: "Data & Infra", items: ["Azure SQL Database", "Azure Key Vault", "Azure DevOps CI/CD", "Application Insights"] },
    ].map((col) => (
      <div key={col.label} className="bg-muted/50 rounded-xl p-4 space-y-2">
        <h3 className="font-semibold text-foreground">{col.label}</h3>
        <ul className="space-y-1">
          {col.items.map((item) => (
            <li key={item} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default DevInstructions;
