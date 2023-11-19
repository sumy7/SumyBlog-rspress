import { useEffect } from "react"

declare const dataLayer: any[]
declare const gtag: (...args: any[]) => void
declare global {
  interface Window {
    dataLayer?: typeof dataLayer
    gtag?: typeof gtag
  }
}

interface GAProps {
    id: string
}

export default function GoogleAnalytics({id}: GAProps) {
    useEffect(() => {
        if (window.dataLayer && window.gtag){
            return
        }
        const gtagScript = document.createElement('script')
        gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${id}`
        gtagScript.async = true
        document.head.appendChild(gtagScript)
        window.dataLayer = window.dataLayer || []
        window.gtag = function () {
            dataLayer.push(arguments)
        }
        gtag('js', new Date())
        gtag('config', id)
    }, [])
}