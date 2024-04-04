# MarketDuck Web Client

## start script

```bash
# install
npm i -g pnpm
pnpm install --frozen-lockfile
```

## add library

```bash
# add
pnpm add <library_name>

# remove
pnpm remove <library_name>
```

## sepc

`pnpm`: package manager
`node`: check .nvmrc
`react`: dom
`styled-components`: style
`eslint & prettier`: code format, linting 


## structure (WIP)

`components`: pure ui component(no business logic)
`apis`: api methods, schema
`atoms`: global state atoms 
`pages`: pages and components related specific business logic & page
`hooks`: react custom hooks 
`utils`: utils for being globally used
`assets`: resources like icons, svgs, fonts 