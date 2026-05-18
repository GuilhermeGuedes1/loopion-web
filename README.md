# Loopin Web

Frontend for Loopin, a platform focused on customer retention and re-engagement.

The main goal of the system is to help businesses track customers who have not returned for a long time, making follow-ups easier through quick actions such as WhatsApp contact.

---

# ✨ Current Features

- Customer registration
- Paginated customer listing
- Customer recurrence rules
- Customer status tracking
- WhatsApp integration
- Seed data for development environment
- Modern UI with Tailwind + shadcn/ui
- Integration with NestJS API

---

# 🧠 Business Logic

Loopin automatically identifies customers who have not returned for several days.

When a customer exceeds the configured inactivity period:

- The customer status changes
- The WhatsApp contact button becomes available
- The system facilitates customer re-engagement

---

# 🛠️ Stack

## Frontend

- React
- TypeScript
- Vite
- TailwindCSS
- shadcn/ui
- Axios
- React Hook Form

## Backend

- NestJS
- Prisma ORM
- PostgreSQL
- Neon Database

---

# 🚀 Running the Project

## Install dependencies

```bash
pnpm install
```

## Start development environment

```bash
pnpm dev
```

---

# 🔌 API Configuration

Create a `.env` file in the project root:

```env
VITE_API_URL=http://localhost:3000
```

---

# 📦 Project Structure

```txt
src/
 ├── app/
 ├── services/
 ├── styles/
 ├── types/
 
```

---

# 📌 Roadmap

- [ ] Visits timeline
- [ ] Dashboard with metrics
- [ ] Advanced filters
- [ ] Customer search
- [ ] Authentication
- [ ] Notifications
- [ ] Campaign integration
- [ ] Deployment

---

# 🤖 About the Development Process

This project is also being used as a practical experiment in AI-assisted development (“vibe coding”), using tools like GitHub Copilot and ChatGPT to accelerate prototyping, UI creation, code organization, and business logic implementation.

The focus is not only on generating code faster, but on building a real product while exploring modern AI-driven development workflows.

---

# 📄 License

Project currently under development.
