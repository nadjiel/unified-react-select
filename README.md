# Unified React Select

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A **wrapper** around [`react-select`](https://github.com/JedWatson/react-select) that **exposes features** from all the `Select`, `CreatableSelect`, `AsyncSelect` and `AsyncCreatableSelect` components in one **unified** `Select`, all the while implementing additional **quality of life features** often requested by users.

I made this component because I myself needed these tid-bits of features, but couldn't find in the original package. With that in mind, I made some improvement requests in the original package, but while those aren't implemented, I made this quick **open code component** to help me, and also anyone in need.

This implementation involves the creation of new async logic based off of the plain `CreatableSelect` component, in order to avoid some unwanted behaviors from the original `AsyncSelect` or `AsyncCreatableSelect`.

> **Note:** This is an **open-code utility** designed to be **copied** directly into your project, the code to look for is in the `src/select` directory. It provides fixes for behaviors currently missing in the official `react-select` package. **If there's demand** for making this project its own **package**, maybe I can do that in the future. Or hopefully these features will be implemented in the main library. 😀

## ✔️ Problem Solved

Standard `react-select` requires sometimes **inconvenient workarounds** for specific behaviors. This component **bridges those gaps** by using a custom-built async implementation on top of `CreatableSelect`, instead of the default `AsyncSelect` or `AsyncCreatableSelect`.

## ✨ Improvements

### Fixed empty list on first load
In the standard `AsyncSelect`, the options list often resets temporarily during the initial search. This implementation ensures fix that behavior.
* **Context:** [GitHub Discussion #6089](https://github.com/JedWatson/react-select/discussions/6089)

### Smart autoloading
An `autoload` prop was added, giving granular control over when data is fetched:
- `"onRender"`: Fetches data as soon as the component mounts.
- `"onOpen"`: Lazy-loads data only when the user first opens the Select.
- `true`: Works just like `"onRender"`.
- `false`: Does autoload at all.
- **Context:** [GitHub Discussion #5928](https://github.com/JedWatson/react-select/discussions/5928)

### Async default options loading
Easily set initial values when you only have an ID or a partial object from your state or database. The component can resolve these into full option objects asynchronously with a `loadDefaultOptions` callback prop.
* **Context:** [GitHub Discussion #5755](https://github.com/JedWatson/react-select/discussions/5755)

### Automatic cache invalidation on creation
When new options are created, by default the cache of the select is automatically invalidated (this behavior can be overriden by manually setting the `cacheOptions` prop).

## 🛠️ How to Use

1. **Copy the code** from `src/select` directory into your project.
2. **Ensure dependencies** are installed: `npm install react-select`.
3. **Import and enjoy** the unified wrapper.

For a practical example of how this component can be used in a form with `react-hook-form` and `zod`, check the `src/examples/form` directory.

## ⚙️ Why not a NPM package?

I created this because I needed these specific behaviors for my own projects. While the changes I proposed to the original repository aren't accepted, this open-code version allows a quick workaround.

With this in mind, I didn't want the overhead of creating a brand new library to just solve these small specific issues. If that's something wanted, I can look into doing that, though, for those who prefer not having to go through the copy pasing process.

## 🤝 Contributing & Feedback

Though this project is probably going to get obsolete with time, as these features are implemetented in the original one, while that happens, if you find a bug or have an idea for another QoL improvement that `react-select` is missing, feel free to open an issue or a PR!

Created with ❤️ by nadjiel
