import { Image } from 'antd'
import { File } from '../../services/coursesApi/types'
import { MaterialTypes, UPLOAD_FILE_URL } from '../../utils/constants'

interface FileWrapperProps {
  file: File
  type: MaterialTypes
  styleWrapper?: string
  styleThumbnail?: string
  onClick?: (value: any) => void
}

function FileWrapper({
  file,
  type,
  styleWrapper,
  styleThumbnail,
  onClick,
}: FileWrapperProps) {
  const getThumbnail = () => {
    switch (type) {
      case MaterialTypes.Images:
        return `${UPLOAD_FILE_URL}${file?.id}`
      case MaterialTypes.PdfFiles:
        return `https://developers.zamzar.com/img/convert/pdf.png`
      case MaterialTypes.Audios:
        return `https://cdn.pixabay.com/photo/2013/07/13/11/42/audio-158489_1280.png`
      default:
        break
    }
  }

  return (
    <div
      className={`flex gap-2 items-center max-w-[300px] rounded-md px-2 py-[6px] ${styleWrapper}`}
      onClick={onClick}
    >
      <Image
        preview={false}
        width={60}
        src={getThumbnail()}
        className={`rounded-md ${styleThumbnail}`}
      />

      <div className="flex-1 min-w-0">
        <p className="w-full truncate overflow-hidden font-semibold">
          {file?.originalName || ''}
        </p>
        <p className="font-medium">{file?.size || ''}</p>
      </div>
    </div>
  )
}

export default FileWrapper
