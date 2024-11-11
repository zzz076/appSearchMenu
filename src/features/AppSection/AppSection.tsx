import { useEffect, useState, useMemo } from 'react'

import axios from 'axios'
import { Divider, Empty, Flex, Pagination, Space, Spin, Typography } from 'antd'
import './AppSection.css' // 假設我們在這裡添加了 RWD 的 CSS
import AppBlock from '../../components/AppBlock'

// 其他接口和狀態管理保持不變
interface TopFreeApplication {
  id: {
    label?: string
    attributes: {
      'im:id': string
    }
  }
  'im:name': {
    label: string
  }
  category: {
    attributes: {
      label: string
    }
  }
  'im:image': {
    label: string
    attributes: {
      height: string
    }
  }[]
  summary: {
    label: string
  }
  'im:price': {
    label: string
    attributes: {
      amount: string
      currency: string
    }
  }
  'im:artist': {
    label: string
    attributes?: {
      href: string
    }
  }
  link: {
    attributes: {
      rel: string
      type: string
      href: string
    }
  }
  rights?: {
    label: string
  }
  title: {
    label: string
  }
  updated?: {
    label: string
  }
}

interface AppSectionProps {
  searchText: string | null
}

const AppSection = ({ searchText }: AppSectionProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const pageSize = 10
  const [apps, setApps] = useState<TopFreeApplication[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchApps = async () => {
      try {
        setLoading(true)
        const response = await axios.get('https://itunes.apple.com/tw/rss/topfreeapplications/limit=100/json')
        setApps(response.data.feed.entry)
      } catch (err) {
        setError('Failed to fetch apps.')
      } finally {
        setLoading(false)
      }
    }

    fetchApps()
  }, [])

  const filteredApps = useMemo(() => {
    if (!searchText) return apps
    return apps.filter((app) => {
      return (
        app['im:name']?.label?.toLowerCase().includes(searchText.toLowerCase()) ||
        app.summary?.label?.toLowerCase().includes(searchText.toLowerCase()) ||
        app.title?.label?.toLowerCase().includes(searchText.toLowerCase())
      )
    })
  }, [apps, searchText])

  const currentApps = useMemo(
    () => filteredApps.slice((currentPage - 1) * pageSize, currentPage * pageSize),
    [filteredApps, currentPage]
  )

  const onPageChange = (page: number) => {
    setCurrentPage(page)
  }

  if (loading) {
    return (
      <Flex
        style={{ height: '600px', alignItems: 'center', justifyContent: 'center' }}
        vertical
        className="loading-container"
      >
        <Spin tip="Loading..." />
      </Flex>
    )
  }

  if (error) {
    return (
      <Flex style={{ height: '600px' }} vertical className="error-container">
        <Typography>{error}</Typography>
      </Flex>
    )
  }

  return (
    <Flex style={{ height: '600px' }} vertical className="app-section-container">
      {currentApps.length === 0 ? (
        <Flex style={{ justifyContent: 'center', width: '100%' }}>
          <Empty description="No apps found" />
        </Flex>
      ) : (
        <>
          {currentApps.map((x, index) => (
            <Space direction="vertical" key={x.id.attributes['im:id']}>
              <AppBlock
                index={((currentPage - 1) * pageSize + index + 1).toString()}
                pic={x['im:image'][0].label}
                title={x['im:name'].label}
                type={x.category.attributes.label}
                id={x.id.attributes['im:id']}
              />
              {index < currentApps.length - 1 && <Divider style={{ margin: '0' }} />}
            </Space>
          ))}
          <Pagination
            current={currentPage}
            pageSize={pageSize}
            total={filteredApps.length}
            onChange={onPageChange}
            showSizeChanger={false}
            style={{ paddingTop: '8px' }}
          />
        </>
      )}
    </Flex>
  )
}

export default AppSection
