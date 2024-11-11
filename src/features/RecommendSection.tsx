import { useEffect, useMemo, useState } from 'react'
import RecommendBlock from '../components/RecomandBlock'
import axios from 'axios'
import { Empty, Flex, Spin } from 'antd'

interface RecommendApps {
  'im:name': {
    label: string
  }
  'im:image': Array<{
    label: string
  }>
  category: {
    attributes: {
      label: string
    }
  }
  id: {
    attributes: {
      'im:id': string
    }
  }
  summary: {
    label: string
  }
  title: {
    label: string
  }
}

interface RecommendSectionProps {
  searchText: string | null
}
const RecommendSection = ({ searchText }: RecommendSectionProps) => {
  const test = [{ pic: '圖片', title: '第一個', content: '內容' }]

  const [apps, setApps] = useState<RecommendApps[]>([])
  console.log('debug apps', apps)
  const filterList = apps?.filter((app) => {
    if (!searchText) {
      return true
    }
    return (
      app['im:name']?.label?.toLowerCase().includes(searchText) ||
      app.summary?.label?.toLowerCase().includes(searchText) ||
      app.title?.label?.toLowerCase().includes(searchText)
    )
  })

  useEffect(() => {
    const fetchApps = async () => {
      const response = await axios.get('https://itunes.apple.com/tw/rss/topgrossingapplications/limit=10/json')
      setApps(response.data.feed.entry)
    }
    fetchApps()
  }, [])

  if (apps === undefined) {
    return <LoadingRecommendSection />
  }

  if (filterList.length === 0) {
    return <EmptyRecommendSection />
  }

  return (
    <Flex style={{ width: '100%', overflowX: 'auto' }}>
      {filterList.map((x, index) => {
        return (
          <RecommendBlock
            key={index}
            pic={x['im:image'][0].label}
            title={x['im:name'].label}
            content={x.category.attributes.label}
          />
        )
      })}
    </Flex>
  )
}

export default RecommendSection

const LoadingRecommendSection = () => (
  <Flex style={{ justifyContent: 'center', width: '100%' }}>
    <Spin tip="Loading..." />
  </Flex>
)

const EmptyRecommendSection = () => (
  <Flex style={{ justifyContent: 'center', width: '100%' }}>
    <Empty description="No recommendations found" />
  </Flex>
)
