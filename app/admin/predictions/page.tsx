'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, Trophy, RefreshCw, Calendar, Target } from 'lucide-react';

export default function PredictionManagementPage() {
    const [predictions, setPredictions] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Form state
    const [editingPrediction, setEditingPrediction] = useState<any>(null);

    const filteredPredictions = predictions.filter(p =>
        p.homeTeam?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.awayTeam?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.league?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const fetchPredictions = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/predictions');
            if (res.ok) {
                const data = await res.json();
                setPredictions(data);
            }
        } catch (error) {
            console.error('Failed to fetch predictions:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPredictions();
    }, []);

    const handleCreateNew = () => {
        setEditingPrediction({
            _id: null,
            slug: '',
            homeTeam: { name: '', shortName: '', color: '#ff0000' },
            awayTeam: { name: '', shortName: '', color: '#0000ff' },
            league: '',
            leagueSlug: '',
            matchDate: new Date().toISOString().split('T')[0],
            matchTime: '20:00',
            predictionType: '1x2',
            predictionLabel: '',
            odds: 1.5,
            w1: 2.0,
            draw: 3.5,
            w2: 3.0,
            description: '<p>Detailed match analysis here...</p>',
            authorId: 'admin',
            bookmakerSlug: 'bet365',
        });
        setIsFormOpen(true);
    };

    const handleEdit = (prediction: any) => {
        setEditingPrediction({ ...prediction });
        setIsFormOpen(true);
    };

    const handleDelete = async (slug: string) => {
        if (confirm('Are you sure you want to delete this prediction?')) {
            try {
                const res = await fetch(`/api/predictions/${slug}`, {
                    method: 'DELETE',
                });
                if (res.ok) {
                    setPredictions(predictions.filter(p => p.slug !== slug));
                } else {
                    alert('Failed to delete.');
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    const savePrediction = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const slug = editingPrediction.slug || `${editingPrediction.homeTeam.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-vs-${editingPrediction.awayTeam.name.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${editingPrediction.matchDate}`;
            const leagueSlug = editingPrediction.leagueSlug || editingPrediction.league.toLowerCase().replace(/[^a-z0-9]+/g, '-');

            const payload = {
                ...editingPrediction,
                slug,
                leagueSlug,
                odds: Number(editingPrediction.odds),
                w1: Number(editingPrediction.w1),
                draw: Number(editingPrediction.draw),
                w2: Number(editingPrediction.w2),
            };

            const isUpdate = !!editingPrediction._id;
            const url = isUpdate ? `/api/predictions/${editingPrediction.slug}` : '/api/predictions';
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

            await fetchPredictions();
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
                    <h1 className="text-3xl font-black text-white mb-1">Prediction Management</h1>
                    <p className="text-[#b0b0b0]">Create match predictions and link to bookmaker odds.</p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={fetchPredictions}
                        className="p-3 bg-[#222] border border-[#333] hover:bg-[#333] rounded-lg transition-colors text-white"
                        title="Refresh Data"
                    >
                        <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
                    </button>
                    <button
                        onClick={handleCreateNew}
                        className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                        <Plus size={18} /> Add New Prediction
                    </button>
                </div>
            </div>

            {/* Main Content vs Form Layout */}
            {isFormOpen ? (
                // FORM
                <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6 lg:p-8 animate-fade-in">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#333]">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Trophy className="text-[#0066cc]" size={20} />
                            {editingPrediction._id ? 'Edit Match Prediction' : 'Create Match Prediction'}
                        </h2>
                        <button onClick={() => setIsFormOpen(false)} className="text-[#b0b0b0] hover:text-white font-bold">Cancel</button>
                    </div>

                    <form onSubmit={savePrediction} className="space-y-8">

                        {/* Match Details */}
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6 bg-[#222] border border-[#444] rounded-xl">
                            <h3 className="col-span-full font-bold text-white mb-2 text-lg">Match Teams & Setting</h3>

                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-[#b0b0b0]">Home Team</h4>
                                <input type="text" placeholder="Full Name (e.g. Arsenal)" required className="w-full bg-[#1a1a1a] border border-[#444] rounded-lg py-2 px-3 text-white focus:border-[#0066cc] outline-none"
                                    value={editingPrediction.homeTeam.name} onChange={e => setEditingPrediction({ ...editingPrediction, homeTeam: { ...editingPrediction.homeTeam, name: e.target.value } })} />
                                <div className="flex gap-2">
                                    <input type="text" placeholder="Short (ARS)" required className="flex-1 bg-[#1a1a1a] border border-[#444] rounded-lg py-2 px-3 text-white focus:border-[#0066cc] outline-none"
                                        value={editingPrediction.homeTeam.shortName} onChange={e => setEditingPrediction({ ...editingPrediction, homeTeam: { ...editingPrediction.homeTeam, shortName: e.target.value } })} />
                                    <input type="color" className="w-12 h-10 bg-[#1a1a1a] border border-[#444] rounded-lg p-1"
                                        value={editingPrediction.homeTeam.color} onChange={e => setEditingPrediction({ ...editingPrediction, homeTeam: { ...editingPrediction.homeTeam, color: e.target.value } })} />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-[#b0b0b0]">Away Team</h4>
                                <input type="text" placeholder="Full Name (e.g. Chelsea)" required className="w-full bg-[#1a1a1a] border border-[#444] rounded-lg py-2 px-3 text-white focus:border-[#0066cc] outline-none"
                                    value={editingPrediction.awayTeam.name} onChange={e => setEditingPrediction({ ...editingPrediction, awayTeam: { ...editingPrediction.awayTeam, name: e.target.value } })} />
                                <div className="flex gap-2">
                                    <input type="text" placeholder="Short (CHE)" required className="flex-1 bg-[#1a1a1a] border border-[#444] rounded-lg py-2 px-3 text-white focus:border-[#0066cc] outline-none"
                                        value={editingPrediction.awayTeam.shortName} onChange={e => setEditingPrediction({ ...editingPrediction, awayTeam: { ...editingPrediction.awayTeam, shortName: e.target.value } })} />
                                    <input type="color" className="w-12 h-10 bg-[#1a1a1a] border border-[#444] rounded-lg p-1"
                                        value={editingPrediction.awayTeam.color} onChange={e => setEditingPrediction({ ...editingPrediction, awayTeam: { ...editingPrediction.awayTeam, color: e.target.value } })} />
                                </div>
                            </div>

                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-[#b0b0b0]">League & Timing</h4>
                                <input type="text" placeholder="League Name (e.g. Premier League)" required className="w-full bg-[#1a1a1a] border border-[#444] rounded-lg py-2 px-3 text-white focus:border-[#0066cc] outline-none"
                                    value={editingPrediction.league} onChange={e => setEditingPrediction({ ...editingPrediction, league: e.target.value, leagueSlug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })} />
                                <div className="flex gap-2">
                                    <input type="date" required className="flex-1 bg-[#1a1a1a] border border-[#444] rounded-lg py-2 px-3 text-[#b0b0b0] focus:border-[#0066cc] outline-none"
                                        value={editingPrediction.matchDate} onChange={e => setEditingPrediction({ ...editingPrediction, matchDate: e.target.value })} />
                                    <input type="time" required className="w-24 bg-[#1a1a1a] border border-[#444] rounded-lg py-2 px-3 text-[#b0b0b0] focus:border-[#0066cc] outline-none"
                                        value={editingPrediction.matchTime} onChange={e => setEditingPrediction({ ...editingPrediction, matchTime: e.target.value })} />
                                </div>
                            </div>
                        </div>

                        {/* Odds & Prediction */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pb-6">

                            <div className="space-y-6">
                                <h3 className="font-bold text-white text-lg border-b border-[#333] pb-2">The Tip & Odds</h3>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-[#b0b0b0] mb-2">Tip Category</label>
                                        <select required className="w-full bg-[#222] border border-[#444] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#0066cc]"
                                            value={editingPrediction.predictionType} onChange={e => setEditingPrediction({ ...editingPrediction, predictionType: e.target.value })}>
                                            <option value="1x2">1x2 Match Winner</option>
                                            <option value="btts">Both Teams To Score</option>
                                            <option value="over-2.5">Over 2.5 Goals</option>
                                            <option value="under-2.5">Under 2.5 Goals</option>
                                            <option value="correct-score">Correct Score</option>
                                            <option value="accumulator">Accumulator</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#b0b0b0] mb-2">Tip Label</label>
                                        <input type="text" placeholder="e.g. Arsenal to win" required className="w-full bg-[#222] border border-[#444] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#0066cc]"
                                            value={editingPrediction.predictionLabel} onChange={e => setEditingPrediction({ ...editingPrediction, predictionLabel: e.target.value })} />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-[#b0b0b0] mb-2">Main Tip Odds (e.g. 1.85)</label>
                                    <input type="number" step="0.01" required className="w-full bg-[#222] border border-[#444] rounded-lg py-3 px-4 text-[#d4af37] font-bold text-lg focus:outline-none focus:border-[#0066cc]"
                                        value={editingPrediction.odds} onChange={e => setEditingPrediction({ ...editingPrediction, odds: e.target.value })} />
                                </div>

                                <div>
                                    <label className="block text-sm font-bold text-[#b0b0b0] mb-2">1x2 Odds Matrix (For charts)</label>
                                    <div className="flex gap-2">
                                        <div className="flex-1 text-center">
                                            <span className="text-xs text-[#777] block mb-1">1 (Home)</span>
                                            <input type="number" step="0.01" required className="w-full text-center bg-[#222] border border-[#444] rounded py-2 text-white" value={editingPrediction.w1} onChange={e => setEditingPrediction({ ...editingPrediction, w1: e.target.value })} />
                                        </div>
                                        <div className="flex-1 text-center">
                                            <span className="text-xs text-[#777] block mb-1">X (Draw)</span>
                                            <input type="number" step="0.01" required className="w-full text-center bg-[#222] border border-[#444] rounded py-2 text-white" value={editingPrediction.draw} onChange={e => setEditingPrediction({ ...editingPrediction, draw: e.target.value })} />
                                        </div>
                                        <div className="flex-1 text-center">
                                            <span className="text-xs text-[#777] block mb-1">2 (Away)</span>
                                            <input type="number" step="0.01" required className="w-full text-center bg-[#222] border border-[#444] rounded py-2 text-white" value={editingPrediction.w2} onChange={e => setEditingPrediction({ ...editingPrediction, w2: e.target.value })} />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-[#b0b0b0] mb-2">Author Slug</label>
                                        <input type="text" required className="w-full bg-[#222] border border-[#444] rounded-lg py-2 px-3 text-white outline-none"
                                            value={editingPrediction.authorId} onChange={e => setEditingPrediction({ ...editingPrediction, authorId: e.target.value })} />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#b0b0b0] mb-2">Associated Bookmaker</label>
                                        <input type="text" required className="w-full bg-[#222] border border-[#444] rounded-lg py-2 px-3 text-white outline-none" placeholder="e.g. bet365"
                                            value={editingPrediction.bookmakerSlug} onChange={e => setEditingPrediction({ ...editingPrediction, bookmakerSlug: e.target.value })} />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="font-bold text-white text-lg border-b border-[#333] pb-2">Analysis Content</h3>
                                <div>
                                    <label className="block text-sm font-bold text-[#b0b0b0] mb-2">Description / Match Review (HTML Support)</label>
                                    <textarea required className="w-full bg-[#222] border border-[#444] rounded-lg p-4 text-white focus:outline-none focus:border-[#0066cc] min-h-[300px] font-mono text-sm"
                                        value={editingPrediction.description} onChange={e => setEditingPrediction({ ...editingPrediction, description: e.target.value })} />
                                </div>

                                <button type="submit" disabled={isSaving} className="btn-primary w-full py-4 text-lg disabled:opacity-50">
                                    {isSaving ? 'Saving...' : 'Save Match Prediction'}
                                </button>
                            </div>

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
                                placeholder="Search by team or league..."
                                className="w-full bg-[#222] border border-[#444] rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-[#0066cc] transition-colors"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777]" size={18} />
                        </div>
                    </div>

                    <div className="bg-[#1a1a1a] border border-[#333] rounded-xl overflow-hidden">
                        {isLoading ? (
                            <div className="p-12 flex justify-center text-[#0066cc]">
                                <RefreshCw size={32} className="animate-spin" />
                            </div>
                        ) : (
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#222] border-b border-[#333]">
                                        <th className="p-4 text-sm font-bold text-[#b0b0b0] uppercase tracking-wider">Match</th>
                                        <th className="p-4 text-sm font-bold text-[#b0b0b0] uppercase tracking-wider hidden sm:table-cell">League</th>
                                        <th className="p-4 text-sm font-bold text-[#b0b0b0] uppercase tracking-wider hidden md:table-cell">Timing</th>
                                        <th className="p-4 text-sm font-bold text-[#b0b0b0] uppercase tracking-wider">Tip & Odds</th>
                                        <th className="p-4 text-sm font-bold text-[#b0b0b0] uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#333]">
                                    {filteredPredictions.map((prediction) => (
                                        <tr key={prediction._id || prediction.slug} className="hover:bg-[#222]/50 transition-colors group">
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-white text-base">{prediction.homeTeam?.name} vs {prediction.awayTeam?.name}</span>
                                                    <span className="text-xs text-[#777] font-mono mt-0.5">{prediction.slug}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 hidden sm:table-cell text-sm text-[#b0b0b0]">
                                                {prediction.league}
                                            </td>
                                            <td className="p-4 hidden md:table-cell">
                                                <div className="flex items-center gap-1 text-sm text-[#b0b0b0]">
                                                    <Calendar size={14} className="text-[#0066cc]" /> {prediction.matchDate}
                                                </div>
                                                <span className="text-xs text-[#777]">{prediction.matchTime}</span>
                                            </td>
                                            <td className="p-4">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-white text-sm">{prediction.predictionLabel}</span>
                                                    <span className="text-xs font-bold text-[#d4af37]">@{prediction.odds?.toFixed(2)}</span>
                                                </div>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => handleEdit(prediction)} className="p-2 text-[#0066cc] hover:bg-[#0066cc]/10 rounded" title="Edit">
                                                        <Edit size={18} />
                                                    </button>
                                                    <button onClick={() => handleDelete(prediction.slug)} className="p-2 text-red-400 hover:bg-red-400/10 rounded" title="Delete">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredPredictions.length === 0 && (
                                        <tr>
                                            <td colSpan={5} className="text-center p-8 text-[#777]">No predictions found in the database. Add one to get started!</td>
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
