'use client';

import { AppProgressBar as ProgressBar } from 'next-nprogress-bar';

const NProgressWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="en">
            <body>
                {children}
                <ProgressBar
                    height="2px"
                    color="#ccc"
                    options={{ showSpinner: false }}
                    shallowRouting
                />
            </body>
        </html>
    );
}

export default NProgressWrapper