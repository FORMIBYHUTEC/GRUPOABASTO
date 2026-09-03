export interface User {
  username: string
  name: string
  role: string
}

const DEMO_USERS = [
  {
    username: "admin",
    password: "admin123",
    name: "Administrador",
    role: "admin",
  },
  {
    username: "vendedor",
    password: "vendedor123",
    name: "Vendedor Demo",
    role: "vendedor",
  },
]

export function authenticateUser(username: string, password: string): User | null {
  const user = DEMO_USERS.find((u) => u.username === username && u.password === password)
  if (user) {
    return {
      username: user.username,
      name: user.name,
      role: user.role,
    }
  }
  return null
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false
  return localStorage.getItem("crm_user") !== null
}

export function getCurrentUser(): User | null {
  if (typeof window === "undefined") return null
  const userStr = localStorage.getItem("crm_user")
  return userStr ? JSON.parse(userStr) : null
}

export function login(user: User): void {
  localStorage.setItem("crm_user", JSON.stringify(user))
}

export function logout(): void {
  localStorage.removeItem("crm_user")
}
