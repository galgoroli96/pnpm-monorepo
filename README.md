# Monorepo setup with pnpm workspaces

[![Version](https://img.shields.io/badge/pnpm-V8.9.0-green)](https://pnpm.io/motivation)

In this repository you can see how the pnpm monorepo works.

- Section 1: create monorepo
- Section 2: usage

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

## Section 2 - Usage of the monorepo

In the terminal you can run these commands.

#####[1] Install package:

```sh
pnpm add <package_name> --filter=<your_project_folder_name>

```

example: `pnpm add dayjs --filter=my-next-app`

#####[2] Run command (build, start...etc.) :

```sh
pnpm --filter <your_project_folder_name> <command>

```

example: `pnpm --filter my-next-app dev `

## License

MIT
