# Yarn Forbid Portals GitHub Action

A GitHub Action that stops the workflow if portals are set in `package.json` files.

## Motivation

Yarn Modern (yarn >= 2) changed the way dependencies are linked between projects (i.e.: when using a custom component library).

Instead of using symbolic links, it adds a few rows in the `resolution` section of the package.json file (see [yarn link](https://yarnpkg.com/cli/link)).
The problem with this solution, is that it will use the full path of the package in the file system, which will almost inevitably be invalid in another system.

This GitHub Action will check if the `portal:` keyword is used in the package.json file and return an error, blocking the entire workflow.

If needed, I might extend the functionality to automatically remove the portals and commit the changed files.

## Usage

```yaml
steps:
  ...
  - name: Forbid portals
    uses: snk7891/github-action-yarn-forbid-portals@v0.2
    with:
      # Optional file list
      # Defaults to "./package.json"
      files: |
        package.json
```

If you want to check multiple `package.json` files, use the following array syntax:

```yaml
files: |
  package.json
  packages/package1-name/package.json
  packages/package2-name/package.json
```

## License

This project is licensed under the MIT License - see the LICENSE file for details.
