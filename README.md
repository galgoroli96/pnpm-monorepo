# Monorepo setup with pnpm workspaces

[![Version](https://img.shields.io/badge/pnpm-V8.9.0-orange)](https://pnpm.io/motivation) [![NextJS](https://img.shields.io/badge/NextJS-V14.0.1-blueviolet)](https://nextjs.org/) [![Licence](https://img.shields.io/badge/licence-MIT-green)]()

In this repository you can see how the pnpm monorepo works.

- Section 1: create monorepo
- Section 2: create shared component package (optional)
- Section 3: usage

## Section 1 - Create a monorepo

Open your favorite Terminal and run these commands.

#####[1] Create folder and initialize pnpm :

```sh
mkdir pnpm-monorepo
cd pnpm-monorepo
pnpm init
```

#####[2] Initialize a git repository :

```sh
git init
```

Switch to the code editor you like, then:

#####[3] Create `.gitignore` file with the following content:

```sh
touch .gitignore
```

```sh
# dependencies
node_modules

#folders, etc
dist
build
.env
```

#####[4] Create `pnpm-workspace.yaml` at the root of the repository, defining the monorepo structure:

```sh
touch pnpm-workspace.yaml
```

with the following content

```sh
packages:
  - "apps/*"
```

#####[5] Switch back to the terminal then create the `apps` folder

```sh
mkdir apps
```

#####[6] Switch back to the terminal then create any types of app you want into the apps folder

```sh
cd apps
pnpx create-next-app@latest
```

follow the settings in the terminal (my options selected below, you don't need to use these set):

✔ What is your project named? … **my-next-app**
✔ Would you like to use TypeScript? … No / **Yes**
✔ Would you like to use ESLint? … No / **Yes**
✔ Would you like to use Tailwind CSS? … No / **Yes**
✔ Would you like to use `src/` directory? … **No** / Yes
✔ Would you like to use App Router? (recommended) … No / **Yes**
✔ Would you like to customize the default import alias (@/\*)? … **No** / Yes

#####[7] Configuration of the monorepo:

- switch back to terminal then create `tsconfig.json` to the root of the directory:

  ```sh
  touch tsconfig.json
  ```

  with the following content:

  ```JSON
  {
  "compilerOptions": {
      "baseUrl": ".",
      "experimentalDecorators": true,
      "emitDecoratorMetadata": true,
      "incremental": true,
      "skipLibCheck": true,
      "strictNullChecks": true,
      "noImplicitAny": true,
      "strictBindCallApply": true,
      "forceConsistentCasingInFileNames": true,
      "noFallthroughCasesInSwitch": true,
      "paths": {
          "@nextapp/*": ["./apps/my-next-app/*"]
          }
      }
  }
  ```

  Make sure you write the folder names properly in the `path` section, then update the NextJS tsconfig (`apps/my-next-app/tsconfig.json`):

  ```JSON
  {
  "extends": "../../tsconfig.json",
  "compilerOptions": {
      "target": "es5",
      "lib": ["dom", "dom.iterable", "esnext"],
      "allowJs": true,
      "strict": true,
      "noEmit": true,
      "esModuleInterop": true,
      "module": "esnext",
      "moduleResolution": "bundler",
      "resolveJsonModule": true,
      "isolatedModules": true,
      "jsx": "preserve",
      "plugins": [
      {
          "name": "next"
      }
      ],
  },
  "include": [
      "next-env.d.ts",
      "**/*.ts",
      "**/*.tsx",
      ".next/types/**/*.ts"
      ],
  "exclude": ["node_modules"]
  }
  ```

**Configurations are finished!**

## Section 2 - Create shared component package (optional)

In the terminal you can run these commands.

#####[0] Extend `pnpm-workspace.yaml` with the `packages` folder:

```sh
packages:
  - "apps/*"
  - "packages/*"
```

#####[1] create `packages` folder next to `apps` folder:

```sh
mkdir packages
```

#####[2] create `shared` folder inside of `packages` folder:

```sh
cd packages
mkdir shared
```

#####[3] create `tsconfig.json` (`packages/shared/tsconfig.json`) with the following content:

```JSON
{
    "compilerOptions": {
        "jsx": "react-jsx",
        "allowJs": true,
        "esModuleInterop": true,
        "allowSyntheticDefaultImports": true,
        "module": "commonjs",
        "outDir": "./dist"
    },
    "include": [
        "."
    ],
    "exclude": [
        "dist",
        "node_modules",
        "**/*.spec.ts"
    ]
}
```

#####[4] create `package.json` (`packages/shared/package.json`) with the following content:

```JSON
{
  "private": true,
  "name": "shared",
  "version": "1.0.0",
  "description": "",
  "main": "dist/index.js",
  "scripts": {
    "build": "rm -rf dist && tsc"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {},
  "devDependencies": {}
}
```

It should be **private=true**, because we don't want to publish into npm or somewhere else

#####[5] in this project I will use react package with typescript, so we need to add react and typescript package into our sharedUI lib:

```sh
pnpm add --filter shared react
pnpm add --filter shared typescript -D
```

#####[6] create your component (in this example I'll create a `Button.tsx` component):

```TSX
interface IButtonProps {
  text: string;
  onClick: VoidFunction
}

function Button({ text, onClick }: IButtonProps) {
  return <button onClick={() => onClick()}>{text}</button>;
}

export default Button;
```

then create an `index.tsx` to export the Button:

```TSX
export * from "./Button";
```

#####[6] we are all set, now we need to build this package:

```sh
pnpm --filter shared build
```

#####[7] Finally we can use this package like one of npm package:

```sh
pnpm add shared --filter my-next-app --workspace
```

when you run this command the shared packege will be added to package.json dependencies:

```JSON
"dependencies": {
    ...
    "shared": "workspace:^"
  }
```

Now just use it like:
**Add "use client" at the top of HomePage, because in NextJS we will get the following error: Event handlers cannot be passed to Client Component props!**

```TSX
"use client";

import { Button } from "shared";

export default function Home() {
  return (
    <>
      <Button text="Click me" onClick={() => alert("Button clicked")} />
    </>
  );
}
```

## Section 3 - Usage of the monorepo

In the terminal you can run these commands.

#####[1] Install package:

```sh
pnpm add <package_selector> --filter=<your_project_folder_name>

```

example: `pnpm add dayjs --filter=my-next-app`

#####[2] Install Your package:

```sh
pnpm add <package_selector> --filter <project_selector> --workspace

```

example: `pnpm add shared --filter my-next-app --workspace`

#####[3] Run other command (build, start...etc.) :

- run your project

```sh
pnpm --filter <package_selector> <command>
```

example: `pnpm --filter my-next-app dev `

- build your package after something changed (or after created)

```sh
pnpm --filter <package_selector> <command>
```

example: `pnpm --filter shared build`

## License

MIT
