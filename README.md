# FlexLiving Reviews Assessment

## 🛠️ Tech Stack

### Backend
- **Framework**: [FastAPI](https://fastapi.tiangolo.com/) (Python 3.14)
- **Database**: PostgreSQL with SQLAlchemy ORM
- **Migrations**: Alembic
- **Package Management**: [uv](https://github.com/astral-sh/uv)

### Frontend
- **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Icons**: Lucide React
- **Package Management and runtime**: [Bun](https://bun.sh/)

## 📦 Getting Started

### Prerequisites
- Docker & Docker Compose

### Quick Start (Docker)

1. Clone the repository and navigate to the project root.
2. Build and start the containers:
   ```bash
   # Build the images
   docker compose build

   # Start the services
   docker compose up -d
   ```
3. The services will be available at:
   - **Frontend**: [http://localhost:3000](http://localhost:3000)
   - **Admin Dashboard**: [http://localhost:3000/admin](http://localhost:3000/admin)
   - **Backend API**: [http://localhost:8000/api](http://localhost:8000/api)
   - **API Docs**: [http://localhost:8000/docs](http://localhost:8000/docs)

### Manual Setup (Local Development)

#### Backend
```bash
cd backend
uv sync
uv run fastapi dev main.py
```

#### Frontend
```bash
cd frontend
bun install
bun run dev
```

## 📂 Project Structure

```text
.
├── backend/            # FastAPI Application
│   ├── app/            # Core logic, models, schemas
│   ├── alembic/        # Data migrations
│   ├── review/         # Review domain logic
│   └── main.py         # Entry point
├── frontend/           # Next.js Application
│   ├── app/            # Pages and layouts
│   ├── components/     # UI components & sections
│   ├── store/          # Zustand state management
│   └── types/          # TypeScript definitions
└── docker-compose.yml  # Orchestration
```

## 📝 Configuration

Environment variables can be configured in `.env` files within the `backend` and `frontend` directories. Refer to `.env.example` in the backend directory for required database configuration.

## AI tools used
- GitHub Copilot
- Qwen Coder

## ⚖️ License
Assessment Project
