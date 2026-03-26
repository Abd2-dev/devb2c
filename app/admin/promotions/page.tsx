'use client';

import { useState } from 'react';
import { Plus, Search, Edit, Trash2, Calendar, Target, CheckCircle, XCircle } from 'lucide-react';

const initialPromotions = [
    { id: 1, title: 'Mega Casino Welcome Bonus', brand: 'Bet365', type: 'Deposit Match', status: 'Active', clicks: 1245, conversions: 89, endDate: '2026-12-31' },
    { id: 2, title: 'Free Spins Weekend', brand: '1xBet', type: 'Free Spins', status: 'Active', clicks: 840, conversions: 42, endDate: '2026-03-15' },
    { id: 3, title: 'Champions League Cashback', brand: 'Megapari', type: 'Cashback', status: 'Draft', clicks: 0, conversions: 0, endDate: '2026-06-01' },
    { id: 4, title: 'Christmas Special Hunt', brand: 'Unibet', type: 'Tournament', status: 'Expired', clicks: 5230, conversions: 412, endDate: '2025-12-26' },
];

export default function PromotionsPage() {
    const [promotions, setPromotions] = useState(initialPromotions);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [editingPromotion, setEditingPromotion] = useState<any>(null);

    const filteredPromotions = promotions.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

    const handleCreateNew = () => {
        setEditingPromotion({
            id: Date.now(),
            title: '',
            brand: 'Bet365',
            type: 'Deposit Match',
            status: 'Draft',
            endDate: new Date().toISOString().split('T')[0],
            clicks: 0,
            conversions: 0,
            description: ''
        });
        setIsFormOpen(true);
    };

    const handleEdit = (promo: any) => {
        setEditingPromotion({ ...promo, description: 'Exclusive offer description for this campaign.' });
        setIsFormOpen(true);
    };

    const handleDelete = (id: number) => {
        if (confirm('Delete this promotional campaign? It will be removed from all frontend placements immediately.')) {
            setPromotions(promotions.filter(p => p.id !== id));
        }
    };

    const savePromotion = (e: React.FormEvent) => {
        e.preventDefault();
        if (promotions.find(p => p.id === editingPromotion.id)) {
            setPromotions(promotions.map(p => p.id === editingPromotion.id ? editingPromotion : p));
        } else {
            setPromotions([editingPromotion, ...promotions]);
        }
        setIsFormOpen(false);
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-fade-in relative h-full">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white mb-1">Promotional Management</h1>
                    <p className="text-[#b0b0b0]">Create, execute, and track campaigns (Casino & Sports).</p>
                </div>

                <button
                    onClick={handleCreateNew}
                    className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap"
                >
                    <Plus size={18} /> New Campaign
                </button>
            </div>

            {isFormOpen ? (
                // FORM
                <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6 lg:p-8 animate-fade-in">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#333]">
                        <h2 className="text-xl font-bold text-white">
                            {promotions.find(p => p.id === editingPromotion.id) ? `Edit Campaign: ${editingPromotion.title}` : 'Launch New Campaign'}
                        </h2>
                        <button onClick={() => setIsFormOpen(false)} className="text-[#b0b0b0] hover:text-white font-bold">Cancel</button>
                    </div>

                    <form onSubmit={savePromotion} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        <div className="lg:col-span-2 space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-[#b0b0b0] mb-2">Campaign Title</label>
                                <input
                                    type="text" required
                                    className="w-full bg-[#222] border border-[#444] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#d4af37]"
                                    value={editingPromotion.title}
                                    onChange={(e) => setEditingPromotion({ ...editingPromotion, title: e.target.value })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-[#b0b0b0] mb-2">Associated Brand</label>
                                    <select
                                        className="w-full bg-[#222] border border-[#444] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#d4af37]"
                                        value={editingPromotion.brand}
                                        onChange={(e) => setEditingPromotion({ ...editingPromotion, brand: e.target.value })}
                                    >
                                        <option value="Bet365">Bet365</option>
                                        <option value="1xBet">1xBet</option>
                                        <option value="Megapari">Megapari</option>
                                        <option value="Unibet">Unibet</option>
                                        <option value="General">General (No specific brand)</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#b0b0b0] mb-2">Promo Type</label>
                                    <select
                                        className="w-full bg-[#222] border border-[#444] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#d4af37]"
                                        value={editingPromotion.type}
                                        onChange={(e) => setEditingPromotion({ ...editingPromotion, type: e.target.value })}
                                    >
                                        <option value="Deposit Match">Deposit Match</option>
                                        <option value="Free Spins">Free Spins</option>
                                        <option value="Cashback">Cashback</option>
                                        <option value="Tournament">Tournament</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#b0b0b0] mb-2">Campaign Description</label>
                                <textarea
                                    rows={4}
                                    className="w-full bg-[#222] border border-[#444] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#d4af37] resize-none"
                                    value={editingPromotion.description}
                                    onChange={(e) => setEditingPromotion({ ...editingPromotion, description: e.target.value })}
                                ></textarea>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-[#222] border border-[#444] rounded-xl p-6">
                                <h3 className="font-bold text-white mb-4">Execution Settings</h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-xs font-bold text-[#b0b0b0] mb-2">Campaign Status</label>
                                        <select
                                            className="w-full bg-[#1a1a1a] border border-[#444] rounded py-3 px-4 text-white font-bold outline-none focus:border-[#d4af37]"
                                            value={editingPromotion.status}
                                            onChange={(e) => setEditingPromotion({ ...editingPromotion, status: e.target.value })}
                                        >
                                            <option value="Active">Active (Running)</option>
                                            <option value="Draft">Draft (Hidden)</option>
                                            <option value="Expired">Expired</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-xs font-bold text-[#b0b0b0] mb-2">End Date</label>
                                        <div className="relative">
                                            <input
                                                type="date"
                                                className="w-full bg-[#1a1a1a] border border-[#444] rounded py-3 px-4 pl-10 text-white outline-none focus:border-[#d4af37] [color-scheme:dark]"
                                                value={editingPromotion.endDate}
                                                onChange={(e) => setEditingPromotion({ ...editingPromotion, endDate: e.target.value })}
                                            />
                                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777]" size={16} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn-gold w-full py-4 text-lg">Save Campaign</button>
                        </div>
                    </form>
                </div>
            ) : (
                // LIST
                <>
                    <div className="bg-[#1a1a1a] border border-[#333] p-4 rounded-xl flex gap-4">
                        <div className="relative flex-1">
                            <input
                                type="text"
                                placeholder="Search campaigns by title..."
                                className="w-full bg-[#222] border border-[#444] rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-[#d4af37] transition-colors"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777]" size={18} />
                        </div>
                    </div>

                    <div className="bg-[#1a1a1a] border border-[#333] rounded-xl overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#222] border-b border-[#333]">
                                        <th className="p-4 text-sm font-bold text-[#b0b0b0] uppercase tracking-wider">Campaign</th>
                                        <th className="p-4 text-sm font-bold text-[#b0b0b0] uppercase tracking-wider">Brand</th>
                                        <th className="p-4 text-sm font-bold text-[#b0b0b0] uppercase tracking-wider">Status</th>
                                        <th className="p-4 text-sm font-bold text-[#b0b0b0] uppercase tracking-wider hidden sm:table-cell">Performance</th>
                                        <th className="p-4 text-sm font-bold text-[#b0b0b0] uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#333]">
                                    {filteredPromotions.map((promo) => (
                                        <tr key={promo.id} className="hover:bg-[#222]/50 transition-colors group">
                                            <td className="p-4">
                                                <p className="font-bold text-white">{promo.title}</p>
                                                <p className="text-xs text-[#777] mt-0.5">{promo.type} • Ends {promo.endDate}</p>
                                            </td>
                                            <td className="p-4 font-bold text-[#b0b0b0]">{promo.brand}</td>
                                            <td className="p-4">
                                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold ${promo.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                        promo.status === 'Draft' ? 'bg-yellow-500/10 text-yellow-500 border border-yellow-500/20' :
                                                            'bg-red-500/10 text-red-500 border border-red-500/20'
                                                    }`}>
                                                    {promo.status}
                                                </span>
                                            </td>
                                            <td className="p-4 hidden sm:table-cell w-48">
                                                <div className="flex flex-col gap-1">
                                                    <div className="flex justify-between text-xs">
                                                        <span className="text-[#b0b0b0]">Clicks</span>
                                                        <span className="font-bold text-white">{promo.clicks.toLocaleString()}</span>
                                                    </div>
                                                    <div className="flex justify-between text-xs">
                                                        <span className="text-[#b0b0b0]">Conversions</span>
                                                        <span className="font-bold text-[#d4af37]">{promo.conversions.toLocaleString()}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                                    <button
                                                        onClick={() => handleEdit(promo)}
                                                        className="p-2 text-[#0066cc] hover:bg-[#0066cc]/10 rounded"
                                                        title="Edit Campaign"
                                                    >
                                                        <Edit size={18} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(promo.id)}
                                                        className="p-2 text-red-400 hover:bg-red-400/10 rounded"
                                                        title="Delete Campaign"
                                                    >
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
