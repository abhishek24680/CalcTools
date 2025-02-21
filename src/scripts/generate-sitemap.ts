const fs = require('fs');
const path = require('path');

const DOMAIN = 'https://yourdomain.com'; // Update with your actual domain

const generateSitemap = (): void => {
    const pagesDirectory = path.join(process.cwd(), 'src/pages'); 
    const pageFiles: string[] = getPages(pagesDirectory);

    const urls = pageFiles
        .map((page) => {
            const route = page.replace('.tsx', '').replace('.ts', '').replace('.js', '').replace('index', '').replace(/\\/g, '/');
            return `<url><loc>${DOMAIN}${route}</loc></url>`;
        })
        .join('');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
        ${urls}
    </urlset>`;

    fs.writeFileSync(path.join(process.cwd(), 'public', 'sitemap.xml'), sitemap);
    console.log('✅ Sitemap generated successfully at /public/sitemap.xml');
};

const getPages = (dir: string, fileList: string[] = [], baseDir: string = ''): string[] => {
    const files: string[] = fs.readdirSync(dir); 

    files.forEach((file: string) => {  
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
            getPages(filePath, fileList, path.join(baseDir, file));
        } else if (file.endsWith('.js') || file.endsWith('.tsx') || file.endsWith('.ts')) {
            if (!file.startsWith('_') && !file.startsWith('api') && file !== '404.tsx') {
                fileList.push(`/${path.join(baseDir, file)}`);
            }
        }
    });

    return fileList;
};

generateSitemap();
