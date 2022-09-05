// Autogenerated by @fig/complete-commander

const completionSpec: Fig.Spec = {
  name: "command",
  description: "Fake package manager",
  subcommands: [
    {
      name: ["install", "i"],
      description: "install one or more packages",
      options: [
        {
          name: ["-h", "--help"],
          description: "display help for command",
          priority: 49,
        },
      ],
      args: [{ name: "name", isOptional: true }],
    },
    {
      name: ["search", "s"],
      description: "search with optional query",
      options: [
        {
          name: ["-h", "--help"],
          description: "display help for command",
          priority: 49,
        },
      ],
      args: [{ name: "query", isOptional: true }],
    },
    {
      name: "help",
      description: "display help for command",
      priority: 49,
      args: { name: "command", isOptional: true, template: "help" },
    },
  ],
  options: [
    { name: ["-V", "--version"], description: "output the version number" },
    {
      name: ["-h", "--help"],
      description: "display help for command",
      priority: 49,
    },
  ],
};

export default completionSpec;

