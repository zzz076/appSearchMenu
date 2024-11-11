import { Flex, Typography, Image, Rate } from 'antd'
import axios from 'axios'
import { useEffect, useState } from 'react'

interface AppBlockProps {
  index: string
  pic: string
  title: string
  type: string
  id: string
}

interface AppData {
  averageUserRating: string
}

const AppBlock = ({ index, pic, title, type, id }: AppBlockProps) => {
  const [appData, setAppData] = useState<AppData | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchAppData = async () => {
      try {
        const response = await axios.get(`https://itunes.apple.com/tw/lookup?id=${id}`, { timeout: 10000 })
        if (response.data.resultCount > 0) {
          setAppData(response.data.results[0])
        } else {
          setError('App not found')
        }
      } catch (err) {
        setError('Failed to fetch data')
        console.error(err)
      }
    }

    fetchAppData()
  }, [id])

  const roundedRating = appData?.averageUserRating ? Math.round(Number(appData.averageUserRating) * 2) / 2 : 0

  return (
    <Flex style={{ width: '100%', alignItems: 'center', gap: '16px', paddingTop: '8px' }}>
      <Flex style={{ paddingLeft: '16px', width: '36px', textAlign: 'right' }}>{index}</Flex>
      <Image width={53} src={pic} alt="App Icon" preview={false} style={{ borderRadius: '50%' }} />
      <Flex vertical>
        <Typography>{title}</Typography>
        <Typography>{type}</Typography>
        {error ? (
          <Typography style={{ color: 'red' }}>{error}</Typography>
        ) : (
          appData && (
            <Rate
              allowHalf
              value={roundedRating}
              disabled
              style={{
                fontSize: '8px',
                color: '#fadb14',
              }}
              className="custom-rate"
            />
          )
        )}
      </Flex>
    </Flex>
  )
}

export default AppBlock
