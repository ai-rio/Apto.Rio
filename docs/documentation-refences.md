## Mandatory Documentation References

You MUST reference and comply with the documentation for each discipline using the following pattern:
[docs\folder\file.xxx](./docs/folder/file.xxx)

**Architecture**:
- [docs\architecture\container.mmd](./docs/architecture/container.mmd)
- [docs\architecture\deployment.mmd](./docs/architecture/deployment.mmd)
- [docs\architecture\system-context.mmd](./docs/architecture/system-context.mmd)

**Components**:
- [docs\components\features.mmd](./docs/components/features.mmd)
- [docs\components\hierarchy.mmd](./docs/components/hierarchy.mmd)
- [docs\components\shared.mmd](./docs/components/shared.mmd)
- [docs\components\property-components.md](./docs/components/property-components.md) - Document all property-specific components

**Database**:
- [docs\database\migrations.md](./docs/database/migrations.md)
- [docs\database\relationships.mmd](./docs/database/relationships.mmd)
- [docs\database\schema.mmd](./docs/database/schema.mmd)
- [docs\database\property-tables.md](./docs/database/property-tables.md) - Detailed documentation of property-related tables

**Flows**:
- [docs\flows\authentication.mmd](./docs/flows/authentication.mmd)
- [docs\flows\property-creation.mmd](./docs/flows/property-creation.mmd)
- [docs\flows\subscription.mmd](./docs/flows/subscription.mmd)

**Implementation**:
- [docs\implementation\risks.md](./docs/implementation/risks.md)
- [docs\implementation\tasks.md](./docs/implementation/tasks.md)
- [docs\implementation\timeline.mmd](./docs/implementation/timeline.mmd)
- [docs\implementation\roadmap-status.md](./docs/implementation/roadmap-status.md) - Current implementation status

**Project**:
- [docs\project\build-pipeline.mmd](./docs/project/build-pipeline.mmd)
- [docs\project\code-organization.md](./docs/project/code-organization.md)
- [docs\project\structure.mmd](./docs/project/structure.mmd)

**User Journeys**:
- [docs\user-journeys\agent.mmd](./docs/user-journeys/agent.mmd)
- [docs\user-journeys\buyer.mmd](./docs/user-journeys/buyer.mmd)
- [docs\user-journeys\developer.mmd](./docs/user-journeys/developer.mmd)

**API**:
- [docs\api\property-endpoints.md](./docs/api/property-endpoints.md) - Documentation for all property-related API endpoints

**Subscription**:
- [docs\subscription\tiers.md](./docs/subscription/tiers.md) - Detailed documentation of subscription tiers and limitations

## Documentation Requirements

All implementation work MUST include:
1. Documentation of new components in the appropriate components file
2. Updates to database schema documentation when modifying tables
3. Documentation of new API endpoints
4. Updates to subscription tier documentation when changing limitations
5. Regular updates to the roadmap status file

Before implementing any feature, you MUST review all relevant documentation files to ensure compliance with the established architecture, patterns, and guidelines. Each implementation must align with these documents, and any deviations must be explicitly justified and documented.

All documentation updates should be submitted alongside code changes to maintain accurate and up-to-date project documentation.


## Documentation Folder Structure Guidelines

### Naming Conventions
- Use lowercase with hyphens for filenames
- Use `.md` for markdown files
- Use `.mmd` for Mermaid diagram files

### File Content Guidelines
- `.md` files: Detailed textual documentation
- `.mmd` files: Diagrams and visual representations
- Keep files concise and focused on specific topics

### Maintenance Principles
- Update documentation alongside code changes
- Ensure all documentation is version-controlled
- Review and validate documentation regularly

### Recommended Tools
- Use Mermaid for diagrams
- Use Markdown for text documentation
- Integrate with version control system
