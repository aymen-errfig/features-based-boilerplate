# React Feature + Atomic Architecture Guidelines

---

# 📝 Project Guidelines

## **1. Project Structure**

We organize the project **by feature**, and inside each feature, we follow **atomic design**:

```
src/
  features/
    feature-name/
      atoms/
      molecules/
      organisms/
      hooks/
      context/
      utils/
      index.ts
  shared/
    atoms/
    utils/
```

* **Features**: self-contained functionality (`auth`, `dashboard`, `status`).
* **Shared**: reusable components/utilities across features.

---

## **2. Folder Naming Conventions**

| Type      | Pattern          | Example               |
|-----------|------------------|-----------------------|
| Feature   | lowercase/kebab  | `auth/`, `dashboard/` |
| Atoms     | plural lowercase | `atoms/`              |
| Molecules | plural lowercase | `molecules/`          |
| Organisms | plural lowercase | `organisms/`          |
| Hooks     | plural lowercase | `hooks/`              |
| Context   | lowercase        | `context/`            |
| Utils     | lowercase        | `utils/`              |

> Always use plural for folders containing multiple files.

---

## **3. File Naming Conventions**

| Type               | Pattern                       | Example                                 |
|--------------------|-------------------------------|-----------------------------------------|
| React component    | PascalCase                    | `Button.tsx`, `LoginForm.tsx`           |
| Custom hook        | camelCase starting with `use` | `useAuth.ts`, `useStatus.ts`            |
| Context / Provider | PascalCase + suffix           | `AuthContext.tsx`, `StatusProvider.tsx` |
| Utilities          | lowercase / kebab-case        | `format-date.ts`, `api-client.ts`       |
| Barrel file        | `index.ts`                    | `atoms/index.ts`                        |

---

## **4. Atomic Hierarchy Inside Features**

* **Atoms**: smallest building blocks (buttons, inputs, labels).
* **Molecules**: combinations of atoms (login form, search bar).
* **Organisms**: composed units (auth container, dashboard panel).
* **Hooks**: feature-specific logic (`useAuth`, `useStatus`).
* **Context**: React context and providers for the feature.
* **Utils**: feature-related helpers (`auth-utils.ts`, `status-utils.ts`).

---

## **5. Exports & Barrel Files**

* Each folder should have an `index.ts` to re-export its content.
* Example `features/auth/atoms/index.ts`:

```ts
export * from "./Button";
export * from "./Input";
```

* Import using feature path:

```ts
import { Button } from "@/features/auth/atoms";
```

---

## **6. Component Guidelines**

* **PascalCase** for components (`LoginForm`, `StatusSwitch`).
* One component per file.
* **Props typing**: always use TypeScript interfaces or `React.FC`.
* Optional compound components: group under a single namespace:

```ts
Status.Loading
Status.Error
Status.Success
```

---

## **7. Hooks Guidelines**

* Always start with `use`.
* Keep feature-specific hooks inside `features/<feature>/hooks/`.
* Shared hooks go in `shared/hooks/`.

---

## **8. Status / Conditional Rendering (Optional)**

* Use declarative components over `if/else`:

```tsx
<Status value={status}>
  <Status.Loading><Spinner /></Status.Loading>
  <Status.Error><ErrorMessage /></Status.Error>
  <Status.Success><Dashboard /></Status.Success>
  <Status.Empty>No data</Status.Empty>
</Status>
```

* For generic conditions:

```tsx
<When condition={user.isAdmin}><AdminPanel /></When>
<Unless condition={isLoggedIn}><LoginForm /></Unless>
```

---

## **9. Code Style / Formatting**

* Use Prettier for formatting.
* Use ESLint for linting and import ordering.
* Always sort imports:

    1. External packages
    2. `@/shared`
    3. `@/features`
    4. Relative imports

---

## **10. Testing & Storybook**

* Each component gets a `.test.tsx` file in the same folder.
* Optional `.stories.tsx` for Storybook.
* Example:

```
features/auth/atoms/Button.tsx
features/auth/atoms/Button.test.tsx
features/auth/atoms/Button.stories.tsx
```

---

## **11. Import Guidelines**

* Always import from **feature folders or shared**.
* Avoid deep relative paths like `../../../atoms/Button`.
* Example good import:

```ts
import { Button } from "@/features/auth/atoms";
```

---

## **12. WebStorm AI Templates**

### **Component Template**

```javascript
import React from "react";

export interface $COMPONENT_NAME$Props {
  children?: React.ReactNode;
}

export const $COMPONENT_NAME$: React.FC<$COMPONENT_NAME$Props> = ({ children }) => {
  return (
    <div className="$COMPONENT_NAME$">
      {children}
    </div>
  );
};
```

### **Hook Template**

```javascript
import { useState, useEffect } from "react";

export function $HOOK_NAME$<T>(initialValue?: T) {
  const [value, setValue] = useState<T | undefined>(initialValue);

  useEffect(() => {
    // TODO: implement hook logic
  }, []);

  return { value, setValue };
}
```

### **Status Component Template**

```javascript
import React from "react";
import { useStatus } from "@/features/status/hooks/useStatus";

export const $STATUS_TYPE$: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { $STATUS_TYPE_LOWER$ } = useStatus();
  return $STATUS_TYPE_LOWER$ ? <>{children}</> : null;
};
```

### **Barrel File (`index.ts`) Template**

```javascript
export * from "./$COMPONENT_NAME$";
```

### **Folder Creation Template**

```
src/features/$FEATURE$/
  atoms/
  molecules/
  organisms/
  hooks/
  context/
  utils/
  index.ts
```

* WebStorm AI can use these templates to auto-suggest folder structure, component boilerplate, and imports.

---

**✅ Notes:**

* Follow **feature-first, atomic-inside-feature** philosophy.
* Stick to **PascalCase for components**, **camelCase for hooks/utilities**.
* Keep one **responsibility per file**.
* Use **barrel files** to simplify imports.
* Prefer **declarative conditional components** over `if/else`.
