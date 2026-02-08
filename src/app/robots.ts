import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
    return {
        rules: {
            userAgent: '*',
            allow: '/',
            disallow: ['/admin', '/admin/users', '/admin/tracks', '/admin/comments'],
        },
        sitemap: 'http://localhost:3000//sitemap.xml',
    }
}