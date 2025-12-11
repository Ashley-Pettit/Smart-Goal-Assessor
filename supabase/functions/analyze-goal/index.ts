import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { goal } = await req.json();
    
    if (!goal || typeof goal !== "string" || goal.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: "Please provide a goal to analyze" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY is not configured");
      throw new Error("AI service not configured");
    }

    console.log("Analyzing goal:", goal.substring(0, 100));

    const systemPrompt = `You are an expert SMART goals evaluator for students. Analyze the provided goal against SMART criteria and return a JSON response.

SMART Criteria:
- Specific: Is the goal clear and well-defined? Does it answer what, why, and how?
- Measurable: Can progress be tracked? Are there quantifiable metrics or milestones?
- Achievable: Is the goal realistic given typical student resources and constraints?
- Relevant: Does the goal align with broader academic or personal development objectives?
- Time-bound: Is there a clear deadline or timeframe?

For each criterion, provide:
1. "passed": boolean (true if the criterion is sufficiently met)
2. "feedback": string (1-2 sentences of specific, constructive feedback)
3. "suggestion": string (if not passed, a concrete suggestion to improve; if passed, leave empty)

Be encouraging but honest. Students should feel motivated to improve their goals.

Return ONLY valid JSON in this exact format:
{
  "specific": { "passed": boolean, "feedback": "string", "suggestion": "string" },
  "measurable": { "passed": boolean, "feedback": "string", "suggestion": "string" },
  "achievable": { "passed": boolean, "feedback": "string", "suggestion": "string" },
  "relevant": { "passed": boolean, "feedback": "string", "suggestion": "string" },
  "timeBound": { "passed": boolean, "feedback": "string", "suggestion": "string" },
  "overallFeedback": "string (2-3 sentences of overall assessment)",
  "improvedGoal": "string (if any criteria failed, suggest an improved version; otherwise empty)"
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: `Please analyze this goal: "${goal}"` }
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Too many requests. Please try again in a moment." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI service quota exceeded. Please try again later." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      throw new Error("Failed to analyze goal");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      console.error("No content in AI response:", data);
      throw new Error("Invalid AI response");
    }

    // Parse JSON from response (handle markdown code blocks)
    let analysis;
    try {
      const jsonMatch = content.match(/```json\s*([\s\S]*?)\s*```/) || 
                        content.match(/```\s*([\s\S]*?)\s*```/);
      const jsonStr = jsonMatch ? jsonMatch[1] : content;
      analysis = JSON.parse(jsonStr.trim());
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
      throw new Error("Failed to parse analysis");
    }

    console.log("Analysis complete, all criteria passed:", 
      analysis.specific?.passed && 
      analysis.measurable?.passed && 
      analysis.achievable?.passed && 
      analysis.relevant?.passed && 
      analysis.timeBound?.passed
    );

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error in analyze-goal:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
