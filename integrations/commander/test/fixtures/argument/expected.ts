// Autogenerated by @fig/complete-commander

const completionSpec: Fig.Spec = {
  name: "command",
  description: "example program for argument",
  subcommands: [
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
  args: [
    { name: "username", description: "user to login" },
    {
      name: "password",
      description: "password for user, if required",
      isOptional: true,
      default: "no password given",
    },
  ],
};

export default completionSpec;

