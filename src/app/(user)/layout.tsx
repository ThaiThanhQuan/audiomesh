import AppFooter from '@/components/footer/app.footer';
import AppHeader from '@/components/header/app.header';
import Script from "next/script";

const schema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "AudioMesh",
  "url": "https://audiomesh-git-main-quan-thais-projects.vercel.app/",
  "description": "Stream and discover music online for free with AudioMesh.",
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <>
      <AppHeader />
      {props.children}
      <div style={{ marginBottom: '100px' }}></div>
      <AppFooter />

      <Script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </>
  );
}
