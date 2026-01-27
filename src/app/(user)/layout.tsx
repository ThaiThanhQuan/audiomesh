import AppFooter from '@/components/footer/app.footer';
import AppHeader from '@/components/header/app.header';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Audiomesh – Discover, Stream & Share Music',
  description: 'Listen to unlimited music on Audiomesh. Discover new tracks and share your sound with the world.',
  // openGraph: {
  //   title: 'Audiomesh – Discover, Stream & Share Music',
  //   description: 'Listen to unlimited music on Audiomesh. Discover new tracks and share your sound with the world.',
  //   type: 'website',
  //   images: [`https://tall-publications-dated-buildings.trycloudflare.com/default/openGraph_image.png`]
  // }
}
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
