import type { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: 'Audiomesh – Discover, Stream & Share Music',
        short_name: 'AudioMesh',
        description: 'Stream and discover music online for free with AudioMesh.',
        start_url: '/',
        display: 'standalone',
        background_color: '#000000',
        theme_color: '#000000',
        icons: [
            {
                src: '/audiomesh.png',
                sizes: '192x192',
                type: 'image/png',
            },
            {
                src: '/audiomesh.png',
                sizes: '512x512',
                type: 'image/png',
            },
        ],
    }
}