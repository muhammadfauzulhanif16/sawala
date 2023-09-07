import { Box, Center, Container } from '@chakra-ui/react'
import PropTypes from 'prop-types'
import { Header } from './Header.jsx'
import { NavigationBar } from './NavigationBar.jsx'

export const Layout = ({ children, isAuth = false, isShowSearch }) => {
  if (isAuth)
    return (
      <Center h='100vh'>
        <Container>{children}</Container>
      </Center>
    )

  return (
    <Box py={24}>
      <Header isShowSearch={isShowSearch} />

      <Container>{children}</Container>

      <NavigationBar />
    </Box>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
  isAuth: PropTypes.bool,
  isShowSearch: PropTypes.bool,
}
