import { Search, BookOpen, Bell, User, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface Book {
  id: number;
  title: string;
  author: string;
  cover: string;
  type: 'digital' | 'physical';
  status: 'available' | 'requested' | 'online' | 'borrowed';
  loanDays?: number;
  returnDate?: string;
}

type FilterTab = 'all' | 'digital' | 'physical' | 'loans';

export default function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<FilterTab>('all');
  const [sortBy, setSortBy] = useState('recent');

  const books: Book[] = [
    {
      id: 1,
      title: 'Introducción a los Algoritmos',
      author: 'Thomas H. Cormen',
      cover: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400',
      type: 'digital',
      status: 'online'
    },
    {
      id: 2,
      title: 'Código Limpio',
      author: 'Robert C. Martin',
      cover: 'https://images.unsplash.com/photo-1471970471555-19d4b113e9ed?w=400',
      type: 'physical',
      status: 'available',
      loanDays: 7
    },
    {
      id: 3,
      title: 'El Programador Pragmático',
      author: 'Andrew Hunt',
      cover: 'https://images.unsplash.com/photo-1632479734663-a742f1c4ef88?w=400',
      type: 'digital',
      status: 'online'
    },
    {
      id: 4,
      title: 'Patrones de Diseño',
      author: 'Erich Gamma',
      cover: 'https://images.unsplash.com/photo-1716892001657-722e6e14ae29?w=400',
      type: 'physical',
      status: 'borrowed',
      returnDate: '24 de Mayo'
    },
    {
      id: 5,
      title: 'JavaScript Avanzado',
      author: 'Kyle Simpson',
      cover: 'https://images.unsplash.com/photo-1647529735054-9b68c881fdc9?w=400',
      type: 'digital',
      status: 'online'
    },
    {
      id: 6,
      title: 'JavaScript Elocuente',
      author: 'Marijn Haverbeke',
      cover: 'https://images.unsplash.com/photo-1773206210829-ff35872d84cb?w=400',
      type: 'physical',
      status: 'available',
      loanDays: 14
    },
    {
      id: 7,
      title: 'Patrones de Diseño Visual',
      author: 'Eric Freeman',
      cover: 'https://images.unsplash.com/photo-1763771234596-8f5b07a2ca8b?w=400',
      type: 'digital',
      status: 'online'
    },
    {
      id: 8,
      title: 'Refactorización',
      author: 'Martin Fowler',
      cover: 'https://images.unsplash.com/photo-1778169964312-fefff846cde8?w=400',
      type: 'physical',
      status: 'available',
      loanDays: 7
    }
  ];

  const filteredBooks = books.filter(book => {
    const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         book.author.toLowerCase().includes(searchQuery.toLowerCase());

    if (activeTab === 'all') return matchesSearch;
    if (activeTab === 'digital') return matchesSearch && book.type === 'digital';
    if (activeTab === 'physical') return matchesSearch && book.type === 'physical';
    if (activeTab === 'loans') return matchesSearch && book.status === 'borrowed';

    return matchesSearch;
  });

  const borrowedBooksCount = books.filter(book => book.status === 'borrowed').length;

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#FFFFFF' }}>
      {/* Top Navigation Bar */}
      <header className="bg-white shadow-sm" style={{ borderBottom: '1px solid #E5E7EB' }}>
        <div className="max-w-7xl mx-auto px-8 py-5">
          <div className="flex items-center justify-between">
            {/* Brand Name */}
            <div className="flex items-center gap-3">
              <BookOpen className="size-8" style={{ color: '#0284C7' }} />
              <h1
                className="text-3xl"
                style={{
                  color: '#111827',
                  fontFamily: 'Georgia, serif'
                }}
              >
                eBook Sharing
              </h1>
            </div>

            {/* User Profile Section */}
            <div className="flex items-center gap-4">
              {/* Notification Bell */}
              <button
                className="relative p-2.5 rounded-full transition-all hover:bg-gray-50"
              >
                <Bell className="size-5" style={{ color: '#6B7280' }} />
                <span
                  className="absolute top-1.5 right-1.5 size-2.5 rounded-full"
                  style={{ backgroundColor: '#EF4444' }}
                />
              </button>

              {/* Profile with Avatar and Name */}
              <div className="flex items-center gap-3">
                <div
                  className="size-11 rounded-full flex items-center justify-center"
                  style={{
                    backgroundColor: '#0284C7',
                    border: '3px solid #DBEAFE'
                  }}
                >
                  <User className="size-6" style={{ color: '#FFFFFF' }} />
                </div>
                <span className="text-sm" style={{ color: '#111827' }}>Evelin V.</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Navigation Tabs */}
      <div className="bg-white" style={{ borderBottom: '2px solid #F3F4F6' }}>
        <div className="max-w-7xl mx-auto px-8">
          <div className="flex gap-1">
            <button
              onClick={() => setActiveTab('all')}
              className="px-6 py-4 transition-all relative rounded-t-2xl"
              style={{
                backgroundColor: activeTab === 'all' ? '#F0F9FF' : 'transparent',
                color: activeTab === 'all' ? '#0284C7' : '#6B7280'
              }}
            >
              Todos los libros
              {activeTab === 'all' && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: '#0284C7' }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('digital')}
              className="px-6 py-4 transition-all relative rounded-t-2xl"
              style={{
                backgroundColor: activeTab === 'digital' ? '#F0FDF4' : 'transparent',
                color: activeTab === 'digital' ? '#16A34A' : '#6B7280'
              }}
            >
              Recursos Digitales
              {activeTab === 'digital' && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: '#16A34A' }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('physical')}
              className="px-6 py-4 transition-all relative rounded-t-2xl"
              style={{
                backgroundColor: activeTab === 'physical' ? '#F0F9FF' : 'transparent',
                color: activeTab === 'physical' ? '#0284C7' : '#6B7280'
              }}
            >
              Libros Físicos
              {activeTab === 'physical' && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: '#0284C7' }}
                />
              )}
            </button>
            <button
              onClick={() => setActiveTab('loans')}
              className="px-6 py-4 transition-all relative rounded-t-2xl flex items-center gap-2"
              style={{
                backgroundColor: activeTab === 'loans' ? '#F0F9FF' : 'transparent',
                color: activeTab === 'loans' ? '#0284C7' : '#6B7280'
              }}
            >
              Mis Préstamos
              {borrowedBooksCount > 0 && (
                <span
                  className="px-2 py-0.5 rounded-full text-xs"
                  style={{
                    backgroundColor: activeTab === 'loans' ? '#0284C7' : '#E5E7EB',
                    color: activeTab === 'loans' ? '#FFFFFF' : '#6B7280'
                  }}
                >
                  {borrowedBooksCount}
                </span>
              )}
              {activeTab === 'loans' && (
                <div
                  className="absolute bottom-0 left-0 right-0 h-0.5"
                  style={{ backgroundColor: '#0284C7' }}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-8 py-8" style={{ backgroundColor: '#FAFAFA' }}>
        {/* Search & Sort Controls */}
        <div className="mb-8">
          <div className="flex gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 size-5" style={{ color: '#9CA3AF' }} />
              <input
                type="text"
                placeholder="Buscar libros, autores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 border outline-none transition-all"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E5E7EB',
                  color: '#111827',
                  borderRadius: '16px'
                }}
                onFocus={(e) => e.target.style.borderColor = '#0284C7'}
                onBlur={(e) => e.target.style.borderColor = '#E5E7EB'}
              />
            </div>

            {/* Sort By Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none pl-4 pr-12 py-3.5 border outline-none transition-all cursor-pointer"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderColor: '#E5E7EB',
                  color: '#111827',
                  minWidth: '200px',
                  borderRadius: '16px'
                }}
              >
                <option value="recent">Más recientes</option>
                <option value="title">Por título</option>
                <option value="author">Por autor</option>
                <option value="popular">Más populares</option>
              </select>
              <ChevronDown
                className="absolute right-4 top-1/2 -translate-y-1/2 size-5 pointer-events-none"
                style={{ color: '#6B7280' }}
              />
            </div>
          </div>
        </div>

        {/* Books Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="bg-white overflow-hidden transition-all hover:shadow-lg cursor-pointer"
              style={{
                borderRadius: '16px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
              }}
            >
              {/* Book Cover */}
              <div className="aspect-[3/4] overflow-hidden" style={{ backgroundColor: '#F9FAFB' }}>
                <img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Book Info */}
              <div className="p-5">
                <h3 className="mb-1 line-clamp-2" style={{ color: '#111827' }}>
                  {book.title}
                </h3>
                <p className="text-sm mb-4" style={{ color: '#6B7280' }}>
                  {book.author}
                </p>

                {/* Status Badge */}
                <div className="mb-3">
                  {book.type === 'digital' && book.status === 'online' && (
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs"
                      style={{
                        backgroundColor: '#DCFCE7',
                        color: '#15803D',
                        borderRadius: '16px'
                      }}
                    >
                      Digital
                    </span>
                  )}
                  {book.type === 'physical' && book.status === 'available' && (
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs"
                      style={{
                        backgroundColor: '#DBEAFE',
                        color: '#0369A1',
                        borderRadius: '16px'
                      }}
                    >
                      Disponible
                    </span>
                  )}
                  {book.type === 'physical' && book.status === 'borrowed' && (
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs"
                      style={{
                        backgroundColor: '#F3F4F6',
                        color: '#4B5563',
                        borderRadius: '16px'
                      }}
                    >
                      Prestado
                    </span>
                  )}
                  {book.type === 'physical' && book.status === 'requested' && (
                    <span
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs"
                      style={{
                        backgroundColor: '#FEF3C7',
                        color: '#92400E',
                        borderRadius: '16px'
                      }}
                    >
                      Solicitado
                    </span>
                  )}
                </div>

                {/* Loan Details for Borrowed Physical Books */}
                {book.type === 'physical' && book.status === 'borrowed' && book.returnDate && (
                  <div className="mb-3">
                    <p className="text-sm" style={{ color: '#4B5563' }}>
                      Regresa el: {book.returnDate}
                    </p>
                  </div>
                )}

                {/* Action Button */}
                <button
                  className="w-full py-2.5 transition-all"
                  style={{
                    backgroundColor: book.type === 'digital' ? '#16A34A' : '#0284C7',
                    color: '#FFFFFF',
                    boxShadow: book.type === 'digital'
                      ? '0 2px 8px rgba(22, 163, 74, 0.25)'
                      : '0 2px 8px rgba(2, 132, 199, 0.25)',
                    borderRadius: '16px'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-2px)';
                    e.currentTarget.style.boxShadow = book.type === 'digital'
                      ? '0 4px 12px rgba(22, 163, 74, 0.35)'
                      : '0 4px 12px rgba(2, 132, 199, 0.35)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = book.type === 'digital'
                      ? '0 2px 8px rgba(22, 163, 74, 0.25)'
                      : '0 2px 8px rgba(2, 132, 199, 0.25)';
                  }}
                  disabled={book.status === 'borrowed'}
                >
                  {book.type === 'digital'
                    ? 'Leer en Línea'
                    : book.status === 'available'
                      ? 'Solicitar Préstamo'
                      : book.status === 'borrowed'
                        ? 'Prestado'
                        : 'Ver Detalles'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredBooks.length === 0 && (
          <div className="text-center py-16 bg-white" style={{ borderRadius: '16px' }}>
            <BookOpen className="size-16 mx-auto mb-4" style={{ color: '#D1D5DB' }} />
            <h3 className="mb-2" style={{ color: '#6B7280' }}>
              {activeTab === 'loans' ? 'No tienes libros prestados' : 'No se encontraron libros'}
            </h3>
            <p className="text-sm" style={{ color: '#9CA3AF' }}>
              {activeTab === 'loans'
                ? 'Explora nuestra colección y solicita tu primer préstamo'
                : 'Intenta ajustar tu búsqueda'}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}