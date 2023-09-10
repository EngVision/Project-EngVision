import { Button, Form, Input } from 'antd'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Email } from '../../services/accountApi/types'
import accountApi from '../../services/accountApi'
import { toast } from 'react-toastify'
import { ROUTES } from '../../utils/constants'

const SendMailResetPassword: React.FC = () => {
  const [error, setError] = useState<string>('');
  const [sentMail, setSentMail] = useState<boolean>(false);
  const [seconds, setSeconds] = useState(30);
  const navigate = useNavigate();

  useEffect(() => {
    if(localStorage.getItem('timeForgotPassword')) {
      setSentMail(true);
      setSeconds(Number(localStorage.getItem('timeForgotPassword')));
    }
  }, [])

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if(sentMail) {
      const interval = setInterval(() => {
        const prevSeconds = Number(localStorage.getItem('timeForgotPassword'));
        localStorage.setItem('timeForgotPassword', String(prevSeconds - 1));
        if(prevSeconds < 1) {
          localStorage.removeItem('timeForgotPassword');
          clearInterval(interval);
          setSentMail(false);
        }
        else setSeconds(prevSeconds - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [sentMail]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
  }

  const onFinish = async (values: Email) => {
    setSentMail(true);
    localStorage.setItem('timeForgotPassword', '30');
    setSeconds(30);
    try {
      const rs = await accountApi.sendMailForgotPassword(values);
      if(rs.status === 200) {
        toast.success(rs.data.message);
      }
      else toast.error('Send mail failed');
    } catch (error) {
      setSentMail(false);
      setError(error.response.data.message);
    }
  }

  return (
    <div className="w-[515px] bg-white px-[32px] py-[24px] rounded-[16px] w">
      <div>
        <h4 className="text-center text-[40px] mb-[32px]">
          Forgot Your Password?
        </h4>
        <p className=" text-[#9D9DAD] my-[20px] text-[22px]">
          Just enter your email and we’ll send you a link to reset your password
        </p>
      </div>

      <div>
        <Form
          name="basic"
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            name="email"
            className="mb-[0px]"
            rules={[{ 
              validator(_, value) {
                return new Promise((resolve, reject) => {
                  if(validateEmail(value)) {
                    resolve('');
                  }
                  else reject('Invalid email')
                })
              }
            }]}
          >
            <Input
              placeholder="Email"
              size="middle"
              className="rounded-[8px] h-[44px]"
              onChange={() => setError('')}
            />
          </Form.Item>

          {error && <p className="text-[#ff4d4f] mt-[3px]">{error}</p>}

          <Form.Item className="text-center">
            <Button
              type="primary"
              shape="round"
              htmlType="submit"
              disabled={sentMail}
              className="w-full font-semibold h-[44px] text-[22px] mt-[20px]"
            >
              Reset Password {sentMail && '(' + seconds + 's)'}
            </Button>
          </Form.Item>

          <p
            className="text-[#0073EA] text-[22px] font-semibold text-center cursor-pointer my-[28px]"
            onClick={() => navigate(ROUTES.signIn)}
          >
            Return to Sign In?
          </p>

          {sentMail && <p className="text-center text-[#9D9DAD] text-[22px] mb-[30px]">
              Didn’t receive any email? Try looking up in your Spams or try
              again after
            <span className="font-semibold text-[#1B1B2A]"> {seconds} seconds</span>
          </p>}

          <p className="text-center text-[#9D9DAD] text-[22px]">
            Having troubles?
            <Link to="/sign-up" className="font-semibold text-[#0073EA] pl-2">
              Contact Us
            </Link>
          </p>
        </Form>
      </div>
    </div>
  )
}

export default SendMailResetPassword