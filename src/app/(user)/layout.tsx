import AppFooter from '@/components/footer/app.footer';
import AppHeader from '@/components/header/app.header';

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      {props.children}
      <div style={{ marginBottom: '100px' }}></div>
      <AppFooter />
    </>
  );
}
