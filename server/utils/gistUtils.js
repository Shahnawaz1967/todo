import axios from 'axios';

const createGist = async (content, token) => {
  try {
    const response = await axios.post(
      'https://api.github.com/gists',
      {
        description: 'Project summary',
        public: false,
        files: {
          'project-summary.md': {
            content: content,
          },
        },
      },
      {
        headers: {
          Authorization: `token ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error('Failed to create gist');
  }
};

export default createGist;
