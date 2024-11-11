import { Button, Divider, Flex, Space, Typography } from 'antd'
import Search from 'antd/es/input/Search'
import RecommendSection from './RecommendSection'

import { useState } from 'react'
import Icon from '@ant-design/icons'
import AppSection from './AppSection/AppSection'

const MainPage = () => {
  const [searchText, setSearchText] = useState('')

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }
  return (
    <Flex vertical style={{ width: '440px', border: '1px solid black' }}>
      <Flex
        vertical
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
        }}
      >
        <Search
          placeholder="搜尋 App Store"
          value={searchText}
          onChange={handleSearchChange}
          style={{
            backgroundColor: '#f1f1f5',
            padding: '4px 12px',
          }}
        />
        <Divider style={{ margin: '0px' }} />
      </Flex>
      <Space direction="vertical" style={{ padding: '8px' }}>
        <Typography
          style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#010101',
          }}
        >
          推介
        </Typography>
        <RecommendSection searchText={searchText} />
        <Divider style={{ margin: '0px' }} />
      </Space>
      <AppSection searchText={searchText} />
    </Flex>
  )
}

export default MainPage
