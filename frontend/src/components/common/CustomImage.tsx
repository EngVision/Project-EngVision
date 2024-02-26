import { useRef } from 'react'

interface CustomImageProps {
  src: string
  alt?: string
  fallback?: string
  onClick?: () => void
  className?: string
}

const CustomImage = ({
  src = '',
  alt = '',
  fallback = 'https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png',
  onClick = () => {},
  className = '',
}: CustomImageProps) => {
  const imageRef = useRef<HTMLImageElement | null>(null)

  const handleError = () => {
    if (imageRef.current) {
      imageRef.current.src = fallback
    }
  }

  return (
    <img
      ref={imageRef}
      style={{ borderRadius: 6 }}
      className={className}
      onClick={onClick}
      src={src}
      alt={alt}
      onError={handleError}
      role="presentation"
    />
  )
}

export default CustomImage
