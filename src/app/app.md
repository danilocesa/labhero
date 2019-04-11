### `app/`

We use the [container/component architecture](https://medium.com/@dan_abramov/smart-and-dumb-components-7ca2f9a7c7d0#.4rmjqneiw). `containers/` contains React components which are connected to the redux store. `components/` contains dumb React components which depend on containers for data. **Container components care about how things work, while components care about how things look.**

We've found that for many applications treating single pages (e.g. the LoginPage, the HomePage, etc.) as containers and their small parts (e.g. the Login form, the Navigation bar) as components works well, but there are no rigid rules. **Bend the architecture to the needs of your app, nothing is set in stone!**