import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { examApi } from '../../../services/examApi'

const EntranceExam = () => {
  const { level = '' } = useParams<{ level: string }>()
  const [idParts, setIdParts] = useState<any>()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPart = async () => {
      const exam = await examApi.getEntranceExam(level)
      const idPart = exam.parts
      setIdParts(idPart)
      navigate(`./exercise/${idPart[0]}`)
    }
    fetchPart()
  }, [])

  return <></>
}

export default EntranceExam
