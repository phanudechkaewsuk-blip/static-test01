'use client';

import { useState } from 'react';

// ข้อมูลสินค้าตัวอย่างสำหรับทดสอบระบบ
const INITIAL_PRODUCTS = [
  { id: 1, name: 'เสื้อยืด Oversize สไตล์เกาหลี', price: 350, store: 'Store A', category: 'แฟชั่น' },
  { id: 2, name: 'หูฟังบลูทูธไร้สาย เสียงเบสแน่น', price: 890, store: 'Tech Gadget', category: 'ไอที' },
  { id: 3, name: 'กระเป๋าผ้า Canvas ดีไซน์มินิมอล', price: 220, store: 'Bag Shop', category: 'แฟชั่น' },
  { id: 4, name: '100% Organic Coffee Beans (เมล็ดกาแฟ)', price: 450, store: 'Coffee Farm', category: 'อาหาร' },
];

export default function MarketplaceHome() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('ทั้งหมด');

  const categories = ['ทั้งหมด', 'แฟชั่น', 'ไอที', 'อาหาร'];

  // กรองสินค้าตามคำค้นหาและหมวดหมู่
  const filteredProducts = INITIAL_PRODUCTS.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'ทั้งหมด' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header / Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <h1 className="text-2xl font-bold text-blue-600">MultiVendor Mall</h1>
          
          {/* ช่องค้นหา */}
          <div className="w-full md:w-1/2">
            <input
              type="text"
              placeholder="ค้นหาสินค้าทั้งหมด..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex gap-4">
            <button className="text-sm font-medium hover:text-blue-600">สมัครผู้ขาย</button>
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700">ตะกร้าสินค้า</button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* แบนเนอร์โปรโมท */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl p-8 mb-8 shadow-md">
          <h2 className="text-3xl font-bold mb-2">แหล่งรวมร้านค้าออนไลน์</h2>
          <p className="text-blue-100">ช้อปสินค้าหลากหลายจากผู้ขายทั่วประเทศ หรือสมัครเปิดร้านค้าของคุณเองได้แล้ววันนี้</p>
        </div>

        {/* หมวดหมู่สินค้า */}
        <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border text-gray-600 hover:bg-gray-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* รายการสินค้า */}
        <h3 className="text-xl font-bold mb-4">สินค้าแนะนำ</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <div key={product.id} className="bg-white border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 bg-gray-200 flex items-center justify-center text-gray-400">
                  รูปสินค้า
                </div>
                <div className="p-4">
                  <span className="text-xs text-blue-600 font-semibold uppercase tracking-wider">{product.store}</span>
                  <h4 className="font-medium text-lg mt-1 mb-2 line-clamp-2">{product.name}</h4>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold text-red-600">฿{product.price.toLocaleString()}</span>
                    <button className="bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-600 hover:text-white transition-colors">
                      + เพิ่มลงตะกร้า
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 col-span-full text-center py-10">ไม่พบสินค้าที่คุณค้นหา</p>
          )}
        </div>
      </main>
    </div>
  );
}