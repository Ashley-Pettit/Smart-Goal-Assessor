import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface PerformanceContext {
  roleDescription?: string;
  schoolPlans?: string;
  functionalAreaPlan?: string;
  aipContext?: string;
  competencies?: string;
  priorities?: string;
  timeframes?: string;
  specificOutcomes?: string;
  leaderGoalCount?: number;
  leaderPriorities?: string;
}

interface DevelopmentContext {
  skillFocus?: string;
  purposeType?: "current" | "aspirational";
  aspirationalRole?: string;
  priorFeedback?: string;
  developmentNotes?: string;
  currentSkillLevel?: "beginner" | "intermediate" | "advanced";
  managerNotes?: string;
  thingsToWorkOn?: string;
  timeframes?: string;
  specificOutcomes?: string;
}

interface Document {
  name: string;
  content: string;
}

interface RequestBody {
  goalType: "performance" | "development";
  performanceContext?: PerformanceContext;
  developmentContext?: DevelopmentContext;
  documents?: Document[];
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const body: RequestBody = await req.json();
    const { goalType, performanceContext, developmentContext, documents } = body;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    // Build context string from documents
    let documentContext = "";
    if (documents && documents.length > 0) {
      documentContext = "\n\nUploaded Documents:\n" + documents
        .map((d) => `--- ${d.name} ---\n${d.content.slice(0, 5000)}`)
        .join("\n\n");
    }

    let systemPrompt = "";
    let userPrompt = "";

    if (goalType === "performance") {
      const ctx = performanceContext || {};
      const goalCount = ctx.leaderGoalCount || 3;

      systemPrompt = `You are an expert in performance goal setting for educators and school staff. 
You help create SMART goals that align with school priorities, role expectations, and organisational plans.
Your goals should be specific, measurable, achievable, relevant, and time-bound.
You understand the education context in Australia, including AIPs (Annual Implementation Plans), school strategic plans, and functional area responsibilities.`;

      userPrompt = `Generate ${goalCount + 2} performance goal ideas based on the following context:

Role: ${ctx.roleDescription || "Not specified"}
School/Org Plans: ${ctx.schoolPlans || "Not specified"}
Functional Area Plan: ${ctx.functionalAreaPlan || "Not specified"}
AIP Context: ${ctx.aipContext || "Not specified"}
Competencies: ${ctx.competencies || "Not specified"}
Leader Priorities: ${ctx.leaderPriorities || "Not specified"}
Personal Priorities: ${ctx.priorities || "Not specified"}
Timeframes: ${ctx.timeframes || "Not specified"}
Specific Outcomes: ${ctx.specificOutcomes || "Not specified"}
${documentContext}

Generate ${goalCount} goals that are well-aligned with the leader's direction and school priorities.
Also generate 2 additional goals that might be worth considering but may not directly align with stated priorities - these could be innovative, growth-oriented, or address gaps.

Return a JSON array with objects containing:
- "id": unique string id
- "goal": the goal statement
- "rationale": brief explanation of why this goal is suggested
- "alignedWithDirection": boolean (true for aligned goals, false for exploratory ones)
- "type": "performance"

Only return valid JSON, no markdown formatting.`;
    } else {
      const ctx = developmentContext || {};

      systemPrompt = `You are an expert in professional development and capability building for educators.
You help create development goals using the 70:20:10 model:
- 70% on-the-job experiences (projects, stretch assignments, shadowing, action learning)
- 20% learning from others (mentoring, coaching, feedback, observation)
- 10% formal learning (courses, reading, certifications)

You understand leadership capability frameworks and help people build skills for current roles and future aspirations.
Your goals should be practical, developmental, and include specific learning strategies.`;

      userPrompt = `Generate 5 development goal ideas based on the following context:

Purpose: ${ctx.purposeType === "aspirational" ? `Preparing for future role: ${ctx.aspirationalRole || "Not specified"}` : "Supporting current role"}
Skill Focus: ${ctx.skillFocus || "Not specified"}
Current Skill Level: ${ctx.currentSkillLevel || "Not specified"}
Prior Feedback: ${ctx.priorFeedback || "Not specified"}
Development Notes: ${ctx.developmentNotes || "Not specified"}
Manager Notes: ${ctx.managerNotes || "Not specified"}
Things to Work On: ${ctx.thingsToWorkOn || "Not specified"}
Timeframes: ${ctx.timeframes || "Not specified"}
Specific Outcomes: ${ctx.specificOutcomes || "Not specified"}
${documentContext}

Generate 3 goals that directly address the stated development needs.
Also generate 2 additional goals that might be worth considering - these could address related skills, build confidence, or prepare for leadership.

For each goal, incorporate the 70:20:10 model by suggesting specific learning activities:
- On-the-job experiences (shadowing, projects, stretch assignments)
- Learning from others (mentoring, coaching, peer feedback)
- Formal learning (courses, reading) where appropriate

Return a JSON array with objects containing:
- "id": unique string id
- "goal": the goal statement (include specific development activities)
- "rationale": brief explanation including recommended 70:20:10 activities
- "alignedWithDirection": boolean (true for directly relevant, false for exploratory)
- "type": "development"

Only return valid JSON, no markdown formatting.`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Usage limit reached. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      const errorText = await response.text();
      console.error("AI API error:", response.status, errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error("No content in AI response");
    }

    // Parse the JSON response
    let goals;
    try {
      // Remove markdown code blocks if present
      const cleanContent = content.replace(/```json\n?|\n?```/g, "").trim();
      goals = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse goal suggestions");
    }

    return new Response(
      JSON.stringify({ goals }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Generate goals error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
