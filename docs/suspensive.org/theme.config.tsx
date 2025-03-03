import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router.js'
import { type DocsThemeConfig, useConfig } from 'nextra-theme-docs'

const localeBanner = {
  en: (
    <span>
      👀 Check out the changes in Suspensive v2. <Link href="/docs/migrate-to-v2">read more →</Link>
    </span>
  ),
  ko: (
    <span>
      👀 Suspensive v2에서의 변경을 확인하세요. <Link href="/docs/migrate-to-v2">더보기 →</Link>
    </span>
  ),
} as const

const config: DocsThemeConfig = {
  banner: {
    key: 'suspensive banner',
    text: function Text() {
      const { locale } = useRouter()
      return localeBanner[locale as keyof typeof localeBanner]
    },
    dismissible: true,
  },
  chat: {
    link: 'https://discord.gg/RFcR9WWmCH',
  },
  logo: function Logo() {
    return (
      <div className="flex items-center gap-1">
        <Image src="/img/logo_dark.png" width={34} height={34} alt="suspensive logo" />
        <div className="relative">
          <strong>Suspensive</strong>
          <span className="right absolute text-[8px]">v2</span>
        </div>
      </div>
    )
  },
  head: function Head() {
    const { title, frontMatter } = useConfig()
    const { asPath, defaultLocale, locale } = useRouter()
    const url = 'https://suspensive.org' + (defaultLocale === locale ? asPath : `/${locale}${asPath}`)

    return (
      <>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta property="og:title" content={title || 'Suspensive'} />
        <meta property="og:url" content={url} />
        <meta property="og:description" content={frontMatter.description || 'Packages to use React Suspense easily'} />
        <meta property="og:image" content="/banner.png" />
        <link rel="icon" href="/favicon.ico" type="image/ico" />
      </>
    )
  },
  project: {
    link: 'https://github.com/toss/suspensive',
  },
  docsRepositoryBase: 'https://github.com/toss/suspensive/tree/main/docs/suspensive.org',
  useNextSeoProps() {
    const { asPath } = useRouter()
    if (asPath !== '/') {
      return {
        titleTemplate: '%s – Suspensive',
      }
    }
  },
  feedback: { content: '' },
  editLink: {
    text: function Text() {
      const router = useRouter()

      if (router.pathname.includes('.ko')) {
        return <>이 페이지를 수정하기 →</>
      }

      return <>Edit this page →</>
    },
  },
  sidebar: {
    titleComponent({ title }) {
      return <>{title}</>
    },
    defaultMenuCollapseLevel: 4,
    toggleButton: true,
  },
  i18n: [
    { locale: 'en', text: 'English' },
    { locale: 'ko', text: '한국어' },
  ],
  search: {
    placeholder: function Placeholder() {
      const router = useRouter()

      if (router.pathname.includes('.ko')) {
        return '검색어를 입력하세요...'
      }

      return 'Search documentation...'
    },
  },
  footer: {
    text: 'MIT 2024 © Viva Republica, Inc.',
  },
  darkMode: false,
  nextThemes: {
    forcedTheme: 'dark',
  },
}

export default config
