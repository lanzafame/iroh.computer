import glob from 'fast-glob';

import {Providers} from '@/app/providers';
import {Layout} from '@/components/Layout';

import '@/styles/tailwind.css';

export const metadata = {
  title: {
    template: '%s - Protocol API Reference',
    default: 'Protocol API Reference',
  },
};

export default async function RootLayout({children}) {
  const pages = await glob('**/*.mdx', {cwd: 'src/app'});
  let allSections = await Promise.all(
      pages.map(async (filename) => [
        '/' + filename.replace(/(^|\/)page\.mdx$/, ''),
        (await import(`./${filename}`)).sections,
      ]),
  );
  allSections = Object.fromEntries(allSections);

  return (
    <html lang="en" className="h-full" suppressHydrationWarning>
      <body className="flex min-h-full bg-white antialiased dark:bg-zinc-900">
        <Providers>
          <div className="w-full">
            <Layout
              allSections={allSections}>
              {children}
            </Layout>
          </div>
        </Providers>
      </body>
    </html>
  );
}
