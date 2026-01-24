import ThemeRegistry from '@/components/theme-registry/theme.registry';
import NextAuthWrapper from '@/lib/next.auth.wrapper';
import { ToastProvider } from '@/utils/toast';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NextAuthWrapper>
          <ThemeRegistry>
            <ToastProvider>
              {props.children}
            </ToastProvider>
          </ThemeRegistry>
        </NextAuthWrapper>
      </body>
    </html >
  );
}
