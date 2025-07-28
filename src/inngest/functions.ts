import { openai, createAgent } from "@inngest/agent-kit";
import { inngest } from "./client";

export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
    const codeAgent = createAgent({
      name: "code-agent",
      system:
        "You are an expert nextjs developer.  You write readable, maintainable code. you write simple Nextjs & React code snippets.",
      model: openai({ model: "gpt-4o-mini" }),
    });

    const { output } = await codeAgent.run(`Write the following Snippet: ${event.data.value}`);
    return { summary: output };
  }
);
