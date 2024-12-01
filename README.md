# DraggableStore

DraggableStore is a dynamic drag-and-drop interface builder that allows users to create, save, and manage custom form templates. Users can drag components onto a design area, customize their properties, and save templates for later use.

## Features

- Drag and drop interface for form building
- Component library with various form elements:
  - Input fields
  - Checkboxes
  - Image upload areas
  - Button
- Real-time property customization
- Template management:
  - Save templates
  - Load existing templates
  - Delete templates
- Responsive design
- Local storage persistence

## Prerequisites

Before running this project, make sure you have:
- Node.js (v14 or higher)
- npm or yarn package manager

## Installation

1. Clone the repository:
```bash
git clone https://github.com/Cansualtun/DraggableStore.git
```

2. Navigate to the project directory:
```bash
cd DraggableStore
```

3. Install dependencies:
```bash
npm install
# or
yarn install
```

## Running the Application

To start the development server:
```bash
npm run dev
# or
yarn dev
```

The application will be available at `http://localhost:5173` (or another port if 5173 is in use).

## Usage

1. **Component Selection**:
   - Use the left sidebar to view available components
   - Drag components onto the design area

2. **Component Customization**:
   - Click on any component to select it
   - Use the right sidebar to customize properties:
     - Dimensions (width/height)
     - Colors
     - Border styles
     - Component-specific properties

3. **Template Management**:
   - Save your current design as a template using the "Save" button
   - View saved templates in the left sidebar
   - Click on a saved template to load it
   - Delete unwanted templates using the trash icon

## Tech Stack

- React.js
- Redux for state management
- Tailwind CSS for styling
- Shadcn UI components
- Vite for build tooling

## Project Structure

```
DraggableStore/
├── src/
│   ├── components/
│   │   ├── design/
│   │   │   ├── ComponentList.jsx
│   │   │   ├── DesignArea.jsx
│   │   │   └── PropertyPanel.jsx
│   │   └── ui/
│   ├── hooks/
│   │   └── useDragAndDrop.js
│   ├── store/
│   │   └── templateSlice.js
│   └── utils/
└── package.json
```
