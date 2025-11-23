# AIPioneers Workspace

A modern, professional Arabic team collaboration and task management platform built with Next.js, TypeScript, and Prisma.

## 🚀 Features

- **Role-Based Access Control**: 4 user roles (Member, Leader, Vice President, President)
- **Task Management**: Create, assign, track, and manage tasks with priorities
- **Team Organization**: Organize members into teams/departments
- **Project Management**: Group tasks into projects
- **Rankings System**: Assess and track team member performance
- **Activity Logging**: Complete audit trail of all actions
- **Modern UI**: Glassmorphism design with dark mode support

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Database**: SQLite (via Prisma ORM)
- **Authentication**: Custom JWT-based auth with bcrypt
- **Styling**: Tailwind CSS with custom design system
- **UI**: React 19 with modern hooks

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd team-workspace

# Install dependencies
npm install

# Set up the database
npx prisma migrate dev

# Start the development server
npm run dev
```

## 🗄️ Database Schema

- **Users**: Email, role, team membership
- **Teams**: Department organization
- **Projects**: Task grouping
- **Tasks**: Full CRUD with assignments, status, priority
- **Comments**: Task discussions
- **Rankings**: Performance assessments
- **ActivityLog**: Audit trail

## 🔑 API Endpoints

### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration

### Users
- `GET /api/users` - List all users
- `POST /api/users` - Create user (admin)
- `GET /api/users/[id]` - Get user details
- `PUT /api/users/[id]` - Update user
- `DELETE /api/users/[id]` - Delete user

### Tasks
- `GET /api/tasks` - List/filter tasks
- `POST /api/tasks` - Create task
- `GET /api/tasks/[id]` - Get task details
- `PUT /api/tasks/[id]` - Update task
- `DELETE /api/tasks/[id]` - Delete task

### Projects
- `GET /api/projects` - List projects
- `POST /api/projects` - Create project

### Teams
- `GET /api/teams` - List teams
- `POST /api/teams` - Create team

### Rankings
- `GET /api/rankings` - Get rankings (filtered)
- `POST /api/rankings` - Create assessment
- `GET /api/rankings/leaderboard` - Get leaderboard

### Data Import
- `POST /api/import` - Import users/tasks from Google Sheets

## 👥 Role Permissions

| Action | Member | Leader | VP | President |
|--------|--------|--------|----|-----------|
| View own tasks | ✅ | ✅ | ✅ | ✅ |
| Create tasks | ✅ | ✅ | ✅ | ✅ |
| Edit team tasks | ❌ | ✅ | ✅ | ✅ |
| Delete tasks | ❌ | ✅ | ✅ | ✅ |
| Manage rankings | ❌ | ✅ | ✅ | ✅ |
| User management | ❌ | ❌ | ✅ | ✅ |
| System settings | ❌ | ❌ | ❌ | ✅ |

## 📱 Pages

- **/** - Login page
- **/register** - User registration
- **/dashboard** - Main dashboard with:
  - Task overview cards
  - Task management tab
  - Team members tab
  - Rankings/leaderboard tab

## 🎨 Design System

- Modern glassmorphism with gradients
- Purple/blue color scheme
- Light and dark mode support
- Responsive design for all devices
- Smooth animations and transitions

## 🔐 Security

- Passwords hashed with bcrypt (10 rounds)
- Role-based access control
- Activity logging for audit trail
- Input validation on all endpoints

## 📊 Data Migration

Import data from Google Sheets using:

```bash
POST /api/import
{
  "users": [...],
  "tasks": [...]
}
```

## 🚀 Deployment

### Free Options:
1. **Vercel** (Recommended)
   - Push to GitHub
   - Connect to Vercel
   - Auto-deployed

2. **Railway/Render**
   - For PostgreSQL database
   - Easy deployment

## 📝 Environment Variables

Create `.env` file:

```env
DATABASE_URL="file:./dev.db"
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

MIT License - feel free to use this project!

## 🎯 Future Enhancements

- [ ] Real-time notifications
- [ ] File attachments on tasks
- [ ] Calendar integration
- [ ] Advanced analytics dashboard
- [ ] Mobile app
- [ ] Email notifications
- [ ] Slack/Teams integration

## 👨‍💻 Development

```bash
# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 📞 Support

For issues and questions, please open an issue on GitHub.

---

**Built with ❤️ for modern teams**
