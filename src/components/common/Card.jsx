import {
  Avatar,
  Badge,
  Button,
  ButtonGroup,
  Card as ChakraCard,
  CardBody,
  CardFooter,
  CardHeader,
  Flex,
  Heading,
  SimpleGrid,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
} from '@chakra-ui/react'
import { timeFormatter } from '../../utils/timeFormatter.js'
import PropTypes from 'prop-types'
import parse from 'html-react-parser'
import { Tag as TagIcon } from '@emotion-icons/fluentui-system-regular'

export const Card = ({
  owner,
  createdAt,
  isShowContent = false,
  category,
  title,
  content,
  actions,
}) => {
  return (
    <ChakraCard shadow='none' rounded='xl' p={6} gap={4} w='full'>
      <CardHeader
        p={0}
        display='flex'
        alignItems='center'
        justifyContent='space-between'
      >
        <SimpleGrid w='full' columns={2} alignItems='center'>
          <Flex align='center' gap={4}>
            <Avatar w={10} h={10} name={owner?.name} src={owner?.avatar} />

            <Text noOfLines={1}>{owner?.name}</Text>
          </Flex>

          <Text color='gray.400' justifySelf='end' noOfLines={1}>
            {timeFormatter(createdAt)}
          </Text>
        </SimpleGrid>
      </CardHeader>

      <CardBody p={0}>
        {category && (
          <Tag variant='subtle' colorScheme='cyan' rounded='full' mb={4}>
            <TagLeftIcon as={TagIcon} />
            <TagLabel>{category}</TagLabel>
          </Tag>
        )}

        <Heading size='md' mb={2} noOfLines={!isShowContent && 1}>
          {title}
        </Heading>
        {content && (
          <Text as='div' noOfLines={!isShowContent && 1}>
            {parse(content)}
          </Text>
        )}
      </CardBody>

      <CardFooter p={0}>
        <ButtonGroup w='full' spacing={4}>
          {actions.map(({ icon, amountData, colorScheme, ...action }, id) => (
            <Button
              key={id}
              w='full'
              rounded='full'
              variant='ghost'
              colorScheme={colorScheme}
              {...action}
              gap={2}
            >
              {icon}
              <Badge rounded='full' colorScheme={colorScheme}>
                {amountData}
              </Badge>
            </Button>
          ))}
        </ButtonGroup>
      </CardFooter>
    </ChakraCard>
  )
}

Card.propTypes = {
  isShowContent: PropTypes.bool,
  actions: PropTypes.any,
  owner: PropTypes.any,
  createdAt: PropTypes.string,
  category: PropTypes.string,
  title: PropTypes.string,
  content: PropTypes.string,
}
