import Link from 'next/link'
import { Bot, Zap, Shield, ShoppingCart, Settings, ArrowRight, Check, Github } from 'lucide-react'
import { NeoButton } from '@/components/ui/neo-button'
import { NeoCard, NeoCardContent } from '@/components/ui/neo-card'

const features = [
  {
    icon: Bot,
    title: 'Bot Telegram',
    description: 'Buat bot Telegram dengan mudah untuk menerima pesanan otomatis dari pelanggan Anda',
    color: 'bg-primary',
  },
  {
    icon: ShoppingCart,
    title: 'Auto Order',
    description: 'Sistem pesanan otomatis yang memproses order pelanggan 24/7 tanpa henti',
    color: 'bg-secondary',
  },
  {
    icon: Settings,
    title: 'Kelola Produk',
    description: 'Dashboard lengkap untuk mengelola produk, harga, dan stok dengan mudah',
    color: 'bg-accent',
  },
  {
    icon: Shield,
    title: 'Aman & Terpercaya',
    description: 'Data Anda tersimpan aman dengan enkripsi dan backup otomatis ke GitHub',
    color: 'bg-success',
  },
]

const steps = [
  { number: '01', title: 'Daftar Akun', description: 'Buat akun gratis dalam hitungan detik' },
  { number: '02', title: 'Setup Bot', description: 'Masukkan token bot dari BotFather' },
  { number: '03', title: 'Tambah Produk', description: 'Upload produk yang ingin dijual' },
  { number: '04', title: 'Mulai Jualan', description: 'Bot siap menerima pesanan otomatis' },
]

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 bg-card neo-border-4 border-t-0">
        <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary neo-border-2 flex items-center justify-center">
              <Bot className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="font-black text-xl uppercase tracking-tight">SewaBot</span>
          </Link>
          
          <div className="flex items-center gap-3">
            <Link href="/login">
              <NeoButton variant="outline">Masuk</NeoButton>
            </Link>
            <Link href="/register">
              <NeoButton>Daftar</NeoButton>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="inline-block bg-accent neo-border-2 px-4 py-2 mb-6">
                <span className="font-bold uppercase text-sm text-accent-foreground">
                  Platform Bot Auto Order #1
                </span>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-black uppercase leading-tight mb-6 text-balance">
                Otomatisasi <span className="text-primary">Jualan</span> dengan Bot Telegram
              </h1>
              
              <p className="text-lg text-muted-foreground mb-8 text-pretty">
                Buat bot Telegram sendiri untuk menerima pesanan otomatis. 
                Kelola produk, pantau pesanan, dan tingkatkan penjualan Anda 24/7.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link href="/register">
                  <NeoButton size="lg">
                    Mulai Gratis
                    <ArrowRight className="w-5 h-5" />
                  </NeoButton>
                </Link>
                <Link href="/login">
                  <NeoButton variant="outline" size="lg">
                    Lihat Demo
                  </NeoButton>
                </Link>
              </div>
              
              <div className="flex items-center gap-6 mt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-success" />
                  <span>Gratis Selamanya</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="w-5 h-5 text-success" />
                  <span>Tanpa Kartu Kredit</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-primary neo-border-4 neo-shadow-xl p-8">
                <div className="bg-card neo-border-2 p-4 mb-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 bg-secondary neo-border flex items-center justify-center">
                      <Bot className="w-6 h-6 text-secondary-foreground" />
                    </div>
                    <div>
                      <p className="font-bold">AutoOrderBot</p>
                      <p className="text-xs text-muted-foreground">Online</p>
                    </div>
                  </div>
                  <div className="bg-muted neo-border p-3 text-sm">
                    Halo! Selamat datang di toko kami. Ketik /menu untuk melihat produk.
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <div className="flex-1 bg-accent neo-border-2 p-3 text-center">
                    <p className="font-black text-2xl text-accent-foreground">1,234</p>
                    <p className="text-xs uppercase text-accent-foreground/70">Pesanan</p>
                  </div>
                  <div className="flex-1 bg-success neo-border-2 p-3 text-center">
                    <p className="font-black text-2xl text-success-foreground">Rp 50M</p>
                    <p className="text-xs uppercase text-success-foreground/70">Omset</p>
                  </div>
                </div>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-secondary neo-border-2" />
              <div className="absolute -bottom-4 -left-4 w-8 h-8 bg-accent neo-border-2" />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-card neo-border-4 border-l-0 border-r-0">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black uppercase mb-4">
              Fitur Lengkap
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Semua yang Anda butuhkan untuk menjalankan bisnis auto order dengan bot Telegram
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {features.map((feature, index) => (
              <NeoCard key={index} className="bg-background neo-hover cursor-pointer">
                <NeoCardContent className="flex flex-col items-center text-center">
                  <div className={`w-16 h-16 ${feature.color} neo-border-2 flex items-center justify-center mb-4`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="font-black text-lg uppercase mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </NeoCardContent>
              </NeoCard>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl lg:text-4xl font-black uppercase mb-4">
              Cara Kerja
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Hanya butuh 4 langkah sederhana untuk memulai bisnis auto order Anda
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <NeoCard className={index % 2 === 0 ? 'bg-primary text-primary-foreground' : 'bg-secondary text-secondary-foreground'}>
                  <NeoCardContent>
                    <span className="text-5xl font-black opacity-30">{step.number}</span>
                    <h3 className="font-black text-lg uppercase mt-2">{step.title}</h3>
                    <p className="text-sm opacity-80 mt-1">{step.description}</p>
                  </NeoCardContent>
                </NeoCard>
                
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-2 transform -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-4">
          <NeoCard className="bg-accent">
            <NeoCardContent className="text-center py-8">
              <Zap className="w-16 h-16 mx-auto mb-4 text-accent-foreground" />
              <h2 className="text-3xl lg:text-4xl font-black uppercase mb-4 text-accent-foreground">
                Siap Mulai Jualan?
              </h2>
              <p className="text-accent-foreground/80 mb-8 max-w-xl mx-auto">
                Daftar sekarang dan buat bot auto order pertama Anda dalam hitungan menit!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link href="/register">
                  <NeoButton size="lg" className="bg-foreground text-background hover:bg-foreground/90">
                    Daftar Gratis
                    <ArrowRight className="w-5 h-5" />
                  </NeoButton>
                </Link>
              </div>
            </NeoCardContent>
          </NeoCard>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-card neo-border-4 border-b-0 border-l-0 border-r-0">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-primary neo-border flex items-center justify-center">
                <Bot className="w-4 h-4 text-primary-foreground" />
              </div>
              <span className="font-black uppercase">SewaBot</span>
            </div>
            
            <p className="text-sm text-muted-foreground">
              2024 SewaBot. Platform Bot Auto Order.
            </p>
            
            <div className="flex items-center gap-4">
              <a href="#" className="text-muted-foreground hover:text-foreground">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
