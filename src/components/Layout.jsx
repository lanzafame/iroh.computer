'use client';

import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {motion} from 'framer-motion';

import {Footer} from '@/components/Footer';
import {Header} from '@/components/Header';
import {Logo} from '@/components/Logo';
import {Navigation} from '@/components/Navigation';
import {SectionProvider} from '@/components/SectionProvider';

export function pathLayout(pathname = '') {
  if (pathname.startsWith('/docs')) {
    return 'docs';
  } else if (pathname.startsWith('/spec')) {
    return 'spec';
  }
  return 'default';
}

export function Layout({children, allSections = {}}) {
  const pathname = usePathname();

  switch (pathLayout(pathname)) {
    case 'docs':
      return <DocsLayout sections={allSections[pathname]}>{children}</DocsLayout>;
    case 'spec':
      return <SpecLayout sections={allSections[pathname]}>{children}</SpecLayout>
    default:
      return <DefaultLayout sections={allSections[pathname]}>{children}</DefaultLayout>;
  }
}

function DocsLayout({children, sections = []}) {
  return (
    <SectionProvider sections={sections}>
      <div className="h-full lg:ml-72 xl:ml-80">
        <motion.header
          layoutScroll
          className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex"
        >
          <div className="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pb-8 lg:pt-4 lg:dark:border-white/10 xl:w-80">
            <div className="hidden lg:flex">
              <Link href="/" aria-label="Home">
                <Logo className="h-6" />
              </Link>
            </div>
            <Header />
            <Navigation className="hidden lg:mt-10 lg:block" />
          </div>
        </motion.header>
        <div className="relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8">
          <main className="flex-auto">{children}</main>
          <Footer />
        </div>
      </div>
    </SectionProvider>
  );
}

function SpecLayout({ children, sections = [] }) {
  return (
    <SectionProvider sections={sections}>
      <div className="h-full lg:ml-72 xl:ml-80">
        <motion.header
          layoutScroll
          className="contents lg:pointer-events-none lg:fixed lg:inset-0 lg:z-40 lg:flex"
        >
          <div className="contents lg:pointer-events-auto lg:block lg:w-72 lg:overflow-y-auto lg:border-r lg:border-zinc-900/10 lg:px-6 lg:pb-8 lg:pt-4 lg:dark:border-white/10 xl:w-80">
            <div className="hidden lg:flex">
              <Link href="/" aria-label="Home">
                <Logo className="h-6" />
              </Link>
            </div>
            <Header />
            {/* <Navigation className="hidden lg:mt-10 lg:block" /> */}
          </div>
        </motion.header>
        <div className="relative flex h-full flex-col px-4 pt-14 sm:px-6 lg:px-8">
          <main className="flex-auto">{children}</main>
          <Footer />
        </div>
      </div>
    </SectionProvider>
  )
}

function DefaultLayout({children, sections = []}) {
  return (
    <SectionProvider sections={sections}>
      {children}
    </SectionProvider>
  );
}
