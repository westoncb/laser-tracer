const modules = import.meta.glob("./examples/*.js", { as: "raw", eager: true });

const examples = Object.entries(modules).map(([path, code]) => {
  const label = path
    .split("/")
    .pop()
    .replace(".js", "")
    .replace(/([A-Z])/g, " $1") // split camelCase
    .replace(/^./, (s) => s.toUpperCase()); // capitalize first letter

  return { label, code };
});

export default examples;
