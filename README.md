# Unified React Select

A wrapper around `react-select` that exposes features from all the `Select`, `CreatableSelect` and `AsyncSelect` and `AsyncCreatableSelect` in one unified component, all the while implementing additional quality of life often needed small improvements.

I made this component because I myself needed these tid bits of features, but couldn't find in the original package. With that in mind, I made some improvement requests in the original package, but, while those aren't implemented, I made this quick open code component to help me, and any one in need.

This implementation involves the creation of new async logic based on the plain `CreatableSelect`.

## Improvements

- Fixed empty options list while loading first search, as discussed here: [Async Select resetting options on first load](https://github.com/JedWatson/react-select/discussions/6089)

![Problem showcase video](https://github.com/user-attachments/assets/20361e95-bb00-49f1-bdcb-f4241764fad2)

- Implemented lazy autoload of options, through an `autoload` prop, that accepts either `"onRender"`, for eager loading, or `"onOpen"`, for lazy loading (besides also accepting `true` for eager loading and `false` for no autoloading at all). This issue is discussed here: [Lazy load options (AsyncSelect)](https://github.com/JedWatson/react-select/discussions/5928)

- Async loading of default options, which can be used to smooth down integration with contexts where only a subset of data is managed externally, as opposed to the full option object managed by the component, as discussed here [How to set defualt value when using AsyncReactSelect](https://github.com/JedWatson/react-select/discussions/5755)
