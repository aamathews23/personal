# packages with changesets

This document lists the steps to create a new changeset for a package in the monorepo.

1. Make changes to the package and commit them.
2. Run `pnpm changeset` to create a new changeset.
3. Update the changeset with the appropriate description and list of changes.
4. Commit the changeset.
5. Push the changes to the remote repository.
6. Merge the changeset into the main branch.
7. CI will automatically create a new PR with an update to the package version.
8. Merge the PR into the main branch.
9. CI will automatically publish the package to npm.
10. Update any packages or apps that require the new version.
