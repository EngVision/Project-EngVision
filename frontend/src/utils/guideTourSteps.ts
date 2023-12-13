const COMMON_ONBOARDING_STEPS = [
  {
    target: '#account',
    title: 'Account',
    content:
      'Update your profile, security preferences, and other account details.',
    disableBeacon: true,
  },
  {
    target: '#notification',
    title: 'Notification',
    content:
      'Keep an eye on the "Notifications" icon for important updates, announcements, and alerts.',
    disableBeacon: true,
    placement: 'auto',
  },
  {
    target: '#help-menu',
    title: 'Help menu',
    content: 'Access the "User Guide" for detailed instructions and tips.',
    disableBeacon: true,
    placement: 'auto',
  },
  {
    target: '#locales',
    title: 'Languages',
    content:
      'Choose your preferred language by selecting the "Languages" option.',
    disableBeacon: true,
    placement: 'auto',
  },
  {
    target: '#dark-mode',
    title: 'Dark mode',
    content:
      'Toggle "Dark Mode" in the top bar for a visually comfortable experience in low-light environments.',
    disableBeacon: true,
    placement: 'auto',
  },
]

export const STUDENT_ONBOARDING_STEPS = [
  {
    target: '#dashboard',
    title: 'Dashboard',
    content: 'Explore real-time data, statistics, and personalized insights.',
    disableBeacon: true,
  },
  {
    target: '#my-hub',
    title: 'My hub',
    content:
      'The central hub of your attended courses and in-progress exercises. Track your learning progress and achievements.',
    disableBeacon: true,
  },
  {
    target: '#discover',
    title: 'Discover',
    content:
      'Head to the "Discover" tab to explore new courses, challenges, and learning opportunities.',
    disableBeacon: true,
  },
  ...COMMON_ONBOARDING_STEPS,
]

export const TEACHER_ONBOARDING_STEPS = [
  {
    target: '#dashboard',
    title: 'Dashboard',
    content: 'Explore real-time data, statistics, and personalized insights.',
    disableBeacon: true,
  },
  {
    target: '#my-courses',
    title: 'My courses',
    content:
      'Explore a list of courses you are currently teaching. You can access detailed information and post assignments.',
    disableBeacon: true,
  },
  {
    target: '#grading',
    title: 'Grading',
    content:
      'View a list of pending assignments and exams that require grading.',
    disableBeacon: true,
  },
  ...COMMON_ONBOARDING_STEPS,
]

export const DO_EXERCISE_STEPS = [
  {
    target: '#quiz-progress',
    title: 'Quiz progress',
    content:
      'Keep track of your progress with the quiz progress. The progress bar shows your position in the quiz and you can click on the circle to navigate to that question.',
    disableBeacon: true,
  },
  {
    target: '#button-back',
    title: 'Back to previous page',
    content: 'Use the "Back" button to exit and go back the previous page.',
    disableBeacon: true,
  },
  {
    target: '#button-previous',
    title: 'Previous',
    content: 'Use the "Previous" button to go to the previous question.',
    disableBeacon: true,
  },
  {
    target: '#button-confirm',
    title: 'Confirm and Next',
    content:
      'Use this button to submit your answers. Afterwards, you can click it to proceed to the next question.',
    disableBeacon: true,
  },
]
