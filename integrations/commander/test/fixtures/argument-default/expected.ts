// Autogenerated by @fig/complete-commander

const completionSpec: Fig.Spec = {
  name: "command",
  subcommands: [
    {
      name: "help",
      description: "display help for command",
      priority: 49,
      args: { name: "command", isOptional: true, template: "help" },
    },
  ],
  options: [
    {
      name: ["-h", "--help"],
      description: "display help for command",
      priority: 49,
    },
  ],
  args: [
    {
      name: "timeout",
      description: "timeout in seconds",
      isOptional: true,
      default: "60",
    },
  ],
};

export default completionSpec;

