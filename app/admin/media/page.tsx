'use client';

import { useState } from 'react';
import { Upload, Trash2, Image as ImageIcon, CheckCircle, XCircle } from 'lucide-react';

const mockBanners = [
    { id: 1, name: 'homepage-hero-march.jpg', size: '2.4 MB', active: true, location: 'Homepage Top' },
    { id: 2, name: 'casino-offer-sidebar.png', size: '0.8 MB', active: true, location: 'Sidebar All Pages' },
    { id: 3, name: 'expired-promo-xmas.jpg', size: '1.2 MB', active: false, location: 'Inactive' },
];

const mockImages = [
    { id: 1, name: 'author-kate.jpg', folder: '/authors' },
    { id: 2, name: 'bg-pattern-dark.png', folder: '/theme' },
    { id: 3, name: 'bet365-review-ss1.jpg', folder: '/reviews' },
    { id: 4, name: 'stadium-generic.jpg', folder: '/general' },
];

export default function MediaLibraryPage() {
    const [activeTab, setActiveTab] = useState<'logo' | 'banners' | 'images'>('logo');
    const [banners, setBanners] = useState(mockBanners);
    const [images, setImages] = useState(mockImages);
    const [logoState, setLogoState] = useState<'svg' | 'uploaded' | null>('svg');

    const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'banner' | 'image' | 'logo') => {
        // Mock upload behavior
        if (e.target.files && e.target.files.length > 0) {
            alert(`Simulating upload of ${e.target.files.length} file(s) for ${type}.`);
            if (type === 'logo') setLogoState('uploaded');
        }
    };

    const toggleBanner = (id: number) => {
        setBanners(banners.map(b => b.id === id ? { ...b, active: !b.active } : b));
    };

    const deleteBanner = (id: number) => {
        if (confirm('Delete this banner permanently?')) {
            setBanners(banners.filter(b => b.id !== id));
        }
    };

    const deleteImage = (id: number) => {
        if (confirm('Delete this image permanently? Ensure it is not used in any published pages.')) {
            setImages(images.filter(i => i.id !== id));
        }
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-fade-in relative h-full">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white mb-1">Global Media Library</h1>
                    <p className="text-[#b0b0b0]">Manage logos, banners, and general image assets for the frontend.</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex bg-[#1a1a1a] rounded-lg p-1 border border-[#333] w-full max-w-md">
                <button
                    onClick={() => setActiveTab('logo')}
                    className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${activeTab === 'logo' ? 'bg-[#222] text-[#d4af37] shadow' : 'text-[#777] hover:text-white'}`}
                >
                    Logo Management
                </button>
                <button
                    onClick={() => setActiveTab('banners')}
                    className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${activeTab === 'banners' ? 'bg-[#222] text-[#d4af37] shadow' : 'text-[#777] hover:text-white'}`}
                >
                    Banner Engine
                </button>
                <button
                    onClick={() => setActiveTab('images')}
                    className={`flex-1 py-2 text-sm font-bold rounded-md transition-colors ${activeTab === 'images' ? 'bg-[#222] text-[#d4af37] shadow' : 'text-[#777] hover:text-white'}`}
                >
                    Global Images
                </button>
            </div>

            {/* Content Area */}
            <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6 min-h-[500px]">

                {/* LOGO MANAGEMENT */}
                {activeTab === 'logo' && (
                    <div className="space-y-8 animate-fade-in">
                        <h2 className="text-xl font-bold text-white border-b border-[#333] pb-4">Brand Identity & Logo</h2>

                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex-1 space-y-4">
                                <h3 className="text-[#b0b0b0] font-bold">Current Logo</h3>
                                <div className="bg-[#222] border border-[#444] rounded-xl p-8 flex items-center justify-center h-48">
                                    {logoState === 'svg' ? (
                                        <div className="text-center font-bold text-[#b0b0b0]">
                                            [Default MightyTips SVG Logo]
                                        </div>
                                    ) : logoState === 'uploaded' ? (
                                        <div className="text-center font-bold text-emerald-400">
                                            [Uploaded Custom Logo.png]
                                        </div>
                                    ) : (
                                        <div className="text-center font-bold text-red-500">
                                            [No Logo Set – Fallback Text Displayed]
                                        </div>
                                    )}
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        className="bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-2 font-bold rounded hover:bg-red-500/20 transition-colors flex-1"
                                        onClick={() => setLogoState(null)}
                                    >
                                        Delete Current Logo
                                    </button>
                                </div>
                            </div>

                            <div className="flex-1 space-y-4">
                                <h3 className="text-[#b0b0b0] font-bold">Upload New Logo</h3>
                                <label className="border-2 border-dashed border-[#444] rounded-xl flex flex-col items-center justify-center h-48 hover:border-[#0066cc] hover:bg-[#0066cc]/5 transition-colors cursor-pointer text-[#777] hover:text-[#0066cc]">
                                    <Upload size={32} className="mb-2" />
                                    <span className="font-bold">Click to upload or drag and drop</span>
                                    <span className="text-sm mt-1">SVG, PNG, or JPG (Max 2MB)</span>
                                    <input type="file" className="hidden" accept="image/png, image/jpeg, image/svg+xml" onChange={(e) => handleFileUpload(e, 'logo')} />
                                </label>
                            </div>
                        </div>
                    </div>
                )}

                {/* BANNER ENGINE */}
                {activeTab === 'banners' && (
                    <div className="space-y-8 animate-fade-in">
                        <div className="flex items-center justify-between border-b border-[#333] pb-4">
                            <h2 className="text-xl font-bold text-white">Promotional Banners</h2>
                            <label className="btn-primary flex items-center gap-2 cursor-pointer">
                                <Upload size={16} /> Upload New Banners
                                <input type="file" multiple className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'banner')} />
                            </label>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {banners.map(banner => (
                                <div key={banner.id} className="bg-[#222] border border-[#444] rounded-xl overflow-hidden group">
                                    <div className="h-32 bg-[#333] flex items-center justify-center text-[#555] relative group-hover:opacity-80 transition-opacity">
                                        <ImageIcon size={32} />
                                        <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                            <button
                                                onClick={() => toggleBanner(banner.id)}
                                                className={`px-4 py-2 rounded-lg font-bold text-sm ${banner.active ? 'bg-yellow-500/20 text-yellow-500' : 'bg-emerald-500/20 text-emerald-400'}`}
                                            >
                                                {banner.active ? 'Deactivate' : 'Activate'}
                                            </button>
                                        </div>
                                    </div>
                                    <div className="p-4">
                                        <div className="flex justify-between items-start mb-2">
                                            <p className="font-bold text-white truncate pr-2">{banner.name}</p>
                                            <button onClick={() => deleteBanner(banner.id)} className="text-red-400 hover:text-red-300">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                        <div className="flex justify-between items-center text-xs">
                                            <span className="text-[#777]">{banner.size}</span>
                                            <span className="text-[#b0b0b0] bg-[#111] px-2 py-1 rounded">{banner.location}</span>
                                        </div>
                                        <div className="mt-3 flex items-center gap-1.5 text-xs font-bold">
                                            {banner.active
                                                ? <><CheckCircle size={14} className="text-emerald-400" /> <span className="text-emerald-400">Active on Frontend</span></>
                                                : <><XCircle size={14} className="text-red-400" /> <span className="text-red-400">Inactive</span></>
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* GLOBAL IMAGES */}
                {activeTab === 'images' && (
                    <div className="space-y-8 animate-fade-in">
                        <div className="flex items-center justify-between border-b border-[#333] pb-4">
                            <h2 className="text-xl font-bold text-white">Global Image Repository</h2>
                            <label className="bg-[#222] border border-[#444] text-white px-4 py-2 rounded-lg font-bold hover:bg-[#333] transition-colors flex items-center gap-2 cursor-pointer">
                                <Upload size={16} /> Upload Images
                                <input type="file" multiple className="hidden" accept="image/*" onChange={(e) => handleFileUpload(e, 'image')} />
                            </label>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#222] border-b border-[#333]">
                                        <th className="p-4 text-sm font-bold text-[#b0b0b0] uppercase tracking-wider">Preview</th>
                                        <th className="p-4 text-sm font-bold text-[#b0b0b0] uppercase tracking-wider">File Name</th>
                                        <th className="p-4 text-sm font-bold text-[#b0b0b0] uppercase tracking-wider">Folder Path</th>
                                        <th className="p-4 text-sm font-bold text-[#b0b0b0] uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#333]">
                                    {images.map(img => (
                                        <tr key={img.id} className="hover:bg-[#222]/50 transition-colors">
                                            <td className="p-4">
                                                <div className="w-12 h-12 bg-[#333] rounded flex items-center justify-center text-[#555]">
                                                    <ImageIcon size={20} />
                                                </div>
                                            </td>
                                            <td className="p-4 font-bold text-white">{img.name}</td>
                                            <td className="p-4 font-mono text-sm text-[#777]">{img.folder}</td>
                                            <td className="p-4 text-right">
                                                <button onClick={() => deleteImage(img.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded">
                                                    <Trash2 size={18} />
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
}
