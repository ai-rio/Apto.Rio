# Documentation Creation Checklist

## Significant Changes Trigger Documentation ✅

Create/Update Documentation When:
- Introducing a new system component
- Changing core architectural patterns
- Modifying database schema
- Adding new user roles or permissions
- Implementing complex business logic not previously described

## Minor Changes Do NOT Require New Documentation ❌

Avoid Creating Documentation For:
- Small UI tweaks
- Performance optimizations
- Routine bug fixes
- Refactoring that doesn't change functionality

## Documentation Update Criteria

Ask yourself:
- Does this change impact multiple components?
- Will other team members need to understand this change?
- Does this deviate from existing architectural guidelines?
- Is this a strategic change or just a tactical implementation?

## Decision Tree for Documentation

```mermaid
graph TD
    A[New Implementation] --> B{Is this a significant change?}
    B -->|Yes| C{Does existing documentation cover this?}
    B -->|No| G[No documentation needed]
    C -->|No| D[Create/Update Documentation]
    C -->|Yes| E{Does implementation match existing docs?}
    E -->|No| F[Update existing documentation]
    E -->|Yes| G