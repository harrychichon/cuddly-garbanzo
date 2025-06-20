# 🎾 Arena Padel (working title)

**Arena Padel** is a dynamic mobile app for creating, managing, and following padel tournaments and leagues — from casual one-offs to fully structured seasonal competitions. Built in React Native with Expo and TypeScript, it offers a flexible and scalable platform for both players and organisers.

---

## 🚀 Features

### 🧑‍🤝‍🧑 For Users

- 🏆 **Create & Manage Competitions** – Choose from multiple tournament formats and rule sets.
- 🗓️ **Auto Scheduling** – Matches are automatically generated based on format and participants.
- 📈 **Follow Results** – View match-by-match results and competition-wide standings.
- 📂 **Competition Overview** – See your ongoing and completed competitions at a glance.

### 👨‍💻 For Developers

- ⚙️ **Dynamic by Design** – Config-driven formats and constants allow easy addition of rules and layouts.
- 💅 **Consistent Styling** – Uses design tokens for unified colours, spacing, and typography.
- 🧱 **Screen-Based Architecture** – Modular screen layout with reusable subcomponents.
- 🧠 **Utility-First** – Includes custom helpers like `generateRoundRobinMatches.ts` and `formFieldRenderer.tsx`.
- 🧭 **Expo Router Navigation** – Stack routing pattern with plans to add tab-based navigation.

---

## 🛠 Tech Stack

- **React Native** (via Expo)
- **Expo Router** for navigation
- **Zustand** for global state
- **React Hook Form** for form state
- **TypeScript** for static typing
- **React Native StyleSheet API** for styling

> 🧩 Additional tools include UUID generation, reanimated transitions, and native-safe UI components.

---

## 🧭 Project Structure

Screen-based layout with modular separation:

├── app/ # Expo Router route files
├── assets/ # Fonts, images, etc.
├── components/ # Shared UI components
├── configs/ # Format and rule configuration
├── design-tokens/ # Styling tokens for spacing, colours, etc.
├── hooks/ # Custom hooks
├── screens/ # Feature-specific views (split into major parts)
├── stores/ # Zustand state management
├── types/ # TypeScript interfaces and enums
├── utils/ # Helper functions and utilities

---

## 📦 Dependencies (Core)

Too many to list here 😅, but highlights include:

- `react-native`, `expo`, `expo-router`
- `zustand`, `react-hook-form`
- `react-native-reanimated`, `@react-native-picker/picker`, `@expo/vector-icons`

You can see the full list in [`package.json`](./package.json).

---

## ✅ Status

- ✅ **Complete** – Successfully submitted as coursework for a React Native course.
- 🚧 **In Progress** – Actively maintained and being prepped for launch to app stores.
- 🔮 **Planned** – Additional features, UX polish, and quality-of-life improvements coming soon.

---

## 🧪 Getting Started

To run the app locally:

# 1. Clone the repo

git clone https://github.com/your-username/Arena Padel.git
cd Arena Padel

# 2. Install dependencies

npm install

# 3. Start the development server

npx expo start

🔗 You’ll need the Expo Go app on your device to preview it.

## 📄 License

This project is licensed under the [MIT License](./LICENSE) **for coursework purposes only**.

> ⚠️ After the course is completed, the project will transition to a proprietary license.
> Public use, modification, or redistribution will no longer be permitted beyond the original MIT grant.

---

## 📬 Contact

For questions, collaboration, or future usage inquiries:

- 📧 **Email**: [harry.chichon@pm.me](mailto:harry.chichon@pm.me)
- 💼 **LinkedIn**: [linkedin.com/in/harry-chichon/](https://www.linkedin.com/in/harry-chichon/)
- 🐙 **GitHub**: [github.com/harrychichon](https://github.com/harrychichon)
