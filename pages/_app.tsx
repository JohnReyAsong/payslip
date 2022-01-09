import { ApolloProvider } from '@apollo/client'
import { ChakraProvider } from '@chakra-ui/react'
import client from '@graphql/apolloClient'
import { AppProps } from 'next/app'
import Head from 'next/head'
import { FC } from 'react'
import theme from 'theme'

const App: FC<AppProps> = ({ Component, pageProps }) => (
  <ApolloProvider client={client}>
    <Head>
      <title>{process.env.appName}</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  </ApolloProvider>
)

export default App
