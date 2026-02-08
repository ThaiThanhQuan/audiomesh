import SearchTrack from "@/components/header/search.track"
import { Container } from "@mui/material"
import { Suspense } from "react"

const SearchPage = () => {
    return (
        <Container>
            <Suspense fallback={<div>Loading search...</div>}>
                <SearchTrack />
            </Suspense>

        </Container>
    )
}

export default SearchPage