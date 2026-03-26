'use client';

import { useState } from 'react';
import { Settings as SettingsIcon, Link as LinkIcon, MessageSquare, Search, Save, Globe, Trash2, Plus } from 'lucide-react';

const initialUrls = [
    { id: 1, path: '/old-bonuses', redirect: '/bonuses', type: '301 Permanent' },
    { id: 2, path: '/promo/xmas25', redirect: '/', type: '302 Temporary' },
    { id: 3, path: '/betting-offers/uk', redirect: '/bookmakers?region=europe', type: '301 Permanent' },
];

export default function SettingsPage() {
    const [activeTab, setActiveTab] = useState<'seo' | 'urls' | 'integrations'>('seo');

    // Form states
    const [urls, setUrls] = useState(initialUrls);
    const [seoMeta, setSeoMeta] = useState({ title: 'MightyTips - Best Football Predictions', keywords: 'betting, tips, predictions, football', analyticsId: 'G-XXXXXXXXXX' });
    const [chatCode, setChatCode] = useState('<script src="https://example-chat.com/widget.js" async></script>');

    const handleSave = (e: React.FormEvent) => {
        e.preventDefault();
        alert('Settings saved successfully. Changes will be synced to the frontend.');
    };

    const deleteUrl = (id: number) => {
        setUrls(urls.filter(u => u.id !== id));
    };

    return (
        <div className="max-w-7xl mx-auto space-y-6 animate-fade-in relative h-full">

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-white mb-1">System & Integration Settings</h1>
                    <p className="text-[#b0b0b0]">Global SEO, URL routing, and third-party integrations.</p>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex flex-wrap bg-[#1a1a1a] rounded-lg p-1 border border-[#333] max-w-2xl">
                <button
                    onClick={() => setActiveTab('seo')}
                    className={`flex-1 min-w-[120px] py-2.5 flex items-center justify-center gap-2 text-sm font-bold rounded-md transition-colors ${activeTab === 'seo' ? 'bg-[#222] text-[#d4af37] shadow' : 'text-[#777] hover:text-white'}`}
                >
                    <Globe size={16} /> Global SEO
                </button>
                <button
                    onClick={() => setActiveTab('urls')}
                    className={`flex-1 min-w-[120px] py-2.5 flex items-center justify-center gap-2 text-sm font-bold rounded-md transition-colors ${activeTab === 'urls' ? 'bg-[#222] text-[#d4af37] shadow' : 'text-[#777] hover:text-white'}`}
                >
                    <LinkIcon size={16} /> URL Routing
                </button>
                <button
                    onClick={() => setActiveTab('integrations')}
                    className={`flex-1 min-w-[120px] py-2.5 flex items-center justify-center gap-2 text-sm font-bold rounded-md transition-colors ${activeTab === 'integrations' ? 'bg-[#222] text-[#d4af37] shadow' : 'text-[#777] hover:text-white'}`}
                >
                    <MessageSquare size={16} /> Integrations
                </button>
            </div>

            <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6 lg:p-8 min-h-[500px]">

                {/* SEO CONFIGURATION */}
                {activeTab === 'seo' && (
                    <form onSubmit={handleSave} className="space-y-8 animate-fade-in max-w-3xl">
                        <div className="pb-4 border-b border-[#333]">
                            <h2 className="text-xl font-bold text-white">Global SEO Configuration</h2>
                            <p className="text-sm text-[#777] mt-1">These settings apply as a fallback across all frontend pages unless overridden.</p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-[#b0b0b0] mb-2">Global Meta Site Name / Title Suffix</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#222] border border-[#444] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#d4af37]"
                                    value={seoMeta.title}
                                    onChange={(e) => setSeoMeta({ ...seoMeta, title: e.target.value })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#b0b0b0] mb-2">Global Default Keywords</label>
                                <textarea
                                    rows={3}
                                    className="w-full bg-[#222] border border-[#444] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#d4af37] resize-none"
                                    value={seoMeta.keywords}
                                    onChange={(e) => setSeoMeta({ ...seoMeta, keywords: e.target.value })}
                                ></textarea>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-[#b0b0b0] mb-2">Google Analytics / Tag Manager ID</label>
                                <input
                                    type="text"
                                    className="w-full bg-[#222] border border-[#444] rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#d4af37] font-mono"
                                    value={seoMeta.analyticsId}
                                    onChange={(e) => setSeoMeta({ ...seoMeta, analyticsId: e.target.value })}
                                />
                            </div>

                            <button type="submit" className="btn-primary flex items-center gap-2">
                                <Save size={18} /> Save SEO Configuration
                            </button>
                        </div>
                    </form>
                )}

                {/* URL ROUTING */}
                {activeTab === 'urls' && (
                    <div className="space-y-6 animate-fade-in">
                        <div className="flex items-center justify-between pb-4 border-b border-[#333]">
                            <div>
                                <h2 className="text-xl font-bold text-white">Dynamic URL Routing (Redirects)</h2>
                                <p className="text-sm text-[#777] mt-1">Manage 301/302 redirects for deprecated or changed locations.</p>
                            </div>
                            <button className="btn-gold flex items-center gap-2 text-sm !py-2">
                                <Plus size={16} /> Add Redirection
                            </button>
                        </div>

                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-[#222] border-b border-[#333]">
                                        <th className="p-4 text-sm font-bold text-[#b0b0b0] uppercase tracking-wider">Old Path</th>
                                        <th className="p-4 text-sm font-bold text-[#b0b0b0] uppercase tracking-wider">Redirect Target</th>
                                        <th className="p-4 text-sm font-bold text-[#b0b0b0] uppercase tracking-wider">Type</th>
                                        <th className="p-4 text-sm font-bold text-[#b0b0b0] uppercase tracking-wider text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-[#333]">
                                    {urls.map(url => (
                                        <tr key={url.id} className="hover:bg-[#222]/50 transition-colors">
                                            <td className="p-4 font-mono text-sm text-red-400 line-through">{url.path}</td>
                                            <td className="p-4 font-mono text-sm text-emerald-400">{url.redirect}</td>
                                            <td className="p-4 text-sm text-[#b0b0b0]">{url.type}</td>
                                            <td className="p-4 text-right">
                                                <button onClick={() => deleteUrl(url.id)} className="p-2 text-red-400 hover:bg-red-400/10 rounded">
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

                {/* INTEGRATIONS */}
                {activeTab === 'integrations' && (
                    <form onSubmit={handleSave} className="space-y-8 animate-fade-in max-w-3xl">
                        <div className="pb-4 border-b border-[#333]">
                            <h2 className="text-xl font-bold text-white">Third-Party & Affiliate Operations</h2>
                            <p className="text-sm text-[#777] mt-1">Manage global scripts, customer support chat, and affiliate postbacks.</p>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-[#b0b0b0] mb-2">Live Chat Widget Code (HTML/JS)</label>
                                <textarea
                                    rows={5}
                                    className="w-full bg-[#222] border border-[#444] rounded-lg py-3 px-4 text-emerald-400 font-mono text-sm focus:outline-none focus:border-[#d4af37] resize-none"
                                    value={chatCode}
                                    onChange={(e) => setChatCode(e.target.value)}
                                ></textarea>
                                <p className="text-xs text-[#777] mt-2">This script will be injected into the footer of all frontend pages.</p>
                            </div>

                            <div className="pt-6 border-t border-[#333]">
                                <h3 className="text-lg font-bold text-white mb-4">Affiliate Global Settings</h3>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 bg-[#222] border border-[#444] rounded-lg">
                                        <div>
                                            <p className="font-bold text-white">Enable Global Postback URL Sandbox</p>
                                            <p className="text-xs text-[#b0b0b0] mt-1">Use test conversions before going live.</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-[#444] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#333] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0066cc]"></div>
                                        </label>
                                    </div>

                                    <div className="flex items-center justify-between p-4 bg-[#222] border border-[#444] rounded-lg">
                                        <div>
                                            <p className="font-bold text-white">Auto-cloak Affiliate Links</p>
                                            <p className="text-xs text-[#b0b0b0] mt-1">Convert raw affiliate links to internal redirects (e.g. /go/brand).</p>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked />
                                            <div className="w-11 h-6 bg-[#444] peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-[#333] after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#0066cc]"></div>
                                        </label>
                                    </div>
                                </div>
                            </div>

                            <button type="submit" className="btn-primary flex items-center gap-2">
                                <Save size={18} /> Save Settings
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
}
