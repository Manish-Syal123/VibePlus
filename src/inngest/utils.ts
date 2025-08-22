import { Sandbox } from "@e2b/code-interpreter";
import { AgentResult, Message, TextMessage } from "@inngest/agent-kit";
import { SANDBOX_TIMEOUT } from "./types";
import { auth } from "@clerk/nextjs/server";

export async function getSandbox(sandboxId: string) {
  // const { has } = await auth();
  // const hasProAccess = has({ plan: "pro" });
  const sandbox = await Sandbox.connect(sandboxId);
  // if (hasProAccess) {
  //   await sandbox.setTimeout(SANDBOX_TIMEOUT);
  // }
    await sandbox.setTimeout(SANDBOX_TIMEOUT);
  return sandbox;
}

export function lastAssistantTextMessageContent(result: AgentResult) {
  const lastAssistantTextMessageIndex = result.output.findLastIndex(
    (message) => message.role === "assistant"
  );

  const message = result.output[lastAssistantTextMessageIndex] as
    | TextMessage
    | undefined;

  return message?.content
    ? typeof message.content === "string"
      ? message.content
      : message.content.map((c) => c.text).join("")
    : undefined;
}

export const parseAgentOutput = (value: Message[], defaultValue: string) => {
  const output = value[0];
  if (output.type !== "text") return defaultValue;

  if (Array.isArray(output.content)) {
    return output.content.map((txt) => txt).join("");
  } else {
    return output.content;
  }
};
