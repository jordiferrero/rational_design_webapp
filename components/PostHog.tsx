'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense, useRef } from 'react'
import posthog from 'posthog-js'

function PostHogTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const initialized = useRef(false)

  useEffect(() => {
    const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY
    const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com'

    if (!POSTHOG_KEY || typeof window === 'undefined') {
      return
    }

    // Initialize PostHog only once
    if (!initialized.current) {
      posthog.init(POSTHOG_KEY, {
        api_host: POSTHOG_HOST,
        autocapture: true,
        capture_pageview: false, // We'll capture pageviews manually
        loaded: (posthog) => {
          if (process.env.NODE_ENV === 'development') {
            console.log('PostHog loaded')
          }
        },
      })
      initialized.current = true
    }

    // Track page views on route change
    if (initialized.current) {
      const url = pathname + (searchParams?.toString() ? `?${searchParams.toString()}` : '')
      posthog.capture('$pageview', {
        $current_url: window.location.origin + url,
      })
    }
  }, [pathname, searchParams])

  return null
}

export function PostHog() {
  const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY

  if (!POSTHOG_KEY) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <PostHogTracker />
    </Suspense>
  )
}

