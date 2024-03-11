import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import MessengerCustomerChat from 'react-messenger-customer-chat'
import LocalesButton from '../../components/Header/LocalesButton'
import {
  FACEBOOK_APP_ID,
  FACEBOOK_PAGE_ID,
  PUBLIC_ROUTES,
} from '../../utils/constants'
import { Button } from 'antd'

export default function HomePage() {
  const { t } = useTranslation('translation', { keyPrefix: 'Homepage' })
  const navigate = useNavigate()

  return (
    <div className={`items-center bg-white flex flex-col gap-36`}>
      <div className="bg-white fixed flex w-full px-12 py-6 justify-between z-10 shadow-lg">
        <img loading="lazy" src="/assets/homepage/homepage-logo.svg" />
        <div className="flex gap-4 items-center">
          <LocalesButton />

          <Button
            type="primary"
            className="px-8 h-[44px] text-lg ml-4 rounded-[20px]"
            onClick={() => {
              navigate(PUBLIC_ROUTES.signUp)
            }}
          >
            Sign up
          </Button>
          <Button
            type="primary"
            className="px-8 h-[44px] text-lg rounded-[20px]"
            onClick={() => {
              navigate(PUBLIC_ROUTES.signIn)
            }}
          >
            Sign in
          </Button>
          {/* <DarkModeButton /> */}
        </div>
      </div>
      <div className="flex flex-col mx-16 gap-32 mt-[160px]">
        <div className="flex w-full max-w-[1080px] justify-between gap-5 max-md:flex-col">
          <div className="flex grow basis-[0%] flex-col gap-2">
            <div>
              <div className="text-black text-4xl font-bold leading-[72px]">
                {t('As a Student')}
              </div>
              <div className="text-black text-opacity-50 text-xl leading-8 text-justify">
                {t(
                  'Explore a world of learning with our interactive exercises and direct teacher communication, designed to engage and enlighten. With affordable and even free courses fees, we make quality education accessible to everyone.',
                )}
              </div>
            </div>
            <button
              className="text-white text-lg font-bold leading-8 whitespace-nowrap bg-blue-600 items-center px-5 py-3 rounded-xl max-w-fit"
              onClick={() => {
                navigate(PUBLIC_ROUTES.signUp)
              }}
              style={{ cursor: 'pointer' }}
            >
              {t('Join as a Student')}
            </button>
          </div>
          <img
            loading="lazy"
            src="/assets/homepage/homepage-1.png"
            className="object-contain object-center w-full overflow-hidden self-stretch grow basis-[0%]"
          />
        </div>
        <div className="w-full max-w-[1080px] ">
          <div className="gap-5 flex max-md:flex-col">
            <div className="flex flex-col max-md:w-full">
              <img
                loading="lazy"
                src="/assets/homepage/homepage-2.png"
                className="w-full "
              />
            </div>
            <div className="flex flex-col items-stretch ml-5">
              <div className="flex flex-col items-stretch my-auto gap-4">
                <div className="text-black text-4xl font-semibold leading-[72px]">
                  {t('As a Teacher')}
                </div>
                <div className="text-black text-2xl leading-8 text-justify">
                  {t(
                    'Join our educational community where your expertise and passion for teaching can truly shine.',
                  )}
                </div>
                <div className="text-black text-opacity-50 text-xl leading-8 text-justify">
                  <ul>
                    <li>
                      {t(
                        'Engage students with interactive exercises and direct communication for a lively learning environment.',
                      )}
                    </li>
                    <li>
                      {t(
                        'Offer a variety of teaching activities tailored to different styles and subjects.',
                      )}
                    </li>
                    <li>
                      {t('Accessible learning framework for all learners.')}
                    </li>
                    <li>{t('Benefit from competitive compensation.')}</li>
                    <li>
                      {t(
                        'Empower students on their journey of discovery and growth.',
                      )}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full max-w-[1080px] ">
          <div className="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
            <div className="flex flex-col items-stretch w-[55%] max-md:w-full">
              <div className="text-black text-4xl font-semibold leading-[72px]">
                {t('Get started by creating a free account and get register')}
              </div>
            </div>
            <div className="flex flex-col items-stretch w-full w-max[50%]">
              <img
                loading="lazy"
                src="/assets/homepage/homepage-3.png"
                className="w-full w-max[50%]"
              />
            </div>
          </div>
        </div>
        <div className="items-stretch flex max-w-full flex-col gap-6">
          <div className="text-black text-center text-5xl font-semibold leading-[72px]">
            {t('Start growing with our community')}
          </div>
          <div className="text-black text-opacity-50 text-center text-xl leading-8 whitespace-nowrap">
            {t('With hundred of experties!')}
          </div>
          <div className="w-full center flex justify-center">
            <button
              className="text-white text-center text-lg font-bold leading-8 whitespace-nowrap bg-blue-600 w-fit px-5 py-4 rounded-xl max-md:mb-10"
              onClick={() => {
                navigate(PUBLIC_ROUTES.signUpTeacher)
              }}
              style={{ cursor: 'pointer' }}
            >
              {t('Join as a Teacher')}
            </button>
          </div>
        </div>
      </div>
      <div className="w-full text-center flex flex-col items-center gap-1 bg-[#f5f5f5] py-5">
        <h4 className="text-2xl font-semibold">ENGVISION</h4>
        <p>{t('Ho Chi Minh University of Science')}</p>
        <p>
          Email:{' '}
          <a href="mailto:engvision.dev@gmail.com" className="text-primary">
            engvision.dev@gmail.com
          </a>
        </p>
        <p>{t('Copyright © 2024 EngVision')}</p>
      </div>

      <MessengerCustomerChat
        pageId={FACEBOOK_PAGE_ID}
        appId={FACEBOOK_APP_ID}
      />
    </div>
  )
}
