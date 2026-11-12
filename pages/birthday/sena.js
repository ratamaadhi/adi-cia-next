import Head from 'next/head';
import BirthdayInvitation from '../../components/BirthdayComp';
import { senaBirthday } from '../../lib/birthday';

export default function SenaBirthdayPage({ siteUrl }) {
  return (
    <>
      <Head>
        <title>Ulang Tahun Pertama Sena | 29 November 2026</title>
        <meta name="description" content="Yuk, rayakan ulang tahun pertama Naushad Sena Al Farabi bersama Adhi dan Cia. Minggu, 29 November 2026, pukul 15.00 WIB." />
        <meta name="theme-color" content="#ffd22e" />
        <meta name="robots" content="noindex, nofollow" />
        <meta property="og:title" content="Sena turns ONE! Kamu diundang." />
        <meta property="og:description" content="Minggu, 29 November 2026 · 15.00 WIB. Yuk, datang dan bermain bersama Sena!" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${siteUrl}/birthday/sena`} />
        <meta property="og:image" content={`${siteUrl}/birthday/sena/sena-share.jpg`} />
        <meta property="og:image:alt" content="Sena menyambut ulang tahun pertamanya" />
        <link rel="icon" href="/birthday/sena/favicon.svg" type="image/svg+xml" />
        <link rel="preload" href="/birthday/sena/fonts/barlow-condensed-800.ttf" as="font" type="font/ttf" crossOrigin="anonymous" />
      </Head>
      <BirthdayInvitation event={senaBirthday} />
    </>
  );
}

SenaBirthdayPage.standaloneInvitation = true;

export async function getServerSideProps() {
  const siteUrl = (process.env.SITE_URL || senaBirthday.siteUrl).replace(/\/$/, '');
  return { props: { siteUrl } };
}
