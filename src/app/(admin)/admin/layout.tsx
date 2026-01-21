import AdminSidebar from '@/components/admin/admin.sidebar';
import { Box } from '@mui/material';

export default function RootLayout(props: { children: React.ReactNode }) {
    return (
        <>
            <AdminSidebar />
            <Box
                sx={{
                    ml: `250px`,
                    p: 3,
                }}
            >
                {props.children}
            </Box>
        </>
    );
}
