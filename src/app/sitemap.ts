import type { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

    return [
        {
            url: 'https://audiomesh-git-main-quan-thais-projects.vercel.app/track/upload',
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        {
            url: 'https://audiomesh-git-main-quan-thais-projects.vercel.app/like',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://audiomesh-git-main-quan-thais-projects.vercel.app/playlist',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.5,
        },
    ]
}