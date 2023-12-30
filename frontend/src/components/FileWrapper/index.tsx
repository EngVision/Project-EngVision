import { Image } from 'antd'
import { File } from '../../services/coursesApi/types'
import { UPLOAD_FILE_URL } from '../../utils/constants'

interface FileWrapperProps {
  file: File
  styleWrapper?: string
  styleThumbnail?: string
  styleFileName?: string
  styleFileSize?: string
  thumbnailPreview?: boolean
  onClick?: (value: any) => void
}

function FileWrapper({
  file,
  styleWrapper,
  styleThumbnail,
  styleFileName,
  styleFileSize,
  onClick,
}: FileWrapperProps) {
  const getThumbnail = () => {
    if (file?.mimetype.startsWith('image/')) {
      return `${UPLOAD_FILE_URL}${file?.id}`
    } else if (file?.mimetype.startsWith('audio/')) {
      return `https://cdn.pixabay.com/photo/2013/07/13/11/42/audio-158489_1280.png`
    } else if (file?.mimetype === 'application/pdf') {
      return `https://developers.zamzar.com/img/convert/pdf.png`
    }
  }

  return (
    <div
      className={`flex gap-2 items-center max-w-[300px] rounded-md ${styleWrapper}`}
      onClick={onClick}
    >
      <Image
        preview={false}
        width={40}
        height={40}
        src={getThumbnail()}
        className={`rounded-md ${styleThumbnail}`}
      />

      <div className="flex-1 min-w-0">
        <p
          className={`w-full truncate overflow-hidden font-semibold ${styleFileName}`}
        >
          {file?.originalName || ''}
        </p>
        <p className={`font-medium ${styleFileSize}`}>{file?.size || ''}</p>
      </div>
    </div>
  )
}

export default FileWrapper
