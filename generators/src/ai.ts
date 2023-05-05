export type GeneratorFn<T> = (args: {
  tokens: string[];
  executeShellCommand: Fig.ExecuteShellCommandFunction;
  generatorContext: Fig.GeneratorContext;
}) => Promise<T> | T;

const MAX_TOKENS = 4097;
const TOKEN_TO_CHAR_RATIO = 4;
const MARGIN_RATIO = 0.8;
const MAX_CHARS = MAX_TOKENS * TOKEN_TO_CHAR_RATIO * MARGIN_RATIO;

/**
 * A generator that uses the Fig AI API to generate suggestions.
 *
 * @param prompt The prompt to use for the AI. Can be a string or a generator function.
 * @param message The message to send to the AI. Can be a string or a generator function.
 * @param postProcess A function to post-process the AI's response.
 * @param temperature The temperature to use for the AI.
 * @returns A Fig generator.
 */
export function ai({
  name,
  prompt,
  message,
  postProcess,
  temperature,
}: {
  name: string;
  prompt?: string | GeneratorFn<string>;
  message: string | GeneratorFn<string>;
  postProcess?: (out: string) => Fig.Suggestion[];
  temperature?: number;
}): Fig.Generator {
  return {
    scriptTimeout: 15000,
    custom: async (tokens, executeShellCommand, generatorContext) => {
      const enabled = await executeShellCommand(
        "fig settings --format json autocomplete.ai.enabled"
      );

      if (!JSON.parse(enabled)) {
        return [];
      }

      if (message.length === 0) {
        console.warn("No message provided to AI generator");
        return [];
      }

      const promptString =
        typeof prompt === "function"
          ? await prompt({
              tokens,
              executeShellCommand,
              generatorContext,
            })
          : prompt;

      const messageString =
        typeof message === "function"
          ? await message({
              tokens,
              executeShellCommand,
              generatorContext,
            })
          : message;

      const len = (promptString?.length ?? 0) + messageString.length;

      const body = {
        model: "gpt-3.5-turbo",
        source: "autocomplete",
        name,
        messages: [
          ...(promptString
            ? [
                {
                  role: "system",
                  content: promptString,
                },
              ]
            : []),
          {
            role: "user",
            content: messageString.slice(0, MAX_CHARS - len),
          },
        ],
        temperature,
      };

      const bodyJson = JSON.stringify(body);
      const escapedBodyJson = bodyJson.replace(/'/g, "'\"'\"'");

      const res = await executeShellCommand(
        `fig _ request --route /ai/chat --method POST --body '${escapedBodyJson}'`
      );

      const json = JSON.parse(res);

      const a =
        json?.choices
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          .map((c: any) => c?.message?.content)
          .filter((c: unknown) => typeof c === "string")
          .map((c: string) => c.trim().replace(/\n/g, " "))
          .map((c: string) =>
            postProcess
              ? postProcess(c)
              : ({
                  icon: "🪄",
                  name: c,
                  insertValue: `'${c}'`,
                  description: "Generated by Fig AI",
                } as Fig.Suggestion)
          ) ?? [];

      return a;
    },
  };
}
