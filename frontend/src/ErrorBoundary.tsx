import { ReactNode } from 'react'
import { ErrorBoundary as ErrorBoundaryWrapper } from 'react-error-boundary'
import { Result, Typography } from 'antd'
import { CloseCircleOutlined } from '@ant-design/icons'

const { Paragraph, Text } = Typography

/**
 * Error Boundary
 *
 * This component will catch any uncaught errors in the app
 * and display a user-friendly screen instead of a white screen
 */
// write props for children  const ErrorBoundary = ({ children }) =>
interface ErrorBoundaryProps {
  children: ReactNode
}

const ErrorBoundary: React.FC<ErrorBoundaryProps> = ({ children }) => (
  <ErrorBoundaryWrapper FallbackComponent={ErrorScreen}>
    {children}
  </ErrorBoundaryWrapper>
)

export default ErrorBoundary

function ErrorScreen() {
  return (
    <Result
      status="error"
      title="Something went wrong. Please reload the page."
    >
      <div className="desc">
        <Paragraph>
          <Text
            strong
            style={{
              fontSize: 16,
            }}
          >
            If the problem still persists:
          </Text>
        </Paragraph>
        <Paragraph>
          <CloseCircleOutlined className="site-result-demo-error-icon" />
          &nbsp;Please wait and try later.
        </Paragraph>
        <Paragraph>
          <CloseCircleOutlined className="site-result-demo-error-icon" />
          &nbsp;Contact to our site.
          <a href="https://forms.gle/c8mwvUgqfPeJmaG16">Feedback Form</a>
        </Paragraph>
      </div>
    </Result>
  )
}
