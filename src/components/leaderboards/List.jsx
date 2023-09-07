import { Table, TableContainer, Tbody, Th, Thead, Tr } from '@chakra-ui/react'
import { LeaderboardItem } from './Item.jsx'
import PropTypes from 'prop-types'

export const LeaderboardList = ({ users }) => {
  const columns = ['Avatar', 'Name', 'Score']

  return (
    <TableContainer>
      <Table variant='simple'>
        <Thead>
          <Tr>
            {columns.map((column, id) => (
              <Th key={id}>{column}</Th>
            ))}
          </Tr>
        </Thead>
        <Tbody>
          {users.map((user, id) => (
            <LeaderboardItem key={id} {...user} />
          ))}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

LeaderboardList.propTypes = {
  users: PropTypes.any,
}
