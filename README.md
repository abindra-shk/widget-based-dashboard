# Scalable Widget-Based Dashboard

## Overview

This project is a dynamic and modular dashboard application built using React. It allows users to add, edit, delete, resize, and rearrange widgets such as charts, tables, and text blocks. The layout is flexible and supports persistent state management through localStorage.

The goal of this project was to build a scalable and extensible widget system with a clean and maintainable architecture while optimizing for performance and ease of use.

## Features

- Drag-and-drop layout for rearranging widgets using `react-grid-layout`
- Add, edit, and delete widgets with validation
- Support for multiple widget types: chart, table, and text block
- Configurable widget properties via modal form
- Resizable widgets with persistent layout and data
- Responsive design
- Modular architecture supporting new widget types with minimal effort
- LocalStorage persistence of dashboard state


## Architectural Breakdown

### Component Structure

The dashboard is modularized into distinct components, making it easy to manage and extend:

- `App.tsx`: Root application with Redux provider
- `Dashboard.tsx`: The container that renders the widgets in a grid
- `BaseWidget.tsx`: A reusable wrapper component for any widget (e.g., header, edit/delete controls)
- `WidgetFactory.tsx`: Responsible for rendering the correct widget type
- `WidgetFormModal.tsx`: Handles both widget creation and editing
- Individual widget components: `ChartWidget`, `TableWidget`, `TextWidget`

This separation of concerns allows for easy testing, better readability, and fast iteration.

### State Management (Local vs Global)

- **Global (Redux Toolkit)**:
  - Stores all widgets and layout configuration
  - Global actions: `addWidget`, `updateWidget`, `removeWidget`, `updateWidgetLayout`, `clearAllWidgets`, `loadWidgetsFromConfig`
- **Local State**:
  - Used in form modals for handling widget input fields
- **Persistence**:
  - A `useLocalStorage` hook syncs Redux state to `localStorage` automatically


### Data Flow

1. User triggers interaction (add, edit, resize, drag, etc.)
2. UI dispatches Redux actions
3. Redux reducer updates global state
4. Grid and widget components re-render based on updated state
5. Changes are saved to `localStorage`

This unidirectional flow ensures predictable and debuggable state transitions.

### Extensibility (Adding New Widgets)

Adding a new widget requires minimal steps:

1. Create a new widget component (e.g., `VideoWidget.tsx`)
2. Add logic to `WidgetFactory.tsx`
3. Update types in `types.ts` to include the new widget type
4. Add configuration form fields in `WidgetFormModal.tsx`

The system is designed using the **Open/Closed Principle** — easy to extend without modifying core logic.

### Error Handling

- Widget title validation
- Table header limits (max 5 columns)
- Input-level validation and sanitization
- Fallback behavior for corrupt configs
- UI-level form disabling when inputs are invalid

### Time & Space Complexity

| Operation           | Time Complexity | Notes                               |
| ------------------- | --------------- | ----------------------------------- |
| Add Widget          | O(1)            | Simple `push()` into Redux array    |
| Remove Widget       | O(n)            | `filter()` operation by ID          |
| Drag/Reorder Widget | O(1)            | Updates layout state per widget     |
| Re-render Dashboard | O(n)            | Based on number of affected widgets |

### Layout Data Structure Impact

Using `react-grid-layout`, layout data is stored as an array of layout objects:

```ts
{ i: string, x: number, y: number, w: number, h: number }
```

- Efficient for drag/resizing (constant-time updates)
- Minimal recalculations since layout library handles grid collision logic
- Indexed by widget ID, allowing efficient lookup and update

## Rendering Performance & Optimization

### Behavior with 50+ Active Widgets

- Widgets remain performant with memoization (`React.memo`)
- Input fields in modals are lightweight and compact
- Layout updates are optimized through batching

### Optimizations Implemented

- `React.memo` on all widget components
- `useCallback` to avoid re-creating handlers
- Efficient Redux selectors to prevent unnecessary subscriptions
- Re-render only widgets that changed (not the whole grid)

## Cost of Scale

### With Hundreds of Widgets:

#### Potential Issues:

- High DOM nodes = memory usage
- Slower reflow from layout engine
- Lag in drag/drop interactions

#### Strategies to Adopt:

- **Virtualization**: Render only visible widgets using `react-window`
- **Lazy Loading**: Delay loading widget internals until in view
- **Chunked Rendering**: Split large updates into batched renders
- **Offload State to Web Workers**: Handle layout calculations in background threads

## Extensibility vs Performance

- **Modular Widgets**: Easy to create and register new types
- **Performance Techniques**:
  - Avoided prop drilling via Redux
  - Memoized subcomponents
  - Minimal use of deep object comparison
- **Balance Achieved**: Decoupled widget logic from rendering while keeping the base layout performant and reactive

## Installation and Setup

```bash
git clone https://github.com/abindra-shk/widget-based-dashboard.git
cd widget-based-dashboard
npm install
npm run dev
```

Ensure you are using Node.js version 16+ and a modern browser that supports `localStorage`.

## Future Enhancements

- Real-time data updates (WebSockets)
- Support for multiple dashboard tabs
- User accounts and remote data sync
- Collaborative editing with presence awareness
- Widget templates and saveable layouts
- Light/dark theme support

## Summary

This project demonstrates a practical approach to building a dynamic and scalable dashboard system using modern frontend technologies. By focusing on component modularity, clean state management, and layout efficiency, it is designed to grow with future requirements while maintaining performance and usability.

The design intentionally balances extensibility with performance, ensuring that developers can confidently add new features or widgets without degrading the core experience.
