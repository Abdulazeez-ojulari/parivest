import '../styles/globals.css'
import '../components/navbar/navbar.css'
import React from 'react'
import Script from 'next/script'

function MyApp({ Component, pageProps }) {
  return <React.Fragment>
        <Component {...pageProps} />
        <Script afterInteractive src="https://code.iconify.design/2/2.0.4/iconify.min.js"></Script>
      </React.Fragment>
}

export default MyApp
