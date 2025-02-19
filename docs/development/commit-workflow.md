# Apto.Rio Commit Workflow Documentation

## Overview
This document outlines the manual commit workflow for the Apto.Rio project, ensuring consistent, high-quality code contributions and maintaining project integrity.

## Branching Strategy

### Branch Types
1. **`main`**: Production-ready code
2. **`develop`**: Integration branch for ongoing development
3. **`feature/`**: New features or significant improvements
4. **`bugfix/`**: Resolving specific bugs
5. **`hotfix/`**: Critical production fixes
6. **`docs/`**: Documentation updates
7. **`refactor/`**: Code restructuring without changing functionality

### Branch Naming Conventions
- Use lowercase
- Use hyphens to separate words
- Prefix with branch type
- Include relevant issue or task number if applicable

**Examples:**
- `feature/property-search-filter`
- `bugfix/stripe-subscription-renewal`
- `docs/commit-workflow-documentation`

## Commit Process

### Pre-Commit Checklist
Before committing code, ensure:
- All TypeScript types are correct
- No TypeScript compilation errors
- Code follows project style guidelines
- Unit tests pass
- No console.log or debugging statements remain
- Documentation is updated if necessary

### Commit Message Format
```
<type>(<scope>): <short summary>

[Optional detailed description]

Fixes #<issue-number>
```

#### Commit Types
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting, missing semicolons
- `refactor`: Code restructuring
- `test`: Adding or modifying tests
- `chore`: Maintenance tasks, dependency updates

#### Commit Message Examples
```
feat(property-search): implement advanced filtering

- Add price range and location filters
- Integrate with Supabase query builder
- Improve search performance

Fixes #42
```

```
fix(stripe-integration): resolve subscription renewal bug

- Correct webhook handling for recurring payments
- Add error logging for subscription events
- Improve error message clarity

Closes #37
```

## Pull Request (PR) Workflow

### PR Creation Guidelines
1. Create PR from feature/bugfix branch to `develop`
2. Use PR template for consistent documentation
3. Include:
   - Purpose of changes
   - Related issues
   - Testing performed
   - Potential side effects

### PR Review Process
- Minimum of 1 code review required
- Reviewers check:
  - Code quality
  - Type safety
  - Performance
  - Adherence to project principles
  - Test coverage

### Merge Requirements
- All CI checks must pass
- No merge conflicts
- Approved by at least one team member
- Squash and merge preferred to maintain clean history

## Continuous Integration (CI) Checks
Automated checks will run on every PR:
- TypeScript compilation
- ESLint validation
- Unit and integration tests
- Code coverage report
- Performance impact assessment

## Release Process

### Versioning
- Use Semantic Versioning (SemVer)
- Version format: `MAJOR.MINOR.PATCH`
- Increment based on:
  - `MAJOR`: Breaking changes
  - `MINOR`: New features, backwards-compatible
  - `PATCH`: Bug fixes, small improvements

### Release Steps
1. Create `release/vX.Y.Z` branch from `develop`
2. Update version in `package.json`
3. Generate changelog
4. Create GitHub release
5. Merge to `main`
6. Tag release in Git

## Best Practices
- Commit small, focused changes
- Write clear, descriptive commit messages
- Keep feature branches short-lived
- Rebase feature branches on `develop` before merging
- Use meaningful variable and function names
- Add comments for complex logic

## Tools and Recommendations
- Use `yarn commit` for guided commit message creation
- Utilize VS Code Git integration
- Review changes with `git diff` before committing

## Emergency Procedures
- For critical hotfixes, use `hotfix/` branches
- Merge directly to `main` and `develop`
- Communicate immediately with team

## Training and Onboarding
- New team members must review this document
- Pair programming for workflow familiarization
- Regular workflow retrospectives

---

**Last Updated:** 2025-02-19
**Version:** 1.0.0
