import { redirect } from 'next/navigation'
import { Package, ShoppingCart, DollarSign, Bot, TrendingUp, Clock } from 'lucide-react'
import { getSession } from '@/lib/auth'
import { getDashboardStats, getOrders } from '@/lib/github-db'
import { StatsCard } from '@/components/dashboard/StatsCard'
import { NeoCard, NeoCardHeader, NeoCardTitle, NeoCardContent } from '@/components/ui/neo-card'
import { NeoBadge } from '@/components/ui/neo-badge'
import { ORDER_STATUS } from '@/lib/constants'
import Link from 'next/link'
import { NeoButton } from '@/components/ui/neo-button'

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(amount)
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default async function DashboardPage() {
  const session = await getSession()
  
  if (!session) {
    redirect('/login')
  }

  const stats = await getDashboardStats(session.id)
  const orders = await getOrders(session.id)
  const recentOrders = orders.slice(-5).reverse()

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-black uppercase tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">Ringkasan aktivitas bot Anda</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Produk"
          value={stats.totalProducts}
          icon={Package}
          variant="primary"
          description={`${stats.activeProducts} produk aktif`}
        />
        <StatsCard
          title="Total Pesanan"
          value={stats.totalOrders}
          icon={ShoppingCart}
          variant="secondary"
          description={`${stats.pendingOrders} menunggu proses`}
        />
        <StatsCard
          title="Pendapatan"
          value={formatCurrency(stats.totalRevenue)}
          icon={DollarSign}
          variant="success"
          description={`${stats.completedOrders} pesanan selesai`}
        />
        <StatsCard
          title="Status Bot"
          value={stats.isBotActive ? 'Aktif' : 'Nonaktif'}
          icon={Bot}
          variant={stats.isBotActive ? 'accent' : 'warning'}
          description={stats.isBotActive ? 'Bot berjalan normal' : 'Konfigurasi diperlukan'}
        />
      </div>

      {/* Quick Actions */}
      <NeoCard>
        <NeoCardHeader>
          <NeoCardTitle>Aksi Cepat</NeoCardTitle>
        </NeoCardHeader>
        <NeoCardContent>
          <div className="flex flex-wrap gap-3">
            <Link href="/dashboard/products/new">
              <NeoButton variant="default">
                <Package className="w-5 h-5" />
                Tambah Produk
              </NeoButton>
            </Link>
            <Link href="/dashboard/orders">
              <NeoButton variant="secondary">
                <ShoppingCart className="w-5 h-5" />
                Lihat Pesanan
              </NeoButton>
            </Link>
            <Link href="/dashboard/settings">
              <NeoButton variant="accent">
                <Bot className="w-5 h-5" />
                Pengaturan Bot
              </NeoButton>
            </Link>
          </div>
        </NeoCardContent>
      </NeoCard>

      {/* Recent Orders & Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <NeoCard>
          <NeoCardHeader>
            <NeoCardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              Pesanan Terbaru
            </NeoCardTitle>
          </NeoCardHeader>
          <NeoCardContent>
            {recentOrders.length === 0 ? (
              <p className="text-muted-foreground text-sm">Belum ada pesanan</p>
            ) : (
              <div className="flex flex-col gap-3">
                {recentOrders.map((order) => (
                  <div
                    key={order.id}
                    className="flex items-center justify-between p-3 bg-muted neo-border-2"
                  >
                    <div>
                      <p className="font-bold text-sm">{order.productName}</p>
                      <p className="text-xs text-muted-foreground">
                        {order.buyerName} - {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <NeoBadge
                      variant={
                        order.status === 'completed'
                          ? 'success'
                          : order.status === 'pending'
                          ? 'warning'
                          : order.status === 'cancelled'
                          ? 'destructive'
                          : 'default'
                      }
                    >
                      {ORDER_STATUS[order.status].label}
                    </NeoBadge>
                  </div>
                ))}
              </div>
            )}
          </NeoCardContent>
        </NeoCard>

        <NeoCard>
          <NeoCardHeader>
            <NeoCardTitle className="flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Statistik
            </NeoCardTitle>
          </NeoCardHeader>
          <NeoCardContent>
            <div className="flex flex-col gap-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Produk Aktif</span>
                <div className="flex items-center gap-2">
                  <div className="h-3 bg-primary neo-border" style={{ width: `${Math.min((stats.activeProducts / Math.max(stats.totalProducts, 1)) * 100, 100)}%`, minWidth: '20px' }} />
                  <span className="text-sm font-bold">{stats.activeProducts}/{stats.totalProducts}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Pesanan Selesai</span>
                <div className="flex items-center gap-2">
                  <div className="h-3 bg-success neo-border" style={{ width: `${Math.min((stats.completedOrders / Math.max(stats.totalOrders, 1)) * 100, 100)}%`, minWidth: '20px' }} />
                  <span className="text-sm font-bold">{stats.completedOrders}/{stats.totalOrders}</span>
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Pesanan Pending</span>
                <div className="flex items-center gap-2">
                  <div className="h-3 bg-warning neo-border" style={{ width: `${Math.min((stats.pendingOrders / Math.max(stats.totalOrders, 1)) * 100, 100)}%`, minWidth: '20px' }} />
                  <span className="text-sm font-bold">{stats.pendingOrders}/{stats.totalOrders}</span>
                </div>
              </div>
            </div>
          </NeoCardContent>
        </NeoCard>
      </div>
    </div>
  )
}
