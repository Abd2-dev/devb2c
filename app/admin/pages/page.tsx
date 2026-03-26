'use client';

import { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Edit,
    Trash2,
    Eye,
    FileText,
    Settings,
    Globe,
    RefreshCw
} from 'lucide-react';

export default function AdminPagesCMS() {
    const [pages, setPages] = useState<any[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [isEditorOpen, setIsEditorOpen] = useState(false);
    const [editingPage, setEditingPage] = useState<any>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    const filteredPages = pages.filter(p =>
        p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.slug?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const fetchPages = async () => {
        setIsLoading(true);
        try {
            const res = await fetch('/api/articles');
            if (res.ok) {
                const data = await res.json();
                setPages(data);
            }
        } catch (error) {
            console.error('Failed to fetch pages:', error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchPages();
    }, []);

    const handleEdit = (page: any) => {
        setEditingPage(page);
        setIsEditorOpen(true);
    };

    const handleDelete = async (slug: string) => {
        if (confirm('Are you sure you want to delete this page? This action cannot be undone.')) {
            try {
                const res = await fetch(`/api/articles/${slug}`, {
                    method: 'DELETE',
                });
                if (res.ok) {
                    setPages(pages.filter(p => p.slug !== slug));
                } else {
                    alert('Failed to delete.');
                }
            } catch (err) {
                console.error(err);
            }
        }
    };

    const handleCreateNew = () => {
        setEditingPage({
            _id: null,
            title: '',
            slug: '',
            status: 'Draft',
            content: '',
            excerpt: '',
            category: 'General',
            categorySlug: 'general',
            authorId: 'admin'
        });
        setIsEditorOpen(true);
    };

    const savePage = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            const slug = editingPage.slug || editingPage.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
            const payload = {
                ...editingPage,
                slug,
                publishedAt: editingPage.publishedAt || new Date().toISOString(),
                imageColor: editingPage.imageColor || 'linear-gradient(135deg, #1a3a5c, #0066cc)',
                excerpt: editingPage.excerpt || 'New article excerpt.',
                content: editingPage.content || '<p>Default content.</p>',
            };

            const isUpdate = !!editingPage._id;
            const url = isUpdate ? `/api/articles/${editingPage.slug}` : '/api/articles';
            const method = isUpdate ? 'PUT' : 'POST';

            // if updating, we use the original slug in the URL parameter, but if the slug itself changed,
            // we might have issues unless the API handles it. Our API PUT uses the URL param to match.
            // For safety, let's assume we don't change slug during edit, or the API handles it gracefully.

            const res = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!res.ok) {
                const errData = await res.json();
                throw new Error(errData.error || 'Failed to save');
            }

            await fetchPages();
            setIsEditorOpen(false);
        } catch (error: any) {
            alert(error.message);
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-fade-in relative h-full">

            {/* Header & Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white mb-1">Page Management (CMS)</h1>
                    <p className="text-[#b0b0b0]">Create, edit, and orchestrate frontend content blocks.</p>
                </div>

                <div className="flex gap-2">
                    <button
                        onClick={fetchPages}
                        className="p-3 bg-[#222] border border-[#333] hover:bg-[#333] rounded-lg transition-colors text-white"
                        title="Refresh Data"
                    >
                        <RefreshCw size={18} className={isLoading ? "animate-spin" : ""} />
                    </button>
                    <button
                        onClick={handleCreateNew}
                        className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap"
                    >
                        <Plus size={18} /> Add New Page
                    </button>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-[#1a1a1a] border border-[#333] p-4 rounded-xl flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <input
                        type="text"
                        placeholder="Search pages by title or slug..."
                        className="w-full bg-[#222] border border-[#444] rounded-lg py-2.5 pl-10 pr-4 text-white focus:outline-none focus:border-[#0066cc] transition-colors"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-[#777]" size={18} />
                </div>
            </div>

            {/* Pages Table */}
            <div className="bg-[#1a1a1a] border border-[#333] rounded-xl overflow-hidden">
                <div className="overflow-x-auto">
                    {isLoading ? (
                        <div className="p-12 flex justify-center text-[#d4af37]">
                            <RefreshCw size={32} className="animate-spin" />
                        </div>
                    ) : (
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-[#222] border-b border-[#333]">
                                    <th className="p-4 text-sm font-bold text-[#b0b0b0] uppercase tracking-wider">Title & Slug</th>
                                    <th className="p-4 text-sm font-bold text-[#b0b0b0] uppercase tracking-wider">Category</th>
                                    <th className="p-4 text-sm font-bold text-[#b0b0b0] uppercase tracking-wider hidden md:table-cell">Author</th>
                                    <th className="p-4 text-sm font-bold text-[#b0b0b0] uppercase tracking-wider hidden sm:table-cell">Published Date</th>
                                    <th className="p-4 text-sm font-bold text-[#b0b0b0] uppercase tracking-wider text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#333]">
                                {filteredPages.map((page) => (
                                    <tr key={page._id || page.slug} className="hover:bg-[#222]/50 transition-colors group">
                                        <td className="p-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded bg-[#222] border border-[#444] flex items-center justify-center shrink-0">
                                                    <FileText size={20} className="text-[#0066cc]" />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white text-base truncate max-w-[250px]">{page.title}</p>
                                                    <p className="text-xs text-[#777] font-mono mt-0.5 truncate max-w-[250px]">{page.slug}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                                {page.category}
                                            </span>
                                        </td>
                                        <td className="p-4 text-sm text-[#b0b0b0] hidden md:table-cell">{page.authorId}</td>
                                        <td className="p-4 text-sm text-[#777] hidden sm:table-cell">
                                            {new Date(page.publishedAt || Date.now()).toLocaleDateString()}
                                        </td>
                                        <td className="p-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-100 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                                                <button className="p-2 text-[#b0b0b0] hover:text-white hover:bg-[#333] rounded" title="View Frontend">
                                                    <Eye size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(page)}
                                                    className="p-2 text-[#0066cc] hover:bg-[#0066cc]/10 rounded"
                                                    title="Edit Page"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(page.slug)}
                                                    className="p-2 text-red-400 hover:bg-red-400/10 rounded"
                                                    title="Delete Page"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                                {filteredPages.length === 0 && (
                                    <tr>
                                        <td colSpan={5} className="p-8 text-center text-[#777]">
                                            No pages found in database matching your search. Add one!
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Block Editor Modal Mockup */}
            {isEditorOpen && editingPage && (
                <div className="fixed inset-0 z-50 bg-[#111]/90 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-[#1a1a1a] border border-[#333] rounded-xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl animate-fade-in overflow-hidden">

                        {/* Editor Header */}
                        <div className="flex items-center justify-between p-4 border-b border-[#333] bg-[#222]">
                            <div className="flex items-center gap-3">
                                <FileText size={20} className="text-[#0066cc]" />
                                <h2 className="text-xl font-bold text-white">
                                    {editingPage._id ? `Editing: ${editingPage.title}` : 'Create New Page'}
                                </h2>
                            </div>
                            <div className="flex items-center gap-3">
                                <button
                                    onClick={() => setIsEditorOpen(false)}
                                    className="px-4 py-2 text-[#b0b0b0] hover:text-white transition-colors"
                                    type="button"
                                >
                                    Cancel
                                </button>
                                <button onClick={savePage} disabled={isSaving} className="btn-primary disabled:opacity-50">
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </div>

                        {/* Editor Body */}
                        <div className="flex-1 overflow-y-auto p-6 flex flex-col lg:flex-row gap-6">

                            {/* Main Canvas */}
                            <div className="flex-1 space-y-6">
                                <div>
                                    <label className="block text-sm font-bold text-[#b0b0b0] mb-2">Page Title (H1)</label>
                                    <input
                                        type="text"
                                        className="w-full bg-[#222] border border-[#444] rounded-lg py-3 px-4 text-white text-xl font-bold focus:outline-none focus:border-[#0066cc]"
                                        value={editingPage.title}
                                        onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                                        placeholder="Enter headline..."
                                        maxLength={100}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-bold text-[#b0b0b0] mb-2">URL Slug</label>
                                        <div className="flex items-center">
                                            <span className="bg-[#222] border border-r-0 border-[#444] rounded-l-lg py-3 px-2 text-[#777] text-sm">bsl.com/</span>
                                            <input
                                                type="text"
                                                className="flex-1 bg-[#222] border border-[#444] rounded-r-lg py-3 px-2 text-white text-sm focus:outline-none focus:border-[#0066cc]"
                                                value={editingPage.slug}
                                                onChange={(e) => setEditingPage({ ...editingPage, slug: e.target.value })}
                                                placeholder="news-article"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-bold text-[#b0b0b0] mb-2">Category</label>
                                        <input
                                            type="text"
                                            className="w-full bg-[#222] border border-[#444] rounded-lg py-3 px-4 text-white text-sm focus:outline-none focus:border-[#0066cc]"
                                            value={editingPage.category}
                                            onChange={(e) => setEditingPage({ ...editingPage, category: e.target.value, categorySlug: e.target.value.toLowerCase().replace(/[^a-z0-9]+/g, '-') })}
                                            placeholder="e.g. Football"
                                        />
                                    </div>
                                </div>

                                <div className="border border-[#444] rounded-lg p-1 bg-[#222]">
                                    <div className="bg-[#1a1a1a] border-b border-[#444] p-2 flex gap-2">
                                        <button className="p-1.5 hover:bg-[#333] rounded text-[#b0b0b0]"><b>B</b></button>
                                        <button className="p-1.5 hover:bg-[#333] rounded text-[#b0b0b0]"><i>I</i></button>
                                        <div className="w-px bg-[#444] mx-1"></div>
                                        <button className="p-1.5 hover:bg-[#333] rounded text-[#b0b0b0] text-xs font-bold">H2</button>
                                        <button className="p-1.5 hover:bg-[#333] rounded text-[#b0b0b0] text-xs font-bold">H3</button>
                                        <div className="w-px bg-[#444] mx-1"></div>
                                        <button className="p-1.5 hover:bg-[#333] rounded text-[#b0b0b0] text-xs flex items-center gap-1"><Globe size={14} /> Link</button>
                                    </div>
                                    <textarea
                                        className="w-full bg-[#222] min-h-[400px] p-4 text-white focus:outline-none resize-none font-sans text-sm leading-relaxed"
                                        placeholder="Start writing article content..."
                                        value={editingPage.content}
                                        onChange={(e) => setEditingPage({ ...editingPage, content: e.target.value })}
                                    ></textarea>
                                </div>
                            </div>

                            {/* Sidebar Settings */}
                            <div className="w-full lg:w-80 space-y-6">
                                <div className="bg-[#222] border border-[#444] rounded-xl p-4">
                                    <h3 className="font-bold text-white mb-4 flex items-center gap-2"><Settings size={18} className="text-[#0066cc]" /> Article Meta</h3>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-xs font-bold text-[#b0b0b0] mb-1">Author Slug</label>
                                            <input
                                                type="text"
                                                className="w-full bg-[#1a1a1a] border border-[#444] rounded py-2 px-3 text-white text-sm outline-none placeholder-[#555]"
                                                value={editingPage.authorId}
                                                onChange={(e) => setEditingPage({ ...editingPage, authorId: e.target.value })}
                                                placeholder="e.g. kate-richardson"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-xs font-bold text-[#b0b0b0] mb-1">Excerpt (Short Meta Description)</label>
                                            <textarea
                                                className="w-full bg-[#1a1a1a] border border-[#444] rounded py-2 px-3 text-white text-sm outline-none placeholder-[#555] min-h-[120px] resize-none"
                                                placeholder="Short summary for cards..."
                                                value={editingPage.excerpt}
                                                onChange={(e) => setEditingPage({ ...editingPage, excerpt: e.target.value })}
                                            ></textarea>
                                        </div>

                                        <div className="pt-4 border-t border-[#444]">
                                            <button className="w-full py-2 border border-[#d4af37] text-[#d4af37] hover:bg-[#d4af37]/10 rounded font-bold text-sm transition-colors">
                                                Add Article Tags
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
