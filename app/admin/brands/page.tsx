'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Link as LinkIcon, Star, Image as ImageIcon, RefreshCw } from 'lucide-react';

export default function BrandManagementPage() {
    const [brands, setBrands] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Form state
    const [editingBrand, setEditingBrand] = useState<any>(null);

    const filteredBrands = brands.filter(b => b.name?.toLowerCase().includes(searchQuery.toLowerCase()));

    const fetchBrands = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/bookmakers');
            if (res.ok) {
                const data = await res.json();
                setBrands(data);
            }
        } catch (error) {
            console.error('Failed to fetch bookmakers:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchBrands();
    }, []);

    const handleCreateNew = () => {
        setEditingBrand({
            _id: null,
            name: '',
            rating: 5.0,
            status: 'Active',
            affiliateUrl: '',
            promoCode: '',
            bonus: 'Welcome Bonus Placeholder',
        });
        setIsFormOpen(true);
    };

    const handleEdit = (brand: any) => {
        setEditingBrand({
            ...brand,
            status: brand.featured ? 'Active' : 'Inactive'
        });
        setIsFormOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this brand? This will break associated affiliate links.')) {
            try {
                const res = await fetch(`/api/bookmakers/${id}`, {
                    method: 'DELETE',
                });
                if (res.ok) {
                    setBrands(brands.filter(b => b._id !== id));
                } else {
                    alert('Failed to delete.');
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    const saveBrand = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const slug = editingBrand.slug || editingBrand.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const payload = {
                ...editingBrand,
                slug,
                logo: editingBrand.logo || 'placeholder',
                reviewUrl: editingBrand.reviewUrl || `/bookmakers/${slug}`,
                featured: editingBrand.status === 'Active'
            };

            const isUpdate = !!editingBrand._id;
            const url = isUpdate ? `/api/bookmakers/${editingBrand._id}` : '/api/bookmakers';
            const method = isUpdate ? 'PUT' : 'POST';

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || 'Failed to save');
            }

            await fetchBrands();
            setIsFormOpen(false);
        } catch (error: any) {
            alert(error.message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-fade-in relative h-full">

            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white mb-1">Brand Management</h1>
                    <p className="text-[#b0b0b0]">Onboard, rate, and manage affiliate tracking for betting operators.</p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={fetchBrands}
                        className="p-3 bg-[#222] border border-[#333] hover:bg-[#333] rounded-lg transition-colors text-white"
                        title="Refresh Data"
                    >
                        <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
                    </button>
                    <button
                        onClick={handleCreateNew}
                        className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                        <Plus size={18} /> Add New Brand
                    </button>
                </div>
            </div>

            {/* Main Content vs Form Layout */}
            {isFormOpen ? (
                // BRAND FORM
                <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6 lg:p-8 animate-fade-in">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#333]">
                        <h2 className="text-xl font-bold text-white">
                            {editingBrand._id ? `Edit Brand: ${editingBrand.name}` : 'Onboard New Brand'}
                        </h2>
                        <button onClick={() => setIsFormOpen(false)} className="text-[#b0b0b0] hover:text-white font-bold">Cancel</button>
                    </div>

                    <form onSubmit={saveBrand} className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                        {/* Left Column: Basic Info */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-[#b0b0b0] mb-2">Brand Name</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-[#222] border border-[#444] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#d4af37]"
                                        value={editingBrand.name}
                                        onChange={(e) => setEditingBrand({ ...editingBrand, name: e.target.value })}
                                        placeholder="e.g. Bet365"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#b0b0b0] mb-2">Rating (0 - 10)</label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            min="0" max="10" step="0.1" required
                                            className="w-full bg-[#222] border border-[#444] rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#d4af37]"
                                            value={editingBrand.rating}
                                            onChange={(e) => setEditingBrand({ ...editingBrand, rating: parseFloat(e.target.value) })}
                                        />
                                        <Star className="absolute left-3 top-1/2 -translate-y-1/2 text-[#d4af37]" size={18} />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-[#b0b0b0] mb-2">Bonus Headline</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full bg-[#222] border border-[#444] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#d4af37]"
                                        value={editingBrand.bonus}
                                        onChange={(e) => setEditingBrand({ ...editingBrand, bonus: e.target.value })}
                                        placeholder="100% up to $100"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#b0b0b0] mb-2">Exclusive Promo Code (Optional)</label>
                                    <input
                                        type="text"
                                        className="w-full bg-[#222] border border-[#444] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#d4af37] font-mono"
                                        value={editingBrand.promoCode}
                                        onChange={(e) => setEditingBrand({ ...editingBrand, promoCode: e.target.value })}
                                        placeholder="e.g. MIGHTY250"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#b0b0b0] mb-2">Affiliate Tracking URL</label>
                                <div className="relative">
                                    <input
                                        type="url" required
                                        className="w-full bg-[#222] border border-[#444] rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#d4af37]"
                                        value={editingBrand.affiliateUrl}
                                        onChange={(e) => setEditingBrand({ ...editingBrand, affiliateUrl: e.target.value })}
                                        placeholder="https://affiliate.example.com/track?id=..."
                                    />
                                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777]" size={18} />
                                </div>
                            </div>
                        </div>

                        {/* Right Column: Assets & Status */}
                        <div className="space-y-6">
                            <div className="bg-[#222] border border-[#444] rounded-xl p-6">
                                <h3 className="font-bold text-white mb-4">Brand Status</h3>
                                <select
                                    className="w-full bg-[#1a1a1a] border border-[#444] rounded py-3 px-4 text-white font-bold outline-none focus:border-[#d4af37]"
                                    value={editingBrand.status}
                                    onChange={(e) => setEditingBrand({ ...editingBrand, status: e.target.value })}
                                >
                                    <option value="Active">Active (Featured)</option>
                                    <option value="Inactive">Inactive (Hidden)</option>
                                </select>
                            </div>

                            <button type="submit" disabled={isSaving} className="btn-gold w-full py-4 text-lg disabled:opacity-50">
                                {isSaving ? 'Saving...' : 'Save Brand Integration'}
                            </button>
                        </div>
                    </form>
                </div>
            ) : (
                // BRAND LIST
                <>
                    <div className="bg-[#1a1a1a] border border-[#333] p-4 rounded-xl flex gap-4">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search brands..."
                                className="w-full bg-[#222] border border-[#444] rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777]" size={18} />
                        </div>
                    </div>

                    <div className="bg-[#1a1a1a] border border-[#333] rounded-xl overflow-hidden">
                        {isLoading ? (
                            <div className="p-12 flex justify-center text-[#d4af37]">
                                <RefreshCw size={32} className="animate-spin" />
                            </div>
                        ) : (
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#222] border-b border-[#333]">
                                        <th className="p-4 text-sm font-bold text-[#b0b0b0] uppercase tracking-wider">Brand Name</th>
                                        <th className="p-4 text-sm font-bold text-[#b0b0b0] uppercase tracking-wider">Bonus</th>
                                        <th className="p-4 text-sm font-bold text-[#b0b0b0] uppercase tracking-wider">Rating</th>
                                        <th className="p-4 text-sm font-bold text-[#b0b0b0] uppercase tracking-wider">Status</th>
                                        <th className="p-4 text-sm font-bold text-[#b0b0b0] uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#333]">
                                    {filteredBrands.map((brand) => (
                                        <tr key={brand._id || brand.slug} className="hover:bg-[#222]/50 transition-colors group">
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-white text-base">{brand.name}</span>
                                                    <span className="text-xs text-[#777]">{brand.slug}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-[#b0b0b0] truncate max-w-[200px]">{brand.bonus}</td>
                                            <td className="p-4">
                                                <div className="flex items-center gap-1 font-bold text-[#d4af37]">
                                                    {brand.rating?.toFixed(1)} <Star size={14} fill="#d4af37" />
                                                </div>
                                            </td>
                                            <td className="p-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${brand.featured ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'
                                                    }`}>
                                                    {brand.featured ? 'Active' : 'Hidden'}
                                                </span>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleEdit(brand)}
                                                        className="p-2 text-[#0066cc] hover:bg-[#0066cc]/10 rounded"
                                                        title="Edit Brand"
                                                    >
                                                        <Edit size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(brand._id)}
                                                        className="p-2 text-red-400 hover:bg-red-400/10 rounded"
                                                        title="Delete Brand"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredBrands.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="text-center p-8 text-[#777]">No brands found in the database. Add one to get started!</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        )}
                    </div>
                </>
            )}

        </div>
    );
}
