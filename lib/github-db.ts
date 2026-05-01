import { GITHUB_CONFIG } from './constants'
import type { Database, User, BotSettings, Product, Order } from '@/types'

const defaultDatabase: Database = {
  users: [],
  botSettings: [],
  products: [],
  orders: [],
}

async function getGitHubHeaders() {
  return {
    Authorization: `Bearer ${GITHUB_CONFIG.token}`,
    Accept: 'application/vnd.github.v3+json',
    'Content-Type': 'application/json',
  }
}

async function getFileContent(): Promise<{ content: Database; sha: string | null }> {
  if (!GITHUB_CONFIG.token || !GITHUB_CONFIG.owner || !GITHUB_CONFIG.repo) {
    // Return default database if GitHub is not configured
    return { content: defaultDatabase, sha: null }
  }

  try {
    const url = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.dataPath}?ref=${GITHUB_CONFIG.branch}`
    const response = await fetch(url, {
      headers: await getGitHubHeaders(),
      cache: 'no-store',
    })

    if (response.status === 404) {
      // File doesn't exist, create it
      await createFile()
      return { content: defaultDatabase, sha: null }
    }

    if (!response.ok) {
      console.error('GitHub API error:', response.status, await response.text())
      return { content: defaultDatabase, sha: null }
    }

    const data = await response.json()
    const content = JSON.parse(Buffer.from(data.content, 'base64').toString('utf-8'))
    return { content, sha: data.sha }
  } catch (error) {
    console.error('Error fetching database:', error)
    return { content: defaultDatabase, sha: null }
  }
}

async function createFile(): Promise<void> {
  if (!GITHUB_CONFIG.token || !GITHUB_CONFIG.owner || !GITHUB_CONFIG.repo) {
    return
  }

  try {
    const url = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.dataPath}`
    const content = Buffer.from(JSON.stringify(defaultDatabase, null, 2)).toString('base64')

    await fetch(url, {
      method: 'PUT',
      headers: await getGitHubHeaders(),
      body: JSON.stringify({
        message: 'Initialize database',
        content,
        branch: GITHUB_CONFIG.branch,
      }),
    })
  } catch (error) {
    console.error('Error creating database file:', error)
  }
}

async function updateFile(database: Database, sha: string | null): Promise<boolean> {
  if (!GITHUB_CONFIG.token || !GITHUB_CONFIG.owner || !GITHUB_CONFIG.repo) {
    return false
  }

  try {
    const url = `https://api.github.com/repos/${GITHUB_CONFIG.owner}/${GITHUB_CONFIG.repo}/contents/${GITHUB_CONFIG.dataPath}`
    const content = Buffer.from(JSON.stringify(database, null, 2)).toString('base64')

    const body: Record<string, unknown> = {
      message: `Update database - ${new Date().toISOString()}`,
      content,
      branch: GITHUB_CONFIG.branch,
    }

    if (sha) {
      body.sha = sha
    }

    const response = await fetch(url, {
      method: 'PUT',
      headers: await getGitHubHeaders(),
      body: JSON.stringify(body),
    })

    return response.ok
  } catch (error) {
    console.error('Error updating database:', error)
    return false
  }
}

// Generate unique ID
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

// User operations
export async function getUsers(): Promise<User[]> {
  const { content } = await getFileContent()
  return content.users
}

export async function getUserByEmail(email: string): Promise<User | null> {
  const { content } = await getFileContent()
  return content.users.find((u) => u.email === email) || null
}

export async function getUserById(id: string): Promise<User | null> {
  const { content } = await getFileContent()
  return content.users.find((u) => u.id === id) || null
}

export async function createUser(userData: Omit<User, 'id' | 'createdAt' | 'updatedAt'>): Promise<User | null> {
  const { content, sha } = await getFileContent()
  
  const existingUser = content.users.find((u) => u.email === userData.email)
  if (existingUser) {
    return null
  }

  const now = new Date().toISOString()
  const newUser: User = {
    ...userData,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  }

  content.users.push(newUser)
  const success = await updateFile(content, sha)
  return success ? newUser : null
}

export async function updateUser(id: string, userData: Partial<User>): Promise<User | null> {
  const { content, sha } = await getFileContent()
  const index = content.users.findIndex((u) => u.id === id)
  
  if (index === -1) return null

  content.users[index] = {
    ...content.users[index],
    ...userData,
    updatedAt: new Date().toISOString(),
  }

  const success = await updateFile(content, sha)
  return success ? content.users[index] : null
}

// Bot Settings operations
export async function getBotSettings(userId: string): Promise<BotSettings | null> {
  const { content } = await getFileContent()
  return content.botSettings.find((s) => s.userId === userId) || null
}

export async function createOrUpdateBotSettings(
  userId: string,
  settings: Omit<BotSettings, 'id' | 'userId' | 'createdAt' | 'updatedAt'>
): Promise<BotSettings | null> {
  const { content, sha } = await getFileContent()
  const index = content.botSettings.findIndex((s) => s.userId === userId)
  const now = new Date().toISOString()

  if (index === -1) {
    const newSettings: BotSettings = {
      ...settings,
      id: generateId(),
      userId,
      createdAt: now,
      updatedAt: now,
    }
    content.botSettings.push(newSettings)
    const success = await updateFile(content, sha)
    return success ? newSettings : null
  } else {
    content.botSettings[index] = {
      ...content.botSettings[index],
      ...settings,
      updatedAt: now,
    }
    const success = await updateFile(content, sha)
    return success ? content.botSettings[index] : null
  }
}

// Product operations
export async function getProducts(userId: string): Promise<Product[]> {
  const { content } = await getFileContent()
  return content.products.filter((p) => p.userId === userId)
}

export async function getProductById(id: string): Promise<Product | null> {
  const { content } = await getFileContent()
  return content.products.find((p) => p.id === id) || null
}

export async function createProduct(
  productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>
): Promise<Product | null> {
  const { content, sha } = await getFileContent()
  const now = new Date().toISOString()

  const newProduct: Product = {
    ...productData,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  }

  content.products.push(newProduct)
  const success = await updateFile(content, sha)
  return success ? newProduct : null
}

export async function updateProduct(id: string, productData: Partial<Product>): Promise<Product | null> {
  const { content, sha } = await getFileContent()
  const index = content.products.findIndex((p) => p.id === id)

  if (index === -1) return null

  content.products[index] = {
    ...content.products[index],
    ...productData,
    updatedAt: new Date().toISOString(),
  }

  const success = await updateFile(content, sha)
  return success ? content.products[index] : null
}

export async function deleteProduct(id: string): Promise<boolean> {
  const { content, sha } = await getFileContent()
  const index = content.products.findIndex((p) => p.id === id)

  if (index === -1) return false

  content.products.splice(index, 1)
  return await updateFile(content, sha)
}

// Order operations
export async function getOrders(userId: string): Promise<Order[]> {
  const { content } = await getFileContent()
  return content.orders.filter((o) => o.userId === userId)
}

export async function getOrderById(id: string): Promise<Order | null> {
  const { content } = await getFileContent()
  return content.orders.find((o) => o.id === id) || null
}

export async function createOrder(orderData: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order | null> {
  const { content, sha } = await getFileContent()
  const now = new Date().toISOString()

  const newOrder: Order = {
    ...orderData,
    id: generateId(),
    createdAt: now,
    updatedAt: now,
  }

  content.orders.push(newOrder)
  const success = await updateFile(content, sha)
  return success ? newOrder : null
}

export async function updateOrder(id: string, orderData: Partial<Order>): Promise<Order | null> {
  const { content, sha } = await getFileContent()
  const index = content.orders.findIndex((o) => o.id === id)

  if (index === -1) return null

  content.orders[index] = {
    ...content.orders[index],
    ...orderData,
    updatedAt: new Date().toISOString(),
  }

  const success = await updateFile(content, sha)
  return success ? content.orders[index] : null
}

export async function deleteOrder(id: string): Promise<boolean> {
  const { content, sha } = await getFileContent()
  const index = content.orders.findIndex((o) => o.id === id)

  if (index === -1) return false

  content.orders.splice(index, 1)
  return await updateFile(content, sha)
}

// Stats
export async function getDashboardStats(userId: string) {
  const { content } = await getFileContent()
  const products = content.products.filter((p) => p.userId === userId)
  const orders = content.orders.filter((o) => o.userId === userId)
  const botSettings = content.botSettings.find((s) => s.userId === userId)

  const totalProducts = products.length
  const activeProducts = products.filter((p) => p.isActive).length
  const totalOrders = orders.length
  const pendingOrders = orders.filter((o) => o.status === 'pending').length
  const completedOrders = orders.filter((o) => o.status === 'completed').length
  const totalRevenue = orders
    .filter((o) => o.status === 'completed')
    .reduce((sum, o) => sum + o.totalPrice, 0)
  const isBotActive = botSettings?.isActive || false

  return {
    totalProducts,
    activeProducts,
    totalOrders,
    pendingOrders,
    completedOrders,
    totalRevenue,
    isBotActive,
  }
}
