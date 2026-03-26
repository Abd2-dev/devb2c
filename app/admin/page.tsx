import {
    Users,
    FileText,
    Briefcase,
    TrendingUp,
    Activity,
    AlertCircle,
    Megaphone
} from 'lucide-react';
import Link from 'next/link';

export default function AdminDashboardOverview() {
    return (
        <div className="max-w-7xl mx-auto space-y-8 animate-fade-in">
            {/* Page Header */}
            <div>
                <h1 className="text-3xl font-black text-white mb-2">Dashboard Overview</h1>
                <p className="text-[#b0b0b0]">Welcome back, Admin. Here is what's happening today.</p>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6 relative overflow-hidden group hover:border-[#444] transition-colors">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-[#0066cc]/5 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-[#0066cc]/10 text-[#0066cc] rounded-lg flex items-center justify-center">
                            <Users size={24} />
                        </div>
                        <span className="text-sm font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">+12.5%</span>
                    </div>
                    <h3 className="text-[#b0b0b0] font-medium mb-1">Total Users</h3>
                    <p className="text-3xl font-black text-white">24,592</p>
                </div>

                <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6 relative overflow-hidden group hover:border-[#444] transition-colors">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-[#d4af37]/5 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-[#d4af37]/10 text-[#d4af37] rounded-lg flex items-center justify-center">
                            <FileText size={24} />
                        </div>
                        <span className="text-sm font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">+4.2%</span>
                    </div>
                    <h3 className="text-[#b0b0b0] font-medium mb-1">Published Pages</h3>
                    <p className="text-3xl font-black text-white">1,204</p>
                </div>

                <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6 relative overflow-hidden group hover:border-[#444] transition-colors">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-purple-500/5 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-purple-500/10 text-purple-400 rounded-lg flex items-center justify-center">
                            <Briefcase size={24} />
                        </div>
                        <span className="text-sm font-bold text-red-400 bg-red-400/10 px-2 py-1 rounded">-1.5%</span>
                    </div>
                    <h3 className="text-[#b0b0b0] font-medium mb-1">Active Brands</h3>
                    <p className="text-3xl font-black text-white">48</p>
                </div>

                <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6 relative overflow-hidden group hover:border-[#444] transition-colors">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-emerald-500/5 rounded-bl-[100px] -z-10 group-hover:scale-110 transition-transform"></div>
                    <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-emerald-500/10 text-emerald-400 rounded-lg flex items-center justify-center">
                            <TrendingUp size={24} />
                        </div>
                        <span className="text-sm font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">+22.4%</span>
                    </div>
                    <h3 className="text-[#b0b0b0] font-medium mb-1">Affiliate Clicks</h3>
                    <p className="text-3xl font-black text-white">142,093</p>
                </div>

            </div>

            {/* Main Dashboard Content Area */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                {/* Chart placeholder */}
                <div className="lg:col-span-2 bg-[#1a1a1a] border border-[#333] rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                        <h3 className="text-lg font-bold text-white">Traffic Overview</h3>
                        <select className="bg-[#222] border border-[#444] rounded text-sm text-[#b0b0b0] p-1 outline-none">
                            <option>Last 7 Days</option>
                            <option>Last 30 Days</option>
                            <option>This Year</option>
                        </select>
                    </div>
                    {/* Mock Chart Area */}
                    <div className="h-64 border border-dashed border-[#444] rounded-lg flex items-center justify-center bg-[#222]/50">
                        <div className="text-center text-[#777] flex flex-col items-center">
                            <Activity size={32} className="mb-2 opacity-50" />
                            <p>Traffic Chart Data Syncing...</p>
                        </div>
                    </div>
                </div>

                {/* System Status / Alerts */}
                <div className="bg-[#1a1a1a] border border-[#333] rounded-xl p-6">
                    <h3 className="text-lg font-bold text-white mb-6">System Alerts</h3>

                    <div className="space-y-4">
                        <div className="flex gap-4 items-start p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                            <AlertCircle className="text-red-400 shrink-0 mt-0.5" size={20} />
                            <div>
                                <h4 className="text-white font-bold text-sm">Missing Alt Tags</h4>
                                <p className="text-xs text-[#b0b0b0] mt-1">12 images uploaded yesterday are missing SEO alt descriptions.</p>
                                <button className="text-xs font-bold text-red-400 mt-2 hover:underline">Fix now</button>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                            <AlertCircle className="text-yellow-400 shrink-0 mt-0.5" size={20} />
                            <div>
                                <h4 className="text-white font-bold text-sm">Expiring Promotion</h4>
                                <p className="text-xs text-[#b0b0b0] mt-1">The "Mega Casino Bonus" campaign expires in 2 days.</p>
                                <button className="text-xs font-bold text-yellow-400 mt-2 hover:underline">View Campaign</button>
                            </div>
                        </div>

                        <div className="flex gap-4 items-start p-3 bg-[#0066cc]/10 border border-[#0066cc]/20 rounded-lg">
                            <Activity className="text-[#0066cc] shrink-0 mt-0.5" size={20} />
                            <div>
                                <h4 className="text-white font-bold text-sm">System Update Success</h4>
                                <p className="text-xs text-[#b0b0b0] mt-1">Frontend caching layer was successfully purged at 04:00 AM.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Actions */}
            <div>
                <h3 className="text-lg font-bold text-white mb-4">Quick Actions</h3>
                <div className="flex flex-wrap gap-4">
                    <Link href="/admin/pages" className="btn-primary flex items-center gap-2">
                        <FileText size={16} /> Create New Page
                    </Link>
                    <Link href="/admin/brands" className="bg-[#222] border border-[#444] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#333] transition-colors flex items-center gap-2">
                        <Briefcase size={16} /> Add Brand
                    </Link>
                    <Link href="/admin/promotions" className="bg-[#222] border border-[#444] text-white px-6 py-3 rounded-lg font-bold hover:bg-[#333] transition-colors flex items-center gap-2">
                        <Megaphone size={16} /> New Campaign
                    </Link>
                </div>
            </div>

        </div>
    );
}
