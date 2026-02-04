'use client'
import { convertSlugUrl } from "@/utils/api"
import { Box, Divider, Typography } from "@mui/material"
import Image from "next/image"
import Link from "next/link"

interface IProps {
    likeTracks: ITrackTop[]
}

const LikeTracks = (props: IProps) => {
    const { likeTracks } = props
    return (
        <Box
            sx={{
                mt: 4
            }}
        >
            <h2
                style={{
                    color: '#fff',
                    marginBottom: 8
                }}
            >
                Hear the tracks you've liked:
            </h2>

            <Divider sx={{ mb: 3, borderColor: '#333' }} />

            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
                    gap: 3
                }}
            >
                {likeTracks.map((likeTrack) => (
                    <Box key={likeTrack._id}>
                        {/* Image wrapper */}
                        <Box
                            sx={{
                                position: 'relative',
                                width: '100%',
                                aspectRatio: '1 / 1',
                                borderRadius: '10px',
                                overflow: 'hidden',
                                cursor: 'pointer',
                                transition: 'all 0.3s ease',
                                '&:hover img': {
                                    transform: 'scale(1.08)',
                                    filter: 'brightness(1.1)'
                                },
                                '&:hover': {
                                    boxShadow: '0 10px 30px rgba(0,0,0,0.6)'
                                }
                            }}
                        >
                            <Image
                                src={`${process.env.NEXT_PUBLIC_BACKEND_URL}/images/${likeTrack.imgUrl}`}
                                alt={likeTrack.title}
                                fill
                                style={{
                                    objectFit: 'cover',
                                    transition: 'all 0.3s ease'
                                }}
                            />
                        </Box>

                        <Link
                            href={`/track/${convertSlugUrl(likeTrack.title)}-${likeTrack._id}.html?audio=${likeTrack.trackUrl}`}
                            style={{
                                textDecoration: 'none'
                            }}
                        >
                            <Typography
                                sx={{
                                    fontSize: 17,
                                    whiteSpace: 'nowrap',
                                    overflow: 'hidden',
                                    maxWidth: 180,
                                    textOverflow: 'ellipsis',
                                    color: '#fff',
                                    mt: 1,
                                    ml: 1,

                                    '&:hover': {
                                        color: '#585858',
                                    },
                                }}
                            >
                                {likeTrack.title}
                            </Typography>
                        </Link>
                    </Box>
                ))}
            </Box>
        </Box>

    )
}

export default LikeTracks