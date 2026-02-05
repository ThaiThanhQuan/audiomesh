'use client'
import { convertSlugUrl, sendRequest } from "@/utils/api"
import { Box, Divider } from "@mui/material"
import Image from "next/image"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

const SearchTrack = () => {
    const searchParams = useSearchParams()
    const query = searchParams.get('q')
    const [tracks, setTracks] = useState<ITrackTop[]>([])

    const fetchData = async (query: string) => {
        const res = await sendRequest<IBackendRes<IModelPaginate<ITrackTop>>>({
            url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/tracks/search`,
            method: "POST",
            body: {
                current: 1,
                pageSize: 10,
                title: query
            }
        })
        if (res.data?.result) {
            console.log('res: ', res.data?.result)
            setTracks(res.data?.result)
        }
    }

    useEffect(() => {
        document.title = `"${query}" on Audiomesh – Discover, Stream & Share Music`

        if (query) {
            fetchData(query)
        }

    }, [query])

    return (
        <Box
            sx={{
                mt: 5
            }}
        >
            {(!query || !tracks.length) ?
                (<Box
                    sx={{
                        color: '#b3b3b3',
                        textAlign: 'center',
                        fontSize: 16
                    }}
                >
                    No search results found.
                </Box>) :

                <>
                    <Box
                        sx={{
                            mb: 2,
                            color: '#fff',
                            fontSize: 16,
                            fontWeight: 500
                        }}
                    >
                        Search results for {`"${query}"`}
                    </Box>
                    <Divider sx={{ borderColor: '#2a2a2a' }} />
                    <Box
                        sx={{
                            mt: 2
                        }}
                    >
                        {tracks.map((track) => (
                            <Box
                                key={track._id}
                                sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: 2,
                                    p: 1.5,
                                    borderRadius: 2,
                                    cursor: 'pointer',
                                    transition: 'all 0.2s ease',
                                    '&:hover': {
                                        backgroundColor: '#282828'
                                    }
                                }}>
                                <Image
                                    width={50}
                                    height={50}
                                    src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${track.imgUrl}`}
                                    alt={track.title}
                                    style={{
                                        borderRadius: 6,
                                        objectFit: 'cover'
                                    }}
                                />
                                <Link
                                    href={`/track/${convertSlugUrl(track.title)}-${track._id}.html?audio=${track.trackUrl}`}
                                    style={{
                                        flex: 1,
                                        textDecoration: 'none',
                                        color: '#fff',
                                        fontSize: 15,
                                        fontWeight: 500,
                                    }}
                                >
                                    {track.title}
                                </Link>
                            </Box>
                        ))}
                    </Box>
                </>
            }
        </Box>
    )
}

export default SearchTrack