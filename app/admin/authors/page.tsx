'use client';

import { useState, useEffect } from 'react';
import { Plus, Search, Edit, Trash2, User, RefreshCw, Mail, Award } from 'lucide-react';

export default function AuthorManagementPage() {
    const [authors, setAuthors] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    // Form state
    const [editingAuthor, setEditingAuthor] = useState<any>(null);

    const filteredAuthors = authors.filter(a => a.name?.toLowerCase().includes(searchQuery.toLowerCase()) || a.username?.toLowerCase().includes(searchQuery.toLowerCase()));

    const fetchAuthors = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/authors');
            if (res.ok) {
                const data = await res.json();
                setAuthors(data);
            }
        } catch (error) {
            console.error('Failed to fetch authors:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAuthors();
    }, []);

    const handleCreateNew = () => {
        setEditingAuthor({
            _id: null,
            name: '',
            slug: '',
            username: '',
            title: 'Expert Tipster',
            bio: '',
            longBio: '',
            avatar: '/avatars/default.png',
            avatarColor: '#0066cc',
            specialties: 'Football, Transfers',
            tipsCount: 0,
            articlesCount: 0,
        });
        setIsFormOpen(true);
    };

    const handleEdit = (author: any) => {
        setEditingAuthor({
            ...author,
            specialties: Array.isArray(author.specialties) ? author.specialties.join(', ') : author.specialties
        });
        setIsFormOpen(true);
    };

    const handleDelete = async (slug: string) => {
        if (confirm('Are you sure you want to delete this author?')) {
            try {
                const res = await fetch(`/api/authors/${slug}`, {
                    method: 'DELETE',
                });
                if (res.ok) {
                    setAuthors(authors.filter(a => a.slug !== slug));
                } else {
                    alert('Failed to delete.');
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    const saveAuthor = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const slug = editingAuthor.slug || editingAuthor.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const payload = {
                ...editingAuthor,
                slug,
                specialties: typeof editingAuthor.specialties === 'string'
                    ? editingAuthor.specialties.split(',').map((s: string) => s.trim())
                    : editingAuthor.specialties
            };

            const isUpdate = !!editingAuthor._id;
            const url = isUpdate ? `/api/authors/${editingAuthor.slug}` : '/api/authors';
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

            await fetchAuthors();
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
                    <h1 className="text-3xl font-black text-white mb-1">Author Management</h1>
                    <p className="text-[#b0b0b0]">Manage tipsters, journalists, and experts.</p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={fetchAuthors}
                        className="p-3 bg-[#222] border border-[#333] hover:bg-[#333] rounded-lg transition-colors text-white"
                        title="Refresh Data"
                    >
                        <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
                    </button>
                    <button
                        onClick={handleCreateNew}
                        className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                        <Plus size={18} /> Add New Author
                    </button>
                </div>
            </div>

            {/* Main Content vs Form Layout */}
            {isFormOpen ? (
                // FORM
                <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6 lg:p-8 animate-fade-in">
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#333]">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <User className="text-[#0066cc]" size={20} />
                            {editingAuthor._id ? `Edit Author: ${editingAuthor.name}` : 'Onboard New Author'}
                        </h2>
                        <button onClick={() => setIsFormOpen(false)} className="text-[#b0b0b0] hover:text-white font-bold">Cancel</button>
                    </div>

                    <form onSubmit={saveAuthor} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Basic Info */}
                        <div className="lg:col-span-2 space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-bold text-[#b0b0b0] mb-2">Full Name</label>
                                    <input
                                        type="text" required
                                        className="w-full bg-[#222] border border-[#444] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#0066cc]"
                                        value={editingAuthor.name}
                                        onChange={(e) => setEditingAuthor({ ...editingAuthor, name: e.target.value })}
                                        placeholder="e.g. John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-[#b0b0b0] mb-2">Username / Handle</label>
                                    <div className="relative">
                                        <input
                                            type="text" required
                                            className="w-full bg-[#222] border border-[#444] rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#0066cc]"
                                            value={editingAuthor.username}
                                            onChange={(e) => setEditingAuthor({ ...editingAuthor, username: e.target.value })}
                                            placeholder="johndoe"
                                        />
                                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777]" size={18} />
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#b0b0b0] mb-2">Job Title / Role</label>
                                <input
                                    type="text" required
                                    className="w-full bg-[#222] border border-[#444] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#0066cc]"
                                    value={editingAuthor.title}
                                    onChange={(e) => setEditingAuthor({ ...editingAuthor, title: e.target.value })}
                                    placeholder="e.g. Lead Football Analyst"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#b0b0b0] mb-2">Short Bio (Card summary)</label>
                                <textarea
                                    required
                                    className="w-full bg-[#222] border border-[#444] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#0066cc] min-h-[80px]"
                                    value={editingAuthor.bio}
                                    onChange={(e) => setEditingAuthor({ ...editingAuthor, bio: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#b0b0b0] mb-2">Long Bio (Profile Page)</label>
                                <textarea
                                    required
                                    className="w-full bg-[#222] border border-[#444] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#0066cc] min-h-[150px]"
                                    value={editingAuthor.longBio}
                                    onChange={(e) => setEditingAuthor({ ...editingAuthor, longBio: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Side Column */}
                        <div className="space-y-6">
                            <div className="bg-[#222] border border-[#444] rounded-xl p-6">
                                <h3 className="font-bold text-white mb-4">Metadata & Stats</h3>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-bold text-[#b0b0b0] mb-2">Specialties (Comma separated)</label>
                                        <input
                                            type="text"
                                            className="w-full bg-[#1a1a1a] border border-[#444] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#0066cc]"
                                            value={editingAuthor.specialties}
                                            onChange={(e) => setEditingAuthor({ ...editingAuthor, specialties: e.target.value })}
                                            placeholder="Football, eSports"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#b0b0b0] mb-2">Avatar URL</label>
                                        <input
                                            type="text"
                                            className="w-full bg-[#1a1a1a] border border-[#444] rounded-lg py-2 px-3 text-white focus:outline-none focus:border-[#0066cc]"
                                            value={editingAuthor.avatar}
                                            onChange={(e) => setEditingAuthor({ ...editingAuthor, avatar: e.target.value })}
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#b0b0b0] mb-2">Avatar Color</label>
                                        <input
                                            type="color"
                                            className="w-full h-10 bg-[#1a1a1a] border border-[#444] rounded-lg px-1 cursor-pointer"
                                            value={editingAuthor.avatarColor}
                                            onChange={(e) => setEditingAuthor({ ...editingAuthor, avatarColor: e.target.value })}
                                        />
                                    </div>
                                </div>
                            </div>

                            <button type="submit" disabled={isSaving} className="btn-primary w-full py-4 text-lg disabled:opacity-50">
                                {isSaving ? 'Saving...' : 'Save Author Setup'}
                            </button>
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
                                placeholder="Search authors..."
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
                                        <th className="p-4 text-sm font-bold text-[#b0b0b0] uppercase tracking-wider">Author</th>
                                        <th className="p-4 text-sm font-bold text-[#b0b0b0] uppercase tracking-wider hidden sm:table-cell">Role</th>
                                        <th className="p-4 text-sm font-bold text-[#b0b0b0] uppercase tracking-wider hidden md:table-cell">Specialties</th>
                                        <th className="p-4 text-sm font-bold text-[#b0b0b0] uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#333]">
                                    {filteredAuthors.map((author) => (
                                        <tr key={author._id || author.slug} className="hover:bg-[#222]/50 transition-colors group">
                                            <td className="p-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-10 h-10 rounded-full flex items-center justify-center text-white shrink-0 border border-[#444]" style={{ backgroundColor: author.avatarColor || '#333' }}>
                                                        {author.name.charAt(0)}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-white text-base">{author.name}</span>
                                                        <span className="text-xs text-[#777]">@{author.username}</span>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="p-4 text-sm text-[#b0b0b0] hidden sm:table-cell">{author.title}</td>
                                            <td className="p-4 hidden md:table-cell">
                                                <div className="flex flex-wrap gap-1">
                                                    {author.specialties?.slice(0, 2).map((s: string, i: number) => (
                                                        <span key={i} className="text-xs bg-[#222] border border-[#444] text-[#b0b0b0] px-2 py-0.5 rounded">{s}</span>
                                                    ))}
                                                    {author.specialties?.length > 2 && <span className="text-xs text-[#777]">+{author.specialties.length - 2}</span>}
                                                </div>
                                            </td>
                                            <td className="p-4 text-right">
                                                <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                                    <button onClick={() => handleEdit(author)} className="p-2 text-[#0066cc] hover:bg-[#0066cc]/10 rounded" title="Edit Author">
                                                        <Edit size={18} />
                                                    </button>
                                                    <button onClick={() => handleDelete(author.slug)} className="p-2 text-red-400 hover:bg-red-400/10 rounded" title="Delete Author">
                                                        <Trash2 size={18} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                    {filteredAuthors.length === 0 && (
                                        <tr>
                                            <td colSpan={4} className="text-center p-8 text-[#777]">No authors found in the database. Add one to get started!</td>
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
