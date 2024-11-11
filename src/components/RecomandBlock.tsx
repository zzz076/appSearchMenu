import { Flex, Image } from 'antd'
import Typography from 'antd/es/typography/Typography'

interface RecommendBlockProps {
  pic: string
  title: string
  content: string
}
const RecommendBlock = ({ pic, title, content }: RecommendBlockProps) => {
  return (
    <Flex vertical style={{ padding: '8px', width: '100px' }}>
      <Image width={75} src={pic} alt="App Icon" preview={false} style={{ borderRadius: '20%' }} />
      <Typography style={{ color: '#1e1e1e' }}>{title}</Typography>
      <Typography style={{ color: '#8a8a8a' }}>{content}</Typography>
    </Flex>
  )
}

export default RecommendBlock
