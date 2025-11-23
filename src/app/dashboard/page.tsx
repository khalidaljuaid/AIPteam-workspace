'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

interface User {
    id: string
    email: string
    role: string
    firstName?: string | null
    lastName?: string | null
}

interface Task {
    id: string
    title: string
    description?: string | null
    status: string
    priority: string
    dueDate?: string | null
    assignedTo?: {
        id: string
        firstName?: string | null
        lastName?: string | null
    } | null
}

export default function DashboardPage() {
    const [user, setUser] = useState<User | null>(null)
    const [tasks, setTasks] = useState<Task[]>([])
    const [users, setUsers] = useState<User[]>([])
    const [stats, setStats] = useState({
        total: 0,
        todo: 0,
        inProgress: 0,
        completed: 0,
    })
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState<'tasks' | 'users' | 'rankings'>(
        'tasks'
    )
    const router = useRouter()

    useEffect(() => {
        // Check authentication
        const userData = localStorage.getItem('user')
        if (!userData) {
            router.push('/')
            return
        }

        const parsedUser = JSON.parse(userData)
        setUser(parsedUser)

        // Fetch data
        fetchTasks()
        fetchUsers()
    }, [router])

    const fetchTasks = async () => {
        try {
            const res = await fetch('/api/tasks')
            const data = await res.json()

            if (res.ok) {
                setTasks(data.tasks)

                // Calculate stats
                const total = data.tasks.length
                const todo = data.tasks.filter((t: Task) => t.status === 'TODO').length
                const inProgress = data.tasks.filter(
                    (t: Task) => t.status === 'IN_PROGRESS'
                ).length
                const completed = data.tasks.filter(
                    (t: Task) => t.status === 'COMPLETED'
                ).length

                setStats({ total, todo, inProgress, completed })
            }
        } catch (error) {
            console.error('Error fetching tasks:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchUsers = async () => {
        try {
            const res = await fetch('/api/users')
            const data = await res.json()

            if (res.ok) {
                setUsers(data.users)
            }
        } catch (error) {
            console.error('Error fetching users:', error)
        }
    }

    const handleLogout = () => {
        localStorage.removeItem('user')
        router.push('/')
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'TODO':
                return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
            case 'IN_PROGRESS':
                return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
            case 'REVIEW':
                return 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300'
            case 'COMPLETED':
                return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
            default:
                return 'bg-gray-100 text-gray-700'
        }
    }

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'LOW':
                return 'text-green-600'
            case 'MEDIUM':
                return 'text-yellow-600'
            case 'HIGH':
                return 'text-orange-600'
            case 'CRITICAL':
                return 'text-red-600'
            default:
                return 'text-gray-600'
        }
    }

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case 'PRESIDENT':
                return 'bg-purple-100 text-purple-700 dark:bg-purple-900 dark:text-purple-300'
            case 'VICE_PRESIDENT':
                return 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
            case 'LEADER':
                return 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
            default:
                return 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300'
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                    <p className="mt-4 text-muted-foreground">Loading dashboard...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-pink-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
            {/* Header */}
            <header className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm border-b sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex justify-between items-center">
                        <div>
                            <h1 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                                Team Workspace
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Welcome back, {user?.firstName || user?.email}
                            </p>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="text-right">
                                <p className="text-sm font-medium">{user?.email}</p>
                                <p className="text-xs text-muted-foreground">
                                    {user?.role.replace('_', ' ')}
                                </p>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="btn-secondary text-sm"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="card p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Total Tasks</p>
                                <p className="text-3xl font-bold">{stats.total}</p>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-purple-100 dark:bg-purple-900 flex items-center justify-center">
                                <span className="text-2xl">📋</span>
                            </div>
                        </div>
                    </div>

                    <div className="card p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">To Do</p>
                                <p className="text-3xl font-bold">{stats.todo}</p>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
                                <span className="text-2xl">📝</span>
                            </div>
                        </div>
                    </div>

                    <div className="card p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">In Progress</p>
                                <p className="text-3xl font-bold">{stats.inProgress}</p>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900 flex items-center justify-center">
                                <span className="text-2xl">⚡</span>
                            </div>
                        </div>
                    </div>

                    <div className="card p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Completed</p>
                                <p className="text-3xl font-bold">{stats.completed}</p>
                            </div>
                            <div className="h-12 w-12 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center">
                                <span className="text-2xl">✅</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="mb-6">
                    <div className="flex gap-4 border-b">
                        <button
                            onClick={() => setActiveTab('tasks')}
                            className={`px-4 py-2 font-medium transition-colors ${activeTab === 'tasks'
                                    ? 'border-b-2 border-primary text-primary'
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            Tasks
                        </button>
                        <button
                            onClick={() => setActiveTab('users')}
                            className={`px-4 py-2 font-medium transition-colors ${activeTab === 'users'
                                    ? 'border-b-2 border-primary text-primary'
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            Team Members
                        </button>
                        <button
                            onClick={() => setActiveTab('rankings')}
                            className={`px-4 py-2 font-medium transition-colors ${activeTab === 'rankings'
                                    ? 'border-b-2 border-primary text-primary'
                                    : 'text-muted-foreground hover:text-foreground'
                                }`}
                        >
                            Rankings
                        </button>
                    </div>
                </div>

                {/* Tasks Tab */}
                {activeTab === 'tasks' && (
                    <div className="card p-6">
                        <h2 className="text-xl font-bold mb-4">All Tasks</h2>
                        <div className="space-y-3">
                            {tasks.length === 0 ? (
                                <p className="text-center text-muted-foreground py-8">
                                    No tasks yet. Create your first task to get started!
                                </p>
                            ) : (
                                tasks.map((task) => (
                                    <div
                                        key={task.id}
                                        className="p-4 rounded-lg border hover:shadow-md transition-shadow bg-white/50 dark:bg-gray-800/50"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-lg">{task.title}</h3>
                                                {task.description && (
                                                    <p className="text-sm text-muted-foreground mt-1">
                                                        {task.description}
                                                    </p>
                                                )}
                                                <div className="flex gap-2 mt-3">
                                                    <span
                                                        className={`px-2 py-1 text-xs font-medium rounded ${getStatusColor(
                                                            task.status
                                                        )}`}
                                                    >
                                                        {task.status.replace('_', ' ')}
                                                    </span>
                                                    <span
                                                        className={`px-2 py-1 text-xs font-medium ${getPriorityColor(
                                                            task.priority
                                                        )}`}
                                                    >
                                                        {task.priority}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-right text-sm">
                                                {task.assignedTo && (
                                                    <p className="text-muted-foreground">
                                                        👤{' '}
                                                        {task.assignedTo.firstName ||
                                                            task.assignedTo.lastName ||
                                                            'Assigned'}
                                                    </p>
                                                )}
                                                {task.dueDate && (
                                                    <p className="text-xs text-muted-foreground mt-1">
                                                        📅{' '}
                                                        {new Date(task.dueDate).toLocaleDateString()}
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                )}

                {/* Users Tab */}
                {activeTab === 'users' && (
                    <div className="card p-6">
                        <h2 className="text-xl font-bold mb-4">
                            Team Members ({users.length})
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {users.map((member) => (
                                <div
                                    key={member.id}
                                    className="p-4 rounded-lg border bg-white/50 dark:bg-gray-800/50"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="h-10 w-10 rounded-full bg-gradient-to-br from-purple-400 to-blue-400 flex items-center justify-center text-white font-bold">
                                            {member.firstName?.[0] || member.email[0].toUpperCase()}
                                        </div>
                                        <div className="flex-1">
                                            <p className="font-medium">
                                                {member.firstName && member.lastName
                                                    ? `${member.firstName} ${member.lastName}`
                                                    : member.email}
                                            </p>
                                            <p className="text-xs text-muted-foreground">
                                                {member.email}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-3">
                                        <span
                                            className={`px-2 py-1 text-xs font-medium rounded ${getRoleBadgeColor(
                                                member.role
                                            )}`}
                                        >
                                            {member.role.replace('_', ' ')}
                                        </span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Rankings Tab */}
                {activeTab === 'rankings' && (
                    <div className="card p-6">
                        <h2 className="text-xl font-bold mb-4">Team Rankings</h2>
                        <div className="text-center py-12">
                            <span className="text-6xl mb-4 block">🏆</span>
                            <p className="text-muted-foreground">
                                Rankings feature coming soon!
                            </p>
                            <p className="text-sm text-muted-foreground mt-2">
                                Leaders and administrators will be able to assess team member
                                performance here.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
