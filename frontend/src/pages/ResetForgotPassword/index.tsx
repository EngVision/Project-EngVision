import { Button, Form, Input } from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import accountApi from '../../services/accountApi';
import classNames from 'classnames';

const ResetForgotPassword: React.FC = () => {
  const { resetPasswordCode } = useParams();
  const [inputPassword, setInputPassword] = useState<string>('');
  const [isValidatedUrl, setValidatedUrl] = useState<boolean>(false)
  const navigate = useNavigate()

  useEffect(() => {
    validateUrl();
  }, [])

  const validateUrl = async () => {
    const res = await accountApi.validateUrlResetPassword({
      resetPasswordCode: String(resetPasswordCode),
    })
    if(!res.data) navigate('/forgot-password');
    setValidatedUrl(res.data);
  }

  const validatePassword = (password: string) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return password && password.length >= 8 && passwordRegex.test(password);
  }

  const onFinish = async (values: any) => {
    try {
      const rs = await accountApi.resetForgotPassword({
        resetPasswordCode: String(resetPasswordCode),
        newPassword: values.password,
      });
      if(rs.status === 200) {
        alert(rs.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div
      className={classNames(
        'w-[515px] bg-white px-[32px] py-[24px] rounded-[16px]',
        { hidden: !isValidatedUrl },
      )}
    >
      <div>
        <h4 className="text-center text-[40px] mb-[32px]">
          Reset Your Password?
        </h4>
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
            name="password"
            rules={[{ 
              validator(rule, value) {
                return new Promise((resolve, reject) => {
                  if(validatePassword(value)) {
                    resolve("");
                  }
                  else reject("The password must be at least 8 characters long and contain at least 1 uppercase letter, 1 lowercase letter, and 1 number or special character");
                })
              }
            }]}
          >
            <Input.Password
              placeholder="New password!"
              size="large"
              className="rounded-[8px] h-[44px]"
              onChange={(e) => {setInputPassword(e.target.value)}}
            />
          </Form.Item>
          
          <Form.Item
            rules={[{ 
              validator(rule, value) {
                return new Promise((resolve, reject) => {
                  if(value === inputPassword) {
                    resolve("");
                  }
                  else reject("The retype password not match");
                })
              }
            }]}
          >
            <Input.Password
              placeholder="Retype new password!"
              size="large"
              className="rounded-[8px] h-[44px]"
            />
          </Form.Item>

          <Form.Item className="text-center">
            <Button
              type="primary"
              shape="round"
              htmlType="submit"
              className="w-full font-semibold h-[44px] text-[22px] mt-[20px]"
            >
              Reset Password
            </Button>
          </Form.Item>

          <p
            className="text-[#0073EA] text-[22px] font-semibold text-center cursor-pointer my-[28px]"
            onClick={() => navigate('/sign-in')}
          >
            Return to Sign In?
          </p>

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

export default ResetForgotPassword