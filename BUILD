subinclude("//build_defs/npm")

filegroup(
  name = "ava_config",
  srcs = ["ava.config.js"],
)

filegroup(
  name = "index_html",
  srcs = ["index.html"],
)

filegroup(
  name = "pnpm_config",
  srcs = [
    ".npmrc",
    ".babelrc",
    "package.json",
    "pnpm-lock.yaml",
  ],
  visibility = [
    "//src/cockpit/scripts/..."
  ],
)

filegroup(
  name = "tsconfig",
  srcs = [
    "tsconfig.json",
  ],
  visibility = [
    "//src/cockpit/scripts/..."
  ],
)

filegroup(
  name = "prettier",
  srcs = [".prettierrc"],
)

filegroup(
  name = "eslint_config",
  srcs = [".eslintignore", ".eslintrc.js"],
)

filegroup(
  name = "wings_config",
  srcs = ["wings.json"],
  visibility = ["//src/wings/..."],
)

filegroup(
  name = "nycrc",
  srcs = [".nycrc.json"],
  visibility = [
    "//src/cockpit/scripts/..."
  ],
)

npm_install(
  name = "pnpm",
  srcs = [":pnpm_config"],
)

npm_run_build(
  name = "cockpit",
  cmd = "build",
  srcs = [
    ":pnpm",
    ":pnpm_config",
    ":prettier",
    ":tsconfig",
    ":index_html",
  ],
  outs = ["dist"],
  deps = [
    "//src/assets:assets",
    "//src/cockpit:core_files",
  ],
)

npm_run(
  name = "serve",
  cmd = "serve",
  deps = [
    ":pnpm",
    ":prettier",
    ":index_html",
    ":eslint_config",
    "//src/assets:assets",
    "//src/cockpit:core_files",
    "//src/cockpit/scripts:check_backend",
  ],
)

ava_dir(
  name = "ava_test_deps",
  srcs = [
    ":ava_config",
    ":pnpm_config",
    ":nycrc",
    ":tsconfig",
    "//src/cockpit:core_files",
    "//src/cockpit/tests:ava_setup",
    "//src/cockpit/components:components",
    "//src/cockpit/shared:shared",
    "//src/cockpit/views:views",
    "//src/cockpit/wings:wings",
  ],
  visibility = [
    "//src/cockpit/tests/..."
  ],
)

npm_test(
  name = "cockpit_cypress",
  srcs = ["cypress.json"],
  cmd = "test:cypress",
  result_dir = "cypress/junit",
  requires_server = 1234,
  set_home = True,
  deps = [
    ":pnpm",
    ":index_html",
    ":eslint_config",
    "//src/assets:assets",
    "//src/cockpit:core_files",
    "//src/cockpit/tests/cypress",
    "//src/cockpit/tests:cypress_eslint",
    "//src/cockpit/scripts:check_backend",
  ],
)

gentest(
  name = "_all#lint",
  test_cmd = "echo 'Lint everything~'",
  no_test_output = True,
  deps = [
    ":_eslint#test",
    ":_gofmt#lint",
  ]
)

npm_test(
  name = "eslint",
  cmd = "format",
  visibility = [
    "//src/cockpit/..."
  ],
  srcs = [
    ":pnpm",
    ":pnpm_config",
    ":prettier",
    ":tsconfig",
    ":index_html",
    "//src/assets:assets",
    "//src/cockpit:core_files",
  ],
  needs_transitive_deps = True,
)

npm_test(
  name = "tsc",
  cmd = "check:tsc",
  srcs = [
    ":pnpm",
    ":pnpm_config",
    ":prettier",
    ":tsconfig",
    ":index_html",
    "//src/assets:assets",
    "//src/cockpit:core_files",
  ],
  needs_transitive_deps = True,
)

gentest(
  name = "_gofmt#lint",
  test_cmd = " && ".join([
    "current=$(pwd)",
    "cd $(pwd | awk -F'plz-out' '{print $1}') || exit 1",
    "gofmt -s -w $(ls src/turbine/**/*.go | grep -v /wings/)",
  ]),
  deps =  [
    "//src/turbine:main",
  ],
  needs_transitive_deps = True,
  no_test_output = True,
)
