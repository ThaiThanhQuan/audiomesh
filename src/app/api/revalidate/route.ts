import { NextRequest } from 'next/server'
import { revalidateTag } from 'next/cache'

// POST /api/revalidate?tag=collection&secret=YOUR_SECRET
export async function POST(request: NextRequest) {
    const secret = request.nextUrl.searchParams.get('secret')
    const tag = request.nextUrl.searchParams.get('tag')

    // Check secret
    if (secret !== process.env.REVALIDATE_SECRET) {
        return Response.json(
            { message: 'Invalid secret' },
            { status: 401 }
        )
    }

    // Check tag
    if (!tag) {
        return Response.json(
            { message: 'Missing tag param' },
            { status: 400 }
        )
    }

    // Revalidate cache by tag
    revalidateTag(tag)

    return Response.json({
        revalidated: true,
        tag,
        now: Date.now(),
    })
}
