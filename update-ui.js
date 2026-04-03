const fs = require('fs');
const path = require('path');

// Directories to search
const dirs = ['app/graphics', 'app/motion-graphic', 'app/video-templates', 'app/stockvideo'];

function findPages(dir) {
    let results = [];
    const files = fs.readdirSync(dir);
    for (const f of files) {
        const fullPath = path.join(dir, f);
        if (fs.statSync(fullPath).isDirectory()) {
            results = results.concat(findPages(fullPath));
        } else if (f === 'page.tsx') {
            results.push(fullPath);
        }
    }
    return results;
}

let pages = [];
for (const d of dirs) {
    if (fs.existsSync(d)) {
        pages = pages.concat(findPages(d));
    }
}

for (const p of pages) {
    let content = fs.readFileSync(p, 'utf8');

    // Replacements
    // 1. Main Background
    content = content.replace(/bg-\[#f5f3ef\] min-h-screen px-4 sm:px-6 lg:px-12 py-10 pt-20/g, 'bg-[#0b0f19] min-h-screen px-4 sm:px-6 lg:px-12 py-10 pt-28 relative overflow-hidden');
    
    // Add glowing bg right after
    if (!content.includes('bg-purple-600/10') && content.includes('<div className="bg-[#0b0f19]')) {
        content = content.replace('<div className="bg-[#0b0f19] min-h-screen px-4 sm:px-6 lg:px-12 py-10 pt-28 relative overflow-hidden">', 
        `<div className="bg-[#0b0f19] min-h-screen px-4 sm:px-6 lg:px-12 py-10 pt-28 relative overflow-hidden">\n      {/* Background glow */}\n      <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-600/10 rounded-full blur-[150px] pointer-events-none z-0"></div>\n      <div className="relative z-10 w-full h-full">`);
        
        // Also close the new relative z-10 div
        const lastDivMatch = content.lastIndexOf('</div>');
        if(lastDivMatch !== -1) {
            content = content.substring(0, lastDivMatch) + '</div>\n' + content.substring(lastDivMatch);
        }
    }

    // 2. Search bar container
    content = content.replace(/flex items-center bg-white rounded-full shadow px-4 py-2/g, 'flex items-center bg-[#131927] border border-white/10 rounded-full shadow-[0_0_20px_rgba(168,85,247,0.1)] focus-within:border-purple-500/50 px-4 py-2 transition-all');
    content = content.replace(/className="text-gray-500"/g, 'className="text-gray-400"');
    content = content.replace(/w-full px-3 py-2 outline-none text-sm/g, 'w-full px-3 py-3 outline-none text-sm bg-transparent text-white placeholder-gray-500');

    // 3. Title strings
    content = content.replace(/text-2xl sm:text-3xl font-bold text-gray-800/g, 'text-3xl sm:text-4xl font-bold text-white relative z-10');
    content = content.replace(/<span className="text-purple-600">/g, '<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">');

    // 4. Categories
    content = content.replace(/bg-black text-white/g, 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.3)] border border-transparent');
    content = content.replace(/bg-white shadow/g, 'bg-[#131927] border border-white/5 text-gray-400 hover:text-white hover:border-purple-500/30 transition shadow-none');

    // 5. Sidebar
    content = content.replace(/hidden lg:block bg-white rounded-xl p-5 h-fit shadow/g, 'hidden lg:block bg-[#131927]/60 backdrop-blur rounded-2xl p-6 h-fit border border-white/10 shadow-[0_4px_20px_rgba(0,0,0,0.5)] text-white relative z-10');
    content = content.replace(/<h3 className="font-semibold mb-4">/g, '<h3 className="font-semibold mb-6 text-gray-200 tracking-wide uppercase text-sm border-b border-white/10 pb-3">');
    content = content.replace(/label key={i} className="flex items-center gap-2 text-sm"/g, 'label key={i} className="flex items-center gap-3 text-sm text-gray-300 hover:text-white transition-colors cursor-pointer"');
    
    // 6. Cards
    content = content.replace(/group bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition/g, 'group bg-[#131927] rounded-3xl overflow-hidden border border-white/5 shadow-sm hover:shadow-[0_10px_30px_rgba(168,85,247,0.15)] hover:border-purple-500/30 transition-all duration-500 relative z-10');

    // 7. Download/Lock Buttons
    content = content.replace(/p-2 rounded-full bg-black\/60 backdrop-blur-md border border-white\/20 shadow/g, 'p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow');
    content = content.replace(/p-2 rounded-full bg-black\/60 border shadow/g, 'p-2 rounded-full bg-black/60 backdrop-blur-md border border-white/10 shadow');
    content = content.replace(/p-2 rounded-full bg-white\/80 backdrop-blur-md border shadow/g, 'p-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)] hover:from-purple-500 hover:to-indigo-500 border-none');
    content = content.replace(/p-2 rounded-full bg-white\/80 border shadow/g, 'p-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_15px_rgba(147,51,234,0.4)] hover:from-purple-500 hover:to-indigo-500 border-none');
    content = content.replace(/p-2 rounded-full bg-purple-600\/80 backdrop-blur-md border shadow/g, 'p-2.5 rounded-full bg-pink-600/90 shadow-[0_0_15px_rgba(236,72,153,0.4)] hover:bg-pink-500 transition border-none text-white');
    content = content.replace(/p-2 rounded-full bg-purple-600\/80 border shadow/g, 'p-2.5 rounded-full bg-pink-600/90 shadow-[0_0_15px_rgba(236,72,153,0.4)] hover:bg-pink-500 transition border-none text-white');

    // 8. Card inner text
    content = content.replace(/text-sm font-semibold text-gray-800 line-clamp-1/g, 'text-base font-semibold text-white group-hover:text-purple-400 transition-colors line-clamp-1 tracking-wide');
    content = content.replace(/text-xs text-gray-600 leading-relaxed line-clamp-3/g, 'text-sm text-gray-400 font-light leading-relaxed line-clamp-2 mt-2');
    content = content.replace(/text-xs text-gray-600 line-clamp-3/g, 'text-sm text-gray-400 font-light leading-relaxed line-clamp-2 mt-2');
    content = content.replace(/bg-white\/80 text-xs px-2 py-1 rounded shadow/g, 'bg-black/50 backdrop-blur-md text-white border border-white/10 text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow');

    fs.writeFileSync(p, content, 'utf8');
}

console.log('Processed ' + pages.length + ' pages');
