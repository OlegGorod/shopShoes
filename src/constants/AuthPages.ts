enum INPUT_PLACEHOLDER {
  NAME = 'Hayman Andrews',
  EMAIL = 'example@mail.com',
  PASSWORD = 'at least 8 characters',
  PASSWORD_CONFIRMATION = 'at least 8 characters',
}

enum TITLE {
  FORGOT_PASSWORD = 'Forgot password?',
  RESET_PASSWORD = 'Reset password',
  SIGN_IN = 'Welcome back',
  SIGN_UP = 'Create an account',
}

enum INFO {
  FORGOT_PASSWORD = 'Don’t worry, we’ll send you reset instructions.',
  RESET_PASSWORD = 'Please create new password here',
  SIGN_IN = 'Welcome back! Please enter your details to log into your account.',
  SIGN_UP = 'Create an account to get an easy access to your dream shopping',
}

enum INPUT_LABEL {
  PASSWORD_CONFIRMATION = 'Confirm password',
  PASSWORD = 'Password',
  EMAIL = 'Email',
  NAME = 'Name',
}

enum ERROR {
  PASSWORD_CONFIRMATION = 'Passwords are not compatible',
  BUTTON_STATUS = 'Provide form type',
}

enum LINK {
  FORGOT_PASSWORD = 'Forgot password?',
  LOG_IN = 'Back to log in',
  SIGN_UP = 'Don’t have an account?',
  HAVE_ACCOUNT = 'Already have an account?',
}

const comments = [
  {
    rate: 5,
    author: 'John Stone',
    location: 'Ukraine, Chernivtsi',
    comment:
      'Lorem Ipsum is a really great company because the team is passionate about the projects they produce, the people they work with, the quality of the work they do.',
  },
  {
    rate: 4,
    author: 'Emily Johnson',
    location: 'USA, New York',
    comment:
      'Lorem Ipsum is a really great company because the team is passionate about the projects they produce, the people they work with, the quality of the work they do.',
  },
  {
    rate: 3,
    author: 'Michael Garcia',
    location: 'Brazil, São Paulo',
    comment:
      'Lorem Ipsum is a really great company because the team is passionate about the projects they produce, the people they work with, the quality of the work they do.',
  },
  {
    rate: 3,
    author: 'Sophie Williams',
    location: 'Australia, Sydney',
    comment:
      'Lorem Ipsum is a really great company because the team is passionate about the projects they produce, the people they work with, the quality of the work they do.',
  },
  {
    rate: 5,
    author: 'Daniel Lee',
    location: 'South Korea, Seoul',
    comment:
      'Lorem Ipsum is a really great company because the team is passionate about the projects they produce, the people they work with, the quality of the work they do.',
  },
  {
    rate: 4,
    author: 'Anna Kowalski',
    location: 'Poland, Warsaw',
    comment:
      'Lorem Ipsum is a really great company because the team is passionate about the projects they produce, the people they work with, the quality of the work they do.',
  },
  {
    rate: 1,
    author: 'Juan Perez',
    location: 'Mexico, Mexico City',
    comment:
      'Lorem Ipsum is a really great company because the team is passionate about the projects they produce, the people they work with, the quality of the work they do.',
  },
  {
    rate: 5,
    author: 'Elena Ivanova',
    location: 'Russia, Moscow',
    comment:
      'Lorem Ipsum is a really great company because the team is passionate about the projects they produce, the people they work with, the quality of the work they do.',
  },
];

const constants = {
  INPUT_PLACEHOLDER,
  INPUT_LABEL,
  ERROR,
  LINK,
  TITLE,
  INFO,
  comments,
};

export default constants;
