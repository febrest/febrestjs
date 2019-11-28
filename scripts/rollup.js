const rollup = require("rollup");
const babel = require("rollup-plugin-babel");
const commonjs = require("rollup-plugin-commonjs");
const { uglify } = require("rollup-plugin-uglify");
const prettier = require("rollup-plugin-prettier");
const path = require("path");
const fs = require("fs");
const typescript = require("rollup-plugin-typescript2");

const alias = require("rollup-plugin-alias");

const getBanner = require("./banner");

function getFileName(name, bundleType) {
  switch (bundleType) {
    case "dev":
      return `${name.toLowerCase()}.js`;
    case "prod":
      return `${name.toLowerCase()}.min.js`;
  }
}

function getPlugins(bundleType) {
  const root = path.resolve("./src");
  return [
    alias({
      resolve: [".ts"],
      entries: fs.readdirSync(root).map(name => {
        const stat = fs.statSync(path.resolve(root, name));
        if (stat.isDirectory()) {
          return {
            find: name,
            replacement: path.resolve(root, name)
          };
        }
        return { find: "index", replacement: path.resolve(root, name) };
      })
    }),
    commonjs(),
    typescript(),
    bundleType === "prod"
      ? uglify()
      : prettier({
          tabWidth: 2,
          singleQuote: false,
          babel: "babel"
        })
  ];
}
function getOutputOptions(output, name, bundleType, exts) {
  var format = "umd";
  var file = output;
  return {
    file,
    format,
    name,
    ...exts
  };
}

function intro(version) {
  return "var VERSION = '" + version + "'";
}

async function build(entry, output, name, version, bundleType) {
  var result = await rollup.rollup({
    input: entry,
    plugins: getPlugins(bundleType)
  });
  var filename = getFileName(name, bundleType);
  output = path.resolve(output, filename);
  var banner = "";
  if (bundleType === "dev") {
    banner = getBanner(version, filename);
  }
  if (fs.existsSync(output)) {
    fs.unlinkSync(output);
  }
  await result.write(
    getOutputOptions(output, name, bundleType, {
      banner,
      intro: intro(version)
    })
  );
}
module.exports = build;
