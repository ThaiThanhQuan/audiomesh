import ThemeRegistry from '@/components/theme-registry/theme.registry';
import NextAuthWrapper from '@/lib/next.auth.wrapper';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <NextAuthWrapper>
          <ThemeRegistry>
            {props.children}
          </ThemeRegistry>
        </NextAuthWrapper>
      </body>
    </html >
  );
}
